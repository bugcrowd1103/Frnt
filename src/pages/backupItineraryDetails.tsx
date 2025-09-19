import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Calendar, MapPin, Clock, Download, Share2, Edit, Star } from 'lucide-react';
import { Itinerary } from '@shared/schema';
import { GeneratedItinerary as ItineraryType } from '@/lib/openai';
import GeneratedItinerary from '@/components/GeneratedItinerary';

const ItineraryDetails = () => {
  const { id } = useParams();
  const itineraryId = id ? parseInt(id) : NaN;
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const { data: itinerary, isLoading, error } = useQuery<Itinerary>({
    queryKey: [`/api/itineraries/${itineraryId}`],
    retry: 1,
    enabled: !isNaN(itineraryId)
  });

  const handleBack = () => {
    navigate('/my-trips');
  };

  if (isNaN(itineraryId)) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Itinerary ID</h1>
        <p className="mb-6">The itinerary ID you provided is not valid.</p>
        <Button onClick={handleBack} className="bg-primary hover:bg-primary/90">
          Back to My Trips
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading your itinerary...</p>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p>There was an error loading this itinerary. It may have been deleted or doesn't exist.</p>
        </div>
        <Button onClick={handleBack} className="bg-primary hover:bg-primary/90">
          Back to My Trips
        </Button>
      </div>
    );
  }

  // Get the itinerary content which contains the full structure
  const itineraryContent = itinerary.content as unknown as ItineraryType;

  return (
    <div>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2" 
                onClick={handleBack}
              >
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              <h1 className="text-xl font-bold font-poppins hidden md:block">{itinerary.title}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-1" /> Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-1" /> Share
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white border-primary hover:bg-primary/90">
                <Edit size={16} className="mr-1" /> Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold font-poppins my-4 px-4 md:hidden container mx-auto">{itinerary.title}</h1>
      
      <GeneratedItinerary itinerary={itineraryContent} />
    </div>
  );
};

export default ItineraryDetails;
