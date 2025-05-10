import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Building2, Car, ChevronRight, Search, Calendar, Map, CreditCard, Map as MapIcon } from 'lucide-react';
import SearchTabs from '../components/SearchTabs';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Testimonial from '../components/Testimonial';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg)', 
            backgroundPosition: 'center 40%' 
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-50 z-0"></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Discover the World,<br/>One Journey at a Time
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Book flights, hotels, and cabs for your dream destinations - all in one place with guaranteed best prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center">
                <span>Plan Your Trip</span>
                <ChevronRight size={20} className="ml-2" />
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-full font-medium transition-colors duration-300">
                View Deals
              </button>
            </div>
          </div>
          
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-2xl p-1 mb-8 md:mb-0 transform translate-y-0 md:-translate-y-1/2">
            <SearchTabs />
          </div>
        </div>
      </section>
      
      {/* Featured Destinations Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Destinations</h2>
              <p className="text-gray-600">Explore our top picks for your next adventure</p>
            </div>
            <Link to="/destinations" className="flex items-center text-sky-600 font-medium mt-4 md:mt-0 hover:text-sky-800 transition-colors">
              <span>View all destinations</span>
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <FeaturedDestinations />
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Travel With Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price? We'll match it plus give you an additional discount.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Planning</h3>
              <p className="text-gray-600">Plan your entire trip in one place with our seamless booking platform.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <MapIcon size={24} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Experiences</h3>
              <p className="text-gray-600">Discover handpicked destinations and experiences recommended by travel experts.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard size={24} className="text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Book with confidence using our secure payment gateway and flexible cancellation.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Travelers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial 
              quote="The best travel booking experience I've ever had! The interface is intuitive, and I saved over $300 on my flight to Tokyo."
              author="Sarah Johnson"
              location="New York, USA"
              image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            />
            
            <Testimonial 
              quote="I love how I can book my entire trip in one place. The hotel recommendations were spot on for my family vacation to Barcelona."
              author="Michael Chen"
              location="Toronto, Canada"
              image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            />
            
            <Testimonial 
              quote="The fare comparison tool saved me so much time and money. I'll never book travel any other way again!"
              author="Priya Sharma"
              location="London, UK"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy travelers who book with TravelEase. Sign up today and receive exclusive deals on your first booking.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-3 rounded-full font-medium transition-colors duration-300">
              Sign Up Now
            </button>
            <button className="bg-transparent hover:bg-sky-700 border border-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;