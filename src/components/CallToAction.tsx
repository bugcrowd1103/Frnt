import { Link } from 'wouter';
import { ArrowRight, Sparkles, Layers, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface CallToActionProps {
  onStartPlanning?: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const CoolCallToAction = ({ onStartPlanning }: CallToActionProps) => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-white text-gray-900">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#dbeafe_0%,_transparent_50%)] animate-pulse-slow"></div>
      </div>
      
      {/* Content container */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={itemVariants}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-500/20">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Next-Gen Travel Planning</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            From Concept to Itinerary.<br className="hidden md:inline"/> Instantly.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Leverage the power of AI to build personalized, detailed, and dynamic travel plans that reflect your unique style and needs.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            {onStartPlanning ? (
              <button 
                onClick={onStartPlanning}
                className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center group"
              >
                <span>Start Planning Now</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link href="/chat">
                <a className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center group inline-flex">
                  <span>Start Planning Now</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
            )}
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300 px-8 py-4 rounded-full text-lg">
              <span>View Our Mission</span>
            </button>
          </motion.div>
        </motion.div>
        
        {/* Feature highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
            variants={itemVariants}
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Layers className="text-blue-600 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2">The Clarity Machine</h3>
            <p className="text-gray-600 text-sm">We fight information overload to give you a single source of truth for your entire trip.</p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
            variants={itemVariants}
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="text-blue-600 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2">Optimized for Efficiency</h3>
            <p className="text-gray-600 text-sm">Our AI optimizes routes, finds the best flights & hotels, and manages your budget seamlessly.</p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
            variants={itemVariants}
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-600 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2">Sustainable & Smart</h3>
            <p className="text-gray-600 text-sm">We provide options that are not only great for you but also mindful of your impact on the world.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoolCallToAction;