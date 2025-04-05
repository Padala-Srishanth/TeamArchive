import React from 'react';
import { X } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterOptions: FilterOptions;
  onFilterChange: (options: FilterOptions) => void;
  availableCategories: string[];
  availableAreas: string[];
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filterOptions,
  onFilterChange,
  availableCategories,
  availableAreas,
}) => {
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    onFilterChange({
      ...filterOptions,
      [name]: value,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      aria-hidden={!isOpen}
      role="dialog"
      aria-labelledby="filter-modal-title"
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close filter modal"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 id="filter-modal-title" className="text-2xl font-bold mb-6">
          Filter Events
        </h2>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={filterOptions.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              {availableCategories.length > 0 ? (
                availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>
          </div>

          {/* Area Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area
            </label>
            <select
              name="area"
              value={filterOptions.area}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="all">All Areas</option>
              {availableAreas.length > 0 ? (
                availableAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))
              ) : (
                <option disabled>No areas available</option>
              )}
            </select>
          </div>

          {/* Payment Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="all"
                  checked={filterOptions.paymentType === 'all'}
                  onChange={handleChange}
                  className="mr-2"
                />
                All Events
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="paid"
                  checked={filterOptions.paymentType === 'paid'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Paid Events
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="free"
                  checked={filterOptions.paymentType === 'free'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Free Events
              </label>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};