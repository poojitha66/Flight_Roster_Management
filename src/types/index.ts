// Define core types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operations' | 'crew';
  avatar?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'delayed' | 'cancelled';
}

export interface CrewMember {
  id: string;
  name: string;
  position: 'captain' | 'first_officer' | 'flight_attendant' | 'purser';
  qualifications: string[];
  avatar?: string;
  status: 'available' | 'on_duty' | 'rest' | 'leave' | 'training';
}

export interface Assignment {
  id: string;
  flightId: string;
  crewId: string;
  role: string;
  status: 'assigned' | 'confirmed' | 'checked_in';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  recipientId?: string;
}