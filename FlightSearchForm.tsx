import React, { useState } from 'react';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import DatePicker from '../common/DatePicker';

type TripType = 'roundtrip' | 'oneway' | 'multicity';

const FlightSearchForm: React.FC = () => {
  const [tripType, setTripType] = useState<TripType>('roundtrip');
  const [showDatePicker, setShowDatePicker] = useState<'depart' | 'return' | null>(null);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [showPassengers, setShowPassengers] = useState(false);
  
  // Form state
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departDate, setDepartDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      tripType,
      departureCity,
      arrivalCity,
      departDate,
      returnDate,
      passengers
    });
    // Here you would handle the search logic
  };

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      {/* Trip Type Selection */}
      <div className="flex space-x-6 border-b pb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            className="sr-only"
            checked={tripType === 'roundtrip'}
            onChange={() => setTripType('roundtrip')}
          />
          <span className={`w-4 h-4 rounded-full border flex-shrink-0 mr-2 ${
            tripType === 'roundtrip' ? 'border-sky-500 bg-sky-500' : 'border-gray-300'
          }`}>
            {tripType === 'roundtrip' && (
              <span className="w-2 h-2 rounded-full bg-white block m-auto"></span>
            )}
          </span>
          <span className="text-gray-700">Round Trip</span>
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            className="sr-only"
            checked={tripType === 'oneway'}
            onChange={() => setTripType('oneway')}
          />
          <span className={`w-4 h-4 rounded-full border flex-shrink-0 mr-2 ${
            tripType === 'oneway' ? 'border-sky-500 bg-sky-500' : 'border-gray-300'
          }`}>
            {tripType === 'oneway' && (
              <span className="w-2 h-2 rounded-full bg-white block m-auto"></span>
            )}
          </span>
          <span className="text-gray-700">One Way</span>
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            className="sr-only"
            checked={tripType === 'multicity'}
            onChange={() => setTripType('multicity')}
          />
          <span className={`w-4 h-4 rounded-full border flex-shrink-0 mr-2 ${
            tripType === 'multicity' ? 'border-sky-500 bg-sky-500' : 'border-gray-300'
          }`}>
            {tripType === 'multicity' && (
              <span className="w-2 h-2 rounded-full bg-white block m-auto"></span>
            )}
          </span>
          <span className="text-gray-700">Multi-city</span>
        </label>
      </div>
      
      {/* Main Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* From */}
        <div className="relative">
          <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="departureCity"
              type="text"
              placeholder="City or Airport"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
            />
          </div>
        </div>
        
        {/* To */}
        <div className="relative">
          <label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="arrivalCity"
              type="text"
              placeholder="City or Airport"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
            />
          </div>
        </div>
        
        {/* Depart Date */}
        <div className="relative">
          <label htmlFor="departDate" className="block text-sm font-medium text-gray-700 mb-1">Depart</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              id="departDate"
              className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              onClick={() => setShowDatePicker(showDatePicker === 'depart' ? null : 'depart')}
            >
              {departDate ? departDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}
            </button>
            {showDatePicker === 'depart' && (
              <div className="absolute z-20 mt-1">
                <DatePicker 
                  selectedDate={departDate} 
                  onChange={(date) => {
                    setDepartDate(date);
                    setShowDatePicker(null);
                  }}
                  onClose={() => setShowDatePicker(null)}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Return Date */}
        {tripType === 'roundtrip' && (
          <div className="relative">
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">Return</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                id="returnDate"
                className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                onClick={() => setShowDatePicker(showDatePicker === 'return' ? null : 'return')}
              >
                {returnDate ? returnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}
              </button>
              {showDatePicker === 'return' && (
                <div className="absolute z-20 mt-1">
                  <DatePicker 
                    selectedDate={returnDate} 
                    onChange={(date) => {
                      setReturnDate(date);
                      setShowDatePicker(null);
                    }}
                    onClose={() => setShowDatePicker(null)}
                    minDate={departDate || undefined}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Passengers */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <Users size={18} className="text-gray-500" />
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setShowPassengers(!showPassengers)}
            >
              {passengers.adults + passengers.children + passengers.infants} Passenger{passengers.adults + passengers.children + passengers.infants !== 1 ? 's' : ''}
            </button>
          </div>
          
          {showPassengers && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-30">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Adults</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      onClick={() => setPassengers({...passengers, adults: Math.max(1, passengers.adults - 1)})}
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{passengers.adults}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      onClick={() => setPassengers({...passengers, adults: Math.min(9, passengers.adults + 1)})}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Children</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      onClick={() => setPassengers({...passengers, children: Math.max(0, passengers.children - 1)})}
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{passengers.children}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      onClick={() => setPassengers({...passengers, children: Math.min(8, passengers.children + 1)})}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Infants</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      onClick={() => setPassengers({...passengers, infants: Math.max(0, passengers.infants - 1)})}
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{passengers.infants}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      onClick={() => setPassengers({...passengers, infants: Math.min(passengers.adults, passengers.infants + 1)})}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="w-full bg-sky-500 text-white rounded-lg py-2 hover:bg-sky-600 transition-colors"
                  onClick={() => setShowPassengers(false)}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-8 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Search size={18} />
          <span>Search Flights</span>
        </button>
      </div>
    </form>
  );
};

export default FlightSearchForm;