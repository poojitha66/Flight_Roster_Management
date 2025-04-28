import { User, Flight, CrewMember, Assignment, Notification } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@airline.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@airline.com',
    role: 'operations',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    name: 'Miguel Rodriguez',
    email: 'miguel.rodriguez@airline.com',
    role: 'crew',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

// Mock Flights
export const flights: Flight[] = [
  {
    id: '1',
    flightNumber: 'AL101',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2025-04-15T08:00:00Z',
    arrivalTime: '2025-04-15T11:30:00Z',
    aircraft: 'Boeing 737-800',
    status: 'scheduled',
  },
  {
    id: '2',
    flightNumber: 'AL202',
    origin: 'LAX',
    destination: 'ORD',
    departureTime: '2025-04-15T13:00:00Z',
    arrivalTime: '2025-04-15T19:00:00Z',
    aircraft: 'Airbus A320',
    status: 'scheduled',
  },
  {
    id: '3',
    flightNumber: 'AL303',
    origin: 'SFO',
    destination: 'DFW',
    departureTime: '2025-04-15T10:15:00Z',
    arrivalTime: '2025-04-15T16:00:00Z',
    aircraft: 'Boeing 787-9',
    status: 'delayed',
  },
  {
    id: '4',
    flightNumber: 'AL404',
    origin: 'MIA',
    destination: 'JFK',
    departureTime: '2025-04-15T16:30:00Z',
    arrivalTime: '2025-04-15T19:45:00Z',
    aircraft: 'Airbus A321',
    status: 'scheduled',
  },
  {
    id: '5',
    flightNumber: 'AL505',
    origin: 'DFW',
    destination: 'SEA',
    departureTime: '2025-04-15T07:45:00Z',
    arrivalTime: '2025-04-15T10:15:00Z',
    aircraft: 'Boeing 737-900',
    status: 'departed',
  }
];

// Mock Crew Members
export const crewMembers: CrewMember[] = [
  {
    id: '1',
    name: 'Laura Chen',
    position: 'captain',
    qualifications: ['B737', 'A320'],
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'available',
  },
  {
    id: '2',
    name: 'David Miller',
    position: 'first_officer',
    qualifications: ['B737', 'B787'],
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'on_duty',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    position: 'purser',
    qualifications: ['International', 'First Class'],
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'available',
  },
  {
    id: '4',
    name: 'Robert Jones',
    position: 'flight_attendant',
    qualifications: ['Safety', 'First Aid'],
    avatar: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'rest',
  },
  {
    id: '5',
    name: 'Emma Wilson',
    position: 'captain',
    qualifications: ['A320', 'A321'],
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'on_duty',
  }
];

// Mock Assignments
export const assignments: Assignment[] = [
  {
    id: '1',
    flightId: '1',
    crewId: '1',
    role: 'Captain',
    status: 'assigned',
  },
  {
    id: '2',
    flightId: '1',
    crewId: '2',
    role: 'First Officer',
    status: 'assigned',
  },
  {
    id: '3',
    flightId: '2',
    crewId: '5',
    role: 'Captain',
    status: 'confirmed',
  },
  {
    id: '4',
    flightId: '3',
    crewId: '3',
    role: 'Purser',
    status: 'confirmed',
  },
  {
    id: '5',
    flightId: '3',
    crewId: '4',
    role: 'Flight Attendant',
    status: 'assigned',
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Flight Delay',
    message: 'Flight AL303 has been delayed by 2 hours due to weather conditions.',
    createdAt: '2025-04-14T18:30:00Z',
    priority: 'high',
    isRead: false,
  },
  {
    id: '2',
    title: 'New Assignment',
    message: 'You have been assigned to Flight AL101 as Captain.',
    createdAt: '2025-04-14T14:15:00Z',
    priority: 'medium',
    isRead: true,
    recipientId: '1',
  },
  {
    id: '3',
    title: 'Schedule Change',
    message: 'Flight AL202 departure time has been changed to 13:30.',
    createdAt: '2025-04-14T10:45:00Z',
    priority: 'medium',
    isRead: false,
  },
  {
    id: '4',
    title: 'Maintenance Alert',
    message: 'Aircraft for Flight AL404 has been changed to Airbus A320.',
    createdAt: '2025-04-14T09:20:00Z',
    priority: 'low',
    isRead: true,
  },
  {
    id: '5',
    title: 'System Update',
    message: 'The roster system will be down for maintenance on April 16 from 02:00-04:00 UTC.',
    createdAt: '2025-04-13T16:00:00Z',
    priority: 'urgent',
    isRead: false,
  }
];