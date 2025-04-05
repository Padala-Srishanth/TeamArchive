// src/components/EventModal/ManageEventForm.tsx
import React from 'react';
import { Edit, Trash2, X } from 'lucide-react';
import { Event } from '../types';

interface ManageEventFormProps {
  event: Event;
  editForm: Partial<Event>;
  onEditFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const ManageEventForm: React.FC<ManageEventFormProps> = ({
  event,
  editForm,
  onEditFormChange,
  onSave,
  onDelete,
  onClose,
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Manage Event</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={editForm.title || event.title}
          onChange={onEditFormChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="text"
          name="date"
          value={editForm.date || event.date}
          onChange={onEditFormChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time
        </label>
        <input
          type="text"
          name="time"
          value={editForm.time || event.time}
          onChange={onEditFormChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={editForm.location || event.location}
          onChange={onEditFormChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="flex space-x-3 mt-6">
        <button
          onClick={onSave}
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center"
        >
          <Edit className="w-4 h-4 mr-2" />
          Save Changes
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Event
        </button>
      </div>
    </div>
  </div>
);