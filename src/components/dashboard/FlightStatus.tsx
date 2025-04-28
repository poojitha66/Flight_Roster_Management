import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Flight } from '../../types';
import Badge from '../ui/Badge';

interface FlightStatusProps {
  flights: Flight[];
}

const FlightStatus: React.FC<FlightStatusProps> = ({ flights }) => {
  const getStatusBadge = (status: Flight['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="info">Scheduled</Badge>;
      case 'boarding':
        return <Badge variant="warning">Boarding</Badge>;
      case 'departed':
        return <Badge variant="primary">Departed</Badge>;
      case 'arrived':
        return <Badge variant="success">Arrived</Badge>;
      case 'delayed':
        return <Badge variant="warning">Delayed</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
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
        <h3 className="text-lg font-semibold text-gray-900">Today's Flights</h3>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flight
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {flight.flightNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {flight.origin} → {flight.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(flight.departureTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(flight.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightStatus;