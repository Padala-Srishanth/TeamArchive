// src/pages/CertificatesPage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Award } from 'lucide-react';

const CertificatesPage: React.FC = () => {
  const { user } = useAuth(); // Assuming you have an auth context with certificates

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Certificates</h1>
      
      {user?.certificates?.length ? (
        <div className="space-y-4">
          {user.certificates.map((certificate: Certificate) => (
            <div key={certificate.id} className="bg-white rounded-lg shadow p-6 flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
            <h2 className="text-lg font-semibold">{certificate.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Issued on: {new Date(certificate.issuedDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Event ID: {certificate.eventId}</p>
            <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-800">
              Download Certificate
            </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Award className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No certificates yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Attend events to earn certificates that will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;