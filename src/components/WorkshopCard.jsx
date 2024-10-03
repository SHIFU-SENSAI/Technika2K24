import React from "react";

const WorkshopCard = ({ image, title, description, onClick }) => {
  return (
    <div
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 border-4 border-gray-700 rounded-lg shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out max-w-sm mx-auto"
      onClick={onClick} // Trigger the click to show register button
    >
      {/* Image section with fallback */}
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-60 object-cover transition-opacity duration-300 hover:opacity-80"
          />
        ) : (
          <div className="w-full h-60 bg-gray-700 flex items-center justify-center">
            <span className="text-white text-lg">Image not available</span>
          </div>
        )}
        {/* Gradient overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-80 transition-opacity duration-300"></div>
      </div>

      {/* Content section */}
      <div className="p-3 text-white">
        <h3 className="text-lg font-extrabold mb-1 transition-colors duration-300 hover:text-yellow-500">
          {title}
        </h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default WorkshopCard;
