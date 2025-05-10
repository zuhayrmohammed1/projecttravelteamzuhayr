import React, { useState } from 'react';
import { Filter, ChevronDown, MapPin, Star, Wifi, Coffee, Utensils, Tv, Plus, Info } from 'lucide-react';
import SearchTabs from '../components/SearchTabs';
import { useBooking } from '../context/BookingContext';

// Mock hotel data
const hotelResults = [
  {
    id: 'h1',
    name: 'Grand Luxury Hotel',
    location: 'Downtown Los Angeles',
    image: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg',
    rating: 4.8,
    reviews: 423,
    price: 299,
    perNight: true,
    amenities: ['wifi', 'breakfast', 'restaurant', 'tv'],
    distance: '0.5 miles to city center',
  },
  {
    id: 'h2',
    name: 'Seaside Boutique Resort',
    location: 'Santa Monica',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    rating: 4.6,
    reviews: 284,
    price: 249,
    perNight: true,
    amenities: ['wifi', 'breakfast', 'restaurant'],
    distance: '2 miles to beach',
  },
  {
    id: 'h3',
    name: 'Urban Modern Suites',
    location: 'Hollywood',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    rating: 4.4,
    reviews: 186,
    price: 199,
    perNight: true,
    amenities: ['wifi', 'tv'],
    distance: '1 mile to Hollywood Walk of Fame',
  },
];

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'wifi':
      return <Wifi size={16} />;
    case 'breakfast':
      return <Coffee size={16} />;
    case 'restaurant':
      return <Utensils size={16} />;
    case 'tv':
      return <Tv size={16} />;
    default:
      return <Info size={16} />;
  }
};

const HotelsPage: React.FC = () => {
  const { setCurrentHotel, createItinerary, addToItinerary } = useBooking();
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sorting options
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const handleAddToItinerary = (hotel: typeof hotelResults[0]) => {
    // Create a simplified hotel object to add to the itinerary
    const hotelBooking = {
      location: hotel.location,
      checkIn: new Date(), // This would come from the search
      checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from today
      guests: {
        adults: 2,
        children: 0
      },
      roomType: 'Standard Room',
      starRating: Math.round(hotel.rating)
    };
    
    // If no itinerary is selected, create a new one
    if (!selectedItinerary) {
      const newItineraryId = createItinerary(`Stay in ${hotel.location}`);
      addToItinerary(newItineraryId, hotelBooking);
      setSelectedItinerary(newItineraryId);
    } else {
      addToItinerary(selectedItinerary, hotelBooking);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-6">Find Perfect Accommodations</h1>
          
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
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (per night)</h3>
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
              
              {/* Star Rating */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Star Rating</h3>
                <div className="flex flex-wrap gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        minRating === rating 
                          ? 'bg-sky-100 text-sky-700 border border-sky-300' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                      onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    >
                      {rating}
                      <Star size={12} className="ml-1 fill-current" />
                      <span className="ml-0.5">+</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities</h3>
                <div className="space-y-2">
                  {['wifi', 'breakfast', 'restaurant', 'tv'].map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        id={`amenity-${amenity}`}
                        type="checkbox"
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAmenities([...selectedAmenities, amenity]);
                          } else {
                            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`amenity-${amenity}`}
                        className="ml-2 flex items-center text-sm text-gray-700"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1 capitalize">{amenity}</span>
                      </label>
                    </div>
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
                  <h2 className="text-lg font-medium text-gray-900">3 Hotels Found</h2>
                  <p className="text-sm text-gray-500">Los Angeles Area</p>
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
              {hotelResults.map((hotel) => (
                <div 
                  key={hotel.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="sm:flex">
                    {/* Hotel Image */}
                    <div className="sm:w-1/3 h-48 sm:h-auto relative">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3">
                        <div className="bg-white text-amber-500 font-bold rounded-lg px-2 py-1 text-sm shadow-sm flex items-center">
                          {hotel.rating}
                          <Star size={14} className="ml-1 fill-current" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hotel Details */}
                    <div className="sm:w-2/3 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{hotel.name}</h3>
                          
                          <div className="flex items-center mb-3">
                            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600 text-sm ml-1">{hotel.location}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-600 text-sm">{hotel.distance}</span>
                          </div>
                          
                          {/* Amenities */}
                          <div className="flex flex-wrap gap-3 mb-4">
                            {hotel.amenities.map((amenity) => (
                              <div 
                                key={amenity} 
                                className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                              >
                                {getAmenityIcon(amenity)}
                                <span className="ml-1 capitalize">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 sm:items-end justify-between">
                          <div>
                            <div className="text-gray-600 text-sm mb-1">{hotel.reviews} reviews</div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  className={`${
                                    i < Math.floor(hotel.rating) 
                                      ? 'text-amber-500 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 flex flex-col items-end">
                            <div className="text-2xl font-bold text-gray-900">${hotel.price}</div>
                            <div className="text-gray-500 text-sm">{hotel.perNight ? 'per night' : 'total'}</div>
                            
                            <div className="flex space-x-3 mt-3">
                              <button
                                onClick={() => handleAddToItinerary(hotel)}
                                className="bg-white border border-sky-500 text-sky-500 hover:bg-sky-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                              >
                                <span className="hidden sm:inline">Add to </span>Itinerary
                              </button>
                              <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors">
                                View<span className="hidden sm:inline"> Deal</span>
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

export default HotelsPage;