import React from "react";
import "../general.css";

const WorkshopCard = ({ image, title, description, onClick }) => {
  return (
    <div
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-3 border-2 border-gray-700 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out max-w-sm mx-auto"
      onClick={onClick}
    >
      {/* Image section with fallback */}
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-80"
          />
        ) : (
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
            <span className="text-white text-lg">Image not available</span>
          </div>
        )}
        {/* Gradient overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-80 transition-opacity duration-300"></div>
      </div>

      {/* Content section */}
      <div className="p-2 text-white">
        <h3 className="text-lg font-extrabold mb-1 transition-colors duration-300 hover:text-yellow-500">
          {title}
        </h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default WorkshopCard;
