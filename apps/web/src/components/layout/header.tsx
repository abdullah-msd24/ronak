'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    router.push('/');
  };

  const getInitials = () => {
    if (user?.profile?.firstName && user?.profile?.lastName) {
      return `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-500">RONAK</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-gray-700 hover:text-red-500 font-medium transition">
              Events
            </Link>
            <Link href="/meetups" className="text-gray-700 hover:text-red-500 font-medium transition">
              Meetups
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-red-500 font-medium transition">
              Profile
            </Link>
            <button 
              onClick={() => alert('Coming Soon!')}
              className="text-gray-400 font-medium cursor-not-allowed"
            >
              Chat
            </button>
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              /* User is logged in */
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">
                        {user?.profile?.firstName} {user?.profile?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/events/my-events"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Events
                    </Link>
                    <Link
                      href="/meetups/my-meetups"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Meetups
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* User is not logged in */
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-red-500 font-medium transition">
                  Log In
                </Link>
                <Link href="/auth/register" className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/events" className="text-gray-700 hover:text-red-500 font-medium">
                Events
              </Link>
              <Link href="/meetups" className="text-gray-700 hover:text-red-500 font-medium">
                Meetups
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-red-500 font-medium">
                Profile
              </Link>
              <button 
                onClick={() => alert('Coming Soon!')}
                className="text-gray-400 font-medium text-left cursor-not-allowed"
              >
                Chat (Coming Soon)
              </button>
              <hr className="border-gray-200" />
              {user ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {user?.profile?.firstName} {user?.profile?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link href="/events/my-events" className="text-gray-700 hover:text-red-500 font-medium">
                    My Events
                  </Link>
                  <Link href="/meetups/my-meetups" className="text-gray-700 hover:text-red-500 font-medium">
                    My Meetups
                  </Link>
                  <Link href="/settings" className="text-gray-700 hover:text-red-500 font-medium">
                    Settings
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link href="/admin" className="text-gray-700 hover:text-red-500 font-medium">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 hover:text-red-500 font-medium">
                    Log In
                  </Link>
                  <Link href="/auth/register" className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;