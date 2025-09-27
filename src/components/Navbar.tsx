import React, { useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { useDarkMode } from '../hooks/useDarkMode';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'cases', label: 'Cases' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">HealWell Homeopathy</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
            <button
              onClick={() => onNavigate('consultation')}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Live Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2">
                <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
              </div>
              <button
                onClick={() => {
                  onNavigate('consultation');
                  setIsOpen(false);
                }}
                className="block w-full text-left bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Live Consultation
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};