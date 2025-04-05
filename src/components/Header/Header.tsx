// src/components/Header/Header.tsx
import React from 'react';
import { Calendar, BookOpen, Users, Bell, LogOut } from 'lucide-react';
import { UserType } from '../types';

interface HeaderProps {
  userType: UserType;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userType, onLogout }) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">EventHub</span>
        </div>
        <div className="flex items-center space-x-4">
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
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
          </button>
          <button
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-gray-500 flex items-center"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
);