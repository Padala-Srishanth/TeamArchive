// src/components/Sidebar/CompletedEventsList.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { EventItem } from './EventItem';
import { Event } from '../types';

interface CompletedEventsListProps {
  events: Event[];
}

export const CompletedEventsList: React.FC<CompletedEventsListProps> = ({ events }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3 flex items-center">
      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
      Completed Events ({events.length})
    </h3>
    {events.length === 0 ? (
      <p className="text-sm text-gray-500">No completed events</p>
    ) : (
      <div className="space-y-3">
        {events.map(event => (
          <EventItem 
            key={event.id} 
            event={event} 
            isCompleted 
          />
        ))}
      </div>
    )}
  </div>
);