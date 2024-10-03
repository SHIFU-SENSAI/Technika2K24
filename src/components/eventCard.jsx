import React from "react";
import { Link } from "react-router-dom";
import "../general.css";

const EventCard = ({ img, name, desc, pricing, evid, onClick }) => {
  return (
    <div onClick={onClick} className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 border-2 border-gray-700 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out w-full mb-8">
      <div className="flex flex-col md:flex-row">
        {/* Image section with fallback */}
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
          {img ? (
            <img
              src={img}
              alt={name}
              className="w-full h-48 md:h-full object-cover transition-opacity duration-300 hover:opacity-80 rounded-lg"
            />
          ) : (
            <div className="w-full h-48 md:h-full bg-gray-700 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg">Image not available</span>
            </div>
          )}
          {/* Gradient overlay for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-80 transition-opacity duration-300 rounded-lg"></div>
        </div>

        {/* Content section */}
        <div className="flex-1 text-white">
          <h3 className="text-2xl font-extrabold mb-2 transition-colors duration-300 hover:text-yellow-500">
            {name}
          </h3>
          <p className="text-md text-gray-300 mb-4">{desc}</p>
          <p className="text-lg font-semibold text-gray-300 mb-4">{pricing}</p>
          <Link to={`/form?id=${evid}`}>
            <button className="bg-[#9360fa] w-full md:w-auto px-6 py-2 text-white border-2 border-white rounded hover:bg-[#7c4fe0] transition-colors duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
