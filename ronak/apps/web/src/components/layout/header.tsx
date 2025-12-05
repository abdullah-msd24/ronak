import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="text-2xl font-bold text-primary">
              RONAK
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/events" className="text-gray-700 hover:text-primary">
              Events
            </Link>
            <Link href="/communities" className="text-gray-700 hover:text-primary">
              Communities
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-primary">
              Profile
            </Link>
            <Link href="/chat" className="text-gray-700 hover:text-primary">
              Chat
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-primary">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;