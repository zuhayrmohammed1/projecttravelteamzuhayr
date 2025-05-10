import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  location: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, location, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full flex flex-col">
      <Quote size={24} className="text-sky-300 mb-4" />
      
      <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
      
      <div className="flex items-center">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-sky-200" 
        />
        <div>
          <h4 className="font-semibold text-gray-800">{author}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;