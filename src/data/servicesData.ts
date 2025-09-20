import { ServiceProvider, Review, TimeSlot } from '@/types/serviceProvider';

export const servicesData: ServiceProvider[] = [
  // Physiotherapists
  {
    id: 'physio-1',
    photos: [
      '/img/fwdcommunityphysio/physio1-1.jpg',
      '/img/fwdcommunityphysio/physio1-2.jpg'
    ],
    type: 'physiotherapy',
    name: 'Dr. Anjali Sharma',
    qualification: 'MPT (Orthopedics)',
    experience: 12,
    workedAt: ['Apollo Hospital', 'Max Healthcare'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '9 AM to 8 PM',
    },
    timeSlots: [
      { start: '09:00', end: '12:00', capacity: 5 },
      { start: '13:00', end: '16:00', capacity: 5 },
      { start: '16:00', end: '19:00', capacity: 5 },
    ],
    address: '123 Health St, Viman Nagar, Pune',
    reviews: [
      { rating: 5, comment: 'Excellent treatment and care.', author: 'R. Singh' },
    ],
    imageUrl: '/img/services/physio-1.jpg',
  },
  {
    id: 'physio-2',
    photos: [
      '/img/fwdcommunityphysio/physio2-1.jpg',
      '/img/fwdcommunityphysio/physio2-2.jpg'
    ],
    type: 'physiotherapy',
    name: 'Dr. Anjali Sharma',
    qualification: 'MPT (Orthopedics)',
    experience: 12,
    workedAt: ['Apollo Hospital', 'Max Healthcare'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '9 AM to 8 PM',
    },
    timeSlots: [
      { start: '09:00', end: '12:00', capacity: 5 },
      { start: '13:00', end: '16:00', capacity: 5 },
      { start: '16:00', end: '19:00', capacity: 5 },
    ],
    address: '123 Health St, Viman Nagar, Pune',
    reviews: [
      { rating: 5, comment: 'Excellent treatment and care.', author: 'R. Singh' },
    ],
    imageUrl: '/img/services/physio-1.jpg',
  },

  // Fitness Clubs
  {
    id: 'fitness-1',
    photos: [
      '/img/fwdfitness/fitness1-1.jpg',
      '/img/fwdfitness/fitness1-2.jpg'
    ],
    type: 'fitness',
    name: 'Elite Fitness Club',
    owner: 'Rohan Verma',
    trainers: ['Vikram Singh', 'Priya Mehta'],
    address: '456 Fitness Ave, Koregaon Park, Pune',
    serviceSince: 2015,
    achievements: ['Best Gym in Pune 2022'],
    availableTime: '6 AM to 10 PM',
    ageGroup: '18+',
    specialFeatures: ['Cardio Zone', 'CrossFit', 'Yoga Classes'],
    reviews: [
      { rating: 4.8, comment: 'Great equipment and trainers.', author: 'A. Patel' },
    ],
    imageUrl: '/img/services/fitness-1.jpg',
  },
  {
    id: 'fitness-2',
    photos: [
      '/img/fwdfitness/fitness2-1.jpg',
      '/img/fwdfitness/fitness2-2.jpg'
    ],
    type: 'fitness',
    name: 'Elite Fitness Club',
    owner: 'Rohan Verma',
    trainers: ['Vikram Singh', 'Priya Mehta'],
    address: '456 Fitness Ave, Koregaon Park, Pune',
    serviceSince: 2015,
    achievements: ['Best Gym in Pune 2022'],
    availableTime: '6 AM to 10 PM',
    ageGroup: '18+',
    specialFeatures: ['Cardio Zone', 'CrossFit', 'Yoga Classes'],
    reviews: [
      { rating: 4.8, comment: 'Great equipment and trainers.', author: 'A. Patel' },
    ],
    imageUrl: '/img/services/fitness-1.jpg',
  },

  // Sports Academies
  {
    id: 'sports-1',
    photos: [
      '/img/fwdcardio/sports1-1.jpg',
      '/img/fwdcardio/sports1-2.jpg'
    ],
    type: 'sports',
    name: 'Champion Sports Academy',
    owner: 'Suresh Patil',
    sports: ['Cricket', 'Tennis', 'Badminton'],
    coaches: ['Arjun Das (Cricket)', 'Meera Deshpande (Tennis)'],
    address: '789 Sports Rd, Baner, Pune',
    established: 2018,
    facilities: ['Professional Cricket Pitches', 'Clay Tennis Courts', 'Swimming Pool'],
    availableTime: '6 AM to 9 PM',
    ageGroup: '5-25',
    reviews: [
      { rating: 4.9, comment: 'Top-notch coaching for young athletes.', author: 'S. Iyer' },
    ],
    imageUrl: '/img/services/sports-1.jpg',
  },
];
