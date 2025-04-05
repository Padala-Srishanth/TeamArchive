// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import { Calendar, CheckCircle, Clock, MapPin, X } from 'lucide-react';
import { Event } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  registeredEvents: Event[];
  completedEvents: Event[];
  onUnregister: (eventId: number) => void;
  onMarkAsCompleted: (eventId: number, attended: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  registeredEvents,
  completedEvents,
  onUnregister,
  onMarkAsCompleted,
}) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Events</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Registered Events Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Upcoming Events ({registeredEvents.length})
            </h3>
            {registeredEvents.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {registeredEvents.map(event => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{event.title}</h4>
                      <button 
                        onClick={() => onUnregister(event.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
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
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => onMarkAsCompleted(event.id, true)}
                        className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded"
                      >
                        Attended
                      </button>
                      <button
                        onClick={() => onMarkAsCompleted(event.id, false)}
                        className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded"
                      >
                        Not Attended
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Events Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Completed Events ({completedEvents.length})
            </h3>
            {completedEvents.length === 0 ? (
              <p className="text-sm text-gray-500">No completed events</p>
            ) : (
              <div className="space-y-3">
                {completedEvents.map(event => (
                  <div key={event.id} className="border rounded-lg p-3 bg-gray-50">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      {event.attended !== undefined && (
                        <div className={`flex items-center ${
                          event.attended ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {event.attended ? 'Attended' : 'Not Attended'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};