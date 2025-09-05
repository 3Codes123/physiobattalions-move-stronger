import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Users, Clock } from "lucide-react";
import clinicImage from "@/assets/clinic-interior.jpg";

const About = () => {
  const features = [
    "All physiotherapy departments under one roof",
    "Therapist-guided fitness integration", 
    "Evidence-based care plans",
    "Focus on both rehabilitation and prevention",
    "Accessible and affordable treatment packages"
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Happy Patients" },
    { icon: Award, number: "15+", label: "Expert Therapists" },
    { icon: Clock, number: "24/7", label: "Support Available" },
    { icon: CheckCircle, number: "98%", label: "Success Rate" }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Healing. Movement. Strength.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              PhysioBattalions was founded with the vision to provide a one-stop physiotherapy 
              and wellness platform for all ages and health conditions. Our team consists of 
              experienced and licensed physiotherapists, fitness trainers, and rehabilitation 
              specialists who collaborate to deliver personalized, hands-on care.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              We don't just treat symptoms — we focus on restoring function and building long-term strength.
            </p>

            <Button variant="hero" size="lg">
              Learn More About Us
            </Button>
          </div>

          {/* Image and Stats */}
          <div className="space-y-8">
            <div className="relative">
              <img 
                src={clinicImage} 
                alt="Modern physiotherapy clinic interior"
                className="rounded-2xl shadow-medium w-full"
              />
              <div className="absolute -bottom-8 -left-8 bg-gradient-primary text-white p-6 rounded-xl shadow-strong">
                <div className="text-3xl font-bold">6</div>
                <div className="text-sm opacity-90">Specialties</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center shadow-soft border-0">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;