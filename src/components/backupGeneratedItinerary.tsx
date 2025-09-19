import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Volume2, Share2 } from "lucide-react";

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

type Activity = {
  activity: string;
  description?: string;
};

export type Day = {
  dayNumber: number;
  title: string;
  description?: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  travelTips?: string[];
  image?: string;
};

type ItineraryProps = {
  itinerary: {
    days: Day[];
    destination: string;
  };
};

const EnhancedItinerary: React.FC<ItineraryProps> = ({ itinerary }) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [dayData, setDayData] = useState<Day[]>([]);
  const [weatherData, setWeatherData] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [languageTips, setLanguageTips] = useState<string[]>([]);

  const getFunFact = async (location: string, dayTitle: string) => {
    try {
      const res = await fetch("/api/fun-fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, day: dayTitle }),
      });
      const data = await res.json();
      return data.fact || "Explore something new today!";
    } catch {
      return "Explore something new today!";
    }
  };

  const getLanguageTips = async (location: string) => {
    try {
      const res = await fetch("/api/language-tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location }),
      });
      const data = await res.json();
      setLanguageTips(data.phrases || []);
    } catch {
      setLanguageTips(["Hello = Hola", "Thank you = Gracias"]);
    }
  };

  const fetchWeatherAndImages = async () => {
    if (!Array.isArray(itinerary.days)) return;

    try {
      const weatherRes = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${itinerary.destination}&days=${itinerary.days.length}`
      );
      const weatherJson = await weatherRes.json();
      const forecasts = weatherJson?.forecast?.forecastday ?? [];

      const newWeather: string[] = forecasts.map((day: any) => {
        return `${day.day.condition.text}, ${day.day.avgtemp_c}°C`;
      });

      while (newWeather.length < itinerary.days.length) {
        newWeather.push(newWeather[newWeather.length - 1] || "Sunny, 25°C");
      }

      setWeatherData(newWeather);

      const wikiSearch = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=${itinerary.destination}&piprop=original`
      );
      const wikiJson = await wikiSearch.json();
      const page = Object.values(wikiJson.query.pages)[0] as any;
      const wikiImage = page?.original?.source;

      if (wikiImage) {
        setImageUrl(wikiImage);
      } else {
        setImageUrl(`https://source.unsplash.com/800x600/?${itinerary.destination},landmark`);
      }
    } catch (err) {
      console.error("Error fetching weather or image:", err);
      try {
        const res = await fetch("/api/generate-weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destination: itinerary.destination, days: itinerary.days?.length || 3 }),
        });
        const data = await res.json();
        setWeatherData(data.weather || Array(itinerary.days?.length || 3).fill("Sunny, 25°C"));
      } catch {
        setWeatherData(Array(itinerary.days?.length || 3).fill("Sunny, 25°C"));
      }
      setImageUrl(`https://source.unsplash.com/800x600/?${itinerary.destination},landmark`);
    }
  };

  useEffect(() => {
    const enhance = async () => {
      if (!Array.isArray(itinerary.days)) return;

      await fetchWeatherAndImages();
      await getLanguageTips(itinerary.destination);

      const enhanced: Day[] = await Promise.all(
        itinerary.days.map(async (day) => {
          const fact = await getFunFact(itinerary.destination, day.title);
          return {
            ...day,
            travelTips: [fact],
            image: imageUrl || day.image,
          };
        })
      );

      setDayData(enhanced);
    };

    if (itinerary.days?.length && itinerary.destination) {
      enhance();
    }
  }, [itinerary, imageUrl]);

  useEffect(() => {
    const saved = localStorage.getItem(`notes-${itinerary.destination}-${currentDay}`);
    if (saved) setNotes(saved);
  }, [currentDay, itinerary.destination]);

  const handleNoteChange = (val: string) => {
    setNotes(val);
    localStorage.setItem(`notes-${itinerary.destination}-${currentDay}`, val);
  };

  const getWeatherAdvice = (condition: string) => {
    if (condition.toLowerCase().includes("rain")) return "Carry an umbrella or try indoor attractions.";
    if (condition.toLowerCase().includes("sun")) return "Perfect for outdoor sightseeing!";
    return "Check conditions locally for the best experience.";
  };

  const estimateBudget = (day: Day) => {
    const costs = {
      museum: 15,
      tour: 30,
      food: 20,
      nature: 10,
      nightlife: 40,
    };
    const total =
      (costs[day.morning.activity.toLowerCase() as keyof typeof costs] || 20) +
      (costs[day.afternoon.activity.toLowerCase() as keyof typeof costs] || 20) +
      (costs[day.evening.activity.toLowerCase() as keyof typeof costs] || 20);
    return `$${total}`;
  };

  const current = dayData[currentDay];
  if (!current) return <div>Loading itinerary...</div>;

  const weatherAdvice = getWeatherAdvice(weatherData[currentDay] || "");

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-center">Day {current.dayNumber}: {current.title}</h2>
      <img src={current.image} alt="Day visual" className="w-full max-w-2xl rounded-2xl shadow-lg" />
      <p className="text-gray-600 text-lg italic">{weatherData[currentDay]}</p>
      <p className="text-blue-500 text-sm italic">{weatherAdvice}</p>
      <Card className="w-full max-w-2xl bg-white/80 shadow-md">
        <CardContent className="p-4 space-y-4">
          {["morning", "afternoon", "evening"].map((time) => (
            <div key={time}>
              <h3 className="font-semibold text-lg capitalize">{time}</h3>
              <p>{typeof current[time as keyof Day] === "object" && "activity" in (current[time as keyof Day] as Activity) ? (current[time as keyof Day] as Activity).activity : ""}</p>
              {typeof current[time as keyof Day] === "object" &&
                "description" in (current[time as keyof Day] as Activity) &&
                (current[time as keyof Day] as Activity).description && (
                  <p className="text-sm text-gray-500">
                    {(current[time as keyof Day] as Activity).description}
                  </p>
              )}
            </div>
          ))}
          {current.travelTips && current.travelTips.length > 0 && (
            <div className="pt-2">
              <h4 className="font-semibold text-lg">Travel Tip</h4>
              <ul className="list-disc pl-5 text-sm">
                {current.travelTips.map((tip, index) => <li key={index}>{tip}</li>)}
              </ul>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-lg">Local Phrases</h4>
            <ul className="list-disc pl-5 text-sm">
              {languageTips.map((phrase, i) => (
                <li key={i}>{phrase}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Estimated Budget</h4>
            <p className="text-green-600 text-sm">{estimateBudget(current)}</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Your Notes</h4>
            <textarea
              className="w-full border p-2 rounded-lg text-sm"
              value={notes}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Write your thoughts or reminders..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button onClick={() => setCurrentDay((prev) => Math.max(0, prev - 1))} disabled={currentDay === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button onClick={() => speak(current.title + ". " + (current.description || ""))} variant="outline">
          <Volume2 className="w-4 h-4 mr-2" /> Listen
        </Button>
        <Button onClick={() => setCurrentDay((prev) => Math.min(dayData.length - 1, prev + 1))} disabled={currentDay === dayData.length - 1}>
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <a
        href={`https://twitter.com/intent/tweet?text=Check out my travel itinerary for ${itinerary.destination}!`}
        target="_blank"
        className="mt-2 text-blue-600 text-sm underline flex items-center"
        rel="noopener noreferrer"
      >
        <Share2 className="inline w-4 h-4 mr-1" /> Share on Twitter
      </a>
    </div>
  );
};

export default EnhancedItinerary;
