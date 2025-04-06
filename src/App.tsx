// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Users, Bell, User, ChevronDown, X, Menu } from 'lucide-react';

// ===== TYPES =====
type AuthStep = 'initial' | 'student' | 'organizer';

interface UserCredentials {
  email: string;
  password: string;
  studentId: string;
  department: string;
  organizationName: string;
  position: string;
}

type UserType = 'student' | 'organizer';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  area: string;
  organizer: string;
  category: string;
  spots: number;
  isPaid: boolean;
  price?: number;
  completed: boolean;
  attended: boolean;
  attendees?: string[];
  certificates?: Certificate[];
  imageUrl: string;
  registrations?: number;
}

interface FilterOptions {
  category: string;
  area: string;
  paymentType: string;
  creatorFilter: string;
}

interface Certificate {
  id: string;
  eventId: number;
  eventName: string;
  studentId: string;
  issueDate: string;
  template: string;
}

interface Badge {
  id: string;
  name: string;
  discount: number;
  expiry: string;
}

interface UserProfile {
  name: string;
  avatar: string;
  badges: Badge[];
  certificates: Certificate[];
  discounts: number;
}

// ===== COMPONENTS =====
const AuthModal: React.FC<{
  show: boolean;
  step: AuthStep;
  credentials: UserCredentials;
  onClose: () => void;
  onStudentClick: () => void;
  onOrganizerClick: () => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ show, step, credentials, onClose, onStudentClick, onOrganizerClick, onBack, onSubmit, onCredentialsChange }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          {step === 'initial' ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EventHub</h3>
              <p className="text-gray-600 mb-6">Join as a student or organizer</p>
              <div className="space-y-4">
                <button
                  onClick={onStudentClick}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  I'm a Student
                </button>
                <button
                  onClick={onOrganizerClick}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                >
                  <Users className="mr-2 h-5 w-5" />
                  I'm an Organizer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="flex justify-between items-center mb-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  <ChevronDown className="h-5 w-5 transform rotate-90" />
                </button>
                <h3 className="text-xl font-bold text-gray-900">
                  {step === 'student' ? 'Student Sign Up' : 'Organizer Sign Up'}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={onCredentialsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={onCredentialsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {step === 'student' ? (
                  <>
                    <div>
                      <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                        Student ID
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        id="studentId"
                        value={credentials.studentId}
                        onChange={onCredentialsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        id="department"
                        value={credentials.department}
                        onChange={onCredentialsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        name="organizationName"
                        id="organizationName"
                        value={credentials.organizationName}
                        onChange={onCredentialsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Position
                      </label>
                      <input
                        type="text"
                        name="position"
                        id="position"
                        value={credentials.position}
                        onChange={onCredentialsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  {step === 'student' ? 'Join as Student' : 'Register as Organizer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{
  userType: UserType;
  onLogout: () => void;
  onSidebarToggle: () => void;
  onCreateEvent?: () => void;
  userProfile: UserProfile;
}> = ({ userType, onLogout, onSidebarToggle, onCreateEvent, userProfile }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white rounded-lg shadow-md transform hover:rotate-12 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-200">
                EventHub
              </span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
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

            {userType === 'organizer' && onCreateEvent && (
              <button
                onClick={onCreateEvent}
                className="hidden md:flex items-center px-3 py-1.5 bg-white text-indigo-600 text-sm font-medium rounded-full shadow-sm hover:bg-indigo-50 transition-colors duration-200"
              >
                + Create Event
              </button>
            )}

            <button 
              className="relative p-2 text-white hover:text-yellow-200 transition-colors duration-200"
              onClick={() => setHasNewNotifications(false)}
            >
              <Bell className="h-5 w-5" />
              {hasNewNotifications && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-indigo-600"></span>
              )}
            </button>

            <button
              onClick={onSidebarToggle}
              className="p-2 text-white hover:text-yellow-200 transition-colors duration-200"
            >
              <Menu className="h-5 w-5" />
            </button>

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
                    <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                    <p className="text-xs text-gray-500 truncate">{
                      userType === 'student' ? 
                      `Student ID: ${userProfile.name.split(' ')[1]}` : 
                      userProfile.name
                    }</p>
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

const EventCard: React.FC<{
  event: Event;
  userType: UserType;
  isRegistered: boolean;
  isCompleted: boolean;
  isAttended: boolean;
  spotsAvailable: number;
  onRegister: (event: Event) => void;
  onManage?: (event: Event) => void;
  isCreatedByUser?: boolean;
  onMarkAsCompleted?: (eventId: number) => void;
  onTakeAttendance?: (event: Event) => void;
  stats?: {
    totalSpots: number;
    bookedSpots: number;
    availableSpots: number;
    bookingRate: number;
    attendanceRate: number;
  } | null;
  userDiscount?: number;
  hasCertificate?: boolean;
  onEventClick?: (event: Event) => void; // Add this line
}> = ({
  event,
  userType,
  isRegistered,
  isCompleted,
  isAttended,
  spotsAvailable,
  onRegister,
  onManage,
  isCreatedByUser,
  onMarkAsCompleted,
  onTakeAttendance,
  stats,
  userDiscount = 0,
  hasCertificate = false,
  onEventClick // Add this line
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Completed
        </span>
      );
    }
    if (isRegistered) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Registered
        </span>
      );
    }
    if (spotsAvailable <= 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Full
        </span>
      );
    }
    return null;
  };

  const getPriceDisplay = () => {
    if (!event.isPaid) return 'Free';
    const discountedPrice = event.price ? event.price * (1 - userDiscount / 100) : 0;
    return userDiscount > 0 ? (
      <>
        <span className="text-gray-500 line-through mr-1">${event.price?.toFixed(2)}</span>
        <span className="text-indigo-600 font-semibold">${discountedPrice.toFixed(2)}</span>
      </>
    ) : (
      `$${event.price?.toFixed(2)}`
    );
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isHovered ? 'transform -translate-y-1 shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEventClick && onEventClick(event)} // Add this line
    >
      <div className="relative h-40">
        <img
          className="w-full h-full object-cover"
          src={event.imageUrl}
          alt={event.title}
        />
        <div className="absolute top-2 left-2 flex space-x-1">
          {getStatusBadge()}
          {hasCertificate && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Certified
            </span>
          )}
          {userDiscount > 0 && event.isPaid && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {userDiscount}% Off
            </span>
          )}
        </div>
        {isCreatedByUser && (
          <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Your Event
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{event.organizer}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{getPriceDisplay()}</p>
            <p className="text-xs text-gray-500">{spotsAvailable} spots left</p>
          </div>
        </div>

        <div className="mt-3 flex items-center text-sm text-gray-500">
          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
          {event.date} • {event.time}
        </div>

        <div className="mt-1 flex items-center text-sm text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {event.category}
          </span>

          {userType === 'student' ? (
            <button
              onClick={() => onRegister(event)}
              disabled={isRegistered || isCompleted || spotsAvailable <= 0}
              className={`px-3 py-1 rounded-md text-sm font-medium ${isRegistered || isCompleted ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : spotsAvailable <= 0 ? 'bg-red-100 text-red-700 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'} transition-colors duration-200`}
            >
              {isRegistered ? 'Registered' : isCompleted ? 'Completed' : spotsAvailable <= 0 ? 'Full' : 'Register'}
            </button>
          ) : (
            <div className="space-x-2">
              {onManage && (
                <button
                  onClick={() => onManage(event)}
                  className="px-3 py-1 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
                >
                  Manage
                </button>
              )}
              {onTakeAttendance && !event.completed && (
                <button
                  onClick={() => onTakeAttendance && onTakeAttendance(event)}
                  className="px-3 py-1 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                >
                  Attendance
                </button>
              )}
              {onMarkAsCompleted && !event.completed && (
                <button
                  onClick={() => onMarkAsCompleted && onMarkAsCompleted(event.id)}
                  className="px-3 py-1 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                >
                  Complete
                </button>
              )}
            </div>
          )}
        </div>

        {stats && userType === 'organizer' && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Booked: {stats.bookedSpots}/{stats.totalSpots}</span>
              <span>{stats.bookingRate.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${stats.bookingRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 mb-1">
              <span>Attendance: {stats.attendanceRate.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full" 
                style={{ width: `${stats.attendanceRate}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchBar: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterChange: (options: FilterOptions) => void;
  filterOptions: FilterOptions;
  availableCategories: string[];
  availableAreas: string[];
  userType: UserType;
}> = ({ searchTerm, onSearchChange, onFilterChange, filterOptions, availableCategories, availableAreas, userType }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={filterOptions.category}
              onChange={(e) => onFilterChange({ ...filterOptions, category: e.target.value })}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border shadow-sm"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Location Area</label>
            <select
              id="area"
              value={filterOptions.area}
              onChange={(e) => onFilterChange({ ...filterOptions, area: e.target.value })}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border shadow-sm"
            >
              <option value="all">All Areas</option>
              {availableAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
            <select
              id="paymentType"
              value={filterOptions.paymentType}
              onChange={(e) => onFilterChange({ ...filterOptions, paymentType: e.target.value })}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border shadow-sm"
            >
              <option value="all">All Types</option>
              <option value="free">Free Events</option>
              <option value="paid">Paid Events</option>
            </select>
          </div>

          {userType === 'organizer' && (
            <div>
              <label htmlFor="creatorFilter" className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
              <select
                id="creatorFilter"
                value={filterOptions.creatorFilter}
                onChange={(e) => onFilterChange({ ...filterOptions, creatorFilter: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border shadow-sm"
              >
                <option value="all">All Events</option>
                <option value="mine">My Events</option>
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const EventModal: React.FC<{
  show: boolean;
  event: Event | null;
  editMode: boolean;
  editForm: Partial<Event>;
  userType: UserType;
  onClose: () => void;
  onConfirmRegistration: () => void;
  onEditFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSaveChanges?: () => void;
  onDeleteEvent?: () => void;
  availableCategories: string[];
  availableAreas: string[];
  userDiscount?: number;
}> = ({
  show,
  event,
  editMode,
  editForm,
  userType,
  onClose,
  onConfirmRegistration,
  onEditFormChange,
  onSaveChanges,
  onDeleteEvent,
  availableCategories,
  availableAreas,
  userDiscount = 0
}) => {
  if (!show || !event) return null;

  const getPriceDisplay = () => {
    if (!event.isPaid) return 'Free';
    const discountedPrice = event.price ? event.price * (1 - userDiscount / 100) : 0;
    return userDiscount > 0 ? (
      <>
        <span className="text-gray-500 line-through mr-1">${event.price?.toFixed(2)}</span>
        <span className="text-indigo-600 font-semibold">${discountedPrice.toFixed(2)}</span>
      </>
    ) : (
      `$${event.price?.toFixed(2)}`
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {editMode ? (editForm.id ? 'Edit Event' : 'Create Event') : event.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {editMode ? (
            <form className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={editForm.title || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={editForm.category || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {availableCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    placeholder="March 15, 2025"
                    value={editForm.date || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    id="time"
                    placeholder="10:00 AM - 4:00 PM"
                    value={editForm.time || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={editForm.location || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                    Area
                  </label>
                  <select
                    name="area"
                    id="area"
                    value={editForm.area || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select an area</option>
                    {availableAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="spots" className="block text-sm font-medium text-gray-700 mb-1">
                    Available Spots
                  </label>
                  <input
                    type="number"
                    name="spots"
                    id="spots"
                    min="1"
                    value={editForm.spots || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="free"
                        name="isPaid"
                        type="radio"
                        checked={!editForm.isPaid}
                        onChange={() => onEditFormChange({ target: { name: 'isPaid', value: false } } as any)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="free" className="ml-2 block text-sm text-gray-700">
                        Free
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="paid"
                        name="isPaid"
                        type="radio"
                        checked={editForm.isPaid || false}
                        onChange={() => onEditFormChange({ target: { name: 'isPaid', value: true } } as any)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="paid" className="ml-2 block text-sm text-gray-700">
                        Paid
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {editForm.isPaid && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min="0"
                    step="0.01"
                    value={editForm.price || ''}
                    onChange={onEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  value={editForm.imageUrl || ''}
                  onChange={onEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                {editForm.id && onDeleteEvent && (
                  <button
                    type="button"
                    onClick={onDeleteEvent}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSaveChanges}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Date & Time</h3>
                  <p className="text-gray-600">{event.date} • {event.time}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">{event.location} ({event.area})</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Organizer</h3>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Category & Price</h3>
                  <p className="text-gray-600">
                    {event.category} • {getPriceDisplay()}
                  </p>
                </div>
              </div>

              {userType === 'student' ? (
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={onConfirmRegistration}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Confirm Registration
                  </button>
                </div>
              ) : (
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AttendanceModal: React.FC<{
  show: boolean;
  event: Event | null;
  attendanceList: string[];
  registeredStudents: string[];
  onClose: () => void;
  onMarkAttendance: (studentId: string, attended: boolean) => void;
  onGenerateCertificate: (studentId: string) => void;
}> = ({ show, event, attendanceList, registeredStudents, onClose, onMarkAttendance, onGenerateCertificate }) => {
  if (!show || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance for {event.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registeredStudents.map((studentId) => (
                    <tr key={studentId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {attendanceList.includes(studentId) ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Present
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                        <button
                          onClick={() => onMarkAttendance(studentId, !attendanceList.includes(studentId))}
                          className={`px-2 py-1 text-xs rounded ${attendanceList.includes(studentId) ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'} transition-colors duration-200`}
                        >
                          {attendanceList.includes(studentId) ? 'Mark Absent' : 'Mark Present'}
                        </button>
                        {attendanceList.includes(studentId) && (
                          <button
                            onClick={() => onGenerateCertificate(studentId)}
                            className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                          >
                            Generate Certificate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  registeredEvents: Event[];
  completedEvents: Event[];
  onUnregister: (eventId: number) => void;
  userType: UserType;
  createdEvents?: Event[];
  userProfile: UserProfile;
  certificates: Certificate[];
  badges: Badge[];
}> = ({
  isOpen,
  onClose,
  registeredEvents,
  completedEvents,
  onUnregister,
  userType,
  createdEvents = [],
  userProfile,
  certificates,
  badges
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">My Dashboard</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full bg-gray-200"
                    src={userProfile.avatar}
                    alt="User profile"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{userProfile.name}</h3>
                  <p className="text-sm text-gray-500">
                    {userType === 'student' ? 'Student' : 'Organizer'}
                  </p>
                </div>
              </div>

              {userType === 'student' && badges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">My Badges</h3>
                  <div className="space-y-2">
                    {badges.map((badge) => (
                      <div key={badge.id} className="flex items-center px-3 py-2 bg-indigo-50 rounded-lg">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                          <p className="text-xs text-gray-500">{badge.discount}% discount (expires {badge.expiry})</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {userType === 'student' && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">My Upcoming Events</h3>
                  {registeredEvents.length === 0 ? (
                    <p className="text-sm text-gray-500">No upcoming events</p>
                  ) : (
                    <div className="space-y-3">
                      {registeredEvents.map((event) => (
                        <div key={event.id} className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                          </div>
                          <button
                            onClick={() => onUnregister(event.id)}
                            className="ml-2 text-xs text-red-600 hover:text-red-800 transition-colors duration-200"
                          >
                            Unregister
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {userType === 'student' && certificates.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">My Certificates</h3>
                  <div className="space-y-3">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{cert.eventName}</p>
                          <p className="text-xs text-gray-500">Issued on {cert.issueDate}</p>
                        </div>
                        <button className="ml-2 text-xs text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {userType === 'student' && completedEvents.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Completed Events</h3>
                  <div className="space-y-3">
                    {completedEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                    {completedEvents.length > 3 && (
                      <p className="text-xs text-gray-500 mt-1">+{completedEvents.length - 3} more events</p>
                    )}
                  </div>
                </div>
              )}

              {userType === 'organizer' && createdEvents.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">My Events</h3>
                  <div className="space-y-3">
                    {createdEvents.map((event) => (
                      <div key={event.id} className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.date} • {event.registrations || 0} registrations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Close Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ===== MAIN APP COMPONENT =====
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [authStep, setAuthStep] = useState<AuthStep>('initial');
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: '',
    password: '',
    studentId: '',
    department: '',
    organizationName: '',
    position: ''
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    avatar: '/api/placeholder/40/40',
    badges: [],
    certificates: [],
    discounts: 0
  });

  const [userType, setUserType] = useState<UserType>('student');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [completedEvents, setCompletedEvents] = useState<number[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Event>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: 'all',
    area: 'all',
    paymentType: 'all',
    creatorFilter: 'all',
  });
  const [eventSpots, setEventSpots] = useState<{[key: number]: number}>({});
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceEvent, setAttendanceEvent] = useState<Event | null>(null);
  const [attendanceList, setAttendanceList] = useState<{[eventId: number]: string[]}>({});
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const initialDemoEvents: Event[] = [
    {
      id: 1,
      title: "Tech Career Fair 2025",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Campus Center",
      area: "Campus",
      organizer: "Career Services",
      category: "Career",
      spots: 200,
      isPaid: false,
      completed: false,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://in.ewu.edu/careercenter/wp-content/uploads/sites/38/2024/02/Winter-Career-Fair-2025.png"
    },
    {
      id: 2,
      title: "Student Leadership Workshop",
      date: "March 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Student Union",
      area: "Campus",
      organizer: "Student Affairs",
      category: "Workshop",
      spots: 50,
      isPaid: true,
      price: 20,
      completed: false,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://calendarmedia.blob.core.windows.net/assets/bc950745-398c-4d56-805e-43bdb917c02f.jpg"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      date: "February 10, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Computer Lab",
      area: "Tech Building",
      organizer: "CS Department",
      category: "Workshop",
      spots: 30,
      isPaid: true,
      price: 50,
      completed: true,
      attended: true,
      attendees: ["Student001"],
      certificates: [
        {
          id: "cert-001",
          eventId: 3,
          eventName: "Web Development Bootcamp",
          studentId: "Student001",
          issueDate: "February 10, 2025",
          template: "standard"
        }
      ],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjynNtR72RZufppLtNVHS4siSZxusDbhYJKIqsYSrE1-fRb5dJjsz0RedMWLWH_9DKo5Q&usqp=CAU"
    },
    {
      id: 4,
      title: "Alumni Networking",
      date: "January 25, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Alumni Hall",
      area: "Downtown",
      organizer: "Alumni Association",
      category: "Networking",
      spots: 100,
      isPaid: false,
      completed: true,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://images.businessnewsdaily.com/app/uploads/2022/04/04081337/1554238569.jpeg"
    },
    {
      id: 5,
      title: "Hackathon 2025",
      date: "April 10, 2025",
      time: "8:00 AM - 8:00 PM",
      location: "Innovation Hub",
      area: "Tech Park",
      organizer: "Tech Club",
      category: "Hackathon",
      spots: 100,
      isPaid: false,
      completed: false,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://newsarenaindia.com/_next/image?url=https%3A%2F%2Fimages.newsarenaindia.com%2Funtitled-design-20250317t191141036jpg_1742218926788.jpg&w=1920&q=75"
    },
    {
      id: 6,
      title: "AI Coding Contest",
      date: "April 15, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "AI Lab",
      area: "Tech Building",
      organizer: "AI Society",
      category: "Contest",
      spots: 50,
      isPaid: true,
      price: 10,
      completed: false,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2XR2mAO5aEBbkFpK5kVuhaf-l2lW8UJZYh1L5Q3woyFx-s_ALci9u7n1qzEvxYnhPzQ&usqp=CAU"
    },
    {
      id: 7,
      title: "Data Science Hackathon",
      date: "May 5, 2025",
      time: "9:00 AM - 9:00 PM",
      location: "Data Lab",
      area: "Tech Park",
      organizer: "Data Science Club",
      category: "Hackathon",
      spots: 80,
      isPaid: true,
      price: 25,
      completed: false,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq6_vserArza_upe32w83K0rxFfizUqoveGT5smX5tdMQgHJ-nLmzbyusV22M8ON_P3hE&usqp=CAU"
    },
    {
      id: 8,
      title: "Math Olympiad",
      date: "May 20, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "Math Department",
      area: "Science Building",
      organizer: "Math Society",
      category: "Contest",
      spots: 60,
      isPaid: false,
      completed: false,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://www.cfalindia.com/wp-content/uploads/2023/09/International-Mathematical-Olympiad-1.jpg"
    },
    {
      id: 9,
      title: "Smart India Hackathon",
      date: "May 25, 2025",
      time: "10:00 PM - 5:00 PM",
      location: "India",
      area: "Mumbai",
      organizer: "VJ Data Questers",
      category: "Hackathon",
      spots: 200,
      isPaid: false,
      completed: false,
      attended: false,
      attendees: [],
      certificates: [],
      imageUrl: "https://i.ytimg.com/vi/znMbKz6ZPno/maxresdefault.jpg"
    },
  ];

  useEffect(() => {
    const spotsMap: {[key: number]: number} = {};
    initialDemoEvents.forEach(event => {
      spotsMap[event.id] = event.spots;
    });
    createdEvents.forEach(event => {
      spotsMap[event.id] = event.spots;
    });
    setEventSpots(spotsMap);
  }, [createdEvents]);

  const demoEvents = initialDemoEvents.map(event => ({
    ...event,
    spots: eventSpots[event.id] ?? event.spots
  }));
  
  const allEvents = [...demoEvents, ...createdEvents];
  
  const availableCategories = Array.from(new Set(allEvents.map(event => event.category)));
  const availableAreas = Array.from(new Set(allEvents.map(event => event.area)));

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterOptions.category === 'all' || event.category === filterOptions.category;
    const matchesArea = filterOptions.area === 'all' || event.area === filterOptions.area;
    const matchesPayment = filterOptions.paymentType === 'all' || 
      (filterOptions.paymentType === 'paid' && event.isPaid) || 
      (filterOptions.paymentType === 'free' && !event.isPaid);

    if (userType === 'organizer' && filterOptions.creatorFilter === 'mine') {
      return matchesSearch && matchesCategory && matchesArea && matchesPayment && 
        createdEvents.some(e => e.id === event.id);
    }

    return matchesSearch && matchesCategory && matchesArea && matchesPayment;
  });

  const getRegisteredEvents = () => allEvents.filter(event => 
    registeredEvents.includes(event.id) && !event.completed
  );
  
  const getCompletedEvents = () => allEvents.filter(event => 
    completedEvents.includes(event.id) || (event.completed && event.attended)
  );

  const getStudentCertificates = () => {
    return certificates.filter(cert => cert.studentId === credentials.studentId);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setUserType(authStep === 'student' ? 'student' : 'organizer');
    
    if (authStep === 'student') {
      setUserProfile({
        name: `Student ${credentials.studentId}`,
        avatar: '/api/placeholder/40/40',
        badges: [
          { id: 'badge1', name: 'Early Bird', discount: 10, expiry: 'May 30, 2025' }
        ],
        certificates: [],
        discounts: 10
      });
      
      setRegisteredEvents([1, 2]);
      setCompletedEvents([3, 4]);
      
      setCertificates([
        {
          id: "cert-001",
          eventId: 3,
          eventName: "Web Development Bootcamp",
          studentId: credentials.studentId || "Student001",
          issueDate: "February 10, 2025",
          template: "standard"
        }
      ]);
    } else {
      setUserProfile({
        name: credentials.organizationName || 'Organization',
        avatar: '/api/placeholder/40/40',
        badges: [],
        certificates: [],
        discounts: 0
      });
      
      setCreatedEvents([
        {
          id: 10,
          title: "Organizer Workshop",
          date: "May 25, 2025",
          time: "2:00 PM - 5:00 PM",
          location: "Conference Room A",
          area: "Admin Building",
          organizer: credentials.organizationName || "Your Organization",
          category: "Workshop",
          spots: 30,
          isPaid: true,
          price: 15,
          completed: false,
          attended: false,
          registrations: 0,
          attendees: [],
          certificates: [],
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Ol692vtqeCnQj4v1XOhkdI6zNU4sq2bR5vVqlGERXqGgruS0vldWuzXgAI4aGfL4e_E&usqp=CAU"
        }
      ]);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAuthModal(true);
    setAuthStep('initial');
    setCredentials({
      email: '',
      password: '',
      studentId: '',
      department: '',
      organizationName: '',
      position: ''
    });
    setUserProfile({
      name: '',
      avatar: '/api/placeholder/40/40',
      badges: [],
      certificates: [],
      discounts: 0
    });
    setRegisteredEvents([]);
    setCompletedEvents([]);
    setCreatedEvents([]);
    setCertificates([]);
  };

  const handleUnregister = (eventId: number) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
    setEventSpots(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1
    }));
  };

  const handleRegister = (event: Event) => {
    if (event.completed || completedEvents.includes(event.id)) {
      alert("You cannot register for a completed event.");
      return;
    }
    
    if (registeredEvents.includes(event.id)) {
      alert("You are already registered for this event.");
      return;
    }
    
    if ((eventSpots[event.id] || event.spots) <= 0) {
      alert("Sorry, this event is fully booked.");
      return;
    }
    
    setSelectedEvent(event);
    setShowModal(true);
  };

  const organizerEventHandlers = {
    handleCreateEvent: () => {
      const newEventId = Math.max(...allEvents.map(e => e.id), 0) + 1;
      const newEvent: Event = {
        id: newEventId,
        title: "",
        date: "",
        time: "",
        location: "",
        area: "",
        organizer: credentials.organizationName || "Your Organization",
        category: "",
        spots: 0,
        isPaid: false,
        completed: false,
        attended: false,
        registrations: 0,
        attendees: [],
        certificates: [],
        imageUrl: ""
      };
      
      setSelectedEvent(newEvent);
      setEditForm(newEvent);
      setEditMode(true);
      setShowModal(true);
    },

    handleEditEvent: (event: Event) => {
      const existingEvent = [...createdEvents, ...demoEvents].find(e => e.id === event.id);
      
      if (existingEvent) {
        setSelectedEvent(existingEvent);
        setEditForm({
          id: existingEvent.id,
          title: existingEvent.title,
          date: existingEvent.date,
          time: existingEvent.time,
          location: existingEvent.location,
          area: existingEvent.area,
          category: existingEvent.category,
          spots: existingEvent.spots,
          isPaid: existingEvent.isPaid,
          price: existingEvent.price || 0,
          imageUrl: existingEvent.imageUrl,
          organizer: existingEvent.organizer
        });
        setEditMode(true);
        setShowModal(true);
      }
    },

    handleSaveEvent: () => {
      if (editForm.id !== undefined && editForm.title) {
        const existingEvent = [...createdEvents, ...demoEvents].find(e => e.id === editForm.id);
        
        const updatedEvent = {
          ...existingEvent,
          ...editForm,
          id: editForm.id,
          organizer: existingEvent?.organizer || credentials.organizationName || "Your Organization"
        } as Event;
    
        if (createdEvents.some(e => e.id === editForm.id)) {
          setCreatedEvents(prev => 
            prev.map(e => e.id === editForm.id ? updatedEvent : e)
          );
        } else {
          setCreatedEvents(prev => [...prev, updatedEvent]);
        }
        
        setShowModal(false);
        setSelectedEvent(null);
        setEditMode(false);
      } else {
        alert("Please provide a title for the event.");
      }
    },

    handleDeleteEvent: () => {
      if (selectedEvent) {
        setCreatedEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
        setShowModal(false);
        setSelectedEvent(null);
        setEditMode(false);
      }
    },

    handleMarkAsCompleted: (eventId: number) => {
      setCreatedEvents(prev => 
        prev.map(e => e.id === eventId ? { ...e, completed: true } : e)
      );
    },

    handleTakeAttendance: (event: Event) => {
      setAttendanceEvent(event);
      setShowAttendanceModal(true);
    },

    handleMarkAttendance: (eventId: number, studentId: string, attended: boolean) => {
      const createdIndex = createdEvents.findIndex(e => e.id === eventId);
      
      if (createdIndex >= 0) {
        const updatedCreatedEvents = [...createdEvents];
        
        if (attended) {
          if (!updatedCreatedEvents[createdIndex].attendees?.includes(studentId)) {
            updatedCreatedEvents[createdIndex] = {
              ...updatedCreatedEvents[createdIndex],
              attendees: [...(updatedCreatedEvents[createdIndex].attendees || []), studentId]
            };
          }
        } else {
          updatedCreatedEvents[createdIndex] = {
            ...updatedCreatedEvents[createdIndex],
            attendees: (updatedCreatedEvents[createdIndex].attendees || []).filter(id => id !== studentId)
          };
        }
        
        setCreatedEvents(updatedCreatedEvents);
      }
      
      setAttendanceList(prev => ({
        ...prev,
        [eventId]: attended 
          ? [...(prev[eventId] || []), studentId]
          : (prev[eventId] || []).filter(id => id !== studentId)
      }));
    },

    handleGenerateCertificate: (eventId: number, studentId: string) => {
      const event = allEvents.find(e => e.id === eventId);
      if (!event) return;
      
      const newCertificate: Certificate = {
        id: `cert-${Date.now()}`,
        eventId,
        eventName: event.title,
        studentId,
        issueDate: new Date().toISOString().split('T')[0],
        template: "standard"
      };
      
      setCertificates(prev => [...prev, newCertificate]);
      
      if (createdEvents.some(e => e.id === eventId)) {
        setCreatedEvents(prev => 
          prev.map(e => e.id === eventId ? {
            ...e,
            certificates: [...(e.certificates || []), newCertificate]
          } : e)
        );
      }
      
      alert(`Certificate generated for ${studentId}`);
    },

    getEventStats: (eventId: number) => {
      const event = allEvents.find(e => e.id === eventId);
      if (!event) return null;
      
      const totalSpots = event.spots;
      const bookedSpots = event.registrations || registeredEvents.filter(id => id === eventId).length;
      const availableSpots = totalSpots - bookedSpots;
      const attendedCount = event.attendees?.length || 0;
      
      return {
        totalSpots,
        bookedSpots,
        availableSpots,
        bookingRate: totalSpots > 0 ? (bookedSpots / totalSpots) * 100 : 0,
        attendanceRate: bookedSpots > 0 ? (attendedCount / bookedSpots) * 100 : 0
      };
    }
  };

  const confirmRegistration = () => {
    if (selectedEvent && !registeredEvents.includes(selectedEvent.id)) {
      let registrationPrice = selectedEvent.price;
      if (selectedEvent.isPaid && userProfile.discounts > 0) {
        registrationPrice = (selectedEvent.price || 0) * (1 - userProfile.discounts / 100);
        alert(`Discount applied! Price reduced by ${userProfile.discounts}%`);
      }
      
      setRegisteredEvents([...registeredEvents, selectedEvent.id]);
      
      setEventSpots(prev => ({
        ...prev,
        [selectedEvent.id]: Math.max(0, (prev[selectedEvent.id] || selectedEvent.spots) - 1)
      }));
      
      if (createdEvents.some(e => e.id === selectedEvent.id)) {
        setCreatedEvents(prev => 
          prev.map(e => 
            e.id === selectedEvent.id 
              ? { ...e, registrations: (e.registrations || 0) + 1 }
              : e
          )
        );
      }
      
      setShowModal(false);
      setSelectedEvent(null);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event); // Set the selected event
  };

  const closeEventModal = () => {
    setSelectedEvent(null); // Close the modal
  };

  if (!isAuthenticated) {
    return (
      <AuthModal
        show={showAuthModal}
        step={authStep}
        credentials={credentials}
        onClose={() => setShowAuthModal(false)}
        onStudentClick={() => setAuthStep('student')}
        onOrganizerClick={() => setAuthStep('organizer')}
        onBack={() => setAuthStep('initial')}
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
        onCredentialsChange={(e) => {
          const { name, value } = e.target;
          setCredentials(prev => ({ ...prev, [name]: value }));
        }}
      />
    );
  }

  return (
<div className="min-h-screen bg-blue-100">
        <Header 
        userType={userType} 
        onLogout={handleLogout} 
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onCreateEvent={userType === 'organizer' ? organizerEventHandlers.handleCreateEvent : undefined}
        userProfile={userProfile}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sticky top-4 z-10 mb-8">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterOptions}
            filterOptions={filterOptions}
            availableCategories={availableCategories}
            availableAreas={availableAreas}
            userType={userType}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              userType={userType}
              isRegistered={registeredEvents.includes(event.id)}
              isCompleted={completedEvents.includes(event.id) || event.completed}
              isAttended={event.attended || (event.attendees?.includes(credentials.studentId || '') || false)}
              spotsAvailable={eventSpots[event.id] ?? event.spots}
              onRegister={handleRegister}
              onManage={userType === 'organizer' ? (event) => organizerEventHandlers.handleEditEvent(event) : undefined}
              isCreatedByUser={userType === 'organizer' && createdEvents.some(e => e.id === event.id)}
              onMarkAsCompleted={userType === 'organizer' ? () => organizerEventHandlers.handleMarkAsCompleted(event.id) : undefined}
              onTakeAttendance={userType === 'organizer' ? () => organizerEventHandlers.handleTakeAttendance(event) : undefined}
              stats={userType === 'organizer' ? organizerEventHandlers.getEventStats(event.id) : undefined}
              userDiscount={userType === 'student' ? userProfile.discounts : 0}
              hasCertificate={userType === 'student' && certificates.some(c => c.eventId === event.id && c.studentId === credentials.studentId)}
              onEventClick={handleEventClick} // Pass the handler
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-16">
            <div className="mx-auto h-24 w-24 text-indigo-400">
              <Calendar className="w-full h-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            {userType === 'organizer' && (
              <button
                onClick={organizerEventHandlers.handleCreateEvent}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Your First Event
              </button>
            )}
          </div>
        )}
      </main>


      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 mt-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center">
      {/* Footer Text */}
      <p className="text-sm text-gray-300 mb-4 md:mb-0">
        &copy; 2025 Archives. All rights reserved.
      </p>

      {/* Contact Icons */}
      <div className="flex space-x-8">
        {/* Phone */}
        <a
          href="tel:+1234567890"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          aria-label="Phone"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10l1.5 1.5a2 2 0 002.5 0L9 10m6 0l1.5 1.5a2 2 0 002.5 0L21 10m-9 4v6m0-6a2 2 0 100-4m0 4a2 2 0 110-4"
            />
          </svg>
          <span className="text-sm">+1 234 567 890</span>
        </a>

        {/* Email */}
        <a
          href="mailto:contact@archives.com"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          aria-label="Email"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0z"
            />
          </svg>
          <span className="text-sm">contact@archives.com</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 8a6 6 0 00-12 0v8a6 6 0 0012 0V8z"
            />
          </svg>
          <span className="text-sm">LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</footer>

      <EventModal
        show={showModal}
        event={selectedEvent}
        editMode={editMode}
        editForm={editForm}
        userType={userType}
        onClose={() => {
          setShowModal(false);
          setSelectedEvent(null);
          setEditMode(false);
          setEditForm({});
        }}
        onConfirmRegistration={confirmRegistration}
        onEditFormChange={(e) => {
          const { name, value, type } = e.target;
          const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
          setEditForm(prev => ({ ...prev, [name]: val }));
        }}
        onSaveChanges={userType === 'organizer' ? organizerEventHandlers.handleSaveEvent : undefined}
        onDeleteEvent={userType === 'organizer' ? organizerEventHandlers.handleDeleteEvent : undefined}
        availableCategories={availableCategories}
        availableAreas={availableAreas}
        userDiscount={userType === 'student' ? userProfile.discounts : 0}
      />

      {userType === 'organizer' && (
        <AttendanceModal
          show={showAttendanceModal}
          event={attendanceEvent}
          attendanceList={attendanceEvent ? (attendanceList[attendanceEvent.id] || []) : []}
          registeredStudents={
            attendanceEvent ? 
            registeredEvents.filter(id => id === attendanceEvent.id).map(id => `Student ${id}`)
              .concat(attendanceEvent?.attendees || [])
              .concat([credentials.studentId || 'Student001']) 
            : []
          }
          onClose={() => {
            setShowAttendanceModal(false);
            setAttendanceEvent(null);
          }}
          onMarkAttendance={(studentId, attended) => {
            if (attendanceEvent) {
              organizerEventHandlers.handleMarkAttendance(attendanceEvent.id, studentId, attended);
            }
          }}
          onGenerateCertificate={(studentId) => {
            if (attendanceEvent) {
              organizerEventHandlers.handleGenerateCertificate(attendanceEvent.id, studentId);
            }
          }}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        registeredEvents={getRegisteredEvents()}
        completedEvents={getCompletedEvents()}
        onUnregister={handleUnregister}
        userType={userType}
        createdEvents={userType === 'organizer' ? createdEvents : []}
        userProfile={userProfile}
        certificates={userType === 'student' ? getStudentCertificates() : []}
        badges={userType === 'student' ? userProfile.badges : []}
      />

      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;