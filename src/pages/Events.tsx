// Events.tsx – with filters, ticket prices, add to trip
import { useEffect, useState } from 'react';
import { Search, MapPin, Calendar, Plus } from 'lucide-react';
import { useTicketmasterEvents } from '..//hooks/useTicketmasterEvents';

const categories = ['All', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

const Events = () => {
  const [location, setLocation] = useState('new york');
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: events, isLoading } = useTicketmasterEvents(location, activeCategory === 'All' ? '' : activeCategory);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const city = data.address?.city || data.address?.town || data.address?.village;
        if (city) setLocation(city);
      });
    }
  }, []);

  const addToTrip = (event: any) => {
    alert(`Added '${event.name}' to trip.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-gray-900 text-white">
      <div className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4">🎟️ Live Events Around You</h1>
        <p className="text-purple-200 text-lg max-w-xl mx-auto">
          Curated from Ticketmaster. Concerts, festivals, sports, and more — updated in real-time.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 z-10 relative">
        <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 grid md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Search events..." className="w-full border-none focus:outline-none" />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Location"
              className="w-full border-none focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Dates" className="w-full border-none focus:outline-none" />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
            Search
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto gap-3 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition ${
                activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-100'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">🎤 Events in {location} {activeCategory !== 'All' && `– ${activeCategory}`}</h2>
        {isLoading ? (
          <p className="text-center text-purple-200">Loading events...</p>
        ) : events?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden text-gray-800 flex flex-col">
                <img src={event.images?.[0]?.url} alt={event.name} className="w-full h-48 object-cover" />
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold line-clamp-2">{event.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.dates?.start?.localDate} • {event.dates?.start?.localTime || 'TBA'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.priceRanges
                      ? `$${event.priceRanges[0].min} – $${event.priceRanges[0].max}`
                      : 'See on Ticketmaster'}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline text-sm font-medium"
                    >
                      View on Ticketmaster
                    </a>
                    <button
                      onClick={() => addToTrip(event)}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                    >
                      <Plus size={16} /> Add to Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-purple-300">No events found for {location}.</p>
        )}
      </div>

      <div className="bg-indigo-800 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">✨ Want AI-Powered Picks?</h2>
        <p className="text-purple-200 mb-6 max-w-xl mx-auto">
          Let Tono suggest events based on your mood, trip style, and interests.
        </p>
        <button className="bg-white text-indigo-800 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Ask Tono Now
        </button>
      </div>
    </div>
  );
};

export default Events;
