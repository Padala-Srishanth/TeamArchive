import React from 'react';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  userType: 'student' | 'organizer';
  isRegistered: boolean;
  isCompleted: boolean;
  isAttended: boolean;
  spotsAvailable: number;
  onRegister: (event: Event) => void;
  onManage?: (event: Event) => void;
  isCreatedByUser?: boolean;
  onMarkAsCompleted?: () => void;
  onTakeAttendance?: () => void;
  stats?: any;
  userDiscount?: number;
  hasCertificate?: boolean;
  onEventClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  userType,
  isRegistered,
  isCompleted,
  isAttended,
  spotsAvailable,
  onRegister,
  onManage,
  isCreatedByUser,
  onMarkAsCompleted,
  onTakeAttendance,
  stats,
  userDiscount,
  hasCertificate,
  onEventClick
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 h-full flex flex-col cursor-pointer"
      onClick={() => onEventClick(event)} // Trigger the event click handler
    >
      {/* Image Container */}
      <div className="h-48 w-full overflow-hidden relative">
        <img 
          src={event.imageUrl || '/default-event.jpg'} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-event.jpg';
          }}
        />
        {/* Optional: Badge for event status */}
        {isCompleted && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Completed
          </span>
        )}
      </div>
      
      {/* Event Details */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        
        {/* Event Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description || 'No description available.'}
        </p>
        
        <div className="flex items-center text-gray-600 mb-1">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{event.date} • {event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPinIcon className="w-4 h-4 mr-2" />
          <span>{event.location}, {event.area}</span>
        </div>
      </div>
    </div>
  );
};

const EventModal: React.FC<{
  show: boolean;
  event: Event | null;
  onClose: () => void;
}> = ({ show, event, onClose }) => {
  if (!show || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h2>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center text-gray-600 mb-2">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPinIcon className="w-5 h-5 mr-2" />
            <span>{event.location}, {event.area}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <span className="font-semibold">Organizer:</span>
            <span className="ml-2">{event.organizer}</span>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const sampleEvent = {
  title: "Tech Career Fair 2025",
  description: "Join us for an exciting career fair featuring top tech companies and networking opportunities.",
  date: "March 15, 2025",
  time: "10:00 AM - 4:00 PM",
  location: "Main Campus Center",
  area: "Campus"
};

export { EventCard, EventModal, sampleEvent };