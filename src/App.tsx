import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import FlightManagement from './pages/FlightManagement';
import CrewManagement from './pages/CrewManagement';
import RosterView from './pages/RosterView';
import NotificationsPage from './pages/NotificationsPage';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

function App() {
  // For demo, we'll assume the user is authenticated if needed
  // In a real app, you would check for a token or session
  const isAuthenticated = true;  // For demo/preview purposes

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route 
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/flights" element={<FlightManagement />} />
          <Route path="/crew" element={<CrewManagement />} />
          <Route path="/roster" element={<RosterView />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;