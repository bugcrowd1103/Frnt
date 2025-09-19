import { Brain, Route, Clock, Heart, MapPin, Camera, Globe, 
  User, UserPlus, Wallet, Cloud, Smartphone, Shield, 
  Leaf, Briefcase, BadgeCheck, ThumbsUp, MessageSquare } from 'lucide-react';

const FeaturesSection = () => {
  const featureCategories = [
    {
      id: 'ai',
      title: 'AI & Personalization',
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      features: [
        { name: 'Emotion-based recommendations', icon: <Heart /> },
        { name: 'Behavioral learning', icon: <Brain /> },
        { name: 'AI packing assistant', icon: <BadgeCheck /> },
        { name: 'AI photo recognition', icon: <Camera /> },
        { name: 'Conversational trip planner', icon: <MessageSquare /> }
      ]
    },
    {
      id: 'planning',
      title: 'Smart Travel Planning',
      icon: <Route className="w-6 h-6 text-blue-500" />,
      features: [
        { name: 'Traveler matching', icon: <UserPlus /> },
        { name: 'Multi-destination trip planner', icon: <MapPin /> },
        { name: 'Offline itinerary', icon: <Clock /> },
        { name: 'AI visa checker', icon: <BadgeCheck /> },
        { name: 'Best-time-to-visit predictor', icon: <Cloud /> }
      ]
    },
    {
      id: 'local',
      title: 'Local Experience',
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      features: [
        { name: 'Hidden gems', icon: <MapPin /> },
        { name: 'Local guides', icon: <User /> },
        { name: 'Crowdsourced tips', icon: <ThumbsUp /> },
        { name: 'Volunteering programs', icon: <Heart /> }
      ]
    },
    {
      id: 'social',
      title: 'Community & Social',
      icon: <UserPlus className="w-6 h-6 text-green-500" />,
      features: [
        { name: 'Traveler profiles', icon: <User /> },
        { name: 'Collaborative trip planning', icon: <UserPlus /> },
        { name: 'Community Q&A', icon: <MessageSquare /> },
        { name: 'Gamification rewards', icon: <BadgeCheck /> }
      ]
    },
    {
      id: 'finance',
      title: 'Finance & Budget Tools',
      icon: <Wallet className="w-6 h-6 text-emerald-500" />,
      features: [
        { name: 'Currency converter', icon: <Wallet /> },
        { name: 'Travel insurance', icon: <Shield /> },
        { name: 'Cost of living comparisons', icon: <Wallet /> },
        { name: 'Group expense manager', icon: <UserPlus /> }
      ]
    },
    {
      id: 'tech',
      title: 'Smart Device Integration',
      icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
      features: [
        { name: 'Smartwatch app', icon: <Clock /> },
        { name: 'Voice assistant', icon: <MessageSquare /> },
        { name: 'Mobile widgets', icon: <Smartphone /> }
      ]
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Features List */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Smarter Travel Planning
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform creates truly personalized travel experiences with intelligent features that adapt to your needs.
          </p>
        </div>

        {/* Main feature categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featureCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <ul className="space-y-3">
                {category.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-6 h-6 mr-3 text-purple-500 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trusted Partners Section with Flexbox for better alignment */}
        <div className="text-center mb-16">
          <p className="text-lg font-semibold text-gray-700 mb-4">Connecting with the Best</p>
          <div className="flex justify-center gap-12 flex-wrap">
            <a
              href="https://www.designrush.com/agency/hr-outsourcing/trends/ai-productivity-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-3"
            >
              <img
                src="https://i.imgur.com/rjk30lA.png"
                alt="Triponic AI Productivity Tool on DesignRush"
                className="w-40 transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-6"
              />
            </a>
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-3"
            >
              <img
                src="https://i.imgur.com/hXGO4po.png"
                alt="Pay securely with Stripe"
                className="w-40 transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-6"
              />
            </a>
            <a
              href="https://www.travelpayouts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-3"
            >
              <img
                src="https://i.imgur.com/q0f306O.png"
                alt="Real-time travel information by TravelPayouts"
                className="w-40 transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-6"
              />
            </a>
          </div>
        </div>

        {/* Feature highlight with Chatbot on the right */}
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <div
              className="absolute inset-0 bg-white opacity-10"
              style={{
                clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
              }}
            ></div>
          </div>

          <div className="relative p-12 lg:p-16 flex flex-col lg:flex-row items-center z-10">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h3 className="text-3xl font-bold text-white mb-4">Conversational AI Trip Planning</h3>
              <p className="text-blue-100 text-lg mb-6">
                Our advanced AI chatbot helps you plan every aspect of your trip through natural conversation, creating personalized travel experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Natural language processing
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Multi-language support
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Contextual understanding
                </span>
              </div>
            </div>

            <div className="lg:w-1/2 w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl p-5 max-w-sm mx-auto">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">TravelPal AI</h4>
                    <p className="text-xs text-gray-500">Online now</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm">
                    How can I help you plan your perfect trip today?
                  </div>
                  <div className="bg-purple-100 rounded-lg rounded-tr-none p-3 text-sm ml-auto">
                    I want to visit Japan in spring with my family.
                  </div>
                  <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm">
                    Great choice! Cherry blossom season in Japan is beautiful. How many days are you planning to stay and what activities interest your family?
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
