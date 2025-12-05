import React from 'react';
import { useRouter } from 'next/router';
import { FaHome, FaUsers, FaCalendarAlt, FaComments, FaCog } from 'react-icons/fa';

const MobileNav = () => {
  const router = useRouter();

  const navItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Communities', icon: <FaUsers />, path: '/communities' },
    { name: 'Events', icon: <FaCalendarAlt />, path: '/events' },
    { name: 'Chat', icon: <FaComments />, path: '/chat' },
    { name: 'Settings', icon: <FaCog />, path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <ul className="flex justify-around p-2">
        {navItems.map((item) => (
          <li key={item.name} className="flex flex-col items-center">
            <button
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg ${
                router.pathname === item.path ? 'text-orange-500' : 'text-gray-600'
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;