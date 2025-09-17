import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Calendar as CalendarIcon, Clock as ClockIcon, X } from "lucide-react";
import { format, addDays, isToday, isWeekend, isBefore, isAfter, parseISO, isSameDay } from 'date-fns';

interface ServiceDetails {
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
    experience?: string;
    workedAt?: string;
    availableTime?: string;
    address?: string;
    owner?: string;
    trainer?: string;
    serviceSince?: string;
    achievements?: string[];
    ageGroup?: string;
    specialFeatures?: string[];
    rating?: number;
    reviews?: Array<{
      author: string;
      rating: number;
      comment: string;
      date: string;
    }>;
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
      workedAt: 'Apollo Hospitals, Fortis Healthcare',
      availableTime: '9:00 AM - 9:00 PM',
      address: '123 Health Street, Medical Complex, Pune',
      rating: 4.8,
      reviews: [
        { author: 'Rahul Sharma', rating: 5, comment: 'Excellent treatment and care', date: '2023-10-15' },
        { author: 'Priya Patel', rating: 4, comment: 'Professional and knowledgeable', date: '2023-10-10' }
      ]
    }
  },
  {
    id: 'fitness-1',
    name: 'Elite Fitness Club',
    type: 'fitness',
    description: 'Premium fitness training and wellness center',
    timeSlots: [
      { id: 4, time: '8:00 AM - 10:00 AM', maxClients: 15, bookedClients: 0 },
      { id: 5, time: '10:00 AM - 12:00 PM', maxClients: 15, bookedClients: 0 },
      { id: 6, time: '12:00 PM - 2:00 PM', maxClients: 15, bookedClients: 0 },
      { id: 7, time: '2:00 PM - 4:00 PM', maxClients: 15, bookedClients: 0 },
      { id: 8, time: '4:00 PM - 6:00 PM', maxClients: 15, bookedClients: 0 },
      { id: 9, time: '6:00 PM - 8:00 PM', maxClients: 15, bookedClients: 0 },
      { id: 10, time: '8:00 PM - 10:00 PM', maxClients: 15, bookedClients: 0 },
    ],
    details: {
      owner: 'Rajesh Kumar',
      trainer: 'Vikram Singh (ACE Certified)',
      address: '456 Fitness Avenue, Kalyani Nagar, Pune',
      serviceSince: '2015',
      availableTime: '6:00 AM - 10:00 PM',
      ageGroup: '16 years and above',
      specialFeatures: ['Cardio Zone', 'Weight Training', 'Zumba', 'Yoga', 'Personal Training'],
      achievements: ['Best Gym in Pune 2022', 'Certified by Indian Fitness Association'],
      rating: 4.6,
      reviews: [
        { author: 'Amit Desai', rating: 5, comment: 'Great facilities and trainers', date: '2023-10-12' },
        { author: 'Neha Gupta', rating: 4, comment: 'Clean and well-maintained', date: '2023-10-05' }
      ]
    }
  },
  {
    id: 'sports-1',
    name: 'Champion Sports Academy',
    type: 'sports',
    description: 'Professional sports training for all levels',
    timeSlots: [
      { id: 11, time: '6:00 AM - 8:00 AM', maxClients: 10, bookedClients: 0 },
      { id: 12, time: '4:00 PM - 6:00 PM', maxClients: 10, bookedClients: 0 },
      { id: 13, time: '6:00 PM - 8:00 PM', maxClients: 10, bookedClients: 0 },
    ],
    details: {
      owner: 'Vijay Malhotra',
      trainer: 'Coach Arjun Singh (NIS Certified)',
      address: '789 Sports Complex, Baner Road, Pune',
      serviceSince: '2018',
      availableTime: '6:00 AM - 8:00 PM',
      ageGroup: '8 years and above',
      specialFeatures: ['Cricket', 'Football', 'Tennis', 'Basketball', 'Athletics'],
      achievements: ['Produced state-level players', 'Affiliated with SAI'],
      rating: 4.7,
      reviews: [
        { author: 'Rohit Verma', rating: 5, comment: 'Excellent coaching staff', date: '2023-10-08' },
        { author: 'Ananya Joshi', rating: 4, comment: 'Great facilities for kids', date: '2023-09-28' }
      ]
    }
  }
];

// Helper function to get current IST time
const getCurrentIST = () => {
  return new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
};

// Mock function to check if a time slot is booked
const isSlotBooked = (date: Date, timeSlot: string) => {
  // In a real app, this would check against your backend
  const bookedSlots: Record<string, string[]> = {
    // Example: '2025-09-10': ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM']
  };
  
  const dateStr = format(date, 'yyyy-MM-dd');
  return bookedSlots[dateStr]?.includes(timeSlot) || false;
};

