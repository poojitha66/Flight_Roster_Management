import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Bell, Filter, Search, CheckCircle } from 'lucide-react';
import { notifications } from '../data/mockData';
import { Notification } from '../types';

const NotificationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<Notification['priority'] | 'all'>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    const matchesRead = readFilter === 'all' || 
      (readFilter === 'read' && notification.isRead) ||
      (readFilter === 'unread' && !notification.isRead);
    
    return matchesSearch && matchesPriority && matchesRead;
  });

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger">Urgent</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'medium':
        return <Badge variant="info">Medium</Badge>;
      case 'low':
        return <Badge variant="success">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Button variant="outline" className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Mark All as Read
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search notifications..."
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
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as Notification['priority'] | 'all')}
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  className="border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={readFilter}
                  onChange={(e) => setReadFilter(e.target.value as 'all' | 'read' | 'unread')}
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.isRead ? 'bg-white' : 'bg-blue-50'
                } ${
                  notification.priority === 'urgent' ? 'border-red-200' :
                  notification.priority === 'high' ? 'border-yellow-200' :
                  'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      notification.isRead ? 'bg-gray-100' : 'bg-blue-100'
                    }`}>
                      <Bell className={`h-5 w-5 ${
                        notification.isRead ? 'text-gray-500' : 'text-blue-500'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        {getPriorityBadge(notification.priority)}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDateTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;