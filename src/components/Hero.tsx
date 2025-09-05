import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-physiotherapy.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional physiotherapy clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            FOR YOUR DESIRE
            <br />
            <span className="text-gradient">WE GIVE PRIORITY TO FITNESS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            One Platform. All Physiotherapy & Fitness Needs. Expert care across Musculoskeletal, 
            Orthopedic, Neurological, Cardiorespiratory, Community, and Sports Physiotherapy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" className="group">
              Book Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            
            <Button variant="secondary-hero" size="lg" className="group">
              <Play className="mr-2 h-5 w-5" />
              Watch Our Story
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-white/80">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">6</div>
              <div className="text-sm text-white/80">Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-sm text-white/80">Expert Therapists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/80">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;