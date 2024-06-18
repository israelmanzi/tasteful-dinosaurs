import { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { IoPersonOutline } from 'react-icons/io5';

export default function DashboardLayout() {
  const { user, logout } = useAuth(); // Fetch user data and logout function from authentication context
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage visibility of dropdown menu
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to dropdown menu DOM element

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown menu visibility
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false); // Close dropdown if clicked outside of it
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Add event listener to handle clicks outside dropdown
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener on component unmount
    };
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <Link className="text-2xl font-semibold" to={'/dashboard'}>
          Library Management System
        </Link>
        <div className="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6 cursor-pointer">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="relative" ref={dropdownRef}>
              <div
                className="-m-1.5 flex items-center p-1.5"
                onClick={toggleDropdown}
              >
                <IoPersonOutline />
                <span className="hidden lg:flex lg:flex-col">
                  <span
                    className="ml-4 text-sm font-semibold text-gray-900"
                    aria-hidden="true"
                  >
                    {user?.lastName} {user?.firstName}
                  </span>
                  <span
                    className="ml-4 text-sm font-semibold text-gray-500"
                    aria-hidden="true"
                  >
                    {user?.email}
                  </span>
                </span>
              </div>
              {dropdownVisible && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-slate-800 hover:text-white">
                  <div className="py-1">
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-left text-sm"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <main className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
