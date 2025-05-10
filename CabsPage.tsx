import React, { useState } from 'react';
import { Filter, ChevronDown, UserCheck, Calendar, Clock, DollarSign } from 'lucide-react';
import SearchTabs from '../components/SearchTabs';
import { useBooking } from '../context/BookingContext';

// Mock cab data
const cabResults = [
  {
    id: 'c1',
    type: 'Economy',
    name: 'Toyota Corolla or similar',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    capacity: 4,
    features: ['Air Conditioning', 'Automatic', 'Unlimited Mileage'],
    price: 49,
    rating: 4.8,
    reviews: 245,
    company: 'Hertz'
  },
  {
    id: 'c2',
    type: 'SUV',
    name: 'Ford Escape or similar',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    capacity: 5,
    features: ['Air Conditioning', 'Automatic', 'Unlimited Mileage', 'GPS'],
    price: 69,
    rating: 4.7,
    reviews: 187,
    company: 'Enterprise'
  },
  {
    id: 'c3',
    type: 'Luxury',
    name: 'Mercedes C-Class or similar',
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
    capacity: 4,
    features: ['Air Conditioning', 'Automatic', 'Unlimited Mileage', 'GPS', 'Leather Seats'],
    price: 99,
    rating: 4.9,
    reviews: 132,
    company: 'Avis'
  }
];

const CabsPage: React.FC = () => {
  const { setCurrentCab, createItinerary, addToItinerary } = useBooking();
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sorting options
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minCapacity, setMinCapacity] = useState<number>(0);
  
  const handleAddToItinerary = (cab: typeof cabResults[0]) => {
    // Create a simplified cab object to add to the itinerary
    const cabBooking = {
      pickupLocation: 'Los Angeles Airport',
      dropoffLocation: 'Downtown Los Angeles',
      pickupDate: new Date(),
      pickupTime: '12:00',
      passengers: cab.capacity,
      carType: cab.type
    };
    
    // If no itinerary is selected, create a new one
    if (!selectedItinerary) {
      const newItineraryId = createItinerary('Los Angeles Trip');
      addToItinerary(newItineraryId, cabBooking);
      setSelectedItinerary(newItineraryId);
    } else {
      addToItinerary(selectedItinerary, cabBooking);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-6">Find Your Ride</h1>
          
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
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (per day)</h3>
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
              
              {/* Car Types */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Car Type</h3>
                <div className="space-y-2">
                  {['Economy', 'Compact', 'SUV', 'Luxury'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`type-${type}`}
                        type="checkbox"
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        checked={selectedTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTypes([...selectedTypes, type]);
                          } else {
                            setSelectedTypes(selectedTypes.filter(t => t !== type));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`type-${type}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Passenger Capacity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Passenger Capacity</h3>
                <div className="space-y-2">
                  {[2, 4, 5, 7].map((capacity) => (
                    <label key={capacity} className="flex items-center">
                      <input
                        type="radio"
                        name="capacity"
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                        checked={minCapacity === capacity}
                        onChange={() => setMinCapacity(capacity)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{capacity}+ passengers</span>
                    </label>
                  ))}
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
                  <h2 className="text-lg font-medium text-gray-900">3 Vehicles Available</h2>
                  <p className="text-sm text-gray-500">Los Angeles, June 15-18</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Sort by:</span>
                  <select
                    className="border-none bg-gray-100 py-1 px-3 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-sky-500 focus:bg-sky-50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="price">Price: Low to High</option>
                    <option value="rating">Rating: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results List */}
            <div className="space-y-6">
              {cabResults.map((cab) => (
                <div 
                  key={cab.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="sm:flex">
                    {/* Car Image */}
                    <div className="sm:w-1/3 h-48 sm:h-auto relative">
                      <img src={cab.image} alt={cab.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <div className="bg-gray-900 text-white font-medium rounded-lg px-3 py-1 text-sm opacity-90">
                          {cab.type}
                        </div>
                      </div>
                    </div>
                    
                    {/* Car Details */}
                    <div className="sm:w-2/3 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{cab.name}</h3>
                            <span className="text-sm text-gray-500">by {cab.company}</span>
                          </div>
                          
                          <div className="flex items-center mb-4">
                            <div className="flex items-center">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg 
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(cab.rating) ? 'text-yellow-400' : 'text-gray-300'
                                    } fill-current`} 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-1">{cab.rating}</span>
                            </div>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-600 text-sm">{cab.reviews} reviews</span>
                          </div>
                          
                          {/* Car Features */}
                          <div className="mb-4">
                            <div className="bg-blue-50 text-blue-800 inline-flex items-center px-3 py-1 rounded-full text-sm mb-3">
                              <UserCheck size={16} className="mr-1" />
                              <span>{cab.capacity} Passengers</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {cab.features.map((feature) => (
                                <span 
                                  key={feature}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4">
                          <div className="mb-3 sm:mb-0">
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Calendar size={16} className="mr-1" />
                              <span>Free cancellation</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock size={16} className="mr-1" />
                              <span>24/7 Customer support</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="text-2xl font-bold text-gray-900">${cab.price}</div>
                            <div className="text-gray-500 text-sm">per day</div>
                            
                            <div className="flex space-x-3 mt-3">
                              <button
                                onClick={() => handleAddToItinerary(cab)}
                                className="bg-white border border-sky-500 text-sky-500 hover:bg-sky-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                              >
                                <span className="hidden sm:inline">Add to </span>Itinerary
                              </button>
                              <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors">
                                Book<span className="hidden sm:inline"> Now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabsPage;