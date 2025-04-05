// EventCard.tsx
import React from 'react';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Make sure to import icons
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
  hasCertificate
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 h-full flex flex-col">
      {/* Image Container - Updated with better styling */}
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
        
        <div className="flex items-center text-gray-600 mb-1">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{event.date} • {event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPinIcon className="w-4 h-4 mr-2" />
          <span>{event.location}, {event.area}</span>
        </div>
        
        <div className="mt-auto pt-2 border-t border-gray-100">
  {/* Show registration button only for students who aren't registered */}
  {userType === 'student' && !isRegistered && (
    <button
      onClick={() => onRegister(event)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Register
    </button>
  )}

  {/* Show registered status for students */}
  {userType === 'student' && isRegistered && (
    <span className="text-green-600">Registered</span>
  )}

  {/* Show manage button only for organizers */}
  {userType === 'organizer' && onManage && (
    <button
      onClick={() => onManage(event)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Manage
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default EventCard;