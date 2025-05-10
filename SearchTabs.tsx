import React, { useState } from 'react';
import { Plane, Building2, Car } from 'lucide-react';
import FlightSearchForm from './search/FlightSearchForm';
import HotelSearchForm from './search/HotelSearchForm';
import CabSearchForm from './search/CabSearchForm';

const SearchTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cabs'>('flights');

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex">
        <button
          className={`flex items-center justify-center space-x-2 py-3 px-4 md:px-6 text-sm md:text-base font-medium flex-1 rounded-t-lg transition-colors ${
            activeTab === 'flights'
              ? 'bg-white text-sky-600 border-b-2 border-sky-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('flights')}
        >
          <Plane size={18} />
          <span>Flights</span>
        </button>
        
        <button
          className={`flex items-center justify-center space-x-2 py-3 px-4 md:px-6 text-sm md:text-base font-medium flex-1 rounded-t-lg transition-colors ${
            activeTab === 'hotels'
              ? 'bg-white text-sky-600 border-b-2 border-sky-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('hotels')}
        >
          <Building2 size={18} />
          <span>Hotels</span>
        </button>
        
        <button
          className={`flex items-center justify-center space-x-2 py-3 px-4 md:px-6 text-sm md:text-base font-medium flex-1 rounded-t-lg transition-colors ${
            activeTab === 'cabs'
              ? 'bg-white text-sky-600 border-b-2 border-sky-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('cabs')}
        >
          <Car size={18} />
          <span>Cabs</span>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6 bg-white rounded-b-xl">
        {activeTab === 'flights' && <FlightSearchForm />}
        {activeTab === 'hotels' && <HotelSearchForm />}
        {activeTab === 'cabs' && <CabSearchForm />}
      </div>
    </div>
  );
};

export default SearchTabs;