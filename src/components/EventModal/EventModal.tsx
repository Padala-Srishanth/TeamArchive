// src/components/EventModal/EventModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Event } from '../types';

interface EventModalProps {
  show: boolean;
  event: Event | null;
  editMode: boolean;
  editForm: Partial<Event>;
  userType: 'student' | 'organizer';
  onClose: () => void;
  onConfirmRegistration: () => void;
  onEditFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSaveChanges: () => void;
  onDeleteEvent: () => void;
  availableCategories: string[];
  availableAreas: string[];
  userDiscount?: number;
}

export const EventModal: React.FC<EventModalProps> = ({
  show,
  event,
  editMode,
  editForm,
  userType,
  onClose,
  onConfirmRegistration,
  onEditFormChange,
  onSaveChanges,
  onDeleteEvent,
  availableCategories,
  availableAreas,
  userDiscount = 0,
}) => {
  if (!show || !event) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    let value: string | boolean | number;

    if (type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      value = parseFloat((e.target as HTMLInputElement).value) || 0;
    } else {
      value = e.target.value;
    }

    onEditFormChange({
      target: {
        name,
        type,
        value
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {editMode ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">
              {editForm.id ? 'Edit Event' : 'Create New Event'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editForm.title || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={editForm.date || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={editForm.time || ''}
                    onChange={handleInputChange}
                    placeholder="e.g. 2:00 PM - 5:00 PM"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editForm.location || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={editForm.category || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  >
                    <option value="">Select a category</option>
                    {availableCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <select
                    id="area"
                    name="area"
                    value={editForm.area || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  >
                    <option value="">Select an area</option>
                    {availableAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="spots" className="block text-sm font-medium text-gray-700">
                  Available Spots
                </label>
                <input
                  type="number"
                  id="spots"
                  name="spots"
                  min="1"
                  value={editForm.spots || 0}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPaid"
                  name="isPaid"
                  checked={editForm.isPaid || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="isPaid" className="ml-2 block text-sm text-gray-700">
                  Paid Event
                </label>
              </div>

              {editForm.isPaid && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={editForm.price || 0}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onDeleteEvent}
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={onSaveChanges}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Confirm Registration</h2>
            <p>You're about to register for: <strong>{event.title}</strong></p>
            
            {event.isPaid && (
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="font-medium">Payment Information</p>
                <p>Price: ${event.price?.toFixed(2)}</p>
                {userDiscount > 0 && (
                  <p className="text-green-600">
                    Discount: {userDiscount}% (New price: ${(event.price * (1 - userDiscount / 100)).toFixed(2)})
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmRegistration}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};