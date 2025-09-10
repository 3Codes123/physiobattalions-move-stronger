import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const timeSlots = [
  { id: 1, time: '9:00 AM - 11:00 AM' },
  { id: 2, time: '11:00 AM - 1:00 PM' },
  { id: 3, time: '2:00 PM - 4:00 PM' },
];

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  service: string;
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedSlot(null);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) return;
    // Here you would typically make an API call to book the appointment
    alert(`Booked ${service} on ${selectedDate.toDateString()} at ${selectedSlot}`);
    onClose();
  };

  // Generate dates for the next 7 days
  const today = new Date();
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book {service}</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Select a Date
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {availableDates.map((date) => {
                const dateString = date.toISOString().split('T')[0];
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNumber = date.getDate();
                const isSelected = selectedDate?.toDateString() === date.toDateString();

                return (
                  <button
                    key={dateString}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-accent hover:text-accent-foreground border-border'
                    }`}
                  >
                    <span className="text-sm font-medium">{dayName}</span>
                    <span className="text-lg font-bold">{dayNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Available Time Slots
              </h3>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedSlot === slot.time
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-accent hover:text-accent-foreground border-border'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedSlot}
            className="w-full mt-6 py-6 text-base"
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
