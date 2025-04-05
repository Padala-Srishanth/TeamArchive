// src/components/AuthModal/StudentStep.tsx
import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { UserCredentials } from '../types';

interface StudentStepProps {
  credentials: UserCredentials;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StudentStep: React.FC<StudentStepProps> = ({
  credentials,
  onBack,
  onSubmit,
  onCredentialsChange,
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Student Login</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            required
            value={credentials.email}
            onChange={onCredentialsChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>
      </div>
      
      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={onCredentialsChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>
      </div>
      
      {/* Student ID Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
        <input
          type="text"
          name="studentId"
          required
          value={credentials.studentId}
          onChange={onCredentialsChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your student ID"
        />
      </div>
      
      {/* Department Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <input
          type="text"
          name="department"
          required
          value={credentials.department}
          onChange={onCredentialsChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your department"
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </form>
  </div>
);