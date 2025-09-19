import { 
  Star, Quote, Heart, ArrowRight, MapPin, 
  Calendar, Shield, Luggage 
} from 'lucide-react';
import { useState, useEffect } from 'react';

type TestimonialType = {
  id: number;
  rating: number;
  text: string;
  name: string;
  location: string;
  image: string;
  tags: string[];
  emotion: string;
  spotlightFeature: string;
};

const testimonials: TestimonialType[] = [
  {
    id: 1,
    rating: 5,
    text: "Triponic's AI helped me sketch a detailed Japan trip in minutes. It’s a game‑changer for early planning and gave me confidence in my itinerary.",
    name: "Sarah J.",
    location: "Beta user, USA",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    tags: ["Early planning", "AI‑powered", "Japan"],
    emotion: "Optimistic",
    spotlightFeature: "Smart itinerary drafts"
  },
  {
    id: 2,
    rating: 4.5,
    text: "I loved how Triponic suggested safe neighborhoods and local spots for my solo trip. The app feels intuitive and very promising.",
    name: "Marcus T.",
    location: "Beta tester, UK",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    tags: ["Safety", "Solo travel", "Local spots"],
    emotion: "Confident",
    spotlightFeature: "Personalized safety tips"
  },
  {
    id: 3,
    rating: 4,
    text: "The AI’s recommendations for hidden gems in Thailand made me excited for my upcoming trip. I can already tell this will save a lot of time.",
    name: "Aisha & David",
    location: "Early adopters, Canada",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    tags: ["Hidden gems", "Adventure", "AI suggestions"],
    emotion: "Excited",
    spotlightFeature: "Discover hidden gems"
  },
  {
    id: 4,
    rating: 5,
    text: "Triponic helped me pack efficiently and reminded me of visa details I’d have forgotten. The prep tools are already invaluable.",
    name: "Priya S.",
    location: "Pilot user, India",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    tags: ["Packing", "Visa prep", "Efficiency"],
    emotion: "Relieved",
    spotlightFeature: "AI packing & prep"
  }
];

const milestones = [
  { number: "100+", label: "Beta Users" },
  { number: "15+", label: "Countries Tested" },
  { number: "4.8/5", label: "Avg. User Rating" },
  { number: "10K+", label: "AI Plans Created" },
];

const featureIcons: { [key: string]: React.ReactNode } = {
  "Smart itinerary drafts": <Calendar className="text-blue-500" />,
  "Personalized safety tips": <Shield className="text-indigo-600" />,
  "Discover hidden gems": <MapPin className="text-purple-600" />,
  "AI packing & prep": <Luggage className="text-orange-500" />
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => setActiveIndex(prev => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[activeIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50 relative select-none overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 shadow-sm">
            <Quote className="w-4 h-4 mr-2" />
            Beta User Feedback
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight max-w-3xl mx-auto">
            Early Insights on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Triponic</span> — Your AI Travel Planner
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Hear what our early users love and how Triponic is shaping the future of personalized travel.
          </p>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 text-center">
          {milestones.map(({ number, label }, idx) => (
            <div key={idx} className="transform transition-transform hover:scale-110 duration-300">
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{number}</h3>
              <p className="text-gray-700 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
          {/* Left panel */}
          <div className="md:w-2/5 relative bg-gradient-to-br from-blue-600 to-purple-700 p-10 flex flex-col items-center justify-between text-center">
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 flex items-center space-x-3 shadow-md">
              {featureIcons[active.spotlightFeature] || <Star className="text-yellow-400" />}
              <span className="text-sm font-semibold text-gray-700">{active.spotlightFeature}</span>
            </div>

            <div className="flex items-center justify-center h-72 w-full">
            <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white transition-transform duration-300 hover:scale-105">
            <img 
              src={active.image} 
              alt={active.name} 
              className="object-cover w-full h-full"
              loading="lazy"
          />
          </div>

            </div>

            <div className="absolute bottom-6 left-6 bg-white rounded-full px-4 py-2 flex items-center shadow-md text-sm font-semibold text-blue-700">
              <Heart className="w-5 h-5 mr-2 text-pink-500" />
              Feeling: <span className="ml-1">{active.emotion}</span>
            </div>
          </div>

          {/* Right content */}
          <div className="md:w-3/5 p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Quote className="text-gray-300 w-12 h-12" />
                <div className="flex text-yellow-400">
                  {[...Array(Math.floor(active.rating))].map((_, i) => (
                    <Star key={i} fill="currentColor" size={24} />
                  ))}
                  {active.rating % 1 !== 0 && (
                    <div className="relative w-6 h-6">
                      <Star fill="currentColor" fillOpacity={0.5} size={24} />
                      <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                        <Star fill="currentColor" size={24} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xl text-gray-800 italic mb-12 leading-relaxed">"{active.text}"</p>
              <div className="flex flex-wrap gap-3 mb-12">
                {active.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-600 overflow-hidden shadow-lg">
                  <img src={active.image} alt={active.name} className="object-cover w-full h-full" loading="lazy" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{active.name}</h4>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {active.location}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button aria-label="Previous testimonial" onClick={prevTestimonial}
                  className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <ArrowRight className="rotate-180 w-5 h-5" />
                </button>
                <button aria-label="Next testimonial" onClick={nextTestimonial}
                  className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
