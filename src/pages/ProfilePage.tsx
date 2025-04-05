// src/pages/ProfilePage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth(); // Assuming you have an auth context

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user?.name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{user?.department || 'Not specified'}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Account Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">User Type</p>
                <p className="font-medium capitalize">{user?.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">{user?.createdAt || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;