import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mapping of city/state/country → airport code
const locationToAirport: Record<string, string> = {
  california: "LAX",
  "los angeles": "LAX",
  "san francisco": "SFO",
  "new york": "JFK",
  florida: "MIA",
  texas: "DFW",
  illinois: "ORD",
  washington: "SEA",
  ontario: "YYZ",
  toronto: "YYZ",
  "british columbia": "YVR",
  vancouver: "YVR",
  delhi: "DEL",
  mumbai: "BOM",
  maharashtra: "BOM",
  paris: "CDG",
  london: "LHR",
  dubai: "DXB",
  singapore: "SIN",
  tokyo: "HND",
};

function getAirportCode(input: string): string {
  if (!input) return "";
  const key = input.trim().toLowerCase();
  return locationToAirport[key] || input.toUpperCase();
}

function formatDateMDY(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

const expediaBannerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body { margin:0; padding:0; font-family: Inter, sans-serif; background:#fff; color:#000; overflow:hidden; }
.eg-affiliate-banners { margin:40px auto; }
</style>
</head>
<body>
<div class="eg-affiliate-banners"
    data-program="us-expedia"
    data-network="pz"
    data-layout="leaderboard"
    data-image="sailing"
    data-message="Fly into 2026, find your perfect trip"
    data-camref="1011l5mZ2Y"
    data-pubref="Flightbanner"
    data-link="flights"></div>
<script class="eg-affiliate-banners-script"
    src="https://creator.expediagroup.com/products/banners/assets/eg-affiliate-banners.js"></script>
</body>
</html>`;

const iframeStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 900,
  height: 150,
  border: "none",
  borderRadius: 20,
  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
  margin: "24px auto",
  display: "block",
  overflow: "hidden",
};

const inputClass =
  "w-full p-4 rounded-2xl border border-gray-300 focus:border-indigo-500 focus:ring-2 ring-indigo-400 outline-none transition text-black bg-gray-50 shadow-sm";

const trendingRoutes = [
  { from: "New York", to: "Paris", price: "$299" },
  { from: "Tokyo", to: "London", price: "$450" },
  { from: "Delhi", to: "Toronto", price: "$399" },
  { from: "Los Angeles", to: "Dubai", price: "$520" },
  { from: "Singapore", to: "Sydney", price: "$480" },
];

const Flights = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);

  // Auto-scroll carousel index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingRoutes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !departureDate) {
      alert("Please fill Origin, Destination and Departure date");
      return;
    }

    const fromDate = formatDateMDY(departureDate);
    const toDate = returnDate ? formatDateMDY(returnDate) : "";

    const fromCode = getAirportCode(origin);
    const toCode = getAirportCode(destination);

    let url = `https://www.expedia.com/Flights-Search?flight-type=on&mode=search&trip=${
      returnDate ? "roundtrip" : "oneway"
    }`;
    url += `&leg1=from:${fromCode},to:${toCode},departure:${fromDate}TANYT,fromType:AIRPORT,toType:AIRPORT`;
    if (returnDate) {
      url += `&leg2=from:${toCode},to:${fromCode},departure:${toDate}TANYT,fromType:AIRPORT,toType:AIRPORT`;
    }
    url += `&options=cabinclass:economy&fromDate=${fromDate}&toDate=${toDate}&d1=${departureDate}&d2=${returnDate}&passengers=adults:1,infantinlap:N`;

    window.open(url, "_blank");
  };

  const handleSuggestions = (
    value: string,
    setFn: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!value) {
      setFn([]);
      return;
    }
    const input = value.toLowerCase();
    const matches = Object.keys(locationToAirport).filter((loc) =>
      loc.includes(input)
    );
    setFn(matches.slice(0, 5));
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pb-0 pt-20 relative overflow-hidden">

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-700 via-purple-800 to-teal-700 animate-gradient-x"></div>

      {/* Floating side elements */}
      <motion.div
        className="absolute left-10 top-40 text-6xl opacity-40"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="absolute right-10 top-60 text-6xl opacity-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="absolute left-0 bottom-32 text-5xl opacity-50"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        🛫
      </motion.div>
      <motion.div
        className="absolute right-0 bottom-52 text-5xl opacity-50"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      >
        🌍
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold text-white text-center mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Triponic Flights Search ✈️
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="mb-10 max-w-2xl text-center text-xl md:text-2xl font-medium text-gray-100 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="font-semibold">Book smarter, fly further.</span>
        <br />
        Seamless journeys powered by Expedia and Triponic’s AI experience.
      </motion.p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-white max-w-3xl">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">✈️</div>
          <h3 className="font-bold">Best Flight Deals</h3>
          <p className="text-sm opacity-80">Save more with curated offers</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="font-bold">AI Powered</h3>
          <p className="text-sm opacity-80">Smart search & trip insights</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🌍</div>
          <h3 className="font-bold">Global Reach</h3>
          <p className="text-sm opacity-80">Explore destinations worldwide</p>
        </div>
      </div>

      {/* Form */}
      <motion.form
        className="max-w-xl w-full bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl flex flex-col gap-6 border border-gray-200"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Origin (e.g., California)"
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
                handleSuggestions(e.target.value, setOriginSuggestions);
              }}
              className={inputClass}
              required
            />
            {originSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border rounded-xl shadow-md mt-1 z-10 max-h-40 overflow-y-auto">
                {originSuggestions.map((s) => (
                  <li
                    key={s}
                    className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                    onClick={() => {
                      setOrigin(s);
                      setOriginSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Destination (e.g., New York)"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                handleSuggestions(e.target.value, setDestSuggestions);
              }}
              className={inputClass}
              required
            />
            {destSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border rounded-xl shadow-md mt-1 z-10 max-h-40 overflow-y-auto">
                {destSuggestions.map((s) => (
                  <li
                    key={s}
                    className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                    onClick={() => {
                      setDestination(s);
                      setDestSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col text-gray-700 font-semibold">
            Departure Date
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
              className={inputClass}
            />
          </label>

          <label className="flex flex-col text-gray-700 font-semibold">
            Return Date (optional)
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={departureDate || undefined}
              className={inputClass}
            />
          </label>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden font-bold py-4 rounded-2xl shadow-lg text-white text-lg tracking-wide bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600"
        >
          🔍 Search Flights
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></span>
        </motion.button>
      </motion.form>

      {/* Trending Routes Carousel */}
      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          🔥 Popular Routes
        </h2>
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${currentIndex * 240}px` }}
            transition={{ type: "tween", duration: 0.8 }}
          >
            {trendingRoutes.map((route, idx) => (
              <div
                key={idx}
                className="min-w-[220px] bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-md text-center"
              >
                <p className="font-semibold text-lg">
                  {route.from} → {route.to}
                </p>
                <p className="text-indigo-600 font-bold mt-2">{route.price}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Expedia Banner */}
      <motion.div
        className="w-full max-w-xl mt-14 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <iframe
          title="Expedia Affiliate Banner"
          srcDoc={expediaBannerHTML}
          sandbox="allow-scripts allow-same-origin"
          style={iframeStyle}
        />
      </motion.div>

      {/* Trusted By */}
      <div className="mt-16 w-full max-w-4xl text-center">
        <p className="text-gray-200 mb-4">Trusted by travelers worldwide</p>
        <div className="flex justify-center gap-10 opacity-80 flex-wrap">
          <img src="https://logos-world.net/wp-content/uploads/2021/02/Expedia-Logo.png" alt="Expedia" className="h-8" />
          <img src="https://companieslogo.com/img/orig/TCOM-c4449ac1.png" alt="Trip.com" className="h-8" />
          <img src="https://companieslogo.com/img/orig/BKNG-e808a96f.png" alt="Booking.com" className="h-8" />
          <img src="https://cdn.worldvectorlogo.com/logos/skyscanner-1.svg" alt="Skyscanner" className="h-8" />
        </div>
      </div>

      {/* Wave Divider */}
      <div className="w-full mt-20">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-24 text-white"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,160L80,170.7C160,181,320,203,480,186.7C640,171,800,117,960,106.7C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* CSS */}
      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Flights;
