import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageCarousel } from "@/components/ui/image-carousel";
import BookingModal from "@/components/BookingModal";

export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('musculoskeletal');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectService, setPreselectService] = useState<'physiotherapy' | 'fitness' | 'sports'>('physiotherapy');

  const services = [
    {
      id: 'musculoskeletal',
      title: "Musculoskeletal Physiotherapy",
      description: "Relieving pain. Restoring movement. Treating muscles, joints, bones, ligaments, and tendons.",
      features: ["Back and neck pain", "Muscle strains", "Joint sprains", "Postural problems"],
      color: "text-primary",
      imagePath: '/img/fwdmusculoskeletal/',
      imageCount: 9,
      serviceType: 'physiotherapy' as const
    },
    {
      id: 'orthopedic',
      title: "Orthopedic Physiotherapy", 
      description: "Helping you recover after injury or surgery with progressive rehabilitation plans.",
      features: ["Post-fracture rehab", "Joint replacements", "ACL injuries", "Arthritis care"],
      color: "text-secondary",
      imagePath: '/img/fwdhome/',
      imageCount: 13,
      serviceType: 'physiotherapy' as const
    },
    {
      id: 'neurological',
      title: "Neurological Physiotherapy",
      description: "Regaining strength and independence after nerve-related conditions.",
      features: ["Stroke recovery", "Spinal cord injuries", "Parkinson's disease", "Multiple sclerosis"],
      color: "text-success",
      imagePath: '/img/fwdneuro/',
      imageCount: 7,
      serviceType: 'physiotherapy' as const
    },
    {
      id: 'cardiorespiratory',
      title: "Cardiorespiratory Physiotherapy",
      description: "Breathe easier. Move better. Supporting lung and heart health for better quality of life.",
      features: ["COPD management", "Post-COVID recovery", "Heart surgery rehab", "Breathing training"],
      color: "text-primary",
      imagePath: '/img/fwdcardio/',
      imageCount: 2,
      serviceType: 'physiotherapy' as const
    },
    {
      id: 'community',
      title: "Community Physiotherapy",
      description: "Bringing physiotherapy to your home and community when you need it most.",
      features: ["Home visits", "Elderly care", "Disability support", "Women's Help"],
      color: "text-secondary",
      imagePath: '/img/fwdcommunityphysio/',
      imageCount: 10,
      serviceType: 'physiotherapy' as const
    },
    {
      id: 'sports',
      title: "Sports Physiotherapy",
      description: "Prevent injuries. Recover stronger. Perform better with sports-specific rehabilitation.",
      features: ["ACL Tear", "Ligament Syndromes", "Performance training", "Injury prevention", "Return-to-sport"],
      color: "text-success",
      imagePath: '/img/fwdsports/',
      imageCount: 4,
      serviceType: 'sports' as const
    }
  ];

  const activeService = services.find(service => service.id === activeTab) || services[0];

  // Generate image paths for the active service
  const serviceImages = Array.from({ length: activeService.imageCount }, (_, i) => {
    const imageNumber = i + 1;
    // Get the service directory name (e.g., 'fwdmusculoskeletal' from '/img/fwdmusculoskeletal/')
    const serviceDir = activeService.imagePath.split('/').filter(Boolean).pop() || '';
    
    // Handle different service directory naming patterns
    let imageName = '';
    
    switch(serviceDir) {
      case 'fwdcommunityphysio':
        imageName = `communityphysio ${imageNumber}.jpg`;
        break;
      case 'fwdcardio':
        imageName = `Cardio ${imageNumber}.jpg`;
        break;
      case 'fwdhome':
        imageName = `Home ${imageNumber}.jpg`;
        break;
      case 'fwdmusculoskeletal':
        imageName = `musculoskeletal ${imageNumber}.jpg`;
        break;
      case 'fwdneuro':
        imageName = `neuro ${imageNumber}.jpg`;
        break;
      case 'fwdsports':
        imageName = `Sports ${imageNumber}.jpg`;
        break;
      case 'fwdfitness':
        imageName = `fitness ${imageNumber}.jpg`;
        break;
      default:
        // Fallback for any other directories
        const serviceName = serviceDir.replace('fwd', '');
        imageName = `${serviceName} ${imageNumber}.jpg`;
    }
    
    const imagePath = `${activeService.imagePath}${imageName}`;
    
    return {
      src: imagePath.replace(/\s+/g, '%20'),
      alt: `${activeService.title} ${imageNumber}`
    };
  });

  const handleBookNow = (serviceType: 'physiotherapy' | 'fitness' | 'sports') => {
    setPreselectService(serviceType);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BookingModal 
        open={bookingOpen} 
        onOpenChange={setBookingOpen} 
        preselectService={preselectService}
      />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-3xl">
              Comprehensive physiotherapy and wellness services tailored to your needs
            </p>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="flex-wrap h-auto p-1 bg-gray-100 rounded-lg">
                  {services.map((service) => (
                    <TabsTrigger
                      key={service.id}
                      value={service.id}
                      className="px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {service.title.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="space-y-8">
                <div className="space-y-6">
                  {/* Service Title */}
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {activeService.title}
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Features in a row */}
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {activeService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span className="text-sm text-gray-700 whitespace-nowrap">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Full-width Image Carousel */}
                  <div className="px-4">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <ImageCarousel 
                        images={serviceImages}
                        autoPlay={true}
                        interval={3000}
                        showDots={true}
                        showArrows={true}
                        showPauseButton={true}
                        className="h-[400px]"
                      />
                    </div>
                  </div>

                  {/* Book Button */}
                  <div className="text-center pt-4">
                    <Button 
                      className="group bg-primary hover:bg-primary/90"
                      onClick={() => handleBookNow(activeService.serviceType)}
                    >
                      Book an Appointment
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Our team is here to help you choose the right treatment for your specific needs.
            </p>
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate('/contact')}
            >
              Contact Us for a Consultation
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
