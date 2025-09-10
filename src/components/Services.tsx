import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageCarousel } from './ui/image-carousel';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 'musculoskeletal',
    title: "Musculoskeletal Physiotherapy",
    description: "Relieving pain. Restoring movement. Treating muscles, joints, bones, ligaments, and tendons.",
    features: ["Back and neck pain", "Muscle strains", "Joint sprains", "Postural problems"],
    color: "text-primary",
    imagePath: '/img/fwdmusculoskeletal/',
    imageCount: 9
  },
  {
    id: 'orthopedic',
    title: "Orthopedic Physiotherapy", 
    description: "Helping you recover after injury or surgery with progressive rehabilitation plans.",
    features: ["Post-fracture rehab", "Joint replacements", "ACL injuries", "Arthritis care"],
    color: "text-secondary",
    imagePath: '/img/fwdhome/',
    imageCount: 13
  },
  {
    id: 'neurological',
    title: "Neurological Physiotherapy",
    description: "Regaining strength and independence after nerve-related conditions.",
    features: ["Stroke recovery", "Spinal cord injuries", "Parkinson's disease", "Multiple sclerosis"],
    color: "text-success",
    imagePath: '/img/fwdneuro/',
    imageCount: 7
  },
  {
    id: 'cardiorespiratory',
    title: "Cardiorespiratory Physiotherapy",
    description: "Breathe easier. Move better. Supporting lung and heart health for better quality of life.",
    features: ["COPD management", "Post-COVID recovery", "Heart surgery rehab", "Breathing training"],
    color: "text-primary",
    imagePath: '/img/fwdcardio/',
    imageCount: 2
  },
  {
    id: 'community',
    title: "Community Physiotherapy",
    description: "Bringing physiotherapy to your home and community when you need it most.",
    features: ["Home visits", "Elderly care", "Disability support", "Women's Help"],
    color: "text-secondary",
    imagePath: '/img/fwdcommunityphysio/',
    imageCount: 10
  },
  {
    id: 'sports',
    title: "Sports Physiotherapy",
    description: "Prevent injuries. Recover stronger. Perform better with sports-specific rehabilitation.",
    features: ["ACL Tear", "Ligament Syndromes", "Performance training", "Injury prevention", "Return-to-sport"],
    color: "text-success",
    imagePath: '/img/fwdsports/',
    imageCount: 4
  }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeService = services.find(service => service.id === activeTab) || services[0];

  // Generate image paths for the active service
  const serviceImages = useMemo(() => {
    return Array.from({ length: activeService.imageCount }, (_, i) => {
      // Create a URL-friendly filename by replacing spaces with %20
      const serviceName = activeService.title.split(' ')[0].toLowerCase();
      const imageNumber = i + 1;
      const imagePath = `${activeService.imagePath}${serviceName}${imageNumber}.jpg`;
      
      console.log(`Loading image: ${imagePath}`); // For debugging
      
      return {
        src: imagePath,
        alt: `${activeService.title} ${imageNumber}`
      };
    });
  }, [activeService]);

  return (
    <section id="services" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive physiotherapy services tailored to your needs
          </p>
        </div>

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

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="space-y-8">
              <div className="space-y-6">
                {/* Service Title */}
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    {service.description}
                  </p>
                </div>

                {/* Features in a row */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {service.features.map((feature, idx) => (
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
                  <Button className="group bg-primary hover:bg-primary/90">
                    Book an Appointment
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-16">
          <Button variant="hero" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;