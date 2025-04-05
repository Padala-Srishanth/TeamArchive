export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  area: string; // Add this line
  organizer: string;
  category: string;
  spots: number;
  isPaid: boolean;
  price?: number; // Optional, as not all events have a price
  completed: boolean;
  attended: boolean;
}