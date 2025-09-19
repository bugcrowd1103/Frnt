import { useState, useEffect } from 'react';
import { Check, Globe, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLocation } from 'wouter';

const Pricing = () => {
  const [, setLocation] = useLocation();
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  useEffect(() => {
    const button = document.getElementById('scroll-top-cta');
    if (button) {
      button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, []);

  const pricingData = {
    global: { currency: 'USD', symbol: '$', basic: 0, trip10: 7.99, trip30: 11.99, premium: 29, pro: 49, exchange: 1 },
    north_america: { currency: 'USD', symbol: '$', basic: 0, trip10: 7.99, trip30: 11.99, premium: 29, pro: 49, exchange: 1 },
    south_america: { currency: 'USD', symbol: '$', basic: 0, trip10: 6.99, trip30: 10.99, premium: 25, pro: 42, exchange: 1 },
    europe: { currency: 'EUR', symbol: '€', basic: 0, trip10: 7.5, trip30: 10.5, premium: 28, pro: 47, exchange: 0.93 },
    asia: { currency: 'INR', symbol: '₹', basic: 0, trip10: 650, trip30: 999, premium: 2000, pro: 3999, exchange: 83.2 },
    australia: { currency: 'AUD', symbol: 'A$', basic: 0, trip10: 10, trip30: 15, premium: 42, pro: 69, exchange: 1.53 },
    africa: { currency: 'USD', symbol: '$', basic: 0, trip10: 6.49, trip30: 9.99, premium: 20, pro: 35, exchange: 1 },
  };

  const stripeLinks: Record<string, string> = {
    premium: 'https://buy.stripe.com/fZubJ1eyc6Vu7goaTL3Ru03',
    pro: 'https://buy.stripe.com/7sY7sL89ObbK308aTL3Ru01',
    trip10: 'https://buy.stripe.com/eVqfZh4XC6Vu8ks5zr3Ru00',
    trip30: 'https://buy.stripe.com/3cI6oHcq4bbKcAI5zr3Ru02',
  };

  const features = {
    basic: [
      '🗺️ Plan simple trips with ease',
      '🔍 Search limited destinations',
      '🤝 Get inspired by the community',
      '🌤️ Check essential weather info',
      '💻 Use on web browser only',
    ],
    tripPass: [
      '🧠 Unlimited AI itinerary generation',
      '✨ Smart destination tips',
      '📊 Full access to budget & weather tools',
      '🎟️ Use for one trip only',
      '⏳ Auto-expires after set duration',
    ],
    premium: [
      '✅ Everything in Basic',
      '♾️ Unlimited smart itineraries',
      '🧭 Personalized travel suggestions',
      '📡 Real-time alerts & updates',
      '📱 Full mobile app access',
      '📥 Offline downloads',
      '💬 Priority customer support',
    ],
    pro: [
      '✅ Everything in Premium',
      '🛎️ VIP concierge support',
      '💎 Access exclusive deals',
      '📈 Price tracking: hotels & flights',
      '🚨 Last-minute booking help',
      '👨‍👩‍👧 Family sharing up to 5 users',
      '🕶️ AR destination previews',
      '🆘 24/7 emergency support',
    ],
  };

  const faqs = [
    { q: 'Can I use the trip pass without subscribing?', a: 'Yes! Trip Passes are perfect for one-time or short trips and do not auto-renew.' },
    { q: 'What happens when my pass expires?', a: 'You will lose access to premium features, but you can upgrade anytime to continue planning.' },
    { q: 'Is the yearly plan better value?', a: 'Absolutely. If you travel more than once a year or like to plan ahead, the yearly plan saves you the most money.' },
    { q: 'Will I be charged automatically?', a: 'Only yearly subscriptions auto-renew. Trip passes are one-time payments and do not renew.' },
    { q: 'Is Triponic available globally?', a: 'Yes, Triponic supports international travelers with region-based pricing and support.' },
    { q: 'Can I share my plan with friends or family?', a: 'Yes! The Pro plan includes family sharing with access for up to 5 users.' },
    { q: 'How do I get started with a free plan?', a: 'Simply click “Get Started” on the Basic plan and begin planning instantly—no card required.' },
    { q: 'Will Triponic work on mobile?', a: 'Yes, Premium and Pro users get full access to our mobile app, including offline features.' },
  ];

  const regions = [
    { value: 'global', label: 'Global (USD)' },
    { value: 'north_america', label: 'North America (USD)' },
    { value: 'south_america', label: 'South America (USD)' },
    { value: 'europe', label: 'Europe (EUR)' },
    { value: 'asia', label: 'Asia (INR)' },
    { value: 'australia', label: 'Australia (AUD)' },
    { value: 'africa', label: 'Africa (USD)' },
  ];

  const pricing = pricingData[selectedRegion as keyof typeof pricingData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 font-sans text-gray-900">
      {/* Region Selector */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 py-20 text-white">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-md">Flexible Travel Pricing</h1>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-xl mx-auto leading-relaxed">Whether it's one trip or all year — we've got you covered.</p>
          <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-md rounded-full px-4 py-2 w-full max-w-xs mx-auto shadow-lg hover:bg-opacity-30 transition">
            <Globe className="w-6 h-6 mr-3 text-white" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="appearance-none bg-transparent text-white text-lg font-semibold cursor-pointer focus:outline-none"
              aria-label="Select region"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value} className="text-gray-900 font-normal">
                  {region.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Trip Pass Section */}
      <section className="container mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-indigo-700 drop-shadow-sm">🎟️ One-Time Trip Pass</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[{ name: '10-Day Pass', price: pricing.trip10, key: 'trip10' }, { name: '30-Day Pass', price: pricing.trip30, key: 'trip30' }].map((pass, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 cursor-pointer select-none"
              tabIndex={0}
              role="button"
              aria-label={`Select ${pass.name} plan`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2 text-indigo-600">{pass.name}</h3>
                <p className="text-gray-500 mb-6 font-medium tracking-wide">Perfect for short-term trips</p>
                <div className="text-4xl font-extrabold mb-6 tracking-tight text-indigo-900">
                  {pricing.symbol}
                  {pass.price}
                </div>
                <ul className="space-y-3 text-gray-700">
                  {features.tripPass.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="leading-relaxed font-semibold">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href={stripeLinks[pass.key]} target="_blank" rel="noopener noreferrer" className="mt-8 block">
                <button
                  className="w-full py-4 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white font-extrabold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                  aria-label={`Buy ${pass.name}`}
                >
                  Get {pass.name}
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Yearly Subscriptions */}
      <section className="container mx-auto max-w-7xl px-6 py-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl shadow-inner">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-indigo-700 drop-shadow-sm">📅 Yearly Subscriptions</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { label: 'Basic', price: pricing.basic, features: features.basic },
            { label: 'Premium', price: pricing.premium, features: features.premium },
            { label: 'Pro', price: pricing.pro, features: features.pro },
          ].map((plan, index) => (
            <div
              key={index}
              onClick={() => setSelectedPlan(plan.label)}
              className={`relative cursor-pointer rounded-3xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-[1.03] ${
                selectedPlan === plan.label ? 'ring-4 ring-indigo-400 shadow-2xl' : 'ring-1 ring-transparent'
              }`}
              tabIndex={0}
              role="button"
              aria-pressed={selectedPlan === plan.label}
            >
              {selectedPlan === plan.label && (
                <div className="absolute -top-5 -right-5 bg-indigo-600 text-white text-sm font-semibold rounded-full px-3 py-1 shadow-lg select-none">
                  Selected
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-indigo-700">{plan.label}</h3>
              <p className="text-gray-600 mb-6 italic select-none">
                {plan.label === 'Basic'
                  ? 'Essential travel planning'
                  : plan.label === 'Pro'
                  ? 'Ultimate travel luxury'
                  : 'Enhanced travel experience'}
              </p>
              <div className="text-4xl font-extrabold mb-6 tracking-tight text-indigo-900">
                {pricing.symbol}
                {plan.price}
                <span className="text-base font-medium text-gray-500 ml-1">/ year</span>
              </div>
              {pricing.currency !== 'USD' && plan.label !== 'Basic' && (
                <p className="text-gray-500 text-sm mb-6">≈ ${Math.round(plan.price / pricing.exchange)} USD</p>
              )}
              <ul className="space-y-3 text-gray-700 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 pr-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="leading-relaxed font-semibold">{f}</span>
                  </li>
                ))}
              </ul>

              {plan.label === 'Basic' ? (
                <button
                  onClick={() => setLocation('/explore')}
                  className="w-full mt-8 py-4 rounded-3xl bg-indigo-600 text-white font-extrabold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform duration-300"
                  aria-label="Get Started with Basic plan"
                >
                  Get Started
                </button>
              ) : (
                <a href={stripeLinks[plan.label.toLowerCase()]} target="_blank" rel="noopener noreferrer" className="mt-8 block">
                  <button
                    className="w-full py-4 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-700 text-white font-extrabold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                    aria-label={`Subscribe to ${plan.label} plan`}
                  >
                    Subscribe Now
                  </button>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent select-none">
          ❓ Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, i) => {
            const isOpen = openFAQ === i;
            return (
              <div
                key={i}
                className={`rounded-2xl bg-white shadow-md p-6 border border-indigo-200 cursor-pointer select-none transition-shadow duration-300 ${
                  isOpen ? 'shadow-lg ring-2 ring-indigo-400' : 'hover:shadow-lg'
                }`}
                onClick={() => setOpenFAQ(isOpen ? null : i)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                aria-label={`FAQ: ${faq.q}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-indigo-700 font-semibold text-lg">
                    <HelpCircle className="w-6 h-6" />
                    {faq.q}
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-indigo-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-indigo-500" />
                  )}
                </div>
                <div
                  id={`faq-answer-${i}`}
                  className={`mt-4 text-gray-700 leading-relaxed text-sm transition-all duration-500 ease-in-out origin-top ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-700 py-20 px-6 text-white text-center rounded-t-3xl shadow-xl select-none">
        <h2 className="text-4xl font-extrabold mb-5 tracking-wide drop-shadow-lg">🚀 Start Planning Smarter</h2>
        <p className="text-lg max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed">
          Be among the first to experience AI-powered travel planning with Triponic. Your perfect itinerary is just a click away.
        </p>
        <button
          id="scroll-top-cta"
          className="bg-white text-indigo-700 font-extrabold px-10 py-5 rounded-3xl text-xl shadow-2xl hover:scale-110 hover:shadow-4xl transition-transform duration-300"
          aria-label="Plan Your Trip"
        >
          🔝 Plan Your Trip →
        </button>
      </section>
    </div>
  );
};

export default Pricing;
