// src/components/EventCard/EventCard.tsx
import React from 'react';
import { Calendar, Clock, MapPin, UserPlus, Edit, CheckCircle } from 'lucide-react';
import { Event, UserType } from '../types';

interface EventCardProps {
  event: Event;
  userType: UserType;
  isRegistered: boolean;
  onRegister: (event: Event) => void;
  onManage: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  userType,
  isRegistered,
  onRegister,
  onManage,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img
      src={`https://source.unsplash.com/800x400/?${event.category.toLowerCase()},event`}
      alt={event.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {event.date}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          {event.time}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{event.spots} spots left</span>
        {isRegistered ? (
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-md flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Registered
          </span>
        ) : (
          <button
            onClick={() => userType === 'student' ? onRegister(event) : onManage(event)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            {userType === 'student' ? (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Manage
              </>
            )}
          </button>
        )}
      </div>
    </div>
  </div>
);