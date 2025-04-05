// src/components/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterModal } from '../FilterModal/FilterModal';
import { FilterOptions } from '../types';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterChange: (options: FilterOptions) => void;
  filterOptions: FilterOptions;
  availableCategories: string[];
  availableAreas: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onFilterChange,
  filterOptions,
  availableCategories,
  availableAreas,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterOptions={filterOptions}
        onFilterChange={onFilterChange}
        availableCategories={availableCategories}
        availableAreas={availableAreas}
      />
    </>
  );
};
export default SearchBar;