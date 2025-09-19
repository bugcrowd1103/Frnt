import { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { TravelPreference, Message } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  preference: TravelPreference;
  onBackToQuestions: () => void;
  onGenerateItinerary: () => void;
}

const ChatInterface = ({ preference, onBackToQuestions, onGenerateItinerary }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi there! I'll be your AI travel assistant. Based on your preferences, I think I understand what you're looking for. Let me ask a few more questions to create the perfect trip for you.`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Create conversation when component mounts
  useEffect(() => {
    const createConversation = async () => {
      try {
        const response = await apiRequest('POST', '/api/conversations', {
          preferenceId: preference.id,
          userId: preference.userId || 1
        });
        
        if (response.ok) {
          const data = await response.json();
          setConversationId(data.id);
          
          // Add initial assistant message asking about interests
          sendMessage({
            role: 'assistant',
            content: 'What specific activities or places are you most interested in for this trip?',
            timestamp: Date.now()
          });
        }
      } catch (error) {
        console.error('Error creating conversation:', error);
        toast({
          title: 'Error',
          description: 'Could not start conversation',
          variant: 'destructive'
        });
      }
    };
    
    createConversation();
  }, [preference.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (message: Message) => {
    if (!conversationId) return;
    
    setMessages(prev => [...prev, message]);
    
    try {
      const response = await apiRequest('POST', `/api/conversations/${conversationId}/messages`, {
        role: message.role,
        content: message.content
      });
      
      if (response.ok) {
        const updatedConversation = await response.json();
        // Update messages with the full conversation including AI response
        setMessages(updatedConversation.messages);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Could not send message',
        variant: 'destructive'
      });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };
    
    setInput('');
    setIsLoading(true);
    
    await sendMessage(userMessage);
    
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-2xl bg-white p-4 h-[400px] overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex items-start mb-4 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            <div className={`p-3 rounded-lg max-w-[80%] ${
              message.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-light text-dark rounded-tl-none'
            }`}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="relative">
        <input 
          type="text" 
          placeholder="Type your response..."
          className="w-full py-3 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full disabled:opacity-50"
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button 
          className="text-medium py-2 px-6 rounded-full font-medium hover:text-primary transition"
          onClick={onBackToQuestions}
        >
          Back to Questions
        </button>
        <button 
          className="bg-primary text-white py-2 px-6 rounded-full font-medium hover:bg-opacity-90 transition"
          onClick={onGenerateItinerary}
        >
          Generate Itinerary
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
