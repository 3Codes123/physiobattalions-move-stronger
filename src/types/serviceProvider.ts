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

export interface BaseServiceProvider {
  id: string;
  type: string;
  name: string;
  address: string;
  reviews: Review[];
  photos: string[]; // Array of photo URLs
  imageUrl: string;
}

export interface Physiotherapist extends BaseServiceProvider {
  type: 'physiotherapy';
  qualification: string;
  experience: number; // in years
  workedAt: string[];
  availability: {
    days: string[];
    hours: string;
  };
  timeSlots: TimeSlot[];
}

export interface FitnessClub extends BaseServiceProvider {
  type: 'fitness';
  owner: string;
  trainers: string[];
  serviceSince: number; // year
  achievements: string[];
  availableTime: string;
  ageGroup: string;
  specialFeatures: string[];
}

export interface SportsAcademy extends BaseServiceProvider {
  type: 'sports';
  owner: string;
  sports: string[];
  coaches: string[];
  established: number; // year
  facilities: string[];
  availableTime: string;
  ageGroup: string;
}

export type ServiceProvider = Physiotherapist | FitnessClub | SportsAcademy;
