import React from 'react';
import {
  Home,
  Calendar,
  Users,
  PlaneTakeoff,
  Bell,
  Settings,
  Plane,
  LogOut
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { User } from '../../types';

interface SidebarProps {
  user: User;
}

const navigation = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Flights', icon: PlaneTakeoff, path: '/flights' },
  { name: 'Crew', icon: Users, path: '/crew' },
  { name: 'Roster', icon: Calendar, path: '/roster' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const handleLogout = () => {
    // TODO: Add your logout logic here (e.g., clear auth, redirect)
    alert('Logged out!');
  };

  return (
    <div className="fixed left-0 top-0 w-16 h-full bg-[#0F172A] flex flex-col justify-between text-white z-10 shadow-lg">
      {/* Logo at the top */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <Plane size={36} className="text-emerald-400 mb-2" />
      </div>
      {/* Navigation */}
      <div className="flex flex-col items-center pt-1 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-all duration-200 group
              ${isActive
                ? 'bg-white/10 text-white shadow-[0_0_8px_#8B5CF6]'
                : 'text-gray-300 hover:bg-white/5 hover:shadow-[0_0_8px_#6366F1]'}`
            }
            title={item.name}
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="text-[7px] text-center mt-1 opacity-60 group-hover:opacity-100">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-6 space-y-2">
        <Avatar src={user.avatar} alt={user.name} size="sm" />
        <span className="text-xs text-white font-semibold text-center">{user.name}</span>
        <span className="text-[8px] text-gray-400 text-center">{user.role}</span>
        <button
          onClick={handleLogout}
          className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 text-gray-300 hover:bg-white/5 hover:text-white hover:shadow-[0_0_8px_#6366F1]"
        >
          <LogOut size={20} className="hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;