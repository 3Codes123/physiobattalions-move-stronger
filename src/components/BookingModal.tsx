import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { addDays, format, isToday, isWeekend, isBefore, isAfter, parseISO, isSameDay } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

// Types
type ServiceType = 'physiotherapy' | 'fitness' | 'sports';

interface TimeSlot {
  id: number;
  time: string;
  maxClients: number;
  bookedClients: number;
}

interface ServiceDetails {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  timeSlots: TimeSlot[];
  details: {
    name?: string;
    qualification?: string;
    experience?: string;
    availableTime?: string;
    address?: string;
    rating?: number;
    duration?: string;
  };
}

interface FormData {
  service: string;
  serviceId: string;
  date: Date | null;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  otp: string;
}
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: string;

  id: string;
  name: string;
  type: 'physiotherapy' | 'fitness' | 'sports';
  description: string;
  timeSlots: Array<{
    id: number;
    time: string;
    maxClients: number;
    bookedClients: number;
  }>;
  details: {
    name?: string;
    qualification?: string;
  };
}
const services: ServiceDetails[] = [
  {
    id: 'physio-1',
    name: 'Physiotherapy',
    type: 'physiotherapy',
    description: 'Professional therapy sessions for rehabilitation and pain management',
    timeSlots: [
      { id: 1, time: '9:00 AM - 12:00 PM', maxClients: 5, bookedClients: 0 },
      { id: 2, time: '1:00 PM - 4:00 PM', maxClients: 5, bookedClients: 0 },
      { id: 3, time: '5:00 PM - 9:00 PM', maxClients: 5, bookedClients: 0 },
    ],
    details: {
      name: 'Dr. Sarah Johnson',
      qualification: 'DPT, OCS',
      experience: '8 years',
      availableTime: '9:00 AM - 9:00 PM',
      address: '123 Health Street, Medical Complex, Pune',
      rating: 4.8
    }
  },
  {
    id: 'fitness-1',
    name: 'Personal Training',
    type: 'fitness',
    description: 'Customized fitness programs to help you achieve your goals',
    timeSlots: [
      { id: 4, time: '6:00 AM - 8:00 AM', maxClients: 3, bookedClients: 0 },
      { id: 5, time: '5:00 PM - 9:00 PM', maxClients: 3, bookedClients: 0 },
    ],
    details: {
      name: 'Alex Rodriguez',
      qualification: 'NASM, ACE',
      experience: '5 years',
      availableTime: '6:00 AM - 9:00 PM',
      address: '456 Fitness Avenue, Gym Complex, Pune',
      rating: 4.9
    }
  },
  {
    id: 'sports-1',
    name: 'Sports Massage',
    type: 'sports',
    description: 'Specialized massage therapy for athletes and active individuals',
    timeSlots: [
      { id: 6, time: '10:00 AM - 1:00 PM', maxClients: 4, bookedClients: 0 },
      { id: 7, time: '3:00 PM - 8:00 PM', maxClients: 4, bookedClients: 0 },
    ],
    details: {
      name: 'Mike Johnson',
      qualification: 'LMT, CES',
      experience: '6 years',
      availableTime: '10:00 AM - 8:00 PM',
      address: '789 Sports Lane, Athletic Center, Pune',
      rating: 4.7
    }
  }
];

const timeSlots: TimeSlot[] = [
  { id: 1, time: '9:00 AM - 10:00 AM', maxClients: 10, bookedClients: 0 },
  { id: 2, time: '10:00 AM - 11:00 AM', maxClients: 10, bookedClients: 0 },
  { id: 3, time: '11:00 AM - 12:00 PM', maxClients: 10, bookedClients: 0 },
  { id: 4, time: '2:00 PM - 3:00 PM', maxClients: 10, bookedClients: 0 },
  { id: 5, time: '3:00 PM - 4:00 PM', maxClients: 10, bookedClients: 0 },
  { id: 6, time: '4:00 PM - 5:00 PM', maxClients: 10, bookedClients: 0 },
];