// Check if a date is selectable (not in the past and not a weekend)
const isDateSelectable = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isBefore(date, today) && !isWeekend(date);
};

// Check if a time slot is available based on current IST time
const isTimeSlotAvailable = (slotTime: string, selectedDate: Date | null): boolean => {
  if (!selectedDate) return false;
  
  // Get current IST time
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + (istOffset + now.getTimezoneOffset() * 60 * 1000));
  
  // If selected date is today, check if the time slot is in the future
  if (isToday(selectedDate)) {
    const [startTimeStr] = slotTime.split(' - ');
    const [hours, minutes] = startTimeStr.split(':').map(Number);
    const [period] = startTimeStr.split(' ').slice(-1);
    
    // Convert to 24-hour format
    let slotHour = hours;
    if (period === 'PM' && hours < 12) slotHour += 12;
    if (period === 'AM' && hours === 12) slotHour = 0;
    
    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(slotHour, minutes || 0, 0, 0);
    
    // If slot time is in the past, it's not available
    return slotDateTime > istTime;
  }
  
  // For future dates, all time slots are available
  return true;
};

const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // UI State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<{ serviceName: string; date: string; time: string } | null>(null);
  
  // Get selected service details
  const selectedService = services.find(s => s.id === selectedServiceId);
  
  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };
  

  // Generate days for the current month view with proper padding
  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Add padding for days from previous month
    const days = [];
    const startDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Add days from next month to complete the grid
    const daysToAdd = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= daysToAdd; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (isDateSelectable(date)) {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleSendOtp = async () => {
    if (formData.email.trim() === '') {
      alert('Please enter your email address.');
      return;
    }
    // In a real app, you would call an API to send the OTP
    console.log(`Sending OTP to ${formData.email}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsOtpSent(true);
    alert('An OTP has been sent to your email.');
  };

  const handleVerifyOtp = async () => {
    // In a real app, you would verify the OTP with your backend
    if (otp === '123456') { // Mock OTP
      setIsEmailVerified(true);
      alert('Email verified successfully!');
      setStep(2);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleNextStep = () => {
    if (step === 1 && isStep1Valid()) {
      handleVerifyOtp(); // Step 1 is now user info + OTP
    } else if (step === 2 && isStep2Valid()) {
      setStep(3);
    } else if (step === 3 && isStep3Valid()) {
      setStep(4);
    }
  };
  
  // Step 1: User Info & OTP
  const isStep1Valid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      isEmailVerified
    );
  };

  // Step 2: Service Selection
  const isStep2Valid = () => {
    return selectedServiceId !== '';
  };

  // Step 3: Date & Time Selection
  const isStep3Valid = () => {
    return selectedDate !== null && selectedTime !== '';
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1 as 1 | 2 | 3 | 4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;

    // Final validation for user info
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.email.trim() === '' ||
      formData.phone.trim() === ''
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would make an API call here
      console.log('Booking details:', {
        ...formData,
        service: {
          id: selectedService.id,
          name: selectedService.name,
        },
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store details for confirmation modal
      setConfirmedBookingDetails({
        serviceName: selectedService.name,
        date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
        time: selectedTime,
      });

      // Reset form
      setStep(1);
      setSelectedServiceId('');
      setSelectedDate(null);
      setSelectedTime('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Your Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name *</label>
          <Input value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name *</label>
          <Input value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number *</label>
        <Input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email *</label>
        <div className="flex gap-2">
          <Input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required disabled={isOtpSent} />
          <Button type="button" onClick={handleSendOtp} disabled={isOtpSent}>Send OTP</Button>
        </div>
      </div>
      {isOtpSent && !isEmailVerified && (
        <div>
          <label className="block text-sm font-medium mb-1">Enter OTP *</label>
          <div className="flex gap-2">
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" />
            <Button type="button" onClick={handleVerifyOtp}>Verify</Button>
          </div>
        </div>
      )}
      <div className="flex justify-end pt-4">
        <Button type="button" onClick={handleNextStep} disabled={!isEmailVerified}>
          Next: Select Service
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold">Select a Service</h3>
        <button type="button" onClick={handlePrevStep} className="text-gray-500 hover:text-gray-700" aria-label="Back">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => handleServiceSelect(service.id)}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              selectedServiceId === service.id 
                ? 'border-primary bg-primary/10' 
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className="font-medium">{service.name}</div>
            <div className="text-sm text-gray-500 mt-1">{service.description}</div>
          </button>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={handlePrevStep}>Back</Button>
        <Button type="button" disabled={!isStep2Valid()} onClick={handleNextStep}>
          Next: Select Date & Time
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold">Select Date & Time</h3>
        <button type="button" onClick={handlePrevStep} className="text-gray-500 hover:text-gray-700" aria-label="Back">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {selectedService && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium">Selected Service: {selectedService.name}</h4>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Select a Date</h3>
            <div className="flex space-x-2 items-center">
              <button type="button" onClick={() => setCurrentMonth(prev => addDays(prev, -30))} className="p-1 rounded-full hover:bg-gray-100" aria-label="Previous month">&lt;</button>
              <span className="font-medium text-sm">{format(currentMonth, 'MMMM yyyy')}</span>
              <button type="button" onClick={() => setCurrentMonth(prev => addDays(prev, 30))} className="p-1 rounded-full hover:bg-gray-100" aria-label="Next month">&gt;</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth().map(({date, isCurrentMonth}, index) => {
              const isSelectable = isDateSelectable(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => isSelectable && handleDateSelect(date)}
                  disabled={!isSelectable}
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition-colors ${isSelected ? 'bg-primary text-white' : ''} ${!isCurrentMonth ? 'text-gray-300' : ''} ${!isSelectable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                  {format(date, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Select a Time Slot</h3>
          {selectedDate ? (
            <div className="grid grid-cols-1 gap-2">
              {selectedService?.timeSlots.map((slot) => {
                const isBooked = isSlotBooked(selectedDate, slot.time);
                const isAvailable = isTimeSlotAvailable(slot.time, selectedDate) && !isBooked;
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => isAvailable && handleTimeSelect(slot.time)}
                    disabled={!isAvailable}
                    className={`p-3 rounded-lg border text-left transition-colors w-full relative ${isSelected ? 'border-primary bg-primary/10' : 'border-gray-200'} ${!isAvailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{slot.time}</div>
                      <div className={`text-xs font-semibold px-2 py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isAvailable ? 'Available' : 'Booked'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 pt-4">Please select a date to see available times.</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={handlePrevStep}>Back</Button>
        <Button type="button" disabled={!isStep3Valid()} onClick={handleNextStep}>Next: Confirm Booking</Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold">Confirm Your Appointment</h3>
        <button type="button" onClick={handlePrevStep} className="text-gray-500 hover:text-gray-700" aria-label="Back">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg space-y-3">
        <div>
          <p className="font-medium text-gray-500 text-sm">Your Details</p>
          <p className="text-gray-800">{formData.firstName} {formData.lastName}</p>
          <p className="text-gray-600 text-sm">{formData.email} | {formData.phone}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 text-sm">Selected Service</p>
          <p className="text-gray-800">{selectedService?.name}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 text-sm">Date & Time</p>
          <p className="text-gray-800">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}</p>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={handlePrevStep}>Back</Button>
        <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </Button>
      </div>
    </div>
  );

  const renderConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
            <CardHeader className="text-center bg-green-50 p-6">
                <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
                    <span className="text-4xl">🎉</span>
                </div>
                <CardTitle className="text-2xl font-bold text-green-800 mt-4">Congratulations!</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
                <p className="text-gray-700 mb-4">Your appointment has been successfully booked.</p>
                {confirmedBookingDetails && (
                  <div className="text-left bg-gray-50 p-4 rounded-lg border">
                      <p className="font-semibold text-gray-800">
                          Service: <span className="font-normal text-gray-600">{confirmedBookingDetails.serviceName}</span>
                      </p>
                      <p className="font-semibold text-gray-800 mt-2">
                          Date: <span className="font-normal text-gray-600">{confirmedBookingDetails.date}</span>
                      </p>
                      <p className="font-semibold text-gray-800 mt-2">
                          Time: <span className="font-normal text-gray-600">{confirmedBookingDetails.time}</span>
                      </p>
                  </div>
                )}
                <Button 
                    onClick={() => setShowConfirmation(false)} 
                    className="mt-6 w-full bg-primary text-white"
                >
                    Done
                </Button>
            </CardContent>
        </Card>
    </div>
  );

  return (
    <section id="contact" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Book Your Session
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Schedule your appointment with our experts and take the first step towards better health.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Booking Form */}
          <Card className="shadow-strong border-0">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  1
                </div>
                <div className={`h-1 w-8 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  2
                </div>
                <div className={`h-1 w-8 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  3
                </div>
                <div className={`h-1 w-8 ${step >= 4 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 4 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  4
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </CardContent>
          </Card>

          {showConfirmation && renderConfirmationModal()}

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
