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
  // Step 1: User info and service selection
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceId: '',
    message: ''
  });
  
  // Step 2: Date and time selection
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // UI State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get selected service details
  const selectedService = services.find(s => s.id === formData.serviceId);
  
  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, serviceId }));
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
  
  const handleNextStep = () => {
    if (step === 1 && formData.serviceId) {
      setStep(2);
    } else if (step === 2 && selectedDate && selectedTime) {
      setStep(3);
    }
  };
  
  // Check if form is valid for step 1
  const isStep1Valid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.serviceId !== ''
    );
  };
  
  // Check if form is valid for step 2
  const isStep2Valid = () => {
    return selectedDate !== null && selectedTime !== '';
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1 as 1 | 2 | 3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    setIsSubmitting(true);
    
    try {
      // Create form data for submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('firstName', formData.firstName);
      formDataToSubmit.append('lastName', formData.lastName);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('serviceId', formData.serviceId);
      formDataToSubmit.append('serviceName', selectedService.name);
      formDataToSubmit.append('date', selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '');
      formDataToSubmit.append('time', selectedTime);
      formDataToSubmit.append('message', formData.message);
      
      // In a real app, you would make an API call here
      console.log('Booking details:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        service: {
          id: selectedService.id,
          name: selectedService.name,
          type: selectedService.type,
        },
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
        time: selectedTime,
        message: formData.message
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setStep(1);
      setSelectedDate(null);
      setSelectedTime('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceId: '',
        message: ''
      });
      
      // Show success message
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <Input 
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <Input 
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <Input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <Input 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Tell us about your condition or goals (optional)</label>
          <Textarea 
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={3}
          />
        </div>
      </div>
      
      {/* Service Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select a Service</h3>
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleServiceSelect(service.id)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                formData.serviceId === service.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className="font-medium">{service.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                {service.description}
              </div>
              {service.details.rating && (
                <div className="flex items-center mt-2 text-sm text-amber-600">
                  {'★'.repeat(Math.floor(service.details.rating))}
                  {'☆'.repeat(5 - Math.floor(service.details.rating))}
                  <span className="ml-2 text-gray-600">
                    ({service.details.rating.toFixed(1)})
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Select a Date</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                const prevMonth = new Date(currentMonth);
                prevMonth.setMonth(prevMonth.getMonth() - 1);
                setCurrentMonth(prevMonth);
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              &lt;
            </button>
            <span className="font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button 
              onClick={() => {
                const nextMonth = new Date(currentMonth);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                setCurrentMonth(nextMonth);
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth().map(({date, isCurrentMonth}, index) => {
            const isSelectable = isDateSelectable(date);
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isCurrent = isToday(date);
            
            return (
              <button
                key={index}
                onClick={() => isSelectable && handleDateSelect(date)}
                disabled={!isSelectable}
                className={`h-10 rounded-full flex flex-col items-center justify-center text-sm
                  ${isSelected ? 'bg-primary text-white' : ''}
                  ${!isCurrentMonth ? 'text-gray-400' : ''}
                  ${!isSelectable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                  ${isCurrent ? 'border border-primary font-medium' : ''}
                `}
              >
                <span>{format(date, 'd')}</span>
                {isCurrent && (
                  <span className="w-1 h-1 rounded-full bg-primary mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          disabled={!selectedDate}
          onClick={() => setStep(2)}
          className="mt-4"
        >
          Next: Select Time
        </Button>
      </div>
    </div>
  );

  const renderServiceDetails = (service: ServiceDetails) => {
    switch (service.type) {
      case 'physiotherapy':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Therapist</h4>
                <p className="text-gray-600">{service.details.name}</p>
              </div>
              <div>
                <h4 className="font-medium">Qualification</h4>
                <p className="text-gray-600">{service.details.qualification}</p>
              </div>
              <div>
                <h4 className="font-medium">Experience</h4>
                <p className="text-gray-600">{service.details.experience}</p>
              </div>
              <div>
                <h4 className="font-medium">Worked At</h4>
                <p className="text-gray-600">{service.details.workedAt}</p>
              </div>
              <div>
                <h4 className="font-medium">Available Time</h4>
                <p className="text-gray-600">{service.details.availableTime}</p>
              </div>
              <div>
                <h4 className="font-medium">Rating</h4>
                <div className="flex items-center text-amber-500">
                  {service.details.rating && (
                    <>
                      {'★'.repeat(Math.floor(service.details.rating))}
                      {'☆'.repeat(5 - Math.floor(service.details.rating))}
                      <span className="ml-2 text-gray-600">
                        ({service.details.rating.toFixed(1)})
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium">Address</h4>
                <p className="text-gray-600">{service.details.address}</p>
              </div>
            </div>
            
            {service.details.reviews && service.details.reviews.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Recent Reviews</h4>
                <div className="space-y-3">
                  {service.details.reviews.map((review, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3 py-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{review.author}</span>
                        <span className="text-amber-500">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      <p className="text-gray-400 text-xs">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'fitness':
      case 'sports':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Owner</h4>
                <p className="text-gray-600">{service.details.owner}</p>
              </div>
              {service.details.trainer && (
                <div>
                  <h4 className="font-medium">
                    {service.type === 'fitness' ? 'Head Trainer' : 'Head Coach'}
                  </h4>
                  <p className="text-gray-600">{service.details.trainer}</p>
                </div>
              )}
              <div>
                <h4 className="font-medium">Service Since</h4>
                <p className="text-gray-600">{service.details.serviceSince}</p>
              </div>
              <div>
                <h4 className="font-medium">Available Time</h4>
                <p className="text-gray-600">{service.details.availableTime}</p>
              </div>
              <div>
                <h4 className="font-medium">Age Group</h4>
                <p className="text-gray-600">{service.details.ageGroup}</p>
              </div>
              <div>
                <h4 className="font-medium">Rating</h4>
                <div className="flex items-center text-amber-500">
                  {service.details.rating && (
                    <>
                      {'★'.repeat(Math.floor(service.details.rating))}
                      {'☆'.repeat(5 - Math.floor(service.details.rating))}
                      <span className="ml-2 text-gray-600">
                        ({service.details.rating.toFixed(1)})
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium">Address</h4>
                <p className="text-gray-600">{service.details.address}</p>
              </div>
              {service.details.specialFeatures && (
                <div className="md:col-span-2">
                  <h4 className="font-medium">Special Features</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {service.details.specialFeatures.map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {service.details.achievements && service.details.achievements.length > 0 && (
                <div className="md:col-span-2">
                  <h4 className="font-medium">Achievements</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.details.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {service.details.reviews && service.details.reviews.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Recent Reviews</h4>
                <div className="space-y-3">
                  {service.details.reviews.map((review, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3 py-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{review.author}</span>
                        <span className="text-amber-500">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      <p className="text-gray-400 text-xs">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold">Select Date & Time</h3>
        <button 
          onClick={() => setStep(1)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {selectedService && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Selected Service: {selectedService.name}</h4>
          <div className="text-sm text-gray-600">
            {renderServiceDetails(selectedService)}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-4">
          {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </p>
        
        <div className="grid grid-cols-1 gap-2">
          {selectedService?.timeSlots.map((slot) => {
            const isBooked = selectedDate ? isSlotBooked(selectedDate, slot.time) : false;
            const isSelected = selectedTime === slot.time;
            const availableSlots = slot.maxClients - (isBooked ? slot.bookedClients : 0);
            const isAvailable = availableSlots > 0;
            
            return (
              <button
                key={slot.id}
                onClick={() => isAvailable && handleTimeSelect(slot.time)}
                disabled={!isAvailable}
                className={`p-4 rounded-lg border text-left transition-colors relative
                  ${isSelected ? 'border-primary bg-primary/10' : 'border-gray-200'}
                  ${!isAvailable 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'hover:border-primary hover:bg-primary/5'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{slot.time}</div>
                    <div className="text-sm text-gray-500">
                      {!isTimeSlotAvailable(slot.time, selectedDate) 
                        ? 'Not available'
                        : isAvailable 
                          ? `${availableSlots} slot${availableSlots > 1 ? 's' : ''} available`
                          : 'Fully booked'}
                    </div>
                  </div>
                  {isSelected && <span className="text-primary text-lg">✓</span>}
                </div>
                {!isTimeSlotAvailable(slot.time, selectedDate) && (
                  <div className="absolute inset-0 bg-white/70 rounded flex items-center justify-center">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                      Past Time
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button 
          type="button" 
          disabled={!selectedTime}
          onClick={() => setStep(3)}
        >
          Next: Your Details
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{selectedService?.name}</p>
              <p className="text-sm text-gray-600">
                {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
              </p>
              {selectedService && (
                <div className="mt-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {selectedService.details.address}
                  </p>
                  {selectedService.details.trainer && (
                    <p className="text-gray-700">
                      <span className="font-medium">
                        {selectedService.type === 'physiotherapy' ? 'Therapist' : 'Trainer'}:
                      </span>{' '}
                      {selectedService.details.trainer}
                    </p>
                  )}
                </div>
              )}
            </div>
            <button 
              type="button" 
              onClick={() => setStep(2)}
              className="text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap ml-4"
            >
              Change
            </button>
          </div>
        </div>
        
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input 
              placeholder="First Name" 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input 
              placeholder="Last Name" 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input 
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input 
            type="tel" 
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Tell us about your condition or goals (optional)
          </label>
          <Textarea 
            placeholder="Any specific concerns or goals you'd like to discuss?" 
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button type="submit">
          Book Appointment
        </Button>
      </div>
    </form>
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
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
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