import { useState, useRef, useEffect } from 'react';
import { TravelPreference } from '@shared/schema';
import { type GeneratedItinerary as ItineraryType } from '@/lib/openai';
import { apiRequest } from '@/lib/queryClient';
import HeroSection from '@/components/HeroSection';
import StepIndicator from '@/components/StepIndicator';
import ChatBot from "@/components/ChatBot";
import PreferenceCollector from '@/components/PreferenceCollector';
import ChatInterface from '@/components/ChatInterface';
import GeneratedItinerary from '@/components/GeneratedItinerary';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToAction from '@/components/CallToAction';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { label: "Your Preferences", value: 1 },
  { label: "AI Processing", value: 2 },
  { label: "Your Itinerary", value: 3 },
  { label: "Finalize & Book", value: 4 }
];

const Home = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preference, setPreference] = useState<TravelPreference | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [itinerary, setItinerary] = useState<ItineraryType | null>(null);
  const planningProcessRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [chatOpen, setChatOpen] = useState(false);

  // Fade-in animation state for smooth content appearance
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const onStartPlanning = () => setChatOpen(true);
  const onCloseChat = () => setChatOpen(false);

  const handleStartPlanning = () => {
    setCurrentStep(1);
    if (planningProcessRef.current) {
      planningProcessRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreferenceComplete = (savedPreference: TravelPreference) => {
    setPreference(savedPreference);
    const message = `Hi! I want to travel to ${savedPreference.customDestination} from ${savedPreference.startDate} to ${savedPreference.endDate}. My budget is ${savedPreference.budget}. Interests: ${savedPreference.interests || 'general travel'}.`;
    setChatInput(message);
    setChatOpen(true);
  };

  const handleChatStart = () => setShowChat(true);
  const handleBackToQuestions = () => setShowChat(false);

  const handleGenerateItinerary = async () => {
    if (!preference) return;

    try {
      setCurrentStep(2);
      toast({
        title: "Generating your personalized itinerary...",
        description: "Our AI is crafting your perfect trip. This may take a moment."
      });

      const response = await apiRequest('POST', '/api/generate-itinerary', {
        preferenceId: preference.id
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      setItinerary(data.content);
      setCurrentStep(3);

      setTimeout(() => {
        if (planningProcessRef.current) {
          planningProcessRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);

    } catch (error) {
      toast({
        title: "Error generating itinerary",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
      setCurrentStep(1);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection onStartPlanning={onStartPlanning} />

      <section
        id="planning-process"
        ref={planningProcessRef}
        className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className={`max-w-4xl mx-auto text-center transition-opacity duration-800 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl font-extrabold font-poppins mb-5 text-gray-900 dark:text-white tracking-tight drop-shadow-md">
              How TripOnic Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our smart AI, Tono, crafts your perfect day-by-day itinerary in minutes, so you can explore with confidence, not confusion.
            </p>
          </div>

          {/* Step Indicator */}
          {currentStep > 0 && (
            <StepIndicator
              currentStep={currentStep}
              steps={steps}
              className="my-12 max-w-3xl mx-auto"
            />
          )}

          {/* Preference Collector */}
          {currentStep === 1 && !showChat && (
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 transition-transform hover:scale-[1.02] duration-300">
              <PreferenceCollector
                onComplete={handlePreferenceComplete}
                onChatStart={handleChatStart}
              />
            </div>
          )}

          {/* Chat Interface */}
          {currentStep === 1 && showChat && preference && (
            <div className="max-w-4xl mx-auto mt-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl p-10 transition-shadow duration-500 hover:shadow-2xl">
              <h3 className="text-3xl font-semibold font-poppins mb-6 text-gray-900 dark:text-white tracking-wide">
                Tell us more about your dream trip
              </h3>
              <ChatInterface
                preference={preference}
                onBackToQuestions={handleBackToQuestions}
                onGenerateItinerary={handleGenerateItinerary}
              />
            </div>
          )}

          {/* Generated Itinerary */}
          {currentStep >= 3 && itinerary && (
            <div className="mt-14 max-w-5xl mx-auto">
              <GeneratedItinerary itinerary={itinerary} />
            </div>
          )}

          {/* Floating ChatBot Button */}
          <button
            onClick={() => setChatOpen(true)}
            aria-label="Open ChatBot"
            title="Chat with TravelPal AI"
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition-transform rounded-full p-5 shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white drop-shadow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-3.582 7-8 7a8.982 8.982 0 01-4.899-1.516L3 19l1.516-4.899A8.982 8.982 0 013 12c0-4.418 3.134-8 7-8s8 3.134 8 8z" />
            </svg>
          </button>

          {/* ChatBot Modal */}
          {chatOpen && (
            <ChatBot
              isOpen={chatOpen}
              onClose={onCloseChat}
              onStartPlanning={handleStartPlanning}
              initialInput={chatInput}
            />
          )}
        </div>
      </section>

      {/* Initial Sections */}
      {currentStep === 0 && (
        <>
          <FeaturesSection />
          <TestimonialsSection />
          <CallToAction onStartPlanning={handleStartPlanning} />
        </>
      )}
    </>
  );
};

export default Home;
