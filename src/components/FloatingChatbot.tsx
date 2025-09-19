import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, Mic, User, Paperclip, Image } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hi there! 👋 I\'m your AI travel assistant. How can I help you plan your next adventure?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Handle message sending
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Generate random ID for the message
    const messageId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Add user message to the chat
    const userMessage: Message = {
      id: messageId,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Add temporary loading message
    const tempBotMessage: Message = {
      id: `bot-${messageId}`,
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, tempBotMessage]);
    
    try {
      // Call API to get bot response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          messages: [
            { role: 'user', content: input }
          ] 
        })
      });
      
      // Parse the response and extract the message
      const data = await response.json();
      
      // Update the bot's response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === `bot-${messageId}` 
            ? { ...msg, text: data.message || "I'm not sure how to respond to that.", isLoading: false } 
            : msg
        )
      );
    } catch (error) {
      console.error('Error getting chat response:', error);
      
      // Update with error message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === `bot-${messageId}` 
            ? { 
                ...msg, 
                text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
                isLoading: false 
              } 
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    // In a real app, this would use the Web Speech API
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate getting text from voice
      setTimeout(() => {
        setInput('Tell me about popular destinations in Japan');
        setIsRecording(false);
      }, 1500);
    }
  };
  
  const clearConversation = () => {
    // Keep only the welcome message
    setMessages([
      {
        id: 'welcome',
        text: 'Hi there! 👋 I\'m your AI travel assistant. How can I help you plan your next adventure?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };
  
  // Simulate typical chat suggestions
  const suggestions = [
    "Help me plan a trip to Bali",
    "What should I pack for a winter trip?",
    "Find me kid-friendly activities in Paris",
    "Recommend budget hotels in Tokyo"
  ];
  
  return (
    <>
      {/* Floating button */}
      <button
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
      
      {/* Chat window */}
      <div 
        className={`fixed bottom-24 right-6 z-50 w-full sm:w-96 h-[550px] max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mr-3">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold">Triponic AI Assistant</div>
            <div className="text-xs opacity-80">Online | Powered by AI</div>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-primary text-white ml-2' : 'bg-gray-200 text-gray-700 mr-2'
                  }`}
                >
                  {message.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <div
                  className={`p-3 rounded-xl ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white shadow-sm border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {message.isLoading ? (
                    <div className="flex space-x-1 items-center px-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggestions */}
        {messages.length < 2 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="text-xs py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                  onClick={() => {
                    setInput(suggestion);
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input area */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <button 
              className={`p-2 rounded-full transition ${isRecording ? 'text-red-500 bg-red-100' : 'text-gray-500 hover:bg-gray-200'}`}
              onClick={toggleRecording}
            >
              <Mic className="w-5 h-5" />
            </button>
            <textarea
              ref={inputRef}
              rows={1}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none px-2 py-1 max-h-24"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition">
                <Image className="w-5 h-5" />
              </button>
              <button
                className={`p-2 ml-1 text-white rounded-full transition-colors ${
                  input.trim() ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 cursor-not-allowed'
                }`}
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>Powered by AI</span>
            <button 
              className="text-primary hover:underline"
              onClick={clearConversation}
            >
              Clear conversation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingChatbot;