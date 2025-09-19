import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, PlusCircle } from 'lucide-react';
import { Itinerary } from '@shared/schema';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const MyTrips = () => {
  const userId = 1; // In a real app, this would be the logged-in user's ID
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const { data: itineraries, isLoading, error } = useQuery<Itinerary[]>({
    queryKey: [`/api/user/${userId}/itineraries`],
    retry: 1
  });

  const handleCreateTrip = () => {
    navigate('/');
  };

  const handleViewItinerary = (id: number) => {
    navigate(`/itinerary/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-poppins">My Trips</h1>
        <Button onClick={handleCreateTrip} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Plan a New Trip
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your trips...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>There was an error loading your trips. Please try again.</p>
        </div>
      )}

      {!isLoading && !error && itineraries?.length === 0 && (
        <div className="text-center py-20 bg-light rounded-xl">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400">
              <path d="M16.2 3.8a2.7 2.7 0 0 0-3.81 0l-.4.38-.4-.4a2.7 2.7 0 0 0-3.82 0C6.73 4.85 6.67 6.64 8 8l4 4 4-4c1.33-1.36 1.27-3.15.2-4.2z" />
              <path d="M2 12h1" />
              <path d="M21 12h1" />
              <path d="M12 2v1" />
              <path d="M12 21v1" />
              <path d="m4.93 4.93.87.87" />
              <path d="m18.2 18.2.87.87" />
              <path d="m18.2 5.8-.87.87" />
              <path d="m4.93 19.07.87-.87" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No trips planned yet</h2>
          <p className="text-medium max-w-md mx-auto mb-6">
            Start planning your first adventure with TravelPal AI and get personalized recommendations.
          </p>
          <Button onClick={handleCreateTrip} className="bg-primary hover:bg-primary/90">
            Plan Your First Trip
          </Button>
        </div>
      )}

      {!isLoading && itineraries && itineraries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <div 
              key={itinerary.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition cursor-pointer"
              onClick={() => handleViewItinerary(itinerary.id)}
            >
              <div className="h-40 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="text-gray-400" size={48} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2">{itinerary.title}</h3>
                <div className="flex items-center text-gray-500 mb-1">
                  <MapPin size={16} className="mr-2" />
                  <span>{itinerary.destination}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-1">
                  <Calendar size={16} className="mr-2" />
                  <span>{itinerary.duration}</span>
                </div>
                <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                  {itinerary.summary || "Your personalized travel plan is ready to explore!"}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Created {itinerary.createdAt ? new Date(itinerary.createdAt).toLocaleDateString() : 'Recently'}
                  </span>
                  <button className="text-primary text-sm font-medium">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
