import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  price: number;
  rating: number;
}

const FeaturedDestinations: React.FC = () => {
  // Sample data
  const destinations: Destination[] = [
    {
      id: 1,
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
      price: 1299,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
      price: 1499,
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
      price: 1199,
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Paris',
      country: 'France',
      image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
      price: 999,
      rating: 4.6,
    },
  ];

  // Next/Previous controls for mobile
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('destinations-container');
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative">
      {/* Mobile scroll controls */}
      <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 md:hidden">
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          onClick={() => scrollContainer('left')}
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
      </div>
      
      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 md:hidden">
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          onClick={() => scrollContainer('right')}
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
      
      {/* Destination cards */}
      <div 
        id="destinations-container"
        className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 scrollbar-hide snap-x"
      >
        {destinations.map((destination) => (
          <div 
            key={destination.id}
            className="flex-shrink-0 w-80 md:w-full snap-center"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
                      <p className="text-white/80 text-sm">{destination.country}</p>
                    </div>
                    <div className="bg-sky-500 text-white text-sm font-medium px-2 py-1 rounded-md">
                      ${destination.price}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'
                          } fill-current`} 
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">{destination.rating.toFixed(1)}</span>
                  </div>
                  <a href="#" className="text-sky-600 text-sm font-medium hover:underline transition-colors">
                    View Deals
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinations;