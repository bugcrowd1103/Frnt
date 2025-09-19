import { useEffect, useState } from 'react'; // Import useState and useEffect for component fade-in
import {
  Brain,
  Globe,
  Sparkles,
  Compass,
  Clock,
  Heart,
  Award,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Rocket // Added Rocket icon for Smart Suggestions consistency, if needed elsewhere
} from 'lucide-react';

const About = () => {
  const [mounted, setMounted] = useState(false); // State to control fade-in animation

  useEffect(() => {
    setMounted(true); // Trigger fade-in on component mount
  }, []);

  // Defined a consistent "primary" color for text and accents
  const primaryColorClass = 'text-indigo-600'; // Using a specific Tailwind color

  const values = [
    {
      icon: <Sparkles className={`w-8 h-8 ${primaryColorClass} mb-4`} />,
      title: 'Innovation',
      description:
        'We blend AI and travel to craft hyper-personalized experiences. From planning to real-time suggestions, we bring cutting-edge tech to your fingertips.'
    },
    {
      icon: <Heart className={`w-8 h-8 ${primaryColorClass} mb-4`} />,
      title: 'Authenticity',
      description:
        'We believe in travel that’s rooted in culture, people, and real stories. Every recommendation we make is curated for depth and discovery.'
    },
    {
    // Changed to Compass as a better fit for discovery and guidance than Award for excellence.
      icon: <Compass className={`w-8 h-8 ${primaryColorClass} mb-4`} />,
      title: 'Excellence', // Keeping title as Excellence
      description:
        'From UX to destination picks, we obsess over quality. Our team and tech work together to deliver excellence in every tap.'
    },
    {
      icon: <Clock className={`w-8 h-8 ${primaryColorClass} mb-4`} />,
      title: 'Efficiency',
      description:
        'No more tab-switching chaos. Triponic saves time with seamless AI tools — from dynamic itineraries to smart nudges, we handle the heavy lifting.'
    }
  ];

  return (
    <>
      {/* Custom CSS for animations and improved text shadow */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          @keyframes popIn {
            from { opacity: 0; transform: scale(0.9) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-pop-in {
            animation: popIn 0.6s ease-out forwards;
          }

          .text-glow {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      <div className={`min-h-screen bg-gray-50 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-800 py-20 relative overflow-hidden">
          {/* Subtle background animation/elements */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute w-[300px] h-[300px] bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow left-1/4 top-1/4" style={{ animationDelay: '1s' }}></div>
            <div className="absolute w-[200px] h-[200px] bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow right-1/3 bottom-1/3" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-glow animate-fade-in">
              AI-Powered Travel. <br className="md:hidden" /> Reimagined.
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Triponic combines AI with human touch to plan smart, soulful journeys. Less stress, more discovery — that’s the future of travel.
            </p>
            <div className="flex justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full hover:bg-white/90 transition shadow-lg transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
                Our Journey
              </button>
              <button className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full border border-white/20 hover:bg-purple-700 transition shadow-md transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50">
                Be an Early Explorer
              </button>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="container mx-auto px-4 py-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${primaryColorClass}`}>Why We Exist</h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Planning a trip shouldn’t feel like work. We use AI to learn your style, and instantly build experiences that fit your vibe, your goals, and your time.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Whether you’re a solo explorer, a family planner, or a last-minute backpacker — Triponic has your back with real-time intelligence and deep personalization.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center mt-8">
                  <div>
                    <div className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-1">10K+</div>
                    <div className="text-gray-600 text-sm">Trips Planned</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-1">50+</div>
                    <div className="text-gray-600 text-sm">Countries Covered</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-1">4.8/5</div>
                    <div className="text-gray-600 text-sm">Beta User Rating</div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Triponic Team Collaborating" // More specific alt text
                  className="rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-102 hover:shadow-3xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="py-20 bg-gradient-to-br from-white to-gray-100 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="container mx-auto px-4">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${primaryColorClass}`}>Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 animate-pop-in"
                  style={{ animationDelay: `${0.1 * index}s` }} // Staggered animation
                >
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision section */}
         <div className="container mx-auto px-4 py-20 text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${primaryColorClass}`}>Our Vision: The Future of Your Journeys</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Imagine a travel companion that intuitively evolves with every journey. Triponic is charting a course to make planning disappear, replaced by a seamless flow of hyper-personalized discovery.
            <br className="hidden sm:inline" />
            We're building a world where our advanced AI not only crafts your perfect itinerary, but also learns your unique style, anticipates your needs with smart nudges, and even lets you explore destinations through immersive AR/VR previews.
            <br className="hidden sm:inline" />
            Our vision is to ensure every adventure is effortlessly easy, profoundly personal, and always filled with confidence.
          </p>
        </div>
        {/* Contact section */}
        <div className="container mx-auto px-4 py-20 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="mb-8 text-white/90 leading-relaxed">
                  Have questions about Triponic? Want to partner with us? We'd love to hear from you. Reach out using the contact information below.
                </p>
                <div className="space-y-4 text-white/90">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-4 text-white/70" />
                    <span>41 George St. S, Brampton, ON</span> {/* Added province */}
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-4 text-white/70" />
                    <a href="mailto:info@triponic.com" className="hover:underline">info@triponic.com</a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-4 text-white/70" />
                    <a href="tel:+13439897204" className="hover:underline">+1 (343) 989-7204</a>
                  </div>
                </div>
                <div className="flex gap-6 mt-8"> {/* Increased gap for social icons */}
                  <a href="https://twitter.com/triponic_ai" target="_blank" rel="noopener noreferrer" aria-label="Triponic on X (formerly Twitter)" className="text-white/80 hover:text-white transform hover:scale-125 transition-transform duration-200">
                    <Twitter className="w-6 h-6" /> {/* Slightly larger icons */}
                  </a>
                  <a href="https://www.linkedin.com/company/triponic/" target="_blank" rel="noopener noreferrer" aria-label="Triponic on LinkedIn" className="text-white/80 hover:text-white transform hover:scale-125 transition-transform duration-200">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://github.com/batrapulkit" target="_blank" rel="noopener noreferrer" aria-label="Pulkit Batra's GitHub" className="text-white/80 hover:text-white transform hover:scale-125 transition-transform duration-200">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/triponic.ai/" target="_blank" rel="noopener noreferrer" aria-label="Triponic on Instagram" className="text-white/80 hover:text-white transform hover:scale-125 transition-transform duration-200">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://www.youtube.com/channel/your_channel_id" target="_blank" rel="noopener noreferrer" aria-label="Triponic on YouTube" className="text-white/80 hover:text-white transform hover:scale-125 transition-transform duration-200"> {/* Updated placeholder URL */}
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 p-8 bg-gray-50"> {/* Light background for form */}
                <h3 className={`text-2xl font-bold mb-6 ${primaryColorClass}`}>Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="Your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button className="bg-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-purple-700 transition w-full shadow-md transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400/50">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;