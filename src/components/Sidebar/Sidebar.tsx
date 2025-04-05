// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import { X } from 'lucide-react';
import { RegisteredEventsList } from './RegisteredEventsList';
import { CompletedEventsList } from './CompletedEventsList';
import { Event } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  registeredEvents: Event[];
  completedEvents: Event[];
  onUnregister: (eventId: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  registeredEvents,
  completedEvents,
  onUnregister,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out">
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Events</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          <RegisteredEventsList 
            events={registeredEvents} 
            onUnregister={onUnregister} 
          />
          <CompletedEventsList 
            events={completedEvents} 
          />
        </div>
      </div>
    </div>
  );
};