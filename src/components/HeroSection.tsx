import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  MoveRight,
  Sparkles,
  Play,
  Globe,
  MapPin,
  Rocket,
  Cloud,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// --- AnimatedGridOverlay Component (Purple Dark Mode) ---
const AnimatedGridOverlay: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const applyDrawAnimation = useCallback(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.animation = `drawGridLine ${5 + index * 0.2}s linear infinite alternate, 
                                 glowLinePurple ${2 + index * 0.1}s ease-in-out infinite alternate`;
      });
    }
  }, []);

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes drawGridLine {
        to { stroke-dashoffset: 0; }
      }
      @keyframes fadeGridBackground {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.15; }
      }
      .animate-fade-grid-background {
        animation: fadeGridBackground 8s infinite ease-in-out;
      }
      @keyframes glowLinePurple {
        0%, 100% { filter: drop-shadow(0 0 1px rgba(139, 92, 246, 0.3)); }
        50% { filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 10px rgba(139, 92, 246, 0.2)); }
      }
    `;
    document.head.appendChild(styleTag);
    applyDrawAnimation();
    return () => { document.head.removeChild(styleTag); };
  }, [applyDrawAnimation]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      ></div>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full animate-fade-grid-background"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ filter: 'url(#glowFilter)' }} 
      >
        <defs>
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[...Array(10)].map((_, i) => (
          <path
            key={`h-${i}`}
            d={`M0 ${10 * (i + 0.5)} L100 ${10 * (i + 0.5)}`}
            stroke="rgba(139, 92, 246, 0.15)"
            strokeWidth="0.08"
            fill="none"
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <path
            key={`v-${i}`}
            d={`M${10 * (i + 0.5)} 0 L${10 * (i + 0.5)} 100`}
            stroke="rgba(139, 92, 246, 0.15)"
            strokeWidth="0.08"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
};

// --- FloatingParticles Component (Enhanced) ---
const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-purple-300 opacity-0"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `floatParticle 
                                    ${5 + Math.random() * 15}s infinite linear alternate-reverse, 
                                    driftParticle ${10 + Math.random() * 20}s infinite ease-in-out alternate`,
                        animationDelay: `${Math.random() * 10}s`,
                        filter: `drop-shadow(0 0 5px rgba(139, 92, 246, 0.5))`
                    }}
                />
            ))}
        </div>
    );
};

// --- HeroSection Component (Main Page Content - Dynamic Purple Edition) ---
interface HeroSectionProps {
  onStartPlanning: () => void;
}

const HeroSection = ({ onStartPlanning }: HeroSectionProps) => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const ABSTRACT_ROTATE_X = 25; // Increased parallax
  const ABSTRACT_ROTATE_Y = 25; // Increased parallax
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); };
  }, [handleMouseMove]);

  const heroSectionStyles = `
    @keyframes fadeInHeroSection {
      to { opacity: 1; }
    }
    .animate-fade-in-hero-section {
      animation: fadeInHeroSection 1.5s ease-out forwards;
    }
    @keyframes fadeInUpContent {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    /* New: Kinetic text animation */
    @keyframes textSlideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .animate-kinetic-text {
        animation: textSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }
    .animate-staggered-item-1 { animation: fadeInUpContent 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; animation-delay: 0.3s; opacity: 0; }
    .animate-staggered-item-2 { animation: fadeInUpContent 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; animation-delay: 0.6s; opacity: 0; }
    .animate-staggered-item-3 { animation: fadeInUpContent 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; animation-delay: 0.9s; opacity: 0; }
    .animate-staggered-item-4 { animation: fadeInUpContent 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; animation-delay: 1.2s; opacity: 0; }
    @keyframes abstractGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 0px rgba(139, 92, 246, 0.1); }
      50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.5), 0 0 10px rgba(236, 72, 153, 0.2); }
    }
    .animate-abstract-glow {
      animation: abstractGlow 6s infinite ease-in-out;
    }
    @keyframes lightRayRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes pulse-scroll {
        0%, 100% { transform: translateY(0); opacity: 0.7; }
        50% { transform: translateY(10px); opacity: 1; }
    }
    /* Enhanced Particle animations */
    @keyframes floatParticle {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
        50% { transform: translate(15px, 15px) scale(1.2); opacity: 1; }
    }
    @keyframes driftParticle {
        0%, 100% { transform: translateX(0) translateY(0); }
        50% { transform: translateX(100vw) translateY(50vh); }
    }
    @keyframes orbit1 {
      0% { transform: rotate(0deg) translateX(180px) rotate(0deg); opacity: 0.5; }
      50% { opacity: 1; }
      100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); opacity: 0.5; }
    }
    @keyframes orbit2 {
      0% { transform: rotate(120deg) translateX(180px) rotate(-120deg); opacity: 0.5; }
      50% { opacity: 1; }
      100% { transform: rotate(480deg) translateX(180px) rotate(-480deg); opacity: 0.5; }
    }
    @keyframes orbit3 {
      0% { transform: rotate(240deg) translateX(180px) rotate(-240deg); opacity: 0.5; }
      50% { opacity: 1; }
      100% { transform: rotate(600deg) translateX(180px) rotate(-600deg); opacity: 0.5; }
    }
    .icon-orbit-1 { animation: orbit1 20s linear infinite; }
    .icon-orbit-2 { animation: orbit2 20s linear infinite; }
    .icon-orbit-3 { animation: orbit3 20s linear infinite; }
    /* Enhanced Plane Animation */
    @keyframes planeFlight {
        0%, 100% { transform: translate3d(-10px, 0, 0) rotateZ(0deg) rotateY(10deg) scale(1); }
        25% { transform: translate3d(20px, -5px, 20px) rotateZ(5deg) rotateY(15deg) scale(1.05); }
        50% { transform: translate3d(0, 10px, -10px) rotateZ(-5deg) rotateY(5deg) scale(1.1); }
        75% { transform: translate3d(-20px, -5px, -20px) rotateZ(5deg) rotateY(15deg) scale(1.05); }
    }
    @keyframes propellerSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes vaporTrail {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
    }
    .vapor-trail {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 70%);
        border-radius: 50%;
        animation: vaporTrail 2s infinite ease-out;
        z-index: -1;
    }
    .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(139, 92, 246, 0.4), 0 5px 10px rgba(139, 92, 246, 0.2);
    }
    .cta-secondary-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(255, 255, 255, 0.15), 0 5px 10px rgba(255, 255, 255, 0.1);
    }
    /* New: Initial button entry animation */
    @keyframes buttonPopIn {
        from { transform: scale(0.8) translateY(20px); opacity: 0; }
        to { transform: scale(1) translateY(0); opacity: 1; }
    }
    .animate-button-pop-in-1 { animation: buttonPopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; animation-delay: 1.5s; opacity: 0; }
    .animate-button-pop-in-2 { animation: buttonPopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; animation-delay: 1.7s; opacity: 0; }
  `;

  return (
    <>
      <style>{heroSectionStyles}</style>

      <section
        aria-label="Triponic: AI-Powered Travel Planning. Your Clarity Machine."
        className={`relative min-h-[95vh] bg-gradient-to-br from-purple-950 via-gray-950 to-purple-950 flex flex-col items-center justify-center text-white overflow-hidden 
                    ${mounted ? 'animate-fade-in-hero-section' : ''}`}
      >
        {/* Animated Grid Overlay & Floating Particles */}
        <AnimatedGridOverlay />
        <FloatingParticles />

        {/* --- Main Content Area: Explicit Two-Column Layout --- */}
        <div className="relative z-20 container mx-auto px-6 py-16 w-full flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left flex-shrink-0">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-purple-900/10 backdrop-blur-md text-white text-base font-semibold mb-8 border border-purple-400/30 shadow-lg transition-all duration-300 hover:scale-105 animate-staggered-item-1"
                 role="status" aria-live="polite">
              <Sparkles className="mr-2 w-5 h-5 text-yellow-300" aria-hidden="true" />
              <span>AI-Powered Travel: Your Clarity Machine</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              <span className="block animate-kinetic-text" style={{ animationDelay: '0.8s' }}>Effortless Adventures,</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-kinetic-text" style={{ animationDelay: '1s' }}>
                Perfectly Planned by AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto lg:mx-0 font-light leading-relaxed animate-staggered-item-3">
              Say goodbye to travel planning chaos. Triponic's cutting-edge AI transforms your
              dreams into a seamless, personalized itinerary, every detail tailored to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button
                type="button"
                aria-label="Start your adventure with Triponic"
                className="cta-button group bg-gradient-to-r from-purple-700 to-fuchsia-800 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:from-purple-800 hover:to-fuchsia-900 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400/70 focus:ring-offset-2 focus:ring-offset-gray-900 animate-button-pop-in-1"
                onClick={onStartPlanning}
              >
                <span>Start Your Adventure</span>
                <MoveRight className="ml-2 h-5 w-5 inline-block transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <button
              type="button"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Explore features section"
              className="cta-secondary-button bg-transparent text-white text-lg font-medium py-4 px-10 rounded-full border border-purple-400/30 shadow-lg transition-all duration-300 hover:bg-purple-900/10 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center animate-button-pop-in-2"
            >
              <Play className="mr-2 w-5 h-5" aria-hidden="true" />
              <span>Explore</span>
            </button>
            </div>
          </div>

          {/* Right Column: 3D Animated Plane & Abstract Travel Tech Element */}
          <div className="lg:w-1/2 relative flex justify-center items-center h-[500px] md:h-[600px] flex-shrink-0">
            
            {/* --- Abstract Travel Tech Element (Central Visual Focus) --- */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-purple-900/10 border border-purple-400/30 animate-abstract-glow perspective-1000"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `rotateX(${mousePosition.y * ABSTRACT_ROTATE_X}deg) rotateY(${mousePosition.x * ABSTRACT_ROTATE_Y}deg)`
              }}
            >
              <div className="absolute inset-0 m-auto w-4/5 h-4/5 rounded-full z-10 animate-[lightRayRotate_30s_linear_infinite]"
                   style={{
                     background: 'conic-gradient(from 0deg, rgba(139, 92, 246, 0.1) 0%, transparent 10%, transparent 40%, rgba(139, 92, 246, 0.1) 50%, transparent 60%, transparent 90%)'
                   }}
              ></div>

              <div className="absolute inset-0 m-auto w-4/5 h-4/5 rounded-full border-2 border-fuchsia-400/30 animate-[dataRingSpin_25s_linear_infinite]"
                   style={{
                     background: 'conic-gradient(from 0deg, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0) 40%, rgba(139, 92, 246, 0.4) 60%, rgba(139, 92, 246, 0) 100%)'
                   }}
              ></div>

              <Globe className="absolute inset-0 m-auto w-36 h-36 text-purple-400 animate-pulse-slow z-20" style={{ animationDuration: '3s' }} aria-hidden="true" />

              <div className="absolute inset-0 m-auto w-full h-full transform-gpu"
                   style={{
                      transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0)`
                   }}
              >
                <MapPin className="absolute w-10 h-10 text-red-400 icon-orbit-1" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', transformOrigin: '250px 250px' }} aria-hidden="true" />
                <Rocket className="absolute w-10 h-10 text-cyan-400 icon-orbit-2" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', transformOrigin: '250px 250px' }} aria-hidden="true" />
                <Cloud className="absolute w-10 h-10 text-emerald-400 icon-orbit-3" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', transformOrigin: '250px 250px' }} aria-hidden="true" />
              </div>
            </div>

            {/* --- 3D Animated Plane --- */}
            <div className="absolute top-[5%] right-[5%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] perspective-1000 animate-[planeFlight_15s_ease-in-out_infinite] pointer-events-none z-30">
              <div className="relative w-full h-full transform-style-preserve-3d"
                   style={{ transform: `rotateX(15deg) rotateY(-30deg)` }}>
                <div className="absolute left-[30%] top-[30%] w-[40%] h-[15%] bg-purple-500 rounded-lg transform rotateZ(10deg) shadow-lg animate-[planeGlowPulse_3s_ease-in-out_infinite]"></div>
                <div className="absolute left-[15%] top-[45%] w-[20%] h-[8%] bg-purple-400 rounded-full transform rotateZ(-20deg) skewY(-10deg)"></div>
                <div className="absolute right-[15%] top-[45%] w-[20%] h-[8%] bg-purple-400 rounded-full transform rotateZ(20deg) skewY(10deg)"></div>
                <div className="absolute left-[65%] top-[20%] w-[8%] h-[15%] bg-purple-600 rounded-tl-full rounded-tr-full transform rotateY(45deg)"></div>
                <div className="absolute w-[8%] h-[20%] bg-gray-500 rounded-lg left-[25%] top-[40%] transform-origin-center animate-[propellerSpin_0.5s_linear_infinite]"
                     style={{ transform: 'rotateZ(90deg)' }}></div>
                <div className="absolute w-[10px] h-[10px] bg-purple-200 rounded-full opacity-70 blur-sm right-[25%] top-[35%] animate-pulse" style={{animationDuration: '1s'}}></div>
              </div>
              <div className="vapor-trail absolute bottom-[35%] right-[25%]"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-[pulse-scroll_2s_ease-in-out_infinite]">
            <ChevronDown className="w-8 h-8 text-gray-500 opacity-70" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;