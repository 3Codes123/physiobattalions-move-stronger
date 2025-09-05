import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background shadow-soft sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>7721866059</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>PHYSIOBATALLIONS@GMAIL.COM</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>ALL OVER PUNE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gradient">PHYSIOBATTALIONS</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-smooth">Home</a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">About</a>
            <a href="#services" className="text-foreground hover:text-primary transition-smooth">Services</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">Contact</a>
          </div>

          <Button variant="hero" size="lg" className="hidden md:inline-flex">
            Book Appointment
          </Button>

          {/* Mobile menu button */}
          <button className="md:hidden text-foreground">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;