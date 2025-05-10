import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Plane, Building2, Car, Calendar, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Plane size={28} className="text-sky-500" />
            <span className="text-2xl font-bold text-sky-900">TravelEase</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/flights" 
              className={({ isActive }) => 
                `flex items-center space-x-1 text-sm font-medium ${
                  isActive ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600'
                } transition-colors`
              }
            >
              <Plane size={18} />
              <span>Flights</span>
            </NavLink>
            <NavLink 
              to="/hotels" 
              className={({ isActive }) => 
                `flex items-center space-x-1 text-sm font-medium ${
                  isActive ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600'
                } transition-colors`
              }
            >
              <Building2 size={18} />
              <span>Hotels</span>
            </NavLink>
            <NavLink 
              to="/cabs" 
              className={({ isActive }) => 
                `flex items-center space-x-1 text-sm font-medium ${
                  isActive ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600'
                } transition-colors`
              }
            >
              <Car size={18} />
              <span>Cabs</span>
            </NavLink>
            <NavLink 
              to="/itinerary" 
              className={({ isActive }) => 
                `flex items-center space-x-1 text-sm font-medium ${
                  isActive ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600'
                } transition-colors`
              }
            >
              <Calendar size={18} />
              <span>My Trips</span>
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/profile" 
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-sky-600 transition-colors"
            >
              <User size={18} />
              <span>Profile</span>
            </NavLink>
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/flights" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 ${
                    isActive ? 'text-sky-600 bg-sky-50 rounded-md' : 'text-gray-700'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Plane size={18} />
                <span>Flights</span>
              </NavLink>
              <NavLink 
                to="/hotels" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 ${
                    isActive ? 'text-sky-600 bg-sky-50 rounded-md' : 'text-gray-700'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building2 size={18} />
                <span>Hotels</span>
              </NavLink>
              <NavLink 
                to="/cabs" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 ${
                    isActive ? 'text-sky-600 bg-sky-50 rounded-md' : 'text-gray-700'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Car size={18} />
                <span>Cabs</span>
              </NavLink>
              <NavLink 
                to="/itinerary" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 ${
                    isActive ? 'text-sky-600 bg-sky-50 rounded-md' : 'text-gray-700'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar size={18} />
                <span>My Trips</span>
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 ${
                    isActive ? 'text-sky-600 bg-sky-50 rounded-md' : 'text-gray-700'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Profile</span>
              </NavLink>
              <button className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;