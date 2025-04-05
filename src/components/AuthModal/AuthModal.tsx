// src/components/AuthModal/AuthModal.tsx
import React from 'react';
import { InitialStep } from './InitialStep';
import { StudentStep } from './StudentStep';
import { OrganizerStep } from './OrganizerStep';
import { AuthStep, UserCredentials, UserType } from '../types';

interface AuthModalProps {
  show: boolean;
  step: AuthStep;
  credentials: UserCredentials;
  onClose: () => void;
  onStudentClick: () => void;
  onOrganizerClick: () => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  show,
  step,
  credentials,
  onClose,
  onStudentClick,
  onOrganizerClick,
  onBack,
  onSubmit,
  onCredentialsChange,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {step === 'initial' ? (
          <InitialStep 
            onStudentClick={onStudentClick}
            onOrganizerClick={onOrganizerClick}
          />
        ) : step === 'student' ? (
          <StudentStep
            credentials={credentials}
            onBack={onBack}
            onSubmit={onSubmit}
            onCredentialsChange={onCredentialsChange}
          />
        ) : (
          <OrganizerStep
            credentials={credentials}
            onBack={onBack}
            onSubmit={onSubmit}
            onCredentialsChange={onCredentialsChange}
          />
        )}
      </div>
    </div>
  );
};