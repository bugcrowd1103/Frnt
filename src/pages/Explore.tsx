import { useEffect, useState } from 'react';
import { Search, MapPin, Star, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

const Explore = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleTours, setVisibleTours] = useState<number | null>(null);

  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      category: 'Beach Paradise',
    },
    {
      id: 4,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      category: 'Cultural Heritage',
    },
    {
      id: 7,
      name: 'Machu Picchu, Peru',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      category: 'Adventure & History',
    },
    {
      id: 10,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2070&q=80',
      rating: 4.7,
      category: 'Tropical Paradise',
    },
    {
      id: 13,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      category: 'Romantic Getaway',
    },
    {
      id: 16,
      name: 'Banff, Canada',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      category: 'Mountain Adventure',
    },
  ];

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    destinations.forEach(dest => {
      const script = document.createElement('script');
      script.src = `https://c150.travelpayouts.com/content?trs=414043&shmarker=628844&locale=en&q=${encodeURIComponent(dest.name)}&tours=4&powered_by=true&promo_id=4489`;
      script.async = true;
      script.charset = 'utf-8';

      const container = document.getElementById(`tour-widget-${dest.id}`);
      if (container) {
        container.innerHTML = '';
        container.appendChild(script);
      }
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-blue-900 to-indigo-800 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2031&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Hero"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Explore the World with Triponic</h1>
          <div className="max-w-xl mx-auto bg-white/20 rounded-full px-4 py-3 backdrop-blur-lg flex items-center">
            <Search className="w-5 h-5 text-white" />
            <input
              placeholder="Where do you want to go?"
              className="flex-1 ml-3 bg-transparent outline-none placeholder-white text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim() !== '') {
                  setLocation(`/generate?query=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">✨ Featured Destinations</h2>

        {filteredDestinations.length === 0 && searchQuery && (
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-2">
              No prebuilt trips found for <strong>{searchQuery}</strong>.
            </p>
            <button
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
              onClick={() => setLocation(`/generate?query=${encodeURIComponent(searchQuery)}`)}
            >
              Generate with AI
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {filteredDestinations.map(dest => (
            <div key={dest.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
              <img src={dest.image} className="h-56 w-full object-cover" alt={dest.name} />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" /> {dest.category}
                </div>

                <button
                  className="mt-4 text-indigo-600 font-semibold inline-flex items-center gap-1 hover:underline"
                  onClick={() => setLocation(`/itinerary/${dest.id}`)}
                >
                  Plan a trip <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setVisibleTours(visibleTours === dest.id ? null : dest.id)}
                  className="mt-2 block text-sm text-blue-600 hover:underline font-medium"
                >
                  {visibleTours === dest.id ? 'Hide' : 'Show'} Recommended Tours
                </button>

                {visibleTours === dest.id && (
                  <div className="mt-4 tp-widget-container">
                    <h4 className="text-gray-700 text-sm font-semibold mb-2">{`Tours in ${dest.name}`}</h4>
                    <div id={`tour-widget-${dest.id}`}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">AI-Powered Travel Planning</h2>
        <p className="max-w-xl mx-auto mb-6">
          Let Triponic’s AI create your personalized itinerary, ensuring an unforgettable travel experience.
        </p>
        <button
          className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 shadow-lg"
          onClick={() => setLocation('/')}
        >
          Start Planning
        </button>
      </section>
    </div>
  );
};

export default Explore;
  