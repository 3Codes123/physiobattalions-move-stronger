import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Recovery?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Let's build your recovery plan — together. Book your consultation today and take the first step towards better health.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="shadow-strong border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" type="tel" />
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Service</label>
                <select className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                  <option>Musculoskeletal Physiotherapy</option>
                  <option>Orthopedic Physiotherapy</option>
                  <option>Neurological Physiotherapy</option>
                  <option>Cardiorespiratory Physiotherapy</option>
                  <option>Community Physiotherapy</option>
                  <option>Sports Physiotherapy</option>
                  <option>Fitness Club</option>
                </select>
              </div>
              <Textarea placeholder="Tell us about your condition or goals..." rows={4} />
              <Button variant="hero" size="lg" className="w-full">
                Book Appointment
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid gap-6">
              <Card className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Phone className="h-6 w-6 mr-3" />
                    <h3 className="text-lg font-semibold">Phone</h3>
                  </div>
                  <p className="text-lg">7721866059</p>
                  <p className="text-sm opacity-80">Available 24/7 for emergencies</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 mr-3" />
                    <h3 className="text-lg font-semibold">Email</h3>
                  </div>
                  <p className="text-lg">PHYSIOBATALLIONS@GMAIL.COM</p>
                  <p className="text-sm opacity-80">We'll respond within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 mr-3" />
                    <h3 className="text-lg font-semibold">Location</h3>
                  </div>
                  <p className="text-lg">ALL OVER PUNE</p>
                  <p className="text-sm opacity-80">Multiple clinic locations</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 mr-3" />
                    <h3 className="text-lg font-semibold">Hours</h3>
                  </div>
                  <p className="text-lg">Mon–Sat: 9 AM to 7 PM</p>
                  <p className="text-sm opacity-80">Closed on Sundays</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center pt-8">
              <p className="text-white/90 mb-4">Follow us on social media</p>
              <div className="flex justify-center space-x-4">
                <Button variant="secondary-hero" size="icon">
                  <span className="sr-only">Facebook</span>
                  📘
                </Button>
                <Button variant="secondary-hero" size="icon">
                  <span className="sr-only">Instagram</span>
                  📷
                </Button>
                <Button variant="secondary-hero" size="icon">
                  <span className="sr-only">Twitter</span>
                  🐦
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;