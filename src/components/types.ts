export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  area: string;
  organizer: string;
  category: string;
  spots: number;
  isPaid: boolean;
  price?: number;
  completed: boolean;
  attended: boolean;
  attendees: string[];
  certificates: Certificate[];
  imageUrl?: string; 
  registrations?: number; // Added based on your usage in App.tsx
}

export type AuthStep = 'initial' | 'student' | 'organizer'; // Updated based on your App.tsx

export interface UserCredentials {
  email: string;
  password: string;
  studentId?: string;
  department?: string;
  organizationName?: string;
  position?: string;
}

export type UserType = 'student' | 'organizer'; // Simplified based on your App.tsx

export interface FilterOptions {
  category: string;
  area: string;
  paymentType: string;
  creatorFilter: string;
}

export interface Certificate {
  id: string; // Changed to string based on your usage
  eventId: number;
  eventName: string;
  studentId: string;
  issueDate: string;
  template: string;
}

export interface Badge {
  id: string;
  name: string;
  discount: number;
  expiry: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  badges: Badge[];
  certificates: Certificate[];
  discounts: number;
}

export interface AttendanceList {
  [eventId: number]: string[];
}