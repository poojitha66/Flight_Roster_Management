import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { notifications } from '../../data/mockData';
import Badge from '../ui/Badge';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  // Close notifications when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-8 sticky top-0 z-20"> {/* Adjusted padding */}
      <div className="w-full flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Flight Roster Management</h1>
        </div>

        <div className="flex items-center relative">
          <div className="relative mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <Bell className="h-6 w-6 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                </div>
                <div>
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-gray-500">No notifications</p>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <Link 
                        to="/notifications" 
                        key={notification.id} 
                        className={`block p-4 hover:bg-gray-50 border-b border-gray-100 ${
                          !notification.isRead ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <Badge 
                            variant={
                              notification.priority === 'urgent' ? 'danger' : 
                              notification.priority === 'high' ? 'warning' : 
                              notification.priority === 'medium' ? 'info' : 'success'
                            }
                          >
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </Link>
                    ))
                  )}
                  <Link
                    to="/notifications"
                    className="block p-2 text-center text-sm text-blue-600 hover:bg-gray-50 border-t border-gray-100"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;