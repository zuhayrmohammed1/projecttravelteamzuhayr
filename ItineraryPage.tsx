import React, { useState } from 'react';
import { Calendar, Plane, Building2, Car, Plus, Trash2, Edit2, Save } from 'lucide-react';
import { useBooking, Itinerary } from '../context/BookingContext';
import { format } from 'date-fns';

const ItineraryPage: React.FC = () => {
  const { itineraries, createItinerary, removeFromItinerary, deleteItinerary } = useBooking();
  const [newItineraryName, setNewItineraryName] = useState('');
  const [editingItinerary, setEditingItinerary] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const handleCreateItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItineraryName.trim()) {
      createItinerary(newItineraryName);
      setNewItineraryName('');
      setShowCreateForm(false);
    }
  };
  
  const handleStartEditing = (itinerary: Itinerary) => {
    setEditingItinerary(itinerary.id);
    setEditingName(itinerary.name);
  };
  
  const handleSaveEdit = (itineraryId: string) => {
    // In a real app, you would update the itinerary name here
    setEditingItinerary(null);
  };
  
  // This would be a placeholder for an empty state if no itineraries
  if (itineraries.length === 0) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mt-16 py-16 bg-white rounded-lg shadow-sm">
          <Calendar size={64} className="text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Itineraries Yet</h2>
          <p className="text-gray-500 max-w-md text-center mb-8">
            Create an itinerary to start planning your perfect trip. You can add flights, hotels, and cabs.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Create Itinerary
          </button>
          {showCreateForm && (
            <form onSubmit={handleCreateItinerary} className="mt-6 w-full max-w-md">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Itinerary Name (e.g., Summer Vacation 2025)"
                  className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  value={newItineraryName}
                  onChange={(e) => setNewItineraryName(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-r-lg transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Itineraries</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <Plus size={18} className="mr-2" />
          New Itinerary
        </button>
      </div>
      
      {showCreateForm && (
        <form onSubmit={handleCreateItinerary} className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Itinerary Name (e.g., Summer Vacation 2025)"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={newItineraryName}
              onChange={(e) => setNewItineraryName(e.target.value)}
            />
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-r-lg transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      )}
      
      <div className="space-y-6">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              {editingItinerary === itinerary.id ? (
                <div className="flex items-center flex-grow">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  <button
                    onClick={() => handleSaveEdit(itinerary.id)}
                    className="ml-2 p-2 text-sky-600 hover:text-sky-800"
                  >
                    <Save size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{itinerary.name}</h2>
                  <span className="ml-3 text-sm text-gray-500">
                    Created {format(new Date(itinerary.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
              
              <div className="flex space-x-2">
                {editingItinerary !== itinerary.id && (
                  <button
                    onClick={() => handleStartEditing(itinerary)}
                    className="p-2 text-gray-500 hover:text-sky-600 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
                <button
                  onClick={() => deleteItinerary(itinerary.id)}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Flights Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Plane size={20} className="text-sky-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">Flights</h3>
                </div>
                
                {itinerary.flights && itinerary.flights.length > 0 ? (
                  <div className="space-y-4">
                    {itinerary.flights.map((flight) => (
                      <div key={flight.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium">{flight.from}</span>
                            <span className="mx-2">→</span>
                            <span className="font-medium">{flight.to}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {format(new Date(flight.departDate), 'EEE, MMM d, yyyy')}
                            {flight.returnDate && (
                              <> • Return: {format(new Date(flight.returnDate), 'EEE, MMM d, yyyy')}</>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {flight.passengers.adults} Adult{flight.passengers.adults !== 1 ? 's' : ''}
                            {flight.passengers.children > 0 && `, ${flight.passengers.children} Child${flight.passengers.children !== 1 ? 'ren' : ''}`}
                            {flight.passengers.infants > 0 && `, ${flight.passengers.infants} Infant${flight.passengers.infants !== 1 ? 's' : ''}`}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromItinerary(itinerary.id, flight.id!, 'flight')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No flights added to this itinerary yet.</p>
                )}
              </div>
              
              {/* Hotels Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Building2 size={20} className="text-sky-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">Accommodations</h3>
                </div>
                
                {itinerary.hotels && itinerary.hotels.length > 0 ? (
                  <div className="space-y-4">
                    {itinerary.hotels.map((hotel) => (
                      <div key={hotel.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div>
                          <div className="font-medium mb-1">{hotel.location}</div>
                          <div className="text-sm text-gray-600">
                            {format(new Date(hotel.checkIn), 'EEE, MMM d')} - {format(new Date(hotel.checkOut), 'EEE, MMM d, yyyy')}
                          </div>
                          <div className="text-sm text-gray-600">
                            {hotel.guests.adults} Adult{hotel.guests.adults !== 1 ? 's' : ''}
                            {hotel.guests.children > 0 && `, ${hotel.guests.children} Child${hotel.guests.children !== 1 ? 'ren' : ''}`}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromItinerary(itinerary.id, hotel.id!, 'hotel')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No hotels added to this itinerary yet.</p>
                )}
              </div>
              
              {/* Cabs Section */}
              <div>
                <div className="flex items-center mb-4">
                  <Car size={20} className="text-sky-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">Transportation</h3>
                </div>
                
                {itinerary.cabs && itinerary.cabs.length > 0 ? (
                  <div className="space-y-4">
                    {itinerary.cabs.map((cab) => (
                      <div key={cab.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium">{cab.pickupLocation}</span>
                            <span className="mx-2">→</span>
                            <span className="font-medium">{cab.dropoffLocation}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {format(new Date(cab.pickupDate), 'EEE, MMM d, yyyy')} at {cab.pickupTime}
                          </div>
                          <div className="text-sm text-gray-600">
                            {cab.passengers} Passenger{cab.passengers !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromItinerary(itinerary.id, cab.id!, 'cab')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No transportation added to this itinerary yet.</p>
                )}
              </div>
            </div>
            
            {/* Itinerary Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
              <button className="text-gray-700 hover:text-gray-900">
                Share Itinerary
              </button>
              <button className="text-sky-600 hover:text-sky-800 font-medium">
                Continue Planning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryPage;