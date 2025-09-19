import { Globe, Smartphone, Compass, Headset, Orbit, Shuffle, MapPin, Glasses } from 'lucide-react';

const ARVR = () => {
  const features = [
    {
      icon: <Glasses className="w-12 h-12 mb-4 text-primary" />,
      title: "Virtual Tours",
      description: "Experience destinations in immersive 360° virtual tours before you book. Walk through hotels, explore landmarks, and preview activities."
    },
    {
      icon: <Smartphone className="w-12 h-12 mb-4 text-primary" />,
      title: "AR Navigation",
      description: "Use augmented reality to navigate new cities with real-time points of interest, directions, and historical information directly in your view."
    },
    {
      icon: <Headset className="w-12 h-12 mb-4 text-primary" />,
      title: "VR Experiences",
      description: "Transport yourself to exotic locations with our VR experiences. Feel like you're actually there before booking your trip."
    },
    {
      icon: <MapPin className="w-12 h-12 mb-4 text-primary" />,
      title: "AR Information Overlay",
      description: "Point your camera at monuments, restaurants, or attractions to instantly see ratings, hours, menus, and historical information."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fadeIn">
              Experience Travel in a <span className="text-blue-300">New Dimension</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fadeInDelay">
              Explore destinations in AR/VR before you travel. Plan better trips, visualize accommodations, and discover hidden gems with immersive technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInDelayLong">
              <button className="bg-white text-indigo-900 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition shadow-lg flex items-center justify-center">
                <Headset className="mr-2" />
                Try VR Demo
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition flex items-center justify-center">
                <Smartphone className="mr-2" />
                Download AR App
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Immersive Travel Features
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Experience Our AR/VR Demos</h2>
            <p className="text-lg text-gray-300">
              Get a taste of our immersive travel experiences. These demos showcase how AR and VR can transform your travel planning.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <Orbit className="w-16 h-16 text-blue-400 mb-6 animate-spin-slow" />
            <h3 className="text-2xl font-bold mb-3">
              AR/VR Features Coming Soon
            </h3>
            <p className="text-gray-300 max-w-2xl mb-8">
              We're currently building cutting-edge AR and VR experiences to transform how you plan and experience travel. 
              Sign up to be the first to know when our immersive features launch!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-white font-medium py-3 px-6 rounded-full hover:bg-primary/90 transition">
                Join Waitlist
              </button>
              <button className="bg-transparent border border-gray-400 text-gray-300 font-medium py-3 px-6 rounded-full hover:border-white hover:text-white transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            How Triponic AR/VR Works
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <div className="bg-blue-100 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
                <Smartphone className="w-20 h-20 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Download the App</h3>
                <p>Get our AR-enabled mobile app for iOS or Android to access all immersive features.</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <ul className="list-disc pl-6">
                <li className="mb-3">Available on iOS and Android devices</li>
                <li className="mb-3">Optimized for the latest smartphones and tablets</li>
                <li className="mb-3">Requires camera access for AR features</li>
                <li>Lightweight install (under 100MB)</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center mb-12">
            <div className="md:w-1/2 md:pl-8 mb-6 md:mb-0">
              <div className="bg-indigo-100 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
                <Headset className="w-20 h-20 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Connect VR Headset (Optional)</h3>
                <p>For full immersion, connect a VR headset to experience destinations in 360°.</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <ul className="list-disc pl-6">
                <li className="mb-3">Compatible with Oculus, HTC Vive, and other major VR headsets</li>
                <li className="mb-3">Mobile VR options using phone holders</li>
                <li className="mb-3">Adjustable quality settings for different devices</li>
                <li>Haptic feedback for enhanced immersion</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <div className="bg-purple-100 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
                <Globe className="w-20 h-20 text-purple-700 mb-4" />
                <h3 className="text-xl font-bold mb-2">Explore and Book</h3>
                <p>Virtually visit locations, hotels, and experiences before making your booking decisions.</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <ul className="list-disc pl-6">
                <li className="mb-3">Virtual hotel room tours with accurate dimensions</li>
                <li className="mb-3">Guided AR city walks with historical context</li>
                <li className="mb-3">Seasonal previews to see destinations in different times of year</li>
                <li>Seamless booking integration after previewing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVR;