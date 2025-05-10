import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for our booking data
interface FlightBooking {
  id?: string;
  from: string;
  to: string;
  departDate: Date;
  returnDate?: Date;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  class?: 'economy' | 'premium' | 'business' | 'first';
}

interface HotelBooking {
  id?: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
  };
  roomType?: string;
  starRating?: number;
}

interface CabBooking {
  id?: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  pickupTime: string;
  passengers: number;
  carType?: string;
}

export interface Itinerary {
  id: string;
  name: string;
  flights?: FlightBooking[];
  hotels?: HotelBooking[];
  cabs?: CabBooking[];
  totalPrice?: number;
  createdAt: Date;
}

interface BookingContextType {
  currentFlight: FlightBooking | null;
  currentHotel: HotelBooking | null;
  currentCab: CabBooking | null;
  itineraries: Itinerary[];
  setCurrentFlight: (flight: FlightBooking | null) => void;
  setCurrentHotel: (hotel: HotelBooking | null) => void;
  setCurrentCab: (cab: CabBooking | null) => void;
  addToItinerary: (itineraryId: string, booking: FlightBooking | HotelBooking | CabBooking) => void;
  createItinerary: (name: string) => string;
  removeFromItinerary: (itineraryId: string, bookingId: string, bookingType: 'flight' | 'hotel' | 'cab') => void;
  deleteItinerary: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFlight, setCurrentFlight] = useState<FlightBooking | null>(null);
  const [currentHotel, setCurrentHotel] = useState<HotelBooking | null>(null);
  const [currentCab, setCurrentCab] = useState<CabBooking | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  const createItinerary = (name: string): string => {
    const id = `itinerary-${Date.now()}`;
    setItineraries([...itineraries, {
      id,
      name,
      flights: [],
      hotels: [],
      cabs: [],
      totalPrice: 0,
      createdAt: new Date()
    }]);
    return id;
  };

  const addToItinerary = (itineraryId: string, booking: FlightBooking | HotelBooking | CabBooking) => {
    setItineraries(prevItineraries => {
      return prevItineraries.map(itinerary => {
        if (itinerary.id === itineraryId) {
          // Determine booking type and add to appropriate array
          if ('from' in booking) {
            // It's a flight booking
            const flightWithId = { ...booking, id: `flight-${Date.now()}` };
            return {
              ...itinerary,
              flights: [...(itinerary.flights || []), flightWithId]
            };
          } else if ('checkIn' in booking) {
            // It's a hotel booking
            const hotelWithId = { ...booking, id: `hotel-${Date.now()}` };
            return {
              ...itinerary,
              hotels: [...(itinerary.hotels || []), hotelWithId]
            };
          } else {
            // It's a cab booking
            const cabWithId = { ...booking, id: `cab-${Date.now()}` };
            return {
              ...itinerary,
              cabs: [...(itinerary.cabs || []), cabWithId]
            };
          }
        }
        return itinerary;
      });
    });
  };

  const removeFromItinerary = (itineraryId: string, bookingId: string, bookingType: 'flight' | 'hotel' | 'cab') => {
    setItineraries(prevItineraries => {
      return prevItineraries.map(itinerary => {
        if (itinerary.id === itineraryId) {
          if (bookingType === 'flight' && itinerary.flights) {
            return {
              ...itinerary,
              flights: itinerary.flights.filter(flight => flight.id !== bookingId)
            };
          } else if (bookingType === 'hotel' && itinerary.hotels) {
            return {
              ...itinerary,
              hotels: itinerary.hotels.filter(hotel => hotel.id !== bookingId)
            };
          } else if (bookingType === 'cab' && itinerary.cabs) {
            return {
              ...itinerary,
              cabs: itinerary.cabs.filter(cab => cab.id !== bookingId)
            };
          }
        }
        return itinerary;
      });
    });
  };

  const deleteItinerary = (id: string) => {
    setItineraries(prevItineraries => prevItineraries.filter(itinerary => itinerary.id !== id));
  };

  const value = {
    currentFlight,
    currentHotel,
    currentCab,
    itineraries,
    setCurrentFlight,
    setCurrentHotel,
    setCurrentCab,
    addToItinerary,
    createItinerary,
    removeFromItinerary,
    deleteItinerary
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};