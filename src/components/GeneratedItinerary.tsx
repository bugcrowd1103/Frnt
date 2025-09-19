import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Volume2, Share2, VolumeX, HeartPulse, Sparkles, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const YOUR_PEXELS_API_KEY =
  "P2dLrk5TWTRGCbNvBizKynGkuHNP68q4a4gC6PXuIEmGtlxzHSivyUPw";

type Activity = {
  activity: string;
  description?: string;
};

export type Meals = {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
};

export type Day = {
  dayNumber: number;
  title: string;
  description?: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  travelTips?: string[];
  meals?: Meals;
  notes?: string;
  image?: string;
  weather?: string;
  transport?: string;
};

export type Itinerary = {
  days: Day[];
  destination: string;
  thumbnail: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={itemVariants}
    className={`p-6 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 ${className}`}
  >
    {children}
  </motion.div>
);

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

const EnhancedItinerary: React.FC = () => {
  const [location] = useLocation();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [dayData, setDayData] = useState<Day[]>([]);
  const [error, setError] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<any>(null);
  const [backgroundPhotos, setBackgroundPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [smartNudge, setSmartNudge] = useState<string | null>(null);
  const [sentiment, setSentiment] = useState<"positive" | "neutral" | "negative" | null>(null);

  const speak = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const planIdFromUrl = location.split("/")[2];
  const planId = `plan-${planIdFromUrl}`;

  useEffect(() => {
    if (!planId) {
      setError("Plan ID is missing from URL");
      return;
    }

    const historyKey = `chatHistory-${planId}`;
    const storedHistory = localStorage.getItem(historyKey);

    if (!storedHistory) {
      setError("No itinerary found in storage for this plan id.");
      return;
    }

    try {
      const parsedHistory = JSON.parse(storedHistory);
      const lastEntry =
        parsedHistory.length > 0 ? parsedHistory[parsedHistory.length - 1] : null;

      if (lastEntry?.geminiResponse?.detailedPlan) {
        setGeminiResponse(lastEntry.geminiResponse);
        const geminiData = lastEntry.geminiResponse;

        const days: Day[] = geminiData.detailedPlan.dailyPlan.map((day: any) => ({
          dayNumber: day.day,
          title: day.title,
          description: day.description || "",
          morning: {
            activity: day.activities?.[0] || "No morning activity listed.",
            description: day.activitiesDescription?.[0] || "",
          },
          afternoon: {
            activity: day.activities?.[1] || "No afternoon activity listed.",
            description: day.activitiesDescription?.[1] || "",
          },
          evening: {
            activity: day.activities?.[2] || "No evening activity listed.",
            description: day.activitiesDescription?.[2] || "",
          },
          travelTips: day.travelTips || [],
          meals: day.meals || {},
          notes: day.notes || "",
          image: day.image || "",
          weather: day.weather || "",
          transport: day.transport || "",
        }));

        setItinerary({
          days,
          destination: geminiData.detailedPlan.destination,
          thumbnail: geminiData.detailedPlan.thumbnail,
        });

        setDayData(days);
        setError("");
      } else {
        setError("Itinerary data format is incorrect or missing detailedPlan.");
      }
    } catch (err) {
      setError("Failed to parse stored itinerary data.");
      console.error("Parse error:", err);
    }
  }, [planId]);

  useEffect(() => {
    const enhance = async () => {
      if (!itinerary || !Array.isArray(itinerary.days)) return;

      let photos: string[] = [];

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            itinerary.thumbnail || itinerary.destination
          )}&per_page=15`,
          {
            headers: {
              Authorization: YOUR_PEXELS_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Pexels API error: ${response.status}`);
        }

        const data = await response.json();

        photos = data?.photos
          ?.map((p: any) => p.src?.landscape || p.src?.medium)
          .filter(Boolean);
      } catch (error) {
        console.error("Failed to fetch images from Pexels:", error);
      }

      const enhancedDays = itinerary.days.map((day, idx) => ({
        ...day,
        image: photos[idx] || "https://via.placeholder.com/800x600",
      }));

      setDayData(enhancedDays);
    };

    enhance();
  }, [itinerary]);

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      if (!itinerary) return;

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            itinerary.destination + " landscape"
          )}&per_page=10`,
          {
            headers: {
              Authorization: YOUR_PEXELS_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Pexels API error: ${response.status}`);
        }

        const data = await response.json();

        const bgPhotos = data.photos
          .map((p: any) => p.src.landscape || p.src.medium)
          .filter(Boolean);

        setBackgroundPhotos(bgPhotos);
      } catch (error) {
        console.error("Failed to fetch background images from Pexels:", error);
      }
    };

    fetchBackgroundImages();
  }, [itinerary]);
  
  // Save current plan ID to localStorage
  useEffect(() => {
  if (planId) localStorage.setItem("current_plan_id", planId);
}, [planId]);

  useEffect(() => {
    if (!itinerary) {
      setNotes("");
      return;
    }

    const saved = localStorage.getItem(`notes-${itinerary.destination}-${currentDay}`);

    if (saved !== null) {
      setNotes(saved);
    } else if (dayData[currentDay]?.notes) {
      setNotes(dayData[currentDay].notes || "");
    } else {
      setNotes("");
    }
  }, [currentDay, itinerary, dayData]);

  const handleNoteChange = (val: string) => {
    if (!itinerary) return;

    setNotes(val);
    localStorage.setItem(`notes-${itinerary.destination}-${currentDay}`, val);
  };
  
  // Smart Nudge Logic
  useEffect(() => {
    const fetchAIInsights = () => {
      if (currentDay === 0 && itinerary?.destination?.toLowerCase().includes("paris")) {
        setSmartNudge("Bonjour! Don't forget to grab a classic croissant for breakfast.");
        setSentiment("positive");
      } else if (itinerary?.destination?.toLowerCase().includes("new york")) {
        setSmartNudge("Heads up! Weather forecast shows rain this afternoon. Grab an umbrella!");
        setSentiment("neutral");
      } else {
        setSmartNudge(null);
        setSentiment(null);
      }
    };
    fetchAIInsights();
  }, [currentDay, itinerary]);

  const current = dayData[currentDay];

  if (!current) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        {error || "Loading itinerary..."}
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen font-sans text-white bg-black overflow-hidden"
    >
      <style jsx>{`
        .futuristic-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0f172a, #0b0f1a);
          z-index: 0;
          overflow: hidden;
        }
        .futuristic-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.1), transparent 70%);
          animation: pulse 10s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        .digital-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, rgba(29, 78, 216, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(29, 78, 216, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }
        @keyframes grid-move {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 50px 50px;
          }
        }
        .floating-globe {
          position: absolute;
          top: 10%;
          right: -10%;
          width: 400px;
          height: 400px;
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/9/91/3D_earth_map.svg');
          background-size: cover;
          background-repeat: no-repeat;
          opacity: 0.2;
          animation: rotate 60s linear infinite;
          transform-style: preserve-3d;
          pointer-events: none;
        }
        @keyframes rotate {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>
      <div className="futuristic-background">
          <div className="digital-grid"></div>
          <div className="floating-globe hidden lg:block"></div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-8xl mx-auto p-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* --- DYNAMIC HERO SECTION --- */}
        <motion.div variants={itemVariants} className="w-full relative rounded-3xl overflow-hidden shadow-2xl">
          <motion.img
              src={current.image}
              alt={`Visual for day ${current.dayNumber}`}
              className="w-full h-[600px] object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
              <div className="flex flex-col md:flex-row justify-between items-end md:items-center">
                  <div className="flex flex-col text-left">
                      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight drop-shadow-lg text-teal-400">
                          {itinerary?.destination}
                      </h1>
                      <h2 className="text-3xl md:text-4xl font-bold mt-2 drop-shadow-md">
                          Day {current.dayNumber}: {current.title}
                      </h2>
                  </div>
                  {sentiment && (
                      <motion.div
                          variants={itemVariants}
                          className="mt-4 md:mt-0 flex items-center space-x-2 p-3 rounded-full bg-white/20 border border-white/30 shadow-xl"
                      >
                          {sentiment === "positive" && <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />}
                          {sentiment === "neutral" && <HeartPulse className="w-8 h-8 text-blue-400" />}
                          <span className="text-sm font-semibold text-white capitalize hidden md:block">
                              Trip Vibe: <span className="font-bold">{sentiment}</span>
                          </span>
                      </motion.div>
                  )}
              </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {smartNudge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full max-w-4xl p-4 bg-yellow-300/90 text-black rounded-lg shadow-xl text-center font-bold italic"
            >
              <Wand2 className="inline w-5 h-5 mr-2" />
              {smartNudge}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-4 gap-8 w-full mt-8">
            <Card className="col-span-4 lg:col-span-2">
                <CardContent className="space-y-4 text-white">
                    <h3 className="text-2xl font-bold">Daily Plan</h3>
                    {["morning", "afternoon", "evening"].map((time) => {
                        const activity = current[time as keyof Day] as Activity;
                        return (
                            <div key={time}>
                                <h4 className="font-semibold text-lg capitalize text-yellow-300">{time}</h4>
                                <p>{activity?.activity || ""}</p>
                                {activity?.description && (
                                    <p className="text-sm text-gray-200">{activity.description}</p>
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            {geminiResponse?.detailedPlan?.flights && (
                <Card className="col-span-4 sm:col-span-2 lg:col-span-1">
                    <CardContent className="space-y-2 text-white">
                        <h3 className="text-2xl font-bold">Flight Details</h3>
                        <p>
                            <strong className="text-gray-300">Route:</strong> {geminiResponse.detailedPlan.flights.departure}
                        </p>
                        <p>
                            <strong className="text-gray-300">Price:</strong> {geminiResponse.detailedPlan.flights.price}
                        </p>
                        <p>
                            <strong className="text-gray-300">Airline:</strong> {geminiResponse.detailedPlan.flights.airline}
                        </p>
                        <p>
                            <strong className="text-gray-300">Duration:</strong> {geminiResponse.detailedPlan.flights.duration}
                        </p>
                        <div className="mt-4 text-center font-bold text-teal-400">
                            Total Estimated Cost: {geminiResponse.detailedPlan.totalCost}
                        </div>
                    </CardContent>
                </Card>
            )}

            {current.meals && (
                <Card className="col-span-4 sm:col-span-2 lg:col-span-1">
                    <CardContent className="space-y-4 text-white">
                        <h3 className="text-2xl font-bold">Meals & Transport</h3>
                        <div className="space-y-2">
                            {current.meals.breakfast && (
                                <p><strong>Breakfast:</strong> {current.meals.breakfast}</p>
                            )}
                            {current.meals.lunch && (
                                <p><strong>Lunch:</strong> {current.meals.lunch}</p>
                            )}
                            {current.meals.dinner && (
                                <p><strong>Dinner:</strong> {current.meals.dinner}</p>
                            )}
                        </div>
                        {current.transport && (
                            <div className="pt-4">
                                <h4 className="font-semibold text-lg text-yellow-300">Transport</h4>
                                <p>{current.transport}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
            
            {current.travelTips && current.travelTips.length > 0 && (
                <Card className="col-span-4 sm:col-span-2 lg:col-span-2">
                    <CardContent className="space-y-4 text-white">
                        <h3 className="text-2xl font-bold">Travel Tips</h3>
                        <ul className="list-disc pl-5 text-sm">
                            {current.travelTips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
            
            <Card className="col-span-4">
                <CardContent className="space-y-4 text-white">
                    <h3 className="text-2xl font-bold">Your Notes</h3>
                    <textarea
                        className="w-full border p-4 rounded-xl text-sm bg-white/10 text-white placeholder-gray-300 border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        value={notes}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        placeholder="Write your thoughts or reminders..."
                        rows={6}
                    />
                </CardContent>
            </Card>

        </div>
        
        <motion.div variants={itemVariants} className="flex justify-between gap-4 w-full max-w-2xl mt-8">
            <Button
                onClick={() => setCurrentDay((prev) => Math.max(0, prev - 1))}
                disabled={currentDay === 0}
                className="bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white border-white/20"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
                onClick={() => speak(current.title + ". " + (current.description || ""))}
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors duration-200"
            >
                {isSpeaking ? (
                    <>
                        <VolumeX className="w-4 h-4 mr-2" /> Stop
                    </>
                ) : (
                    <>
                        <Volume2 className="w-4 h-4 mr-2" /> Listen
                    </>
                )}
            </Button>
            <Button
                onClick={() => setCurrentDay((prev) => Math.min(dayData.length - 1, prev + 1))}
                disabled={currentDay === dayData.length - 1}
                className="bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white border-white/20"
            >
                Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </motion.div>

        <motion.a
            variants={itemVariants}
            href={`https://twitter.com/intent/tweet?text=Check out my travel itinerary for ${encodeURIComponent(
                itinerary?.destination ?? ""
            )}!`}
            target="_blank"
            className="mt-8 text-teal-300 text-lg underline flex items-center hover:text-teal-200 transition-colors duration-200 font-medium"
            rel="noopener noreferrer"
        >
            <Share2 className="inline w-5 h-5 mr-2" /> Share Your Journey
        </motion.a>
      </motion.div>
    </div>
  );
};

export default EnhancedItinerary;
