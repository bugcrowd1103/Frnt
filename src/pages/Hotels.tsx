import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    data-message="Find your perfect stay for you"
    data-camref="1011l5mZ2Y"
    data-pubref="Hotelbanner"
    data-link="stays"></div>
<script class="eg-affiliate-banners-script"
    src="https://creator.expediagroup.com/products/banners/assets/eg-affiliate-banners.js"></script>
</body>
</html>`;

const hotelsWidgetHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background: #f9fafb; }
    section { padding: 40px 20px; background: #fff; margin: 0 auto 60px auto; max-width: 1200px; border-radius: 20px; box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
    h2 { font-size: 22px; color: #3b0764; margin-bottom: 16px; }
  </style>
</head>
<body>
  <section>
    <h2>Expedia Hotel Search</h2>
    <div class="eg-widget" data-widget="search" data-program="ca-expedia" data-lobs="stays" data-network="pz" data-camref="1110lfshU" data-pubref="Hotels"></div>
    <script class="eg-widgets-script" src="https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js"></script>
  </section>

  <section>
    <h2>Travelpayouts Hotel Deals</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&type=compact&host=&locale=en&limit=8&powered_by=true&nobooking=&primary=%23ff8e00&special=%23e0e0e0&promo_id=4026&campaign_id=101" charset="utf-8"></script>
  </section>

  <section>
    <h2>Hotel Map View (Patong Beach)</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&search_host=search.hotellook.com&locale=en&powered_by=true&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=1000&height=500&lat=7.893587&lng=98.29682&zoom=14&radius=60&stars=0&rating_from=0&rating_to=10&promo_id=4285&campaign_id=101" charset="utf-8"></script>
  </section>

  <section>
    <h2>🧠 AI Hotel Recommender</h2>
    <p style="font-size:16px; color:#444;">
      Coming soon: Smart hotel picks tailored to your preferences, budget, and style — powered by Triponic AI.
    </p>
  </section>
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

const trendingHotels = [
  { city: "Paris", text: "Romantic getaways", price: "From $89/night" },
  { city: "Tokyo", text: "City lights & culture", price: "From $75/night" },
  { city: "Dubai", text: "Luxury stays", price: "From $110/night" },
  { city: "Toronto", text: "Urban escapes", price: "From $95/night" },
  { city: "Bali", text: "Beach resorts", price: "From $60/night" },
];

const Hotels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingHotels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-700 via-purple-800 to-teal-700 animate-gradient-x"></div>

      {/* Floating Elements */}
      <motion.div className="absolute left-10 top-40 text-6xl opacity-40"
        animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }}>
        🏨
      </motion.div>
      <motion.div className="absolute right-10 top-60 text-6xl opacity-40"
        animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        🌃
      </motion.div>
      <motion.div className="absolute left-0 bottom-32 text-5xl opacity-50"
        animate={{ x: [0, 40, 0] }} transition={{ duration: 7, repeat: Infinity }}>
        🌴
      </motion.div>
      <motion.div className="absolute right-0 bottom-52 text-5xl opacity-50"
        animate={{ x: [0, -40, 0] }} transition={{ duration: 9, repeat: Infinity }}>
        🏖️
      </motion.div>

      {/* Heading */}
      <motion.h1 className="text-6xl md:text-7xl font-extrabold text-white text-center mb-4"
        initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        Triponic Hotels Search 🏨
      </motion.h1>

      {/* Tagline */}
      <motion.p className="mb-10 max-w-2xl text-center text-xl md:text-2xl font-medium text-gray-100 leading-relaxed"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <span className="font-semibold">Stay smarter, travel better.</span>
        <br />
        Find top stays via Expedia, explore map views, and soon enjoy Triponic’s AI picks.
      </motion.p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-white max-w-3xl">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🏨</div>
          <h3 className="font-bold">Best Hotel Deals</h3>
          <p className="text-sm opacity-80">Save on stays worldwide</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🗺️</div>
          <h3 className="font-bold">Map & Location</h3>
          <p className="text-sm opacity-80">Visualize before booking</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="font-bold">AI Recommender</h3>
          <p className="text-sm opacity-80">Smart, personalized picks</p>
        </div>
      </div>

      {/* Widgets */}
      <motion.div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
        <iframe title="Hotel Widgets" srcDoc={hotelsWidgetHTML}
          className="w-full min-h-[2400px] border-none rounded-2xl" />
      </motion.div>

      {/* Trending Hotels Carousel */}
      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          🌟 Popular Hotel Destinations
        </h2>
        <div className="overflow-hidden relative">
          <motion.div className="flex gap-6"
            animate={{ x: `-${currentIndex * 240}px` }}
            transition={{ type: "tween", duration: 0.8 }}>
            {trendingHotels.map((h, idx) => (
              <div key={idx} className="min-w-[220px] bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-md text-center">
                <p className="font-semibold text-lg">{h.city}</p>
                <p className="text-gray-700 mt-1">{h.text}</p>
                <p className="text-indigo-600 font-bold mt-2">{h.price}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Expedia Banner */}
      <motion.div className="w-full max-w-xl mt-14 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-2"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
        <iframe title="Expedia Hotel Banner" srcDoc={expediaBannerHTML}
          sandbox="allow-scripts allow-same-origin" style={iframeStyle} />
      </motion.div>

      {/* Trusted Logos */}
      <div className="mt-16 w-full max-w-4xl text-center">
        <p className="text-gray-200 mb-4">Trusted by top travel partners</p>
        <div className="flex justify-center gap-10 opacity-80 flex-wrap">
          <img src="https://logos-world.net/wp-content/uploads/2021/02/Expedia-Logo.png" alt="Expedia" className="h-8" />
          <img src="https://companieslogo.com/img/orig/TCOM-c4449ac1.png" alt="Trip.com" className="h-8" />
          <img src="https://companieslogo.com/img/orig/BKNG-e808a96f.png" alt="Booking.com" className="h-8" />
          <img src="https://cdn.worldvectorlogo.com/logos/skyscanner-1.svg" alt="Skyscanner" className="h-8" />
        </div>
      </div>

      {/* Wave Divider */}
      <div className="w-full mt-20">
        <svg viewBox="0 0 1440 320" className="w-full h-24 text-white" preserveAspectRatio="none">
          <path fill="white" fillOpacity="1"
            d="M0,160L80,170.7C160,181,320,203,480,186.7C640,171,800,117,960,106.7C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
          </path>
        </svg>
      </div>

      {/* Extra CSS */}
      <style>{`
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 15s ease infinite; }
        @keyframes gradient-x { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      `}</style>
    </div>
  );
};

export default Hotels;
