import { Button } from "@/components/ui/button";
import { ArrowRight, Play, HeartPulse, ShieldCheck, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-physiotherapy.jpg";
import React, { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy load the BookingModal to prevent potential issues
const BookingModal = lazy(() => import("./BookingModal"));

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Error boundary for the modal
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-white/80 mb-4">We're having trouble loading the booking system.</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-white/10 hover:bg-white/20"
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const stats = [
    { value: "500+", label: "Happy Patients", icon: <HeartPulse className="w-6 h-6" /> },
    { value: "6", label: "Specialties", icon: <ShieldCheck className="w-6 h-6" /> },
    { value: "15+", label: "Expert Therapists", icon: <Users className="w-6 h-6" /> },
    { value: "24/7", label: "Support", icon: <Clock className="w-6 h-6" /> },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-black/30 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.img 
          src={heroImage} 
          alt="Professional physiotherapy clinic"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-20 z-20">
        <motion.div 
          className="max-w-4xl bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-4">
            <span className="bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center border border-white/10">
              <HeartPulse className="w-4 h-4 mr-2" />
              Empowering Your Health Journey
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            variants={item}
          >
            <span className="block mb-2">FOR YOUR DESIRE</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              WE GIVE PRIORITY TO FITNESS
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed"
            variants={item}
          >
            Transform your health with our comprehensive physiotherapy services. Expert care across 
            Musculoskeletal, Orthopedic, Neurological, and Sports Physiotherapy.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-16"
            variants={item}
          >
            <Button 
              variant="default" 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white text-base font-semibold px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book Your Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Suspense fallback={null}>
              <BookingModal 
                isOpen={isBookingModalOpen} 
                onClose={() => setIsBookingModalOpen(false)} 
              />
            </Suspense>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white text-base font-medium px-8 py-6 rounded-xl transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            variants={container}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="relative overflow-hidden group text-center p-5 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/5"
                variants={item}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex justify-center text-white/90 mb-3">
                    {React.cloneElement(stat.icon, { className: 'w-7 h-7' })}
                  </div>
                  <div className="text-3xl font-bold text-white drop-shadow-sm">{stat.value}</div>
                  <div className="text-sm text-white/80 font-medium mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
        <p className="text-xs mt-2 text-center">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;