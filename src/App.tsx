// src/App.tsx
import React, { useState } from 'react';
import { AuthModal } from './components/AuthModal/AuthModal';
import { EventModal } from './components/EventModal/EventModal';
import { Header } from './components/Header/Header';
import { EventCard } from './components/EventCard/EventCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { AuthStep, Event, UserCredentials, UserType, FilterOptions } from './components/types';

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
  });

  const demoEvents: Event[] = [
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
    },
  ];

  
  // Extract unique categories and areas for filters
  const availableCategories = Array.from(new Set(demoEvents.map(event => event.category)));
  const availableAreas = Array.from(new Set(demoEvents.map(event => event.area)));

  // Filter events based on search and filters
  const filteredEvents = demoEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterOptions.category === 'all' || event.category === filterOptions.category;
    const matchesArea = filterOptions.area === 'all' || event.area === filterOptions.area;
    const matchesPayment = filterOptions.paymentType === 'all' || 
      (filterOptions.paymentType === 'paid' && event.isPaid) || 
      (filterOptions.paymentType === 'free' && !event.isPaid);

    return matchesSearch && matchesCategory && matchesArea && matchesPayment;
  });

  // Get registered and completed events
  const getRegisteredEvents = () => demoEvents.filter(event => 
    registeredEvents.includes(event.id) && !event.completed
  );
  
  const getCompletedEvents = () => demoEvents.filter(event => 
    completedEvents.includes(event.id) || event.completed
  );

  const handleAuth = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setUserType(authStep === 'student' ? 'student' : 'organizer');
    // Initialize with some demo registered and completed events
    setRegisteredEvents([1, 2]);
    setCompletedEvents([3, 4]);
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
    setRegisteredEvents([]);
    setCompletedEvents([]);
  };

  const handleUnregister = (eventId: number) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
  };

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleManage = (event: Event) => {
    setSelectedEvent(event);
    setEditForm(event);
    setEditMode(true);
    setShowModal(true);
  };

  const confirmRegistration = () => {
    if (selectedEvent && !registeredEvents.includes(selectedEvent.id)) {
      setRegisteredEvents([...registeredEvents, selectedEvent.id]);
      setShowModal(false);
      setSelectedEvent(null);
    }
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
    <div className="min-h-screen bg-gray-50">
      <Header 
        userType={userType} 
        onLogout={handleLogout} 
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterOptions}
          filterOptions={filterOptions}
          availableCategories={availableCategories}
          availableAreas={availableAreas}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              userType={userType}
              isRegistered={registeredEvents.includes(event.id)}
              onRegister={handleRegister}
              onManage={handleManage}
            />
          ))}
        </div>
      </main>

      <EventModal
        show={showModal}
        event={selectedEvent}
        editMode={editMode}
        editForm={editForm}
        onClose={() => {
          setShowModal(false);
          setSelectedEvent(null);
          setEditMode(false);
        }}
        onConfirmRegistration={confirmRegistration}
        onEditFormChange={(e) => {
          const { name, value } = e.target;
          setEditForm(prev => ({ ...prev, [name]: value }));
        }}
        onSaveChanges={() => {
          setShowModal(false);
          setSelectedEvent(null);
          setEditMode(false);
        }}
        onDeleteEvent={() => {
          setShowModal(false);
          setSelectedEvent(null);
          setEditMode(false);
        }}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        registeredEvents={getRegisteredEvents()}
        completedEvents={getCompletedEvents()}
        onUnregister={handleUnregister}
      />
    </div>
  );
}

export default App;