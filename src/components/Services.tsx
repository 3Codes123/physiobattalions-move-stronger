import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Bone, 
  Brain, 
  Activity, 
  Users, 
  Trophy,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Bone,
    title: "Musculoskeletal Physiotherapy",
    description: "Relieving pain. Restoring movement. Treating muscles, joints, bones, ligaments, and tendons.",
    features: ["Back and neck pain", "Muscle strains", "Joint sprains", "Postural problems"],
    color: "text-primary"
  },
  {
    icon: Heart,
    title: "Orthopedic Physiotherapy", 
    description: "Helping you recover after injury or surgery with progressive rehabilitation plans.",
    features: ["Post-fracture rehab", "Joint replacements", "ACL injuries", "Arthritis care"],
    color: "text-secondary"
  },
  {
    icon: Brain,
    title: "Neurological Physiotherapy",
    description: "Regaining strength and independence after nerve-related conditions.",
    features: ["Stroke recovery", "Spinal cord injuries", "Parkinson's disease", "Multiple sclerosis"],
    color: "text-success"
  },
  {
    icon: Activity,
    title: "Cardiorespiratory Physiotherapy",
    description: "Breathe easier. Move better. Supporting lung and heart health for better quality of life.",
    features: ["COPD management", "Post-COVID recovery", "Heart surgery rehab", "Breathing training"],
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Community Physiotherapy",
    description: "Bringing physiotherapy to your home and community when you need it most.",
    features: ["Home visits", "Elderly care", "Disability support", "School programs"],
    color: "text-secondary"
  },
  {
    icon: Trophy,
    title: "Sports Physiotherapy",
    description: "Prevent injuries. Recover stronger. Perform better with sports-specific rehabilitation.",
    features: ["Sports injuries", "Performance training", "Injury prevention", "Return-to-sport"],
    color: "text-success"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive <span className="text-gradient">Physiotherapy Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert care across all major physiotherapy specialties, designed to help you move better, 
            breathe easier, and live stronger with personalized treatment plans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-medium transition-spring border-0 shadow-soft">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-spring`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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