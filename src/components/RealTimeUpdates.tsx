import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, Umbrella, Coffee, Utensils, Ticket, MapPin, Calendar, Clock } from 'lucide-react';

interface RealTimeUpdatesProps {
  location?: string;
  compact?: boolean;
}

// Weather condition types
type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'windy';

// Updates data structure
interface WeatherUpdate {
  condition: WeatherCondition;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: React.ReactNode;
}

interface LocalEvent {
  id: number;
  name: string;
  time: string;
  location: string;
  price: string;
  category: 'culture' | 'food' | 'music' | 'sports' | 'art';
}

interface TravelUpdate {
  type: 'flight' | 'train' | 'bus' | 'traffic';
  status: 'on-time' | 'delayed' | 'cancelled' | 'heavy' | 'moderate' | 'light';
  details: string;
  time?: string;
}

interface FoodUpdate {
  id: number;
  name: string;
  cuisine: string;
  specialOffer?: string;
  rating: number;
  distance: string;
}

const RealTimeUpdates = ({ location = 'Tokyo', compact = false }: RealTimeUpdatesProps) => {
  const [activeTab, setActiveTab] = useState<'weather' | 'events' | 'travel' | 'food'>('weather');
  const [weather, setWeather] = useState<WeatherUpdate | null>(null);
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [travelUpdates, setTravelUpdates] = useState<TravelUpdate[]>([]);
  const [foodUpdates, setFoodUpdates] = useState<FoodUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data fetching
  useEffect(() => {
    // Simulating API calls
    const fetchData = async () => {
      setLoading(true);
      
      // Wait a bit to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate random weather based on location
      generateMockData(location);
      
      setLoading(false);
    };
    
    fetchData();
    
    // Set up periodic updates (every 5 minutes in a real app)
    const intervalId = setInterval(() => {
      generateMockData(location);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [location]);
  
  // Generate random but realistic mock data
  const generateMockData = (location: string) => {
    // Weather data generation
    const weatherConditions: WeatherCondition[] = ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy', 'windy'];
    const randomCondition = weatherConditions[Math.floor(Math.random() * 3)]; // First 3 are more common
    
    // Temperature ranges by season (northern hemisphere)
    const now = new Date();
    const month = now.getMonth();
    let baseTemp = 22; // Default mild temperature
    
    // Seasonal adjustment
    if (month >= 11 || month <= 1) baseTemp = 5; // Winter
    else if (month >= 2 && month <= 4) baseTemp = 15; // Spring
    else if (month >= 5 && month <= 7) baseTemp = 28; // Summer
    else if (month >= 8 && month <= 10) baseTemp = 18; // Fall
    
    // Location-based adjustment
    if (location.includes('Tokyo')) baseTemp += 2;
    if (location.includes('New York')) baseTemp -= 3;
    if (location.includes('Dubai')) baseTemp += 10;
    if (location.includes('London')) baseTemp -= 5;
    
    // Condition-based adjustment
    let tempAdjustment = 0;
    if (randomCondition === 'rainy') tempAdjustment = -3;
    if (randomCondition === 'stormy') tempAdjustment = -5;
    if (randomCondition === 'snowy') tempAdjustment = -10;
    if (randomCondition === 'sunny') tempAdjustment = 3;
    
    const temperature = Math.round(baseTemp + tempAdjustment + (Math.random() * 6 - 3));
    const feelsLike = Math.round(temperature + (Math.random() * 3 - 1));
    const humidity = Math.floor(Math.random() * 30) + 40; // 40-70%
    const windSpeed = Math.floor(Math.random() * 20) + 5; // 5-25 km/h
    const precipitation = randomCondition === 'rainy' || randomCondition === 'stormy' ? Math.floor(Math.random() * 80) + 20 : 0;
    
    // Weather icons mapping
    const weatherIcons = {
      sunny: <Sun className="w-6 h-6 text-amber-500" />,
      cloudy: <Cloud className="w-6 h-6 text-gray-500" />,
      rainy: <CloudRain className="w-6 h-6 text-blue-500" />,
      stormy: <CloudLightning className="w-6 h-6 text-purple-500" />,
      snowy: <CloudSnow className="w-6 h-6 text-blue-200" />,
      windy: <Wind className="w-6 h-6 text-blue-300" />
    };
    
    setWeather({
      condition: randomCondition,
      temperature,
      feelsLike,
      humidity,
      windSpeed,
      precipitation,
      icon: weatherIcons[randomCondition]
    });
    
    // Local events data
    const localEvents: LocalEvent[] = [
      {
        id: 1,
        name: `${location} Food Festival`,
        time: '10:00 AM - 8:00 PM',
        location: 'Downtown Plaza',
        price: 'Free entry',
        category: 'food'
      },
      {
        id: 2,
        name: 'Live Jazz Night',
        time: '7:00 PM - 11:00 PM',
        location: 'Blue Note Club',
        price: '$15',
        category: 'music'
      },
      {
        id: 3,
        name: 'Contemporary Art Exhibition',
        time: '9:00 AM - 6:00 PM',
        location: 'National Gallery',
        price: '$8',
        category: 'art'
      },
      {
        id: 4,
        name: 'Local Crafts Market',
        time: '11:00 AM - 4:00 PM',
        location: 'Riverside Park',
        price: 'Free entry',
        category: 'culture'
      }
    ];
    setEvents(localEvents);
    
    // Travel updates
    const travelStatusOptions = {
      flight: ['on-time', 'delayed', 'cancelled'],
      train: ['on-time', 'delayed', 'cancelled'],
      bus: ['on-time', 'delayed'],
      traffic: ['heavy', 'moderate', 'light']
    };
    
    const travelData: TravelUpdate[] = [
      {
        type: 'flight',
        status: travelStatusOptions.flight[Math.floor(Math.random() * travelStatusOptions.flight.length)] as any,
        details: 'Flights to and from International Airport',
        time: '12:30 PM'
      },
      {
        type: 'train',
        status: travelStatusOptions.train[Math.floor(Math.random() * travelStatusOptions.train.length)] as any,
        details: 'Metro line operations',
        time: 'Every 7 minutes'
      },
      {
        type: 'traffic',
        status: travelStatusOptions.traffic[Math.floor(Math.random() * travelStatusOptions.traffic.length)] as any,
        details: 'City center traffic conditions',
      }
    ];
    setTravelUpdates(travelData);
    
    // Food recommendations
    const foodData: FoodUpdate[] = [
      {
        id: 1,
        name: 'Sakura Sushi',
        cuisine: 'Japanese',
        specialOffer: '15% off dinner menu',
        rating: 4.7,
        distance: '0.8 km'
      },
      {
        id: 2,
        name: 'Bella Italia',
        cuisine: 'Italian',
        rating: 4.5,
        distance: '1.2 km'
      },
      {
        id: 3,
        name: 'Spice Garden',
        cuisine: 'Indian',
        specialOffer: 'Free dessert with main course',
        rating: 4.6,
        distance: '1.5 km'
      },
      {
        id: 4,
        name: 'Street Food Market',
        cuisine: 'Various',
        rating: 4.4,
        distance: '0.3 km'
      }
    ];
    setFoodUpdates(foodData);
  };
  
  // Weather card
  const renderWeatherCard = () => {
    if (!weather) return null;
    
    return (
      <div className={`bg-white rounded-xl shadow-sm p-4 ${compact ? '' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">{location}</h3>
            <p className="text-sm text-gray-500">Updated just now</p>
          </div>
          {weather.icon}
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl font-bold">{weather.temperature}°C</div>
          <div className="text-gray-600">
            <div>Feels like {weather.feelsLike}°C</div>
            <div className="capitalize">{weather.condition}</div>
          </div>
        </div>
        
        {!compact && (
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-gray-500">Humidity</div>
              <div className="font-medium">{weather.humidity}%</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-gray-500">Wind</div>
              <div className="font-medium">{weather.windSpeed} km/h</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-gray-500">Precipitation</div>
              <div className="font-medium">{weather.precipitation}%</div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Events card
  const renderEventsCard = () => {
    return (
      <div className={`bg-white rounded-xl shadow-sm ${compact ? 'p-4' : 'p-6'}`}>
        <h3 className="font-bold text-lg mb-4">Today's Events</h3>
        
        <div className="space-y-3">
          {events.slice(0, compact ? 2 : 4).map(event => (
            <div key={event.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm">{event.name}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                  {event.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!compact && (
          <button className="w-full mt-4 text-sm text-primary font-medium py-2">
            View All Events
          </button>
        )}
      </div>
    );
  };
  
  // Travel updates card
  const renderTravelCard = () => {
    const getStatusColor = (type: string, status: string) => {
      if (status === 'on-time' || status === 'light') return 'text-green-500';
      if (status === 'delayed' || status === 'moderate') return 'text-amber-500';
      if (status === 'cancelled' || status === 'heavy') return 'text-red-500';
      return 'text-gray-500';
    };
    
    return (
      <div className={`bg-white rounded-xl shadow-sm ${compact ? 'p-4' : 'p-6'}`}>
        <h3 className="font-bold text-lg mb-4">Travel Updates</h3>
        
        <div className="space-y-3">
          {travelUpdates.map((update, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between mb-1">
                <div className="font-medium capitalize">{update.type}</div>
                <div className={`font-medium capitalize ${getStatusColor(update.type, update.status)}`}>
                  {update.status}
                </div>
              </div>
              <div className="text-sm text-gray-600">{update.details}</div>
              {update.time && (
                <div className="text-xs text-gray-500 mt-1">{update.time}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Food recommendations card
  const renderFoodCard = () => {
    return (
      <div className={`bg-white rounded-xl shadow-sm ${compact ? 'p-4' : 'p-6'}`}>
        <h3 className="font-bold text-lg mb-4">Food Recommendations</h3>
        
        <div className="space-y-3">
          {foodUpdates.slice(0, compact ? 2 : 4).map(food => (
            <div key={food.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-bold">{food.name}</h4>
                  <div className="text-sm text-gray-600">{food.cuisine}</div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(food.rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">{food.rating}</span>
                  </div>
                  {food.specialOffer && (
                    <div className="text-xs text-green-600 font-medium mt-1">{food.specialOffer}</div>
                  )}
                </div>
                <div className="text-xs bg-gray-200 text-gray-800 h-fit px-2 py-1 rounded-full">
                  {food.distance}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!compact && (
          <button className="w-full mt-4 text-sm text-primary font-medium py-2">
            View All Restaurants
          </button>
        )}
      </div>
    );
  };
  
  // Compact view (for sidebar, widgets)
  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            className={`flex-1 py-2 text-xs font-medium ${activeTab === 'weather' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('weather')}
          >
            Weather
          </button>
          <button 
            className={`flex-1 py-2 text-xs font-medium ${activeTab === 'events' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`flex-1 py-2 text-xs font-medium ${activeTab === 'travel' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('travel')}
          >
            Travel
          </button>
          <button 
            className={`flex-1 py-2 text-xs font-medium ${activeTab === 'food' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('food')}
          >
            Food
          </button>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {activeTab === 'weather' && renderWeatherCard()}
              {activeTab === 'events' && renderEventsCard()}
              {activeTab === 'travel' && renderTravelCard()}
              {activeTab === 'food' && renderFoodCard()}
            </>
          )}
        </div>
      </div>
    );
  }
  
  // Full view (for dedicated pages)
  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
        Real-Time Updates for {location}
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderWeatherCard()}
          {renderEventsCard()}
          {renderTravelCard()}
          {renderFoodCard()}
        </div>
      )}
    </div>
  );
};

export default RealTimeUpdates;