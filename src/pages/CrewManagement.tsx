import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Users, Plus, Filter, Search } from 'lucide-react';
import { crewMembers } from '../data/mockData';
import { CrewMember } from '../types';

const CrewManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<CrewMember['position'] | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<CrewMember['status'] | 'all'>('all');

  const filteredCrew = crewMembers.filter(crew => {
    const matchesSearch = 
      crew.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crew.qualifications.some(q => q.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPosition = positionFilter === 'all' || crew.position === positionFilter;
    const matchesStatus = statusFilter === 'all' || crew.status === statusFilter;
    
    return matchesSearch && matchesPosition && matchesStatus;
  });

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Crew Management</h1>
        <Button className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Crew Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search crew members..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 h-5 w-5" />
                <select
                  className="border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value as CrewMember['position'] | 'all')}
                >
                  <option value="all">All Positions</option>
                  <option value="captain">Captain</option>
                  <option value="first_officer">First Officer</option>
                  <option value="purser">Purser</option>
                  <option value="flight_attendant">Flight Attendant</option>
                </select>
                <select
                  className="border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as CrewMember['status'] | 'all')}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="on_duty">On Duty</option>
                  <option value="rest">Rest</option>
                  <option value="leave">Leave</option>
                  <option value="training">Training</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crew Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qualifications
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
                {filteredCrew.map((crew) => (
                  <tr key={crew.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar src={crew.avatar} alt={crew.name} size="sm" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{crew.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getPositionLabel(crew.position)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {crew.qualifications.map((qual, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {qual}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(crew.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Schedule</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrewManagement;