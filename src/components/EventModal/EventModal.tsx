// src/components/EventModal/EventModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { ManageEventForm } from './ManageEventForm';
import { RegistrationConfirmation } from './RegistrationConfirmation';
import { Event } from '../types';

interface EventModalProps {
  show: boolean;
  event: Event | null;
  editMode: boolean;
  editForm: Partial<Event>;
  onClose: () => void;
  onConfirmRegistration: () => void;
  onEditFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveChanges: () => void;
  onDeleteEvent: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  show,
  event,
  editMode,
  editForm,
  onClose,
  onConfirmRegistration,
  onEditFormChange,
  onSaveChanges,
  onDeleteEvent,
}) => {
  if (!show || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {editMode ? (
          <ManageEventForm
            event={event}
            editForm={editForm}
            onEditFormChange={onEditFormChange}
            onSave={onSaveChanges}
            onDelete={onDeleteEvent}
            onClose={onClose}
          />
        ) : (
          <RegistrationConfirmation
            event={event}
            onConfirm={onConfirmRegistration}
            onCancel={onClose}
          />
        )}
      </div>
    </div>
  );
};