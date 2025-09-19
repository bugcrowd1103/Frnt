import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Share2, Edit } from "lucide-react";
import EnhancedItinerary, { Itinerary as ItineraryType } from "@/components/GeneratedItinerary";

const ItineraryDetails = () => {
  const [location, navigate] = useLocation();

 const planIdFromUrl = location.split("/")[2]; // e.g. "1752079716977"
const planId = `plan-${planIdFromUrl}`;

  const [itineraryContent, setItineraryContent] = useState<ItineraryType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!planId) {
      setError("No plan ID provided in URL.");
      setLoading(false);
      return;
    }

    const historyKey = `chatHistory-${planId}`; // chatHistory-plan-1752079875010
    const storedHistory = localStorage.getItem(historyKey);

    if (!storedHistory) {
      setError("No itinerary found for this plan ID.");
      setLoading(false);
      return;
    }

    try {
      const parsedHistory = JSON.parse(storedHistory);
      const lastEntry = parsedHistory.length > 0 ? parsedHistory[parsedHistory.length - 1] : null;

      if (!lastEntry?.geminiResponse?.detailedPlan) {
        setError("Itinerary data is missing or corrupted.");
      } else {
        setItineraryContent(lastEntry.geminiResponse.detailedPlan);
      }
    } catch {
      setError("Failed to parse itinerary data.");
    } finally {
      setLoading(false);
    }
  }, [planId]);

  const handleBack = () => {
    navigate("/my-trips");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading your itinerary...</p>
      </div>
    );
  }

  if (error || !itineraryContent) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p>{error || "There was an error loading this itinerary."}</p>
        </div>
        <Button onClick={handleBack} className="bg-primary hover:bg-primary/90">
          Back to My Trips
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" onClick={handleBack}>
              <ChevronLeft size={16} className="mr-1" /> Back
            </Button>
            <h1 className="text-xl font-bold font-poppins hidden md:block">
              {itineraryContent.destination}
            </h1>
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

      <h1 className="text-2xl font-bold font-poppins my-4 px-4 md:hidden container mx-auto">
        {itineraryContent.destination}
      </h1>

      <EnhancedItinerary  />
    </div>
  );
};

export default ItineraryDetails;
