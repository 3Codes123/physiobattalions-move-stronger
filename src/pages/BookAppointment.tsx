import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function BookAppointment() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<"physiotherapy" | "fitness" | "sports">("" as any);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Button asChild variant="ghost" className="mb-8 -ml-2">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 md:p-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Select the type of service you'd like to book and we'll guide you through the process.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { 
                    id: 'physiotherapy', 
                    title: 'Physiotherapy', 
                    description: 'Professional therapy sessions for rehabilitation and pain management',
                    icon: '💆‍♂️'
                  },
                  { 
                    id: 'fitness', 
                    title: 'Elite Fitness Club', 
                    description: 'Premium fitness training and wellness center',
                    icon: '💪'
                  },
                  { 
                    id: 'sports', 
                    title: 'Champion Sports Academy', 
                    description: 'Professional sports training for all levels',
                    icon: '⚽'
                  },
                ].map((service) => (
                  <div 
                    key={service.id}
                    className={`p-6 rounded-lg border ${selectedService === service.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'} transition-colors cursor-pointer`}
                    onClick={() => setSelectedService(service.id as "physiotherapy" | "fitness" | "sports")}
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Button 
                  size="lg" 
                  className="px-8"
                  onClick={() => setIsModalOpen(true)}
                >
                  Continue to Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <BookingModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        preselectService={selectedService} 
      />
    </div>
  );
}
