import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Assignment, Flight, CrewMember } from '../../types';
import Badge from '../ui/Badge';

interface RecentAssignmentsProps {
  assignments: Assignment[];
  flights: Flight[];
  crew: CrewMember[];
}

const RecentAssignments: React.FC<RecentAssignmentsProps> = ({ assignments, flights, crew }) => {
  const getAssignmentDetails = (assignment: Assignment) => {
    const flight = flights.find(f => f.id === assignment.flightId);
    const crewMember = crew.find(c => c.id === assignment.crewId);
    
    return {
      flight,
      crewMember,
    };
  };

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'assigned':
        return <Badge variant="info">Assigned</Badge>;
      case 'confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'checked_in':
        return <Badge variant="primary">Checked In</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <h3 className="text-lg font-semibold text-gray-900">Recent Assignments</h3>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-200">
          {assignments.map((assignment) => {
            const { flight, crewMember } = getAssignmentDetails(assignment);
            
            if (!flight || !crewMember) return null;
            
            return (
              <li key={assignment.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {flight.flightNumber}: {flight.origin} → {flight.destination}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Departure: {formatDateTime(flight.departureTime)}
                    </p>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
                <div className="mt-2 flex items-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{crewMember.name}</span> - {assignment.role}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentAssignments;