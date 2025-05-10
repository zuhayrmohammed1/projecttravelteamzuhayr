import React, { useState } from 'react';
import { Filter, ArrowRight, ChevronDown, Clock, ChevronsUpDown, DollarSign, AlertCircle } from 'lucide-react';
import SearchTabs from '../components/SearchTabs';
import { useBooking } from '../context/BookingContext';

// Mock flight data
const flightResults = [
  {
    id: 'f1',
    airline: 'Delta Airlines',
    flightNumber: 'DL2478',
    logo: 'https://images.pexels.com/photos/4472024/pexels-photo-4472024.jpeg', // Using a placeholder
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '08:15',
    arrivalCity: 'Los Angeles',
    arrivalCode: 'LAX',
    arrivalTime: '11:45',
    duration: '5h 30m',
    stops: 0,
    price: 549,
    class: 'Economy',
  },
  {
    id: 'f2',
    airline: 'United Airlines',
    flightNumber: 'UA1282',
    logo: 'https://images.pexels.com/photos/4472024/pexels-photo-4472024.jpeg', // Using a placeholder
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '10:30',
    arrivalCity: 'Los Angeles',
    arrivalCode: 'LAX',
    arrivalTime: '14:15',
    duration: '5h 45m',
    stops: 1,
    stopCity: 'Chicago',
    price: 499,
    class: 'Economy',
  },
  {
    id: 'f3',
    airline: 'American Airlines',
    flightNumber: 'AA3901',
    logo: 'https://images.pexels.com/photos/4472024/pexels-photo-4472024.jpeg', // Using a placeholder
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '13:45',
    arrivalCity: 'Los Angeles',
    arrivalCode: 'LAX',
    arrivalTime: '17:10',
    duration: '5h 25m',
    stops: 0,
    price: 579,
    class: 'Economy',
  },
];

const FlightsPage: React.FC = () => {
  const { setCurrentFlight, createItinerary, addToItinerary } = useBooking();
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sorting options
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departureTime'>('price');
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxStops, setMaxStops] = useState<number | null>(null);
  
  const handleAddToItinerary = (flight: typeof flightResults[0]) => {
    // Create a simplified flight object to add to the itinerary
    const flightBooking = {
      from: flight.departureCity,
      to: flight.arrivalCity,
      departDate: new Date(), // This would come from the search
      passengers: {
        adults: 1,
        children: 0,
        infants: 0
      },
      class: 'economy'
    };
    
    // If no itinerary is selected, create a new one
    if (!selectedItinerary) {
      const newItineraryId = createItinerary(`Trip to ${flight.arrivalCity}`);
      addToItinerary(newItineraryId, flightBooking);
      setSelectedItinerary(newItineraryId);
    } else {
      addToItinerary(selectedItinerary, flightBooking);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-6">Find Your Flight</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-1">
            <SearchTabs />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Filters */}
          <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button className="text-sm text-sky-600 hover:text-sky-800 transition-colors">
                  Reset All
                </button>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
              
              {/* Airlines */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Airlines</h3>
                <div className="space-y-2">
                  {['Delta Airlines', 'United Airlines', 'American Airlines'].map((airline) => (
                    <div key={airline} className="flex items-center">
                      <input
                        id={`airline-${airline}`}
                        type="checkbox"
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        checked={selectedAirlines.includes(airline)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAirlines([...selectedAirlines, airline]);
                          } else {
                            setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`airline-${airline}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {airline}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stops */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Stops</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      checked={maxStops === 0}
                      onChange={() => setMaxStops(0)}
                    />
                    <span className="ml-2 text-sm text-gray-700">Non-stop only</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      checked={maxStops === 1}
                      onChange={() => setMaxStops(1)}
                    />
                    <span className="ml-2 text-sm text-gray-700">Max 1 stop</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      checked={maxStops === null}
                      onChange={() => setMaxStops(null)}
                    />
                    <span className="ml-2 text-sm text-gray-700">Any number of stops</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full bg-sky-100 text-sky-600 hover:bg-sky-200 font-medium py-2 rounded-lg transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:flex-grow md:ml-8 mt-6 md:mt-0">
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
              <button 
                className="w-full bg-white shadow-sm border border-gray-200 rounded-lg p-3 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" />
                <span>Filters</span>
                <ChevronDown size={18} className="ml-2" />
              </button>
            </div>
            
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between">
                <div className="mb-2 md:mb-0">
                  <h2 className="text-lg font-medium text-gray-900">3 Flights Found</h2>
                  <p className="text-sm text-gray-500">New York to Los Angeles</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Sort by:</span>
                  <select
                    className="border-none bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-sky-500 focus:bg-sky-50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="price">Price: Low to High</option>
                    <option value="duration">Duration: Shortest first</option>
                    <option value="departureTime">Departure: Earliest first</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results List */}
            <div className="space-y-4">
              {flightResults.map((flight) => (
                <div 
                  key={flight.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Flight Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                          <img src={flight.logo} alt={flight.airline} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{flight.airline}</div>
                          <div className="text-gray-500 text-sm">{flight.flightNumber}</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">${flight.price}</div>
                    </div>
                    
                    {/* Flight Details */}
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* Departure */}
                      <div className="text-center md:text-left md:w-1/4 mb-3 md:mb-0">
                        <div className="text-lg font-bold">{flight.departureTime}</div>
                        <div className="text-sm text-gray-500">{flight.departureCode}</div>
                        <div className="text-xs text-gray-400">{flight.departureCity}</div>
                      </div>
                      
                      {/* Flight Path */}
                      <div className="flex-grow flex flex-col items-center mb-3 md:mb-0">
                        <div className="text-gray-500 text-sm mb-1">{flight.duration}</div>
                        <div className="relative w-full px-4">
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300"></div>
                          <div className="flex justify-between relative">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            {flight.stops > 0 ? (
                              <div className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full -mt-3">
                                {flight.stops} stop
                              </div>
                            ) : (
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full -mt-3">
                                Direct
                              </div>
                            )}
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrival */}
                      <div className="text-center md:text-right md:w-1/4">
                        <div className="text-lg font-bold">{flight.arrivalTime}</div>
                        <div className="text-sm text-gray-500">{flight.arrivalCode}</div>
                        <div className="text-xs text-gray-400">{flight.arrivalCity}</div>
                      </div>
                    </div>
                    
                    {/* Flight Features */}
                    {flight.stops > 0 && (
                      <div className="mt-4 px-4 py-2 bg-gray-50 rounded-lg flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {flight.stopCity} • 1h 25m layover
                        </span>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center pt-4 border-t">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <ChevronsUpDown size={16} className="text-sky-500 mr-1" />
                        <button className="text-sky-500 hover:text-sky-700 text-sm">View flight details</button>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAddToItinerary(flight)}
                          className="bg-white border border-sky-500 text-sky-500 hover:bg-sky-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                          Add to Itinerary
                        </button>
                        <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Recommendation */}
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                  <AlertCircle size={20} className="text-amber-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-amber-800 font-medium">Price Tip</h3>
                  <p className="text-amber-700 text-sm mt-1">
                    Prices for this route are currently 12% lower than average. Book now to secure the best deal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;