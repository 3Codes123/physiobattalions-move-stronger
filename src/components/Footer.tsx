import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gradient mb-4">PHYSIOBATTALIONS</h3>
            <p className="text-background/80 mb-6">
              One Platform. All Physiotherapy & Fitness Needs. Your health journey starts here.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>7721866059</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>PHYSIOBATALLIONS@GMAIL.COM</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>ALL OVER PUNE</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-background/80">
              <li><a href="#" className="hover:text-background transition-smooth">Musculoskeletal Physiotherapy</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Orthopedic Physiotherapy</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Neurological Physiotherapy</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Cardiorespiratory Physiotherapy</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Sports Physiotherapy</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Fitness Club</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-background/80">
              <li><a href="#home" className="hover:text-background transition-smooth">Home</a></li>
              <li><a href="#about" className="hover:text-background transition-smooth">About Us</a></li>
              <li><a href="#services" className="hover:text-background transition-smooth">Services</a></li>
              <li><a href="#contact" className="hover:text-background transition-smooth">Contact</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Blog</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Testimonials</a></li>
            </ul>
          </div>

          {/* Hours & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <div className="space-y-4 text-background/80">
              <div>
                <h5 className="font-medium text-background mb-2">Operating Hours</h5>
                <p className="text-sm">Monday - Saturday</p>
                <p className="text-sm">9:00 AM - 7:00 PM</p>
                <p className="text-sm">Closed on Sundays</p>
              </div>
              <div>
                <h5 className="font-medium text-background mb-2">Emergency Support</h5>
                <p className="text-sm">24/7 Available</p>
                <p className="text-sm">Call: 7721866059</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm mb-4 md:mb-0">
              © 2024 PhysioBattalions. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-background/60">
              <a href="#" className="hover:text-background transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-background transition-smooth">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;