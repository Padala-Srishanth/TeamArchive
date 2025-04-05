// src/components/EventModal/RegistrationConfirmation.tsx
import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, X } from 'lucide-react';
import { Event } from '../types';

interface RegistrationConfirmationProps {
  event: Event;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({
  event,
  onConfirm,
  onCancel,
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
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
    </div>
    <div className="flex space-x-3">
      <button
        onClick={onConfirm}
        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center"
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        Confirm Registration
      </button>
      <button
        onClick={onCancel}
        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 flex items-center justify-center"
      >
        <X className="w-4 h-4 mr-2" />
        Cancel
      </button>
    </div>
  </div>
);