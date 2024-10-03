import React, { useState, useRef } from "react";
import WorkshopCard from "./WorkshopCard";
import Eco from "../assets/eco.png";

const workshopsData = [
  {
    id: 1,
    title: "Web Development Workshop",
    image: "/images/web-dev.jpg", 
    description: "Learn the basics of web development with HTML, CSS, and JavaScript.",
    specifications: "Duration: 3 days | Level: Beginner | Tools: VS Code, GitHub",
    formLink: "https://forms.gle/web-dev-workshop", 
  },
  {
    id: 2,
    title: "Machine Learning Workshop",
    image: "/images/ml-workshop.jpg", 
    description: "Dive into machine learning algorithms and Python libraries like TensorFlow.",
    specifications: "Duration: 5 days | Level: Intermediate | Tools: Jupyter Notebook, TensorFlow",
    formLink: "https://forms.gle/ml-workshop", 
  },
  {
    id: 3,
    title: "UI/UX Design Workshop",
    image: "/images/ui-ux.jpg", 
    description: "Understand design principles and build interactive prototypes using Figma.",
    specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
  {
    id: 4,
    title: "UI/UX Design Workshop",
    image: "/images/ui-ux.jpg", 
    description: "Understand design principles and build interactive prototypes using Figma.",
    specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
  {
    id: 5,
    title: "UI/UX Design Workshop",
    image: "/images/ui-ux.jpg", 
    description: "Understand design principles and build interactive prototypes using Figma.",
    specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
  {
    id: 6,
    title: "UI/UX Design Workshop",
    image: "/images/ui-ux.jpg",
    description: "Understand design principles and build interactive prototypes using Figma.",
    specifications: "Duration: 2 days | Level: Beginner | Tools: Figma, Adobe XD",
    formLink: "https://forms.gle/ui-ux-workshop", 
  },
];

// WorkshopDetails component for displaying detailed information about the selected workshop
const WorkshopDetails = ({ title, description, specifications, formLink }) => {
  return (
    <div className="bg-gradient-to-r from-green-300 via-blue-400 to-teal-600 p-6 border-4 border-green-600 text-white rounded-lg relative z-10 max-w-xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-lg mb-4 text-center">{description}</p>
      <p className="text-sm mb-6 text-center">{specifications}</p>

      {/* Centered Register Now Button */}
      <div className="flex justify-center">
        <a
          href={formLink} // Check if the link is properly passed
          target="_blank" // Opens in a new tab
          rel="noopener noreferrer" // Security attribute to prevent malicious attacks
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 duration-300"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

// Main Workshops component to display all workshops
const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null); // State to track the selected workshop
  const registerButtonRef = useRef(null); // Reference to the Register button section

  const handleWorkshopClick = (workshop) => {
    setSelectedWorkshop(workshop); // Set the selected workshop when clicked

    // If there is a Register button reference, make it visible but don't scroll away
    if (registerButtonRef.current) {
      registerButtonRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling effect
        block: "nearest", // Don't scroll away from the current section
      });
    }
  };

  return (
    <div className="relative container h-full mx-auto overflow-hidden w-full">
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative">Our Workshops</h1>

      {/* Background image for the section */}
      <figure className="w-full h-full absolute inset-0 z-0">
        <img src={Eco} alt="Technika" className="object-cover w-full h-full opacity-60" />
      </figure>

      {/* Grid layout for workshop cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {workshopsData.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            image={workshop.image}
            title={workshop.title}
            description={workshop.description}
            onClick={() => handleWorkshopClick(workshop)} // Set the selected workshop and handle click
          />
        ))}
      </div>

      {/* Display selected workshop details with register button */}
      {selectedWorkshop && (
        <div ref={registerButtonRef}> {/* Add a ref here */}
          <WorkshopDetails
            title={selectedWorkshop.title}
            description={selectedWorkshop.description}
            specifications={selectedWorkshop.specifications}
            formLink={selectedWorkshop.formLink} // Ensure this link is passed correctly
          />
        </div>
      )}
    </div>
  );
};

export default Workshops;
