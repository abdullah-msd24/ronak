import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">RONAK</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/" className="text-gray-700 hover:text-orange-500">Home</Link>
        <Link to="/events" className="text-gray-700 hover:text-orange-500">Events</Link>
        <Link to="/communities" className="text-gray-700 hover:text-orange-500">Communities</Link>
        <Link to="/profile" className="text-gray-700 hover:text-orange-500">Profile</Link>
        <Link to="/chat" className="text-gray-700 hover:text-orange-500">Chat</Link>
        <Link to="/settings" className="text-gray-700 hover:text-orange-500">Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;