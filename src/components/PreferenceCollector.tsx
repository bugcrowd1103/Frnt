import { useState, useEffect } from 'react';
import { TravelPreference, preferenceTypes } from '@shared/schema';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Compass, Wallet, Clock } from 'lucide-react';
import { useLocation } from 'wouter'; 

interface PreferenceCollectorProps {
  onComplete: (preferences: TravelPreference) => void;
}

const PreferenceCollector = ({ onComplete }: PreferenceCollectorProps) => {
  const [, navigate] = useLocation(); // ✅ Move this INSIDE the component

  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<TravelPreference>>({
    customDestination: '',
    startDate: '',
    endDate: '',
    interests: '',
    budget: 'midrange',
    pace: 'moderate',
    companions: 'couple',
  });
  const [destinationImage, setDestinationImage] = useState('');

  // Helper function to format date for input
  const formatDateForInput = (date: Date | string | null | undefined): string => {
      if (!date) return '';
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      return date || '';
    };

  useEffect(() => {
    if (preferences.customDestination) {
      const destinations: Record<string, string> = {
        'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        'tokyo': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
      };

      const destination = preferences.customDestination.toLowerCase();
      const foundDestination = Object.keys(destinations).find(key => destination.includes(key));

      setDestinationImage(
        foundDestination
          ? destinations[foundDestination]
          : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'
      );
    }
  }, [preferences.customDestination]);

  const updatePreference = (key: keyof TravelPreference, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // const handleSubmit = async () => {
  //   if (preferences.customDestination && preferences.startDate && preferences.endDate) {
  //     try {
  //       const response = await fetch('/api/preferences', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           ...preferences,
  //           userId: 1,
  //         }),
  //       });

  //       if (!response.ok) throw new Error('Failed to save preferences');

  //       const savedPreference = await response.json();
  //       onComplete(savedPreference as TravelPreference);
  //     } catch (error) {
  //       console.error('Error saving preferences:', error);
  //     }
  //   }
  // };

  const handleSubmit = () => {
  if (preferences.customDestination && preferences.startDate && preferences.endDate) {
    onComplete(preferences as TravelPreference);  // directly send collected preferences without API call
  }
};

  // const handleSubmit = () => {
  //   if (preferences.customDestination && preferences.startDate && preferences.endDate) {
  //     const encoded = encodeURIComponent(JSON.stringify(preferences));
  //     navigate(`/chatbot?data=${encoded}`);
  //   }
  // }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const formSteps = [
    // Step 1: Destination
    <motion.div key="step1" {...fadeInUp} className="space-y-8">
      <div className="text-center">
        <motion.h3 
          className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Where to?
        </motion.h3>
        <motion.p 
          className="text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Let's start with your dream destination
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl transform -skew-y-2" />
        <div className="relative p-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Destination</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Paris, Tokyo, Bali"
              className="w-full py-4 px-5 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white/80 backdrop-blur-sm transition-all"
              value={preferences.customDestination || ''}
              onChange={(e) => updatePreference('customDestination', e.target.value)}
            />
            <MapPin className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
          </div>
        </div>
      </div>

      {destinationImage && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="rounded-2xl overflow-hidden shadow-lg relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <img src={destinationImage} alt="Destination" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-2xl font-bold">{preferences.customDestination}</h4>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {preferenceTypes.destinationType.slice(0, 6).map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updatePreference('destinationType', type)}
            className={cn(
              "py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm",
              preferences.destinationType === type
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>
    </motion.div>,

    // Step 2: Dates and Budget
    <motion.div key="step2" {...fadeInUp} className="space-y-8">
      <div className="text-center">
        <motion.h3 
          className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          {...fadeInUp}
        >
          When & How?
        </motion.h3>
        <motion.p className="text-gray-500 mt-2" {...fadeInUp}>
          Let's plan your perfect trip duration and style
        </motion.p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {['startDate', 'endDate'].map((key) => (
          <motion.div key={key} {...fadeInUp} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl transform -skew-y-2" />
            <div className="relative p-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                {key === 'startDate' ? 'Start Date' : 'End Date'}
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full py-3 px-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white/80 backdrop-blur-sm"
                  value={formatDateForInput(preferences[key as keyof TravelPreference] as string | Date | null | undefined)}
                  onChange={(e) => updatePreference(key as keyof TravelPreference, e.target.value)}
                />
                <Calendar className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeInUp} className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">Budget Range</label>
        <div className="grid grid-cols-3 gap-4">
          {['budget', 'midrange', 'luxury'].map((budget) => (
            <motion.button
              key={budget}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updatePreference('budget', budget)}
              className={cn(
                "py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm",
                preferences.budget === budget
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
              )}
            >
              {budget.charAt(0).toUpperCase() + budget.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>,

    // Step 3: Additional Preferences
    <motion.div key="step3" {...fadeInUp} className="space-y-8">
      <div className="text-center">
        <motion.h3 
          className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          {...fadeInUp}
        >
          Final Touches
        </motion.h3>
        <motion.p className="text-gray-500 mt-2" {...fadeInUp}>
          Help us personalize your experience
        </motion.p>
      </div>

      <motion.div {...fadeInUp} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Travel Pace</label>
          <div className="grid grid-cols-3 gap-4">
            {['relaxed', 'moderate', 'intense'].map((pace) => (
              <motion.button
                key={pace}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updatePreference('pace', pace)}
                className={cn(
                  "py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm",
                  preferences.pace === pace
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                )}
              >
                <Clock className="h-4 w-4 mb-2 mx-auto" />
                {pace.charAt(0).toUpperCase() + pace.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Interests</label>
          <textarea
            className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white/80 backdrop-blur-sm"
            placeholder="Tell us about your interests (e.g., history, food, adventure...)"
            value={preferences.interests || ''}
            onChange={(e) => updatePreference('interests', e.target.value)}
            rows={4}
          />
        </div>
      </motion.div>
    </motion.div>
  ];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100">
      <AnimatePresence mode="wait">
        {formSteps[step]}
      </AnimatePresence>
      
      <motion.div 
        className="flex justify-between mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          disabled={step === 0}
          className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 transition-all shadow-sm font-medium"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md font-medium"
        >
          {step < 2 ? 'Next' : 'Create My Trip'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PreferenceCollector;
