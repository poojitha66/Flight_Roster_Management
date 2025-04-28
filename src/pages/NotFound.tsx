import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { PlaneTakeoff, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center max-w-md">
        <PlaneTakeoff className="h-16 w-16 text-blue-500 mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 text-center mb-8">
          The page you're looking for has either taken off without you or doesn't exist.
          Let's navigate back to the main terminal.
        </p>
        <Link to="/">
          <Button className="flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;