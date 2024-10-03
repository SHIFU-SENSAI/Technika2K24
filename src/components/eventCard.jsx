import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../general.css";

const EventCard = ({ img, name, desc, pricing, evid }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black border-2 border-gray-700 rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 ease-in-out">
        <div className="relative h-full">
          {/* Image and name */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            {img ? (
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-white text-lg">Image not available</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-xl font-bold text-white">{name}</h3>
            </div>
          </div>

          {/* Description, pricing, and register button */}
          <div className={`absolute inset-0 bg-black bg-opacity-90 p-4 flex flex-col justify-between transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
              <p className="text-sm text-gray-300 mb-2">{desc}</p>
              <p className="text-md font-semibold text-gray-300">{pricing}</p>
            </div>
            <Link to={`/form?id=${evid}`} className="mt-auto">
              <button className="bg-[#9360fa] w-full px-4 py-2 text-white text-sm border border-white rounded hover:bg-[#7c4fe0] transition-colors duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