const BookingModalContent: React.FC<BookingModalProps> = ({ isOpen, onClose, service: initialService = '' }) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    service: '',
    serviceId: '',
    date: null,
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    otp: ''
  });

  // Initialize with service if provided
  useEffect(() => {
    if (initialService) {
      const service = services.find(s => s.id === initialService);
      if (service) {
        setSelectedService(service);
        setFormData(prev => ({
          ...prev,
          service: service.name,
          serviceId: service.id
        }));
        setStep(1); // Skip to date selection if service is pre-selected
      }
    }
  }, [initialService]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle service selection
  const handleServiceSelect = (service: ServiceDetails) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      service: service.name,
      serviceId: service.id
    }));
    nextStep();
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      date,
      time: '' // Reset time when date changes
    }));
    nextStep();
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({
      ...prev,
      time
    }));
    nextStep();
  };

  // Navigate to next step
  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  // Navigate to previous step
  const prevStep = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: 'We have sent a 6-digit code to your email',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send OTP. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (formData.otp.length !== 6) {
      toast({
        title: 'Error',
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, verify the OTP with your backend
      setOtpVerified(true);
      nextStep(); // Move to confirmation step
      
      toast({
        title: 'Success',
        description: 'Email verified successfully!',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid OTP. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 3 && !otpSent) {
      await handleSendOtp();
      return;
    }
    
    if (step === 4 && !otpVerified) {
      await handleVerifyOtp();
      return;
    }
    
    if (step === 5) {
      // Handle final submission
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: 'Booking Confirmed!',
          description: `Your ${formData.service} appointment has been scheduled.`,
          variant: 'default'
        });
        
        // Reset form and close modal after successful submission
        setFormData({
          service: '',
          serviceId: '',
          date: null,
          time: '',
          name: '',
          email: '',
          phone: '',
          notes: '',
          otp: ''
        });
        setStep(0);
        setOtpSent(false);
        setOtpVerified(false);
        onClose();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to book appointment. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Render service selection step
  const renderServiceSelection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Select a Service</h3>
      <div className="grid gap-4">
        {services.map((service) => (
          <div 
            key={service.id}
            className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => handleServiceSelect(service)}
          >
            <h4 className="font-medium">{service.name}</h4>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Render date selection step
  const renderDateSelection = () => {
    const today = new Date();
    const availableDates = Array.from({ length: 14 }, (_, i) => addDays(today, i + 1))
      .filter(date => !isWeekend(date));

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Select a Date</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {availableDates.map((date) => (
            <Button
              key={date.toString()}
              variant={formData.date && isSameDay(date, formData.date) ? 'default' : 'outline'}
              className="flex-col h-auto py-3"
              onClick={() => handleDateSelect(date)}
            >
              <div className="text-sm">{format(date, 'EEE')}</div>
              <div className="text-lg font-medium">{format(date, 'd')}</div>
              <div className="text-xs text-muted-foreground">{format(date, 'MMM')}</div>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // Render time selection step
  const renderTimeSelection = () => {
    if (!selectedService) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Select a Time Slot</h3>
        <div className="grid grid-cols-1 gap-2">
          {selectedService.timeSlots.map((slot) => (
            <Button
              key={slot.id}
              variant={formData.time === slot.time ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => handleTimeSelect(slot.time)}
              disabled={slot.bookedClients >= slot.maxClients}
            >
              <Clock className="w-4 h-4 mr-2" />
              {slot.time}
              {slot.bookedClients >= slot.maxClients && (
                <span className="ml-2 text-xs text-muted-foreground">Fully Booked</span>
              )}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // Render contact form step
  const renderContactForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-medium">Your Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Input
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any special requirements or notes..."
          />
        </div>
      </div>
    </form>
  );

  // Render OTP verification step
  const renderOtpVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <Mail className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium">Check your email</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We've sent a verification code to <span className="font-medium">{formData.email}</span>
        </p>
        
        <div className="mt-6">
          <Label htmlFor="otp" className="text-left block mb-2">Enter 6-digit code</Label>
          <div className="flex items-center justify-center gap-2">
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={formData.otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFormData(prev => ({ ...prev, otp: value }));
              }}
              className="text-center text-lg font-mono tracking-widest h-14 w-48"
              placeholder="------"
            />
          </div>
          
          <div className="mt-4">
            <Button 
              type="button" 
              onClick={handleVerifyOtp}
              disabled={isLoading || formData.otp.length !== 6}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Verify & Book'
              )}
            </Button>
            
            <div className="mt-4 text-sm">
              <p className="text-muted-foreground">Didn't receive a code?</p>
              <button 
                type="button" 
                onClick={handleSendOtp}
                disabled={isLoading}
                className="text-primary hover:underline mt-1"
              >
                Resend code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render confirmation step
  const renderConfirmation = () => (
    <div className="text-center py-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Appointment Booked!</h3>
      <p className="text-muted-foreground mb-6">
        Your {formData.service} appointment has been scheduled for {formData.date && format(formData.date, 'EEEE, MMMM d, yyyy')} at {formData.time}.
      </p>
      
      <div className="bg-muted p-4 rounded-lg text-left space-y-2 mb-6">
        <p className="font-medium">Appointment Details</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Service:</span> {formData.service}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Date & Time:</span> {formData.date && format(formData.date, 'EEEE, MMMM d, yyyy')} at {formData.time}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Name:</span> {formData.name}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Email:</span> {formData.email}
        </p>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        A confirmation has been sent to your email. Please arrive 10 minutes before your scheduled time.
      </p>
      
      <div className="flex flex-col space-y-3">
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // Reset and start new booking
            setFormData({
              service: '',
              serviceId: '',
              date: null,
              time: '',
              name: '',
              email: formData.email, // Keep email for convenience
              phone: '',
              notes: '',
              otp: ''
            });
            setStep(0);
            setOtpSent(false);
            setOtpVerified(false);
          }}
        >
          Book Another Appointment
        </Button>
      </div>
    </div>
  );

  // Get current step title
  const getStepTitle = () => {
    switch (step) {
      case 0: return 'Select a Service';
      case 1: return 'Select a Date';
      case 2: return 'Select a Time';
      case 3: return 'Your Information';
      case 4: return 'Verify Your Email';
      case 5: return 'Booking Confirmed';
      default: return 'Book an Appointment';
    }
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (step) {
      case 0: return renderServiceSelection();
      case 1: return renderDateSelection();
      case 2: return renderTimeSelection();
      case 3: return renderContactForm();
      case 4: return renderOtpVerification();
      case 5: return renderConfirmation();
      default: return renderServiceSelection();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {step < 5 && step !== 4 && (
          <DialogHeader>
            <DialogTitle className="text-2xl">{getStepTitle()}</DialogTitle>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
        )}
        
        <div className="py-4">
          {renderCurrentStep()}
        </div>
        
        {/* Navigation buttons */}
        {step < 5 && step !== 4 && (
          <div className="flex justify-between pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={step === 0 ? onClose : prevStep}
            >
              {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            
            <Button 
              type="button" 
              onClick={step === 3 ? handleSubmit : nextStep}
              disabled={
                (step === 0 && !formData.serviceId) ||
                (step === 1 && !formData.date) ||
                (step === 2 && !formData.time) ||
                (step === 3 && (!formData.name || !formData.email || !formData.phone))
              }
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : step === 3 ? (
                'Send Verification Code'
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Error Boundary component for the modal
class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in BookingModal:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium">Something went wrong</h3>
          <p className="text-sm text-muted-foreground mb-4">We're having trouble loading the booking form.</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main BookingModal component with error boundary
const BookingModal: React.FC<BookingModalProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <BookingModalContent {...props} />
    </ErrorBoundary>
  );
};

export default BookingModal;
