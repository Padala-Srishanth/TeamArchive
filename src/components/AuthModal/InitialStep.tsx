// src/components/AuthModal/InitialStep.tsx
import React from 'react';
import { BookOpen, Users } from 'lucide-react';

interface InitialStepProps {
  onStudentClick: () => void;
  onOrganizerClick: () => void;
}

export const InitialStep: React.FC<InitialStepProps> = ({ onStudentClick, onOrganizerClick }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-6">Welcome to EventHub</h2>
    <p className="text-gray-600 mb-8">Are you a student?</p>
    <div className="space-y-4">
      <button
        onClick={onStudentClick}
        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center"
      >
        <BookOpen className="w-5 h-5 mr-2" />
        Yes, I'm a Student
      </button>
      <button
        onClick={onOrganizerClick}
        className="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center justify-center"
      >
        <Users className="w-5 h-5 mr-2" />
        No, I'm an Organizer
      </button>
    </div>
  </div>
);