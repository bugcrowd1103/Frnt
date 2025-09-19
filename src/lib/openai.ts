import { type TravelPreference, type Conversation } from "@shared/schema";

// This is a frontend utility for handling OpenAI API calls
// The actual API calls will be made through the backend to keep API keys secure

// Define itinerary structure that will be returned by the AI
export interface GeneratedItinerary {
  title: string;
  destination: string;
  duration: string;
  dates?: string;
  summary: string;
  tripOverview: {
    budget: string;
    pace: string;
    travelStyle: string;
  };
  days: {
    dayNumber: number;
    title: string;
    description?: string;
    morning: {
      activity: string;
      description?: string;
    };
    afternoon: {
      activity: string;
      description?: string;
    };
    evening: {
      activity: string;
      description?: string;
    };
    travelTips?: string[];
    image?: string;
  }[];
  accommodations: {
    name: string;
    rating: number;
    priceRange: string;
    description: string;
    type: string;
    image?: string;
  }[];
}

// Function to generate an itinerary based on user preferences
export async function generateItinerary(
  preferences: TravelPreference,
  conversation?: Conversation
): Promise<GeneratedItinerary> {
  try {
    // In a real implementation, this would call the backend API
    // which would then use the OpenAI API to generate the itinerary
    const response = await fetch("/api/generate-itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preferenceId: preferences.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate itinerary");
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
}

// Function to process natural language input for preferences
export async function processNaturalLanguageInput(
  input: string
): Promise<Partial<TravelPreference>> {
  try {
    // This would call the backend API in a real implementation
    const response = await fetch("/api/process-natural-language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error("Failed to process natural language input");
    }

    return await response.json();
  } catch (error) {
    console.error("Error processing natural language input:", error);
    throw error;
  }
}

// Mock implementation for the backend
// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export async function mockGenerateItinerary(preferences: TravelPreference): Promise<GeneratedItinerary> {
  // This is just a placeholder for the real OpenAI implementation
  // In a real implementation, this would use the OpenAI API
  return {
    title: "Your Beach Paradise Adventure",
    destination: "Bali, Indonesia",
    duration: "7 days",
    dates: "May 15-22, 2023",
    summary: "Your personalized Bali adventure combines stunning beaches, cultural experiences, and local cuisine exploration. Based on your preferences, I've created a balanced itinerary with relaxation time and memorable activities.",
    tripOverview: {
      budget: "Mid-range",
      pace: "Relaxed with activities",
      travelStyle: "Couple / Friends"
    },
    days: [
      {
        dayNumber: 1,
        title: "Arrival & Settle In",
        morning: {
          activity: "Arrive at Ngurah Rai International Airport",
          description: "Check in at beachfront resort in Seminyak"
        },
        afternoon: {
          activity: "Relaxation at Seminyak Beach",
          description: "Beach club experience at Potato Head or Ku De Ta"
        },
        evening: {
          activity: "Dinner at La Lucciola",
          description: "Italian-inspired beachfront restaurant with Balinese influences"
        },
        travelTips: [
          "Pre-arrange airport pickup with your hotel for a smooth arrival",
          "Don't forget sunscreen - Bali sun is stronger than you might expect",
          "Beach clubs often require reservations in peak season"
        ],
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        dayNumber: 2,
        title: "Cultural Immersion",
        morning: {
          activity: "Ubud Sacred Monkey Forest Sanctuary",
          description: "Natural habitat with temples and hundreds of monkeys"
        },
        afternoon: {
          activity: "Ubud Traditional Art Market",
          description: "Shopping for handcrafted souvenirs and local art"
        },
        evening: {
          activity: "Traditional Balinese Dance Performance",
          description: "Dinner at local warung (family-owned restaurant)"
        },
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    accommodations: [
      {
        name: "Alila Seminyak",
        rating: 5,
        priceRange: "$220/night",
        description: "Beachfront resort with infinity pools and modern design",
        type: "Luxury",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Padma Resort Ubud",
        rating: 4.5,
        priceRange: "$150/night",
        description: "Nestled in the jungle with infinity pool and spa",
        type: "Mid-range",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Ubud Tropical Garden",
        rating: 3.5,
        priceRange: "$75/night",
        description: "Charming bungalows with private balconies and garden views",
        type: "Budget",
        image: "https://images.unsplash.com/photo-1559628407-e7fe12843df3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  };
}
