import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import BookingModal from "./BookingModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleBookAppointment = () => {
    setIsBookingModalOpen(true);
    closeMobileMenu();
  };
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
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <h1 className="text-2xl font-bold text-gradient">PHYSIOBATTALIONS</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth">Home</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth">About</Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-smooth">Services</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-smooth">Contact</Link>
          </div>

          <div className="hidden md:block">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleBookAppointment}
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background shadow-lg rounded-lg mt-4 p-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </nav>
            <div className="pt-2">
              <Button 
                variant="hero" 
                className="w-full"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </nav>
      <BookingModal 
        open={isBookingModalOpen} 
        onOpenChange={setIsBookingModalOpen} 
      />
    </header>
  );
};

export default Header;