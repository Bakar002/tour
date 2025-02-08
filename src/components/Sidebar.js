'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaPlane, FaUsers } from 'react-icons/fa'; // Importing icons

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/admin/dashboard' },
    { name: 'Flights', icon: <FaPlane />, path: '/admin/flights' },
    { name: 'Users', icon: <FaUsers />, path: '/admin/users' },
    // Add more sidebar items here
  ];

  return (
    <div
      className={`h-screen flex ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 bg-gray-800 text-white`}
    >
      {/* Sidebar */}
      <div className="flex flex-col w-full">
        {/* Top Section: Admin Panel Label & Toggle Button */}
        <div className="flex items-center justify-between p-4">
          <h2 className={`text-xl font-semibold ${isOpen ? 'block' : 'hidden'}`}>Admin Panel</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white md:hidden focus:outline-none"
          >
            {isOpen ? 'Close' : 'Open'}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-grow p-2 space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => router.push(item.path)}
                className={`flex items-center space-x-3 w-full text-left p-3 rounded-md hover:bg-gray-700 ${
                  isOpen ? 'justify-start' : 'justify-center'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="text-lg font-medium">{item.name}</span>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
