import { useLocation } from "wouter";
import { useState, useEffect } from "react";

const TripPlanMessage = ({ data, onViewFull, setInput, handleInputSubmit }) => {
  const [, setLocation] = useLocation();
  const { content, detailedPlan, suggestions, error, raw } = data;
  const { id } = data;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (!detailedPlan?.destination) return;

      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            detailedPlan.thumbnail
          )}&per_page=1`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );

        const json = await res.json();
        const photo = json.photos?.[0]?.src?.landscape;
        if (photo) setImageUrl(photo);
      } catch (err) {
        console.error("Failed to fetch image from Pexels:", err);
      }
    };

    fetchImage();
  }, [detailedPlan?.destination]);

  const visibleDays = detailedPlan?.dailyPlan?.slice(0, 2);

  return (
  <div className="max-w-[70%] flex items-start space-x-3">
    {/* Profile / Bot Icon on left */}
    <div className="flex-shrink-0">
      <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
        alt="Bot"
        className="w-8 h-8 rounded-full"
      />
    </div>

    {/* Message content box */}
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow space-y-4 text-sm flex-1">
      <p className="text-gray-900 font-semibold">{content}</p>

      {/* If no plan, show only Gemini's raw/error message */}
      {!detailedPlan && (
        <div>
          <p className="text-gray-900  font-semibold">
            {raw || error || "Waiting for more information to generate the plan."}
          </p>
        </div>
      )}

      {/* All this only if plan exists */}
      {detailedPlan && (
        <>
          {/* Weather & Image */}
          <div className="bg-green-100 rounded-lg shadow-sm overflow-hidden flex">
            <div className="w-1/2 p-3 flex flex-col justify-center">
              <p className="font-semibold text-green-700 mb-1">🌤️ Weather</p>
              <p><strong>Temp:</strong> {detailedPlan.weather?.temp || "N/A"}</p>
              <p><strong>Condition:</strong> {detailedPlan.weather?.condition || "N/A"}</p>
              <p><strong>Tip:</strong> {detailedPlan.weather?.recommendation || "N/A"}</p>
            </div>

            <div
              className="w-1/2 bg-cover bg-center"
              style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                minHeight: "120px",
              }}
            />
          </div>

          {/* Flight, Cost, Hotel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-100 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-blue-700 mb-1">✈️ Flight</p>
              <p className="text-blue-900">{detailedPlan.flights?.departure || "-"}</p>
              <p>{detailedPlan.flights?.airline || "-"}</p>
              <p>{detailedPlan.flights?.price || "-"}</p>
              <p className="text-xs text-blue-600">{detailedPlan.flights?.duration || "-"}</p>
            </div>

            <div className="bg-purple-100 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-purple-700 mb-1">💰 Trip Cost</p>
              <p className="text-purple-900">{detailedPlan.totalCost || "-"}</p>
              <p className="text-xs text-gray-600">{detailedPlan.travelers || "-"} travelers</p>
            </div>

            <div className="bg-yellow-100 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-yellow-700 mb-1">🏨 Hotel</p>
              <p>
                {detailedPlan.hotel?.name || "-"} (
                {detailedPlan.hotel?.rating ? detailedPlan.hotel.rating + "⭐" : "-"})
              </p>
              <p className="text-yellow-900">{detailedPlan.hotel?.location || "-"}</p>
              <p>{detailedPlan.hotel?.price || "-"}</p>
              <p className="text-gray-600 text-xs">
                {detailedPlan.hotel?.amenities?.join(", ") || "-"}
              </p>
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
            <p className="font-semibold text-green-700 mb-2">📅 Itinerary</p>
                        {visibleDays?.length > 0 ? (
  visibleDays.map((day) => (
    <div key={day.day} className="mb-2">
      <p className="font-medium">Day {day.day}: {day.title}</p>
      <ul className="list-disc list-inside text-gray-700 ml-3 text-xs">
        {day.activities.slice(0, 2).map((act, idx) => (
          <li key={idx}>
            {act.length > 60 ? act.slice(0, 60) + '...' : act}
          </li>
        ))}
      </ul>
    </div>
  ))
) : (
  <p>No itinerary available.</p>
)}


    {Array.isArray(detailedPlan?.dailyPlan) && detailedPlan.dailyPlan.length > 0 && (
  <div className="mt-4">
    <button
      className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition"
      onClick={() => setLocation(`/itinerary/${id}`)}
    >
      View Full Itinerary
    </button>
  </div>
)}

          </div>

          {/* Suggestions */}
          <div>
            <p className="font-semibold text-blue-700 mb-2">🧠 Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {(suggestions?.length > 0 ? suggestions : ["No suggestions available."]).map(
                (sug, idx) => (
                  <button
                    key={idx}
                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
                    onClick={() => {
                      setInput(sug);
                      setTimeout(() => handleInputSubmit(), 0);
                    }}
                  >
                    {sug}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

};

export default TripPlanMessage;
