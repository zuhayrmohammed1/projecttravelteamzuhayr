import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Calendar, MapPin, Settings, Shield, LogOut, Bell, History } from 'lucide-react';

type TabType = 'profile' | 'bookings' | 'payments' | 'settings' | 'notifications';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Travel Street, New York, NY 10001',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    memberSince: 'January 2023',
    pointsBalance: 2450,
  };
  
  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Profile Overview */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 py-6 px-4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-3">
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-sky-100 text-sm">Member since {user.memberSince}</p>
              </div>
              
              {/* Tab Navigation */}
              <div className="py-4">
                <button
                  className={`flex items-center py-3 px-6 w-full text-left transition-colors ${
                    activeTab === 'profile' ? 'bg-sky-50 text-sky-600 border-l-4 border-sky-500' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={18} className={`mr-3 ${activeTab === 'profile' ? 'text-sky-600' : 'text-gray-500'}`} />
                  <span>Profile</span>
                </button>
                
                <button
                  className={`flex items-center py-3 px-6 w-full text-left transition-colors ${
                    activeTab === 'bookings' ? 'bg-sky-50 text-sky-600 border-l-4 border-sky-500' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <History size={18} className={`mr-3 ${activeTab === 'bookings' ? 'text-sky-600' : 'text-gray-500'}`} />
                  <span>My Bookings</span>
                </button>
                
                <button
                  className={`flex items-center py-3 px-6 w-full text-left transition-colors ${
                    activeTab === 'payments' ? 'bg-sky-50 text-sky-600 border-l-4 border-sky-500' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('payments')}
                >
                  <CreditCard size={18} className={`mr-3 ${activeTab === 'payments' ? 'text-sky-600' : 'text-gray-500'}`} />
                  <span>Payment Methods</span>
                </button>
                
                <button
                  className={`flex items-center py-3 px-6 w-full text-left transition-colors ${
                    activeTab === 'notifications' ? 'bg-sky-50 text-sky-600 border-l-4 border-sky-500' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={18} className={`mr-3 ${activeTab === 'notifications' ? 'text-sky-600' : 'text-gray-500'}`} />
                  <span>Notifications</span>
                </button>
                
                <button
                  className={`flex items-center py-3 px-6 w-full text-left transition-colors ${
                    activeTab === 'settings' ? 'bg-sky-50 text-sky-600 border-l-4 border-sky-500' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className={`mr-3 ${activeTab === 'settings' ? 'text-sky-600' : 'text-gray-500'}`} />
                  <span>Settings</span>
                </button>
                
                <button
                  className="flex items-center py-3 px-6 w-full text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} className="mr-3 text-red-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="flex items-center">
                      <User size={18} className="text-gray-400 mr-3" />
                      <input 
                        type="text" 
                        value={user.name}
                        className="block w-full border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-400 mr-3" />
                      <input 
                        type="email" 
                        value={user.email}
                        className="block w-full border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex items-center">
                      <Phone size={18} className="text-gray-400 mr-3" />
                      <input 
                        type="tel" 
                        value={user.phone}
                        className="block w-full border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="flex items-center">
                      <MapPin size={18} className="text-gray-400 mr-3" />
                      <input 
                        type="text" 
                        value={user.address}
                        className="block w-full border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t pt-6">
                  <div>
                    <div className="flex items-center text-gray-700">
                      <Shield size={18} className="mr-2 text-green-500" />
                      <span>Your personal information is secure</span>
                    </div>
                  </div>
                  
                  <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">New York to Los Angeles</h3>
                      <p className="text-sm text-gray-600">Flight • June 15, 2025</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Confirmed
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <img 
                            src="https://images.pexels.com/photos/4472024/pexels-photo-4472024.jpeg"
                            alt="Airline" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Delta Airlines</div>
                          <div className="text-gray-500 text-sm">DL2478</div>
                        </div>
                      </div>
                      <a href="#" className="text-sky-600 hover:text-sky-800 hover:underline text-sm font-medium">
                        View Details
                      </a>
                    </div>
                    <div className="text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-500">Departure:</span>
                          <div>JFK Terminal 4, 08:15 AM</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Arrival:</span>
                          <div>LAX Terminal 5, 11:45 AM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Grand Luxury Hotel</h3>
                      <p className="text-sm text-gray-600">Hotel • June 15-18, 2025</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      Pending
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <img 
                          src="https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg"
                          alt="Hotel"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium">Deluxe King Room</div>
                          <div className="text-gray-500 text-sm mt-1">2 Adults • 1 Room</div>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < 4 ? 'text-yellow-400' : 'text-gray-300'
                                } fill-current`} 
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <a href="#" className="text-sky-600 hover:text-sky-800 hover:underline text-sm font-medium">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'payments' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
                  <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center">
                    <Plus size={16} className="mr-1" />
                    Add Method
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-sky-200 hover:bg-sky-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-4">
                        Visa
                      </div>
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-sm text-gray-500">Expires 09/2026</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-sky-200 hover:bg-sky-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold mr-4">
                        MC
                      </div>
                      <div>
                        <div className="font-medium">Mastercard ending in 8356</div>
                        <div className="text-sm text-gray-500">Expires 11/2025</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-gray-500">Receive booking confirmations and travel alerts</div>
                        </div>
                        <div className="relative">
                          <input type="checkbox" id="emailNotif" className="sr-only" defaultChecked />
                          <label 
                            htmlFor="emailNotif"
                            className="block w-14 h-7 rounded-full bg-sky-100 cursor-pointer transition-colors duration-300 ease-in-out"
                          >
                            <span className="block w-6 h-6 mt-0.5 ml-0.5 rounded-full bg-sky-500 shadow transform translate-x-7 transition-transform duration-300 ease-in-out"></span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">SMS Notifications</div>
                          <div className="text-sm text-gray-500">Receive booking updates via text message</div>
                        </div>
                        <div className="relative">
                          <input type="checkbox" id="smsNotif" className="sr-only" />
                          <label 
                            htmlFor="smsNotif"
                            className="block w-14 h-7 rounded-full bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out"
                          >
                            <span className="block w-6 h-6 mt-0.5 ml-0.5 rounded-full bg-white shadow transition-transform duration-300 ease-in-out"></span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Currency</div>
                          <div className="text-sm text-gray-500">Default currency for prices</div>
                        </div>
                        <select className="border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-3">Security</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Password</div>
                          <div className="text-sm text-gray-500">Last updated 3 months ago</div>
                        </div>
                        <button className="text-sky-600 hover:text-sky-800 hover:underline text-sm font-medium">
                          Change Password
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-500">Add an extra layer of security</div>
                        </div>
                        <button className="text-sky-600 hover:text-sky-800 hover:underline text-sm font-medium">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
                    <button className="text-red-600 hover:text-red-800 hover:underline font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                
                <div className="divide-y">
                  <div className="flex items-start py-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                      <Calendar size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Booking Confirmed</h3>
                          <p className="text-gray-600 text-sm mb-1">Your flight booking to Los Angeles has been confirmed.</p>
                        </div>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <button className="text-sky-600 hover:text-sky-800 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start py-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                      <DollarSign size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Special Offer</h3>
                          <p className="text-gray-600 text-sm mb-1">Get 15% off your next hotel booking. Limited time offer.</p>
                        </div>
                        <span className="text-xs text-gray-500">1 day ago</span>
                      </div>
                      <button className="text-sky-600 hover:text-sky-800 text-sm font-medium">
                        View Offer
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start py-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                      <Clock size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Travel Reminder</h3>
                          <p className="text-gray-600 text-sm mb-1">Your trip to Los Angeles is coming up in 2 weeks. Don't forget to check in.</p>
                        </div>
                        <span className="text-xs text-gray-500">3 days ago</span>
                      </div>
                      <button className="text-sky-600 hover:text-sky-800 text-sm font-medium">
                        View Trip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;