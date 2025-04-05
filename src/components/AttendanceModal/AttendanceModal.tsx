// src/components/AttendanceModal/AttendanceModal.tsx
import React, { useState } from 'react';
import { X, Check, XCircle, FileText, User } from 'lucide-react';
import { Event } from '../types';

interface AttendanceModalProps {
  show: boolean;
  event: Event | null;
  attendanceList: string[];
  registeredStudents: string[];
  onClose: () => void;
  onMarkAttendance: (studentId: string, attended: boolean) => void;
  onGenerateCertificate: (studentId: string) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  show,
  event,
  attendanceList = [],
  registeredStudents = [],
  onClose,
  onMarkAttendance,
  onGenerateCertificate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!show || !event) return null;

  const filteredStudents = registeredStudents.filter(student =>
    student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Attendance for {event.title}</h2>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search students..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Student</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student} className="border-b">
                  <td className="p-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    {student}
                  </td>
                  <td className="p-2">
                    {attendanceList.includes(student) ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="w-4 h-4 mr-1" /> Present
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" /> Absent
                      </span>
                    )}
                  </td>
                  <td className="p-2 flex space-x-2">
                    <button
                      onClick={() => onMarkAttendance(student, true)}
                      className={`px-2 py-1 rounded text-sm ${
                        attendanceList.includes(student)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      Mark Present
                    </button>
                    <button
                      onClick={() => onMarkAttendance(student, false)}
                      className={`px-2 py-1 rounded text-sm ${
                        !attendanceList.includes(student)
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      Mark Absent
                    </button>
                    {attendanceList.includes(student) && (
                      <button
                        onClick={() => onGenerateCertificate(student)}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center"
                      >
                        <FileText className="w-3 h-3 mr-1" /> Certificate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total: {filteredStudents.length} | Present: {attendanceList.length} | 
            Absent: {filteredStudents.length - attendanceList.length}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};