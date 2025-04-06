import React, { useState } from 'react';
import { Calendar, BookOpen, Users, Bell, User, ChevronDown } from 'lucide-react';
import { UserType } from '../types';

interface HeaderProps {
  userType: UserType;
  onLogout: () => void;
  onSidebarToggle: () => void;
  onViewCompletedEvents: () => void; // Callback for viewing completed events
  onViewRegisteredEvents: () => void; // Callback for viewing registered events
}

export const Header: React.FC<HeaderProps> = ({
  userType,
  onLogout,
  onSidebarToggle,
  onViewCompletedEvents,
  onViewRegisteredEvents,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEventsMenuOpen, setIsEventsMenuOpen] = useState(false); // State for events menu

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">EventHub</span>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Type */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md">
              {userType === 'student' ? (
                <>
                  <BookOpen className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Student</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Organizer</span>
                </>
              )}
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>

            {/* Sidebar Toggle */}
            <button
              onClick={onSidebarToggle}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <Calendar className="h-6 w-6" />
            </button>

            {/* Events Menu */}
            <div className="relative">
              <button
                onClick={() => setIsEventsMenuOpen(!isEventsMenuOpen)}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
              >
                <span>My Events</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isEventsMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      onViewRegisteredEvents();
                      setIsEventsMenuOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Registered Events
                  </button>
                  <button
                    onClick={() => {
                      onViewCompletedEvents();
                      setIsEventsMenuOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Completed Events
                  </button>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 text-gray-400 hover:text-gray-500 flex items-center"
              >
                <User className="h-6 w-6" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};