import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/AuthModal/AuthModal';
import { EventModal } from './components/EventModal/EventModal';
import { Header } from './components/Header/Header';
import { EventCard } from './components/EventCard/EventCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { AuthStep, Event, UserCredentials, UserType, FilterOptions, Certificate, Badge } from './components/types';
import { AttendanceModal } from './components/AttendanceModal/AttendanceModal';

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
  const [userProfile, setUserProfile] = useState({
    name: '',
    avatar: '/api/placeholder/40/40',
    badges: [] as Badge[],
    certificates: [] as Certificate[],
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
      certificates: []
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
      ]
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
      certificates: []
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
      certificates: []
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
      certificates: []
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
      certificates: []
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
      certificates: []
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
          id: 9,
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
          certificates: []
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

  // Organizer Event Management Functions
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
        certificates: []
      };
      
      setSelectedEvent(newEvent);
      setEditForm(newEvent);
      setEditMode(true);
      setShowModal(true);
    },

    handleEditEvent: (event: Event) => {
      // Find the event in either createdEvents or demoEvents
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
        };
    
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
        registrationPrice = selectedEvent.price * (1 - userProfile.discounts / 100);
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
        onCreateEvent={userType === 'organizer' ? organizerEventHandlers.handleCreateEvent : undefined}
        userProfile={userProfile}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterOptions}
          filterOptions={filterOptions}
          availableCategories={availableCategories}
          availableAreas={availableAreas}
          userType={userType}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            />
          ))}
        </div>
      </main>

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
    </div>
  );
}

export default App;