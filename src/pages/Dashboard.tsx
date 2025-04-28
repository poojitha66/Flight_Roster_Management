import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/dashboard/StatCard';
import FlightStatus from '../components/dashboard/FlightStatus';
import CrewAvailability from '../components/dashboard/CrewAvailability';
import RecentAssignments from '../components/dashboard/RecentAssignments';
import { flights, crewMembers, assignments } from '../data/mockData';
import { PlaneTakeoff, Users, Clock, AlertTriangle, TrendingUp, Percent, X, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [showCustomize, setShowCustomize] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    stats: true,
    crewUtilization: true,
    flightStatus: true,
    flightList: true,
    crewAvailability: true,
    recentAssignments: true
  });
  
  // Calculate statistics
  const activeFlights = flights.filter(f => f.status === 'departed' || f.status === 'boarding').length;
  const availableCrew = crewMembers.filter(c => c.status === 'available').length;
  const delayedFlights = flights.filter(f => f.status === 'delayed').length;
  
  // Sample data for crew utilization chart
  const crewUtilizationData = [
    { name: 'Week 1', utilization: 85 },
    { name: 'Week 2', utilization: 88 },
    { name: 'Week 3', utilization: 92 },
    { name: 'Week 4', utilization: 87 },
  ];

  // Sample data for flight status distribution
  const flightStatusData = [
    { name: 'On Time', value: flights.filter(f => f.status === 'scheduled' || f.status === 'boarding').length },
    { name: 'Delayed', value: flights.filter(f => f.status === 'delayed').length },
    { name: 'Departed', value: flights.filter(f => f.status === 'departed').length },
    { name: 'Arrived', value: flights.filter(f => f.status === 'arrived').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex  justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-md text-sm px-3 py-1.5">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <button 
              onClick={() => setShowCustomize(true)}
              className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
            >
              <Settings className="w-4 h-4" />
              Customize View
            </button>
          </div>
        </div>

        {/* Customize Modal */}
        {showCustomize && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Customize Dashboard</h3>
                <button 
                  onClick={() => setShowCustomize(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleSections.stats}
                    onChange={() => toggleSection('stats')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Statistics Cards</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleSections.crewUtilization}
                    onChange={() => toggleSection('crewUtilization')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Crew Utilization Chart</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleSections.flightStatus}
                    onChange={() => toggleSection('flightStatus')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Flight Status Distribution</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleSections.flightList}
                    onChange={() => toggleSection('flightList')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Flight List</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleSections.crewAvailability}
                    onChange={() => toggleSection('crewAvailability')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Crew Availability</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleSections.recentAssignments}
                    onChange={() => toggleSection('recentAssignments')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Recent Assignments</span>
                </label>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowCustomize(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {visibleSections.stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Active Flights" 
              value={activeFlights}
              icon={PlaneTakeoff}
              description="Currently in operation"
              color="blue"
            />
            <StatCard 
              title="Available Crew" 
              value={availableCrew}
              icon={Users}
              description="Ready for assignment"
              color="green"
              trend="up"
              trendValue="3 more than yesterday"
            />
            <StatCard 
              title="Crew Utilization" 
              value="92%"
              icon={Percent}
              description="Current month"
              color="purple"
              trend="up"
              trendValue="5% increase"
            />
            <StatCard 
              title="On-Time Performance" 
              value="95%"
              icon={TrendingUp}
              description="Last 24 hours"
              color="green"
              trend="up"
              trendValue="2% improvement"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleSections.crewUtilization && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Crew Utilization Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={crewUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="utilization" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {visibleSections.flightStatus && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Flight Status Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={flightStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {flightStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {flightStatusData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleSections.flightList && <FlightStatus flights={flights} />}
        {visibleSections.crewAvailability && <CrewAvailability crew={crewMembers} />}
      </div>

      {visibleSections.recentAssignments && (
        <div className="grid grid-cols-1 gap-6">
          <RecentAssignments 
            assignments={assignments} 
            flights={flights} 
            crew={crewMembers} 
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;