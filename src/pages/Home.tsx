import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartPulse, ShieldCheck, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const stats = [
    { value: "500+", label: "Happy Patients", icon: <HeartPulse className="w-6 h-6" /> },
    { value: "6", label: "Specialties", icon: <ShieldCheck className="w-6 h-6" /> },
    { value: "15+", label: "Years Experience", icon: <Clock className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/src/assets/hero-physiotherapy.jpg" 
              alt="Physiotherapy" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="container mx-auto relative z-10 py-16 h-full flex items-center">
            <div className="w-full max-w-4xl ml-8 md:ml-16">
              <div className="bg-black/40 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-white/10">
                <div className="max-w-3xl mb-12">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <div className="text-white">
                      FOR YOUR DESIRE
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent mt-2">
                      WE GIVE PRIORITY TO
                    </div>
                    <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent mt-2">
                      FITNESS
                    </div>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-200 mb-10">
                    Expert physiotherapy services tailored to your needs. Our dedicated team is here to help you move better, feel better, and live better.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="text-lg bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 px-8 h-14 text-base flex items-center gap-2"
                      onClick={() => setIsBookingModalOpen(true)}
                    >
                      Book an Appointment
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="text-left p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 group hover:scale-105"
                      >
                        <div className="w-12 h-12 mb-4 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                          {React.cloneElement(stat.icon, { className: 'w-6 h-6' })}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal 
        open={isBookingModalOpen} 
        onOpenChange={setIsBookingModalOpen} 
      />
    </div>
  );
}
