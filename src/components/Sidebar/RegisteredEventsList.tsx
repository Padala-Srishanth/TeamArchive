// src/components/Sidebar/RegisteredEventsList.tsx
import React from 'react';
import { Clock } from 'lucide-react';
import { EventItem } from './EventItem';
import { Event } from '../types';

interface RegisteredEventsListProps {
  events: Event[];
  onUnregister: (eventId: number) => void;
}

export const RegisteredEventsList: React.FC<RegisteredEventsListProps> = ({
  events,
  onUnregister,
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-3 flex items-center">
      <Clock className="w-5 h-5 mr-2 text-blue-500" />
      Upcoming Events ({events.length})
    </h3>
    {events.length === 0 ? (
      <p className="text-sm text-gray-500">No upcoming events</p>
    ) : (
      <div className="space-y-3">
        {events.map(event => (
          <EventItem 
            key={event.id} 
            event={event} 
            showUnregister 
            onUnregister={onUnregister} 
          />
        ))}
      </div>
    )}
  </div>
);