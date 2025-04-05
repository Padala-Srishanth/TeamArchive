// src/components/Header/Header.tsx
import React, { useState } from 'react';
import { Calendar, BookOpen, Users, Bell, User, ChevronDown, Trophy } from 'lucide-react';
import { UserType } from '../types';

interface HeaderProps {
  userType: UserType;
  onLogout: () => void;
  onSidebarToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  userType, 
  onLogout, 
  onSidebarToggle 
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // For demo purposes

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white rounded-lg shadow-md transform hover:rotate-12 transition-transform duration-300">
            <Trophy className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-200">
                Archives
              </span>
            </span>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            {/* User Type Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              {userType === 'student' ? (
                <>
                  <BookOpen className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Student</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Organizer</span>
                </>
              )}
            </div>

            {/* Notification Bell */}
            <button 
              className="relative p-2 text-white hover:text-yellow-200 transition-colors duration-200"
              onClick={() => setHasNewNotifications(false)}
            >
              <Bell className="h-5 w-5" />
              {hasNewNotifications && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-indigo-600"></span>
              )}
            </button>

            {/* Calendar Button */}
            <button 
              onClick={onSidebarToggle}
              className="p-2 text-white hover:text-yellow-200 transition-colors duration-200"
            >
              <Calendar className="h-5 w-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 focus:outline-none group"
              >
                <div className="p-1.5 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-200">
                  <User className="h-5 w-5 text-white" />
                </div>
                <ChevronDown className={`h-4 w-4 text-white transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-20 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500 truncate">john@university.edu</p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                    >
                      My Certificates
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                    >
                      Event History
                    </a>
                  </div>
                  <div className="py-1 border-t border-gray-100">
                    <button
                      onClick={() => {
                        onLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};