import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { users } from '../../data/mockData';

const Layout: React.FC = () => {
  // For demonstration, we'll use the first user as the current user
  const currentUser = users[0];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={currentUser} />
      <div className="flex-1 flex flex-col ml-16"> {/* Adjusted margin to match sidebar width */}
        <Header />
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50"> {/* Increased padding for better spacing */}
          <div className="max-w-[1920px] mx-auto"> {/* Added max-width container */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;