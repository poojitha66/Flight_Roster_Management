import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { assignments, flights, crewMembers } from '../data/mockData';

const RosterView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('week');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getWeekDates = () => {
    const dates = [];
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const days = view === 'week' ? 7 : 1;
    newDate.setDate(newDate.getDate() + (direction === 'next' ? days : -days));
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Roster View</h1>
        <div className="flex items-center gap-4">
          <div className="flex rounded-md shadow-sm">
            <Button
              variant={view === 'day' ? 'primary' : 'outline'}
              className="rounded-r-none"
              onClick={() => setView('day')}
            >
              Day
            </Button>
            <Button
              variant={view === 'week' ? 'primary' : 'outline'}
              className="rounded-l-none"
              onClick={() => setView('week')}
            >
              Week
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-lg font-medium">
                  {view === 'week' 
                    ? `Week of ${formatDate(getWeekDates()[0])}`
                    : formatDate(currentDate)
                  }
                </span>
              </div>
              <Button variant="outline" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="outline">
              Export Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-4">
            {/* Time slots column */}
            <div className="col-span-1">
              <div className="h-12"></div> {/* Header spacing */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-20 border-t border-gray-200 text-sm text-gray-500 py-1">
                  {`${i.toString().padStart(2, '0')}:00`}
                </div>
              ))}
            </div>

            {/* Schedule grid */}
            {view === 'week' ? getWeekDates().map((date, dateIndex) => (
              <div key={dateIndex} className="col-span-1">
                <div className="h-12 text-center font-medium border-b border-gray-200">
                  {formatDate(date)}
                </div>
                <div className="relative">
                  {assignments.map((assignment) => {
                    const flight = flights.find(f => f.id === assignment.flightId);
                    const crew = crewMembers.find(c => c.id === assignment.crewId);
                    
                    if (!flight || !crew) return null;
                    
                    const assignmentDate = new Date(flight.departureTime);
                    if (assignmentDate.toDateString() !== date.toDateString()) return null;

                    const startHour = assignmentDate.getHours();
                    const duration = (new Date(flight.arrivalTime).getTime() - assignmentDate.getTime()) / (1000 * 60 * 60);

                    return (
                      <div
                        key={assignment.id}
                        className="absolute left-1 right-1 bg-blue-100 rounded-md p-2 overflow-hidden"
                        style={{
                          top: `${startHour * 5}rem`,
                          height: `${duration * 5}rem`,
                        }}
                      >
                        <div className="text-xs font-medium text-blue-900 truncate">
                          {flight.flightNumber}
                        </div>
                        <div className="text-xs text-blue-700">
                          {formatTime(flight.departureTime)} - {formatTime(flight.arrivalTime)}
                        </div>
                        <div className="text-xs text-blue-800 truncate">
                          {crew.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )) : (
              <div className="col-span-7">
                <div className="h-12 border-b border-gray-200"></div>
                <div className="relative">
                  {assignments.map((assignment) => {
                    const flight = flights.find(f => f.id === assignment.flightId);
                    const crew = crewMembers.find(c => c.id === assignment.crewId);
                    
                    if (!flight || !crew) return null;
                    
                    const assignmentDate = new Date(flight.departureTime);
                    if (assignmentDate.toDateString() !== currentDate.toDateString()) return null;

                    const startHour = assignmentDate.getHours();
                    const duration = (new Date(flight.arrivalTime).getTime() - assignmentDate.getTime()) / (1000 * 60 * 60);

                    return (
                      <div
                        key={assignment.id}
                        className="absolute left-1 right-1 bg-blue-100 rounded-md p-2"
                        style={{
                          top: `${startHour * 5}rem`,
                          height: `${duration * 5}rem`,
                        }}
                      >
                        <div className="font-medium text-blue-900">
                          {flight.flightNumber}: {flight.origin} → {flight.destination}
                        </div>
                        <div className="text-sm text-blue-700">
                          {formatTime(flight.departureTime)} - {formatTime(flight.arrivalTime)}
                        </div>
                        <div className="text-sm text-blue-800">
                          {crew.name} - {assignment.role}
                        </div>
                        <Badge variant="primary" className="mt-1">
                          {assignment.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RosterView;