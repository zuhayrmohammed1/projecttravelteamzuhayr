import React, { useState } from 'react';
import { Calendar, MapPin, Users, Search, Star } from 'lucide-react';
import DatePicker from '../common/DatePicker';

const HotelSearchForm: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState<'checkIn' | 'checkOut' | null>(null);
  const [showGuests, setShowGuests] = useState(false);
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [starRating, setStarRating] = useState<number | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      location,
      checkInDate,
      checkOutDate,
      guests,
      starRating
    });
    // Here you would handle the search logic
  };

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Location */}
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="location"
              type="text"
              placeholder="City, Hotel, or Specific Location"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        {/* Check-in Date */}
        <div className="relative">
          <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              id="checkInDate"
              className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              onClick={() => setShowDatePicker(showDatePicker === 'checkIn' ? null : 'checkIn')}
            >
              {checkInDate ? checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}
            </button>
            {showDatePicker === 'checkIn' && (
              <div className="absolute z-20 mt-1">
                <DatePicker 
                  selectedDate={checkInDate} 
                  onChange={(date) => {
                    setCheckInDate(date);
                    
                    // If check-out date is before check-in date, update it
                    if (checkOutDate && date && checkOutDate < date) {
                      // Set check-out to check-in + 1 day
                      const nextDay = new Date(date);
                      nextDay.setDate(nextDay.getDate() + 1);
                      setCheckOutDate(nextDay);
                    }
                    
                    setShowDatePicker(null);
                  }}
                  onClose={() => setShowDatePicker(null)}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Check-out Date */}
        <div className="relative">
          <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              id="checkOutDate"
              className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              onClick={() => setShowDatePicker(showDatePicker === 'checkOut' ? null : 'checkOut')}
            >
              {checkOutDate ? checkOutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}
            </button>
            {showDatePicker === 'checkOut' && (
              <div className="absolute z-20 mt-1">
                <DatePicker 
                  selectedDate={checkOutDate} 
                  onChange={(date) => {
                    setCheckOutDate(date);
                    setShowDatePicker(null);
                  }}
                  onClose={() => setShowDatePicker(null)}
                  minDate={checkInDate || undefined}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Guests */}
        <div className="relative">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <div className="relative">
            <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              id="guests"
              className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              onClick={() => setShowGuests(!showGuests)}
            >
              {guests.adults} Adult{guests.adults !== 1 ? 's' : ''}{guests.children > 0 ? `, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}` : ''}
            </button>
            
            {showGuests && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border p-4 z-30">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Adults</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        onClick={() => setGuests({...guests, adults: Math.max(1, guests.adults - 1)})}
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{guests.adults}</span>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        onClick={() => setGuests({...guests, adults: Math.min(10, guests.adults + 1)})}
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
                        onClick={() => setGuests({...guests, children: Math.max(0, guests.children - 1)})}
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{guests.children}</span>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        onClick={() => setGuests({...guests, children: Math.min(6, guests.children + 1)})}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className="w-full bg-sky-500 text-white rounded-lg py-2 hover:bg-sky-600 transition-colors"
                    onClick={() => setShowGuests(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional Options and Search Button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-1">
          <div className="text-sm text-gray-700 mr-2">Star Rating:</div>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              className={`p-1 rounded-full focus:outline-none transition-colors ${
                starRating === rating ? 'text-amber-500' : 'text-gray-300 hover:text-amber-300'
              }`}
              onClick={() => setStarRating(starRating === rating ? null : rating)}
            >
              <Star size={18} className="fill-current" />
            </button>
          ))}
        </div>
        
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-8 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Search size={18} />
          <span>Search Hotels</span>
        </button>
      </div>
    </form>
  );
};

export default HotelSearchForm;