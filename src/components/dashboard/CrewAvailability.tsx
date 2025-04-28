import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { CrewMember } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface CrewAvailabilityProps {
  crew: CrewMember[];
}

const CrewAvailability: React.FC<CrewAvailabilityProps> = ({ crew }) => {
  const getStatusBadge = (status: CrewMember['status']) => {
    switch (status) {
      case 'available':
        return <Badge variant="success">Available</Badge>;
      case 'on_duty':
        return <Badge variant="primary">On Duty</Badge>;
      case 'rest':
        return <Badge variant="info">Rest</Badge>;
      case 'leave':
        return <Badge variant="warning">Leave</Badge>;
      case 'training':
        return <Badge variant="secondary">Training</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPositionLabel = (position: CrewMember['position']) => {
    switch (position) {
      case 'captain':
        return 'Captain';
      case 'first_officer':
        return 'First Officer';
      case 'purser':
        return 'Purser';
      case 'flight_attendant':
        return 'Flight Attendant';
      default:
        return position;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <h3 className="text-lg font-semibold text-gray-900">Crew Availability</h3>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-200">
          {crew.map((member) => (
            <li key={member.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar src={member.avatar} alt={member.name} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{getPositionLabel(member.position)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-wrap mr-2">
                  {member.qualifications.slice(0, 2).map((qual, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-1 mb-1">
                      {qual}
                    </span>
                  ))}
                  {member.qualifications.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-1 mb-1">
                      +{member.qualifications.length - 2}
                    </span>
                  )}
                </div>
                {getStatusBadge(member.status)}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CrewAvailability;