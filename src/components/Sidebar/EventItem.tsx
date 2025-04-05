// src/components/Sidebar/EventItem.tsx
import React from 'react';
import { Calendar, MapPin, CheckCircle, X } from 'lucide-react';
import { Event } from '../types';

interface EventItemProps {
  event: Event;
  isCompleted?: boolean;
  showUnregister?: boolean;
  onUnregister?: (eventId: number) => void;
}

export const EventItem: React.FC<EventItemProps> = ({
  event,
  isCompleted = false,
  showUnregister = false,
  onUnregister,
}) => (
  <div className={`border rounded-lg p-3 ${isCompleted ? 'bg-gray-50' : ''}`}>
    <div className="flex justify-between items-start">
      <h4 className="font-medium">{event.title}</h4>
      {showUnregister && onUnregister && (
        <button 
          onClick={() => onUnregister(event.id)}
          className="text-red-500 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
    <div className="mt-2 space-y-1 text-sm text-gray-600">
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        {event.date}
      </div>
      <div className="flex items-center">
        <MapPin className="w-4 h-4 mr-2" />
        {event.location}
      </div>
      {isCompleted && event.attended && (
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-4 h-4 mr-2" />
          Attended
        </div>
      )}
    </div>
  </div>
);