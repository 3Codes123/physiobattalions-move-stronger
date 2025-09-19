export interface Review {
  rating: number;
  comment: string;
  author: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  capacity: number;
}

export interface Physiotherapist {
  id: string;
  type: 'physiotherapy';
  name: string;
  qualification: string;
  experience: number; // in years
  workedAt: string[];
  availability: {
    days: string[];
    hours: string;
  };
  timeSlots: TimeSlot[];
  address: string;
  reviews: Review[];
  imageUrl: string;
}

export interface FitnessClub {
  id: string;
  type: 'fitness';
  name: string;
  owner: string;
  trainers: string[];
  address: string;
  serviceSince: number; // year
  achievements: string[];
  availableTime: string;
  ageGroup: string;
  specialFeatures: string[];
  reviews: Review[];
  imageUrl: string;
}

export interface SportsAcademy {
  id: string;
  type: 'sports';
  name: string;
  owner: string;
  coaches: string[];
  address: string;
  serviceSince: number; // year
  achievements: string[];
  availableTime: string;
  ageGroup: string;
  specialFeatures: string[];
  reviews: Review[];
  imageUrl: string;
}

export type ServiceProvider = Physiotherapist | FitnessClub | SportsAcademy;

export const servicesData: ServiceProvider[] = [
  // Physiotherapists
  {
    id: 'physio-1',
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
    type: 'sports',
    name: 'Champion Sports Academy',
    owner: 'Suresh Patil',
    coaches: ['Arjun Das (Cricket)', 'Meera Deshpande (Tennis)'],
    address: '789 Sports Rd, Baner, Pune',
    serviceSince: 2018,
    achievements: ['U-19 Cricket Champions 2023'],
    availableTime: '7 AM to 7 PM',
    ageGroup: '10-25',
    specialFeatures: ['Professional Cricket Pitches', 'Clay Tennis Courts'],
    reviews: [
      { rating: 4.9, comment: 'Top-notch coaching for young athletes.', author: 'S. Iyer' },
    ],
    imageUrl: '/img/services/sports-1.jpg',
  },
];
