import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, Send, X, Volume2, MinusCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LiveChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi there! I'm your Triponic assistant. How can I help with your travel plans today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input field when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    try {
      // Show typing indicator
      setMessages(prev => [...prev, {
        id: 'typing-indicator',
        text: '...',
        sender: 'bot',
        timestamp: new Date()
      }]);
      
      // Get conversation history to send to API
      const conversationHistory = messages
        .filter(msg => msg.id !== 'typing-indicator')
        .concat(userMessage)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
      
      // Call the backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: conversationHistory })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from chat API');
      }
      
      const data = await response.json();
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing-indicator'));
      
      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.message || "I'm having trouble connecting right now. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing-indicator'));
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const toggleSpeechRecognition = () => {
    // In a real implementation, we would use the Web Speech API
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulating speech recognition
      setTimeout(() => {
        setInput('I want to plan a trip to Japan next month');
        setIsListening(false);
      }, 2000);
    }
  };
  
  const speakMessage = (text: string) => {
    // In a real implementation, we would use the Web Speech API
    setIsSpeaking(!isSpeaking);
    
    if (!isSpeaking) {
      // Simulate speaking for 3 seconds
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      {/* <button 
        onClick={toggleChat}
        className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
      >
        <MessageSquare className="w-6 h-6" />
      </button> */}
      
      {/* Chat window */}
      {isOpen && (
        <div className={`absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
          {/* Chat header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <h3 className="font-medium">Triponic Live Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={minimizeChat} className="hover:text-gray-200">
                {isMinimized ? <MessageSquare size={16} /> : <MinusCircle size={16} />}
              </button>
              <button onClick={toggleChat} className="hover:text-gray-200">
                <X size={16} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages container */}
              <div className="p-4 h-[380px] overflow-y-auto">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <div className="flex justify-between items-center mt-1">
                        <small className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </small>
                        {message.sender === 'bot' && (
                          <button 
                            onClick={() => speakMessage(message.text)} 
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <Volume2 size={14} className={isSpeaking ? 'text-primary' : ''} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input container */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <button 
                    onClick={toggleSpeechRecognition} 
                    className={`mr-2 ${isListening ? 'text-primary' : 'text-gray-500'} hover:text-primary transition-colors`}
                  >
                    <Mic size={20} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    onClick={handleSend}
                    className="ml-2 text-primary hover:text-primary/80"
                    disabled={input.trim() === ''}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveChatbot;