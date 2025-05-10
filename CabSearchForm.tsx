import React, { useState } from 'react';
import { Calendar, MapPin, Users, Search, Clock } from 'lucide-react';
import DatePicker from '../common/DatePicker';

const CabSearchForm: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  
  // Form state
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());
  const [pickupTime, setPickupTime] = useState('12:00');
  const [passengers, setPassengers] = useState(2);
  
  // Time options
  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      timeOptions.push(`${hour}:${minute}`);
    }
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      passengers
    });
    // Here you would handle the search logic
  };

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pickup Location */}
        <div className="relative">
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="pickupLocation"
              type="text"
              placeholder="Address, Airport, Hotel, etc."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>
        </div>
        
        {/* Dropoff Location */}
        <div className="relative">
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">Dropoff Location</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="dropoffLocation"
              type="text"
              placeholder="Address, Airport, Hotel, etc."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
            />
          </div>
        </div>
        
        {/* Pickup Date */}
        <div className="relative">
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              id="pickupDate"
              className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              {pickupDate ? pickupDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}
            </button>
            {showDatePicker && (
              <div className="absolute z-20 mt-1">
                <DatePicker 
                  selectedDate={pickupDate} 
                  onChange={(date) => {
                    setPickupDate(date);
                    setShowDatePicker(false);
                  }}
                  onClose={() => setShowDatePicker(false)}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Pickup Time */}
        <div className="relative">
          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
          <div className="relative">
            <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              id="pickupTime"
              className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              onClick={() => setShowTimePicker(!showTimePicker)}
            >
              {pickupTime}
            </button>
            {showTimePicker && (
              <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg">
                <div className="p-2">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`w-full text-left px-4 py-2 hover:bg-sky-50 rounded ${
                        time === pickupTime ? 'bg-sky-100 text-sky-700' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setPickupTime(time);
                        setShowTimePicker(false);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional Options and Search Button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <Users size={18} className="text-gray-500" />
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setShowPassengers(!showPassengers)}
            >
              {passengers} Passenger{passengers !== 1 ? 's' : ''}
            </button>
          </div>
          
          {showPassengers && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-30">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Passengers</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{passengers}</span>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    onClick={() => setPassengers(Math.min(16, passengers + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full mt-4 bg-sky-500 text-white rounded-lg py-2 hover:bg-sky-600 transition-colors"
                onClick={() => setShowPassengers(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-8 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Search size={18} />
          <span>Search Cabs</span>
        </button>
      </div>
    </form>
  );
};

export default CabSearchForm;