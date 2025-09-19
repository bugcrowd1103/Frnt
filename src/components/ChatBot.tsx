import { useState, useEffect, useRef } from "react";
import TypingIndicator from "@/components/chatbot/components/TypingIndicator";
import TripPlanMessage from "@/components/chatbot/components/TripPlanMessage";
import { useLocation } from "wouter";
import { marked } from "marked";
import { supabase } from "@/lib/supabaseClient";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// Define the type for a single chat message
type ChatMessage = {
  sender: "user" | "bot";
  text?: string;
  type: "text" | "tripPlan";
  suggestions?: string[];
  id?: string;
  plan_id?: string;
  error?: string;
  raw?: string;
  content?: string;
};

// Define the component's props with explicit types
type ChatBotProps = {
  isOpen?: boolean;
  onClose: () => void;
  onStartPlanning: () => void;
  initialInput?: string;
};

const ChatBot = ({
  isOpen = true,
  onClose,
  onStartPlanning,
  initialInput = "",
}: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "👋 Hey traveler! I'm Tono, your AI buddy. Let's craft your dream trip. First, what's your name?",
      type: "text",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    email: "",
    destination: "",
    dates: "",
    budget: "",
    departure: "",
    travelers: "",
    interest: "",
  });

  const chatRef = useRef<HTMLDivElement | null>(null);
  const chatIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialInput && initialInput.trim() !== "") {
      handleInputSubmit(initialInput);
    }
  }, [initialInput]);

  useEffect(() => {
    if (isOpen && !chatIdRef.current) {
      chatIdRef.current = `chat-${Date.now()}`;
      localStorage.setItem("currentChatId", chatIdRef.current);
    }

    if (!isOpen) {
      chatIdRef.current = null;
      localStorage.removeItem("currentChatId");
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.name === "Google US English");
      if (preferredVoice) {
        speech.voice = preferredVoice;
      }
      window.speechSynthesis.speak(speech);
    } else {
      console.log("Text-to-speech not supported in this browser.");
    }
  };

  // Save to Supabase
  const saveLead = async (name: string, email: string) => {
    try {
      await supabase.from("user_leads").insert([{ name, email }]);
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
  };

  const callGemini = async (userMessage: string, messages: ChatMessage[]) => {
    try {
      const rawLocation = localStorage.getItem("userLocation");
      let locationDetails = {
        city: "",
        state: "",
        countryCode: "",
        currency: ""
      };

      if (rawLocation) {
        try {
          locationDetails = JSON.parse(rawLocation);
        } catch (e) {
          console.warn("Failed to parse location from localStorage");
        }
      }

      const conversationHistory = messages
        .map((msg) => {
          const senderLabel = msg.sender === "user" ? "User" : "AI";
          const text =
            msg.type === "tripPlan" ? msg.content || msg.text : msg.text;
          return `${senderLabel}: ${text}`;
        })
        .join("\n");

      const prompt = `You are an AI travel planner.
        If the user is casually chatting or hasn't provided all necessary trip info, you can talk normally — but always guide the conversation back by kindly asking how you can help them with their travel plans.

        If the user hasn't provided all key trip details, ask ONLY the missing ones — very briefly and directly, in 1 short sentence per question. DO NOT explain anything or add extra text.

        - Destination city or place they want to visit
        - Travel dates or duration of the trip
        - Number of travelers
        - Budget
        - Interests or preferred activities (e.g., adventure, relaxation, food, culture)

        Only once the user has provided all required details, generate a concise full trip itinerary with the following info:

        this is user what said previusly ${conversationHistory}


        User's current city: ${locationDetails.city || "unknown"}
        Currency: ${locationDetails.currency || "unknown"}

        ✈️ Flight details: departure city, destination, airline, flight time, price, and duration.
        🏨 Hotel details: name, location, price per night, rating, and key amenities.
        📅 Daily plan: 
        - Generate for the number of days requested (default 7 if none specified).
        - Each day should have a day number, a descriptive and engaging title, and 6-8 detailed activities (each 30-40 words) that include tips, local highlights, and unique experiences.
        🌤️ Weather info: temperature range, general condition, and packing tips.
        🔍 4-5 brief travel suggestions for the destination.

        Return ONLY a valid JSON object matching this exact structure (no explanations, no markdown, no extra text):

        {
          "content": "string with a sweet message about the trip and destination",
          "detailedPlan": {
            "destination": "string"(required),
            "description": "string(required a swwet desiton for the place)",
            "thumbnail": "string with a famous landmark or place name",
            "duration": "string"(required),
            "travelers": number(required),
            "budget": "string"(required),
            "interest": "string"(required),
            "totalCost": "string",
            "flights": {
              "departure": "string",
              "price": "string",
              "airline": "string",
              "duration": "string"
            },
            "hotel": {
              "name": "string",
              "location": "string",
              "price": "string",
              "rating": number,
              "amenities": ["string"]
            },
            "dailyPlan": [
            {
              "day": number,
              "title": "string",
              "description": "string",
              "activities": ["string", "string", "..."],
              "activitiesDescription": ["string", "string", "..."],
              "travelTips": ["string", "string", "..."],
              "meals": {
                "breakfast": "string",
                "lunch": "string",
                "dinner": "string"
              },
              "notes": "string",
              "image": "string",
              "weather": "string",
              "transport": "string"
            }
          ]
        ,
            "weather": {
              "temp": "string",
              "condition": "string",
              "recommendation": "string"
            }
          },
          "suggestions": ["string", "string", "..."(per suggestion make it short and concise)],
        }

        User input:
        ${userMessage}
        `.trim();

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        return { error: "No response from Gemini." };
      }

      try {
        let cleanText = textResponse.trim();

        if (cleanText.startsWith("```json") || cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```json\n?/, "").replace(/```$/, "");
        }

        let parsed = JSON.parse(cleanText);

        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }

        if (parsed && parsed.content && parsed.detailedPlan) {
          return parsed;
        } else {
          return {
            error: "Parsed JSON does not have expected keys.",
            raw: textResponse,
          };
        }
      } catch (e) {
        return {
          error: "Failed to parse Gemini response as JSON.",
          raw: textResponse,
        };
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { error: "Could not connect to Gemini." };
    }
  };

  const handleInputSubmit = async (inputValue?: string) => {
    const userText = (inputValue ?? input).trim();
    if (!userText || loading) return;

    // Sequential Q&A flow
    if (step === 0) {
      if (!inputValue) setInput("");
      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setUserDetails({ ...userDetails, name: userText });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "📧 Great! What's your email?", type: "text" },
      ]);
      setStep(1);
      return;
    }
    
    if (step === 1) {
      if (!inputValue) setInput("");
      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setUserDetails({ ...userDetails, email: userText });
      saveLead(userDetails.name, userText); // Save to Supabase
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "🌍 Awesome! Where would you like to travel?", type: "text" },
      ]);
      setStep(2);
      return;
    }
    
    if (step === 2) {
      if (!inputValue) setInput("");
      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setUserDetails({ ...userDetails, destination: userText });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "📅 Cool! What are your travel dates?", type: "text" },
      ]);
      setStep(3);
      return;
    }
    
    if (step === 3) {
      if (!inputValue) setInput("");
      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setUserDetails({ ...userDetails, dates: userText });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "💰 Nice! What's your budget?", type: "text" },
      ]);
      setStep(4);
      return;
    }
    
    if (step === 4) {
      if (!inputValue) setInput("");
      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setUserDetails({ ...userDetails, budget: userText });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "🛫 From which city will you fly out?", type: "text" },
      ]);
      setStep(5);
      return;
    }
    
    if (step === 5) {
      if (!inputValue) setInput("");
      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setUserDetails({ ...userDetails, departure: userText });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "👨‍👩‍👧 How many travelers are joining?", type: "text" },
      ]);
      setStep(6);
      return;
    }
    
    if (step === 6) {
      if (!inputValue) setInput("");
      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setUserDetails({ ...userDetails, travelers: userText });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "🔥 What's your vibe? (adventure, food, culture, chill)", type: "text" },
      ]);
      setStep(7);
      return;
    }
    
    if (step === 7) {
      if (!inputValue) setInput("");
      const details = {
        ...userDetails,
        interest: userText,
      };
      setUserDetails(details);

      setMessages((prev) => [...prev, { sender: "user", text: userText, type: "text" }]);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "✨ Perfect! Let me cook up your trip plan...", type: "text" },
      ]);

      setLoading(true);
      const allDetails = `
      Name: ${details.name}
      Email: ${details.email}
      Destination: ${details.destination}
      Dates: ${details.dates}
      Budget: ${details.budget}
      Departure: ${details.departure}
      Travelers: ${details.travelers}
      Interest: ${details.interest}
      `;

      const botResponse = await callGemini(allDetails, messages);
      setLoading(false);

      const uniqueId = Date.now().toString();
      const planId = `plan-${uniqueId}`;
      const chatId = chatIdRef.current || "default-chat";

      const botMessage = {
        sender: "bot",
        id: uniqueId,
        plan_id: planId,
        ...botResponse,
        type: "tripPlan",
      };

      setMessages((prev) => [...prev, botMessage]);

      const historyKey = `chatHistory-${planId}`;
      const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");

      const newEntry = {
        id: uniqueId,
        plan_id: planId,
        timestamp: new Date().toISOString(),
        userPrompt: allDetails,
        geminiResponse: botResponse,
      };

      localStorage.setItem(
        historyKey,
        JSON.stringify([...existing, newEntry])
      );
      setStep(8); // Move to final step to prevent further processing
      return;
    }

    // After completing the sequential questions, handle other inputs normally
    if (step >= 8) {
      const lowerUserText = userText.toLowerCase();
      
      const greetingKeywords = [
        "hi", "hello", "hey", "hola", "namaste", "what's up", "sup",
        "good morning", "good afternoon", "good evening", "greetings"
      ];

      const identityKeywords = [
        "who are you", "what is your name", "what are you", "are you an ai",
        "tell me about yourself"
      ];

      const pleasantryKeywords = [
        "how are you", "how are you doing", "how's it going"
      ];
      
      let hardcodedResponse = null;

      if (greetingKeywords.includes(lowerUserText)) {
        hardcodedResponse = "👋 Hello! I'm here to help you plan your perfect trip. What's your destination?";
      } else if (identityKeywords.includes(lowerUserText)) {
        hardcodedResponse = "I'm Tono, your AI Travel Planning Expert for Triponic. I'm here to turn your travel dreams into a seamless itinerary!";
      } else if (pleasantryKeywords.includes(lowerUserText)) {
        hardcodedResponse = "I'm doing great, thanks for asking! How about we start planning your next adventure?";
      } else if (lowerUserText === "thanks" || lowerUserText === "thank you") {
        hardcodedResponse = "You're most welcome! Let me know if you need any more help.";
      } else if (lowerUserText === "bye" || lowerUserText === "goodbye") {
        hardcodedResponse = "Goodbye! Happy travels and see you soon on Triponic.";
      }

      if (hardcodedResponse) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "user", text: userText, type: "text" },
          { sender: "bot", text: hardcodedResponse, type: "text" },
        ]);
        if (!inputValue) setInput("");
        return;
      }

      if (!inputValue) setInput("");

      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          { sender: "user", text: userText, type: "text" },
        ];

        (async () => {
          setLoading(true);

          const botResponse = await callGemini(userText, newMessages);

          setLoading(false);

          const uniqueId = Date.now().toString();
          const planId = `plan-${uniqueId}`;
          const chatId = chatIdRef.current || "default-chat";

          const botMessage = {
            sender: "bot",
            id: uniqueId,
            plan_id: planId,
            ...botResponse,
            type: "tripPlan",
          };

          setMessages((prev) => [...prev, botMessage]);

          const historyKey = `chatHistory-${planId}`;
          const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");

          const newEntry = {
            id: uniqueId,
            plan_id: planId,
            timestamp: new Date().toISOString(),
            userPrompt: userText,
            geminiResponse: botResponse,
          };

          localStorage.setItem(
            historyKey,
            JSON.stringify([...existing, newEntry])
          );
        })();

        return newMessages;
      });
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " : "") + transcript);
      setRecording(false);
    };
    recognition.onerror = () => {
      setRecording(false);
    };
    recognition.onend = () => {
      setRecording(false);
    };
    recognition.start();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[95vh] flex flex-col overflow-hidden border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 8h10M7 12h8m-8 4h6"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow">Chat with Tono</h2>
              <p className="text-white/90 text-xs sm:text-sm">Your AI Travel Planning Expert</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="text-white hover:text-gray-200 transition rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4 text-gray-900 bg-gradient-to-b from-gray-50 via-white to-gray-100"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((msg, i) => {
            if (msg.type === "tripPlan") {
              return (
                <TripPlanMessage
                  key={msg.id || i}
                  data={msg}
                  setInput={setInput}
                  handleInputSubmit={handleInputSubmit}
                />
              );
            }
            return (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 text-base max-w-[80vw] sm:max-w-[70%] whitespace-pre-wrap border relative transition-all duration-200 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white border-blue-700 rounded-br-none shadow-lg"
                      : "bg-white border-gray-300 text-gray-800 rounded-bl-none shadow-md"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(msg.text || ""),
                        }}
                      />
                      {msg.text && (
                        <button
                          onClick={() => speak(msg.text || "")}
                          className="absolute -top-2 -right-2 bg-gray-200 text-gray-700 p-1 rounded-full shadow-md hover:bg-gray-300 transition-colors"
                          aria-label="Read message aloud"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.018a1.5 1.5 0 011.66 0l4.5 2.25A1.5 1.5 0 0116 6.643v6.714a1.5 1.5 0 01-1.457.76l-4.5-2.25a1.5 1.5 0 01-.826-1.34V4.358a1.5 1.5 0 01.826-1.34zM11 11.25V5.5L7 7.5v6l4-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            );
          })}

          {loading && <TypingIndicator />}
        </div>

        <div className="border-t border-gray-200 bg-white rounded-b-3xl">
          <div className="px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
              placeholder="Type your travel request..."
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-sm transition"
              disabled={loading}
            />
            <button
              onClick={() => handleInputSubmit()}
              className="bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition shadow"
              disabled={loading || !input.trim()}
              type="button"
            >
              <span className="hidden sm:inline">Send</span>
              <svg className="sm:hidden h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={handleMicClick}
              className={`bg-gray-200 text-gray-700 rounded-full p-2 shadow hover:bg-gray-300 active:bg-gray-400 transition ${recording ? "animate-pulse ring-2 ring-blue-400" : ""}`}
              aria-label="Speak your request"
              type="button"
              disabled={loading || recording}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm5 10a1 1 0 1 1 2 0c0 4.418-3.582 8-8 8s-8-3.582-8-8a1 1 0 1 1 2 0c0 3.314 2.686 6 6 6s6-2.686 6-6zm-7 8h2v2a1 1 0 1 1-2 0v-2z"/>
              </svg>
            </button>
          </div>

          <div className="px-3 sm:px-4 pb-4">
            <button
              onClick={() => {
                if (onStartPlanning) onStartPlanning();
                if (onClose) onClose();
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow"
            >
              Use Planning Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
