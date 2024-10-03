import React from "react";

const CardContainer = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 place-items-center">
        {children}
      </div>
    </div>
  );
};

export default CardContainer;
