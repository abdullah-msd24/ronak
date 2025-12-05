import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-white shadow-md h-full">
      <h2 className="text-lg font-semibold p-4">Admin Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/admin/users" className="block p-4 hover:bg-gray-100">
            Manage Users
          </Link>
        </li>
        <li>
          <Link to="/admin/events" className="block p-4 hover:bg-gray-100">
            Manage Events
          </Link>
        </li>
        <li>
          <Link to="/admin/communities" className="block p-4 hover:bg-gray-100">
            Manage Communities
          </Link>
        </li>
        <li>
          <Link to="/admin/experiences" className="block p-4 hover:bg-gray-100">
            Manage Experiences
          </Link>
        </li>
        <li>
          <Link to="/admin/analytics" className="block p-4 hover:bg-gray-100">
            Analytics
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;