import React, { useState, useRef } from "react";
import EventCard from "./eventCard";
import Eco from "../assets/eco.png";
import "../general.css";

const eventsData = [
  {
    id: 1,
    name: "Dev Conquest",
    img: "/images/event1.jpg",
    desc: "Unleash your creativity and coding skills in an intense hackathon. Compete with the brightest minds to develop innovative solutions to real-world problems and claim the title of Tech Wizard!",
    pricing: "Free",
    evid: "event1",
  },
  {
    id: 2,
    name: "Competitive Programming",
    img: "/images/event2.jpg",
    desc: "This is a description for Sample Event 2.",
    pricing: "$10",
    evid: "event2",
  },
  {
    id: 3,
    name: "Web Development",
    img: "/images/event3.jpg",
    desc: "This is a description for Sample Event 3.",
    pricing: "$10",
    evid: "event3",
  },
];

const EventDetails = ({ name, desc, pricing, evid }) => {
  return (
    <div className="bg-white bg-opacity-90 p-6 border-4 border-green-600 text-black rounded-lg max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">{name}</h2>
      <p className="text-lg mb-4 text-center">{desc}</p>
      <p className="text-lg mb-4 text-center font-semibold">{pricing}</p>
      <div className="flex justify-center">
        <a
          href={`/form?id=${evid}`}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 duration-300"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const registerButtonRef = useRef(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    if (registerButtonRef.current) {
      registerButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const filteredEvents = eventsData.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative container mx-auto overflow-hidden w-full px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8 z-10 relative">
        Our Events
      </h1>

      <figure className="w-full h-full absolute inset-0 z-0">
        <img
          src={Eco}
          alt="Technika"
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      {/* Search input */}
      <div className="relative z-10 mx-auto max-w-md mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 text-gray-900 bg-white bg-opacity-75 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-8 relative z-10">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            img={event.img}
            name={event.name}
            desc={event.desc}
            pricing={event.pricing}
            evid={event.evid}
            onClick={() => handleEventClick(event)}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-white text-center mt-4">No events found.</p>
      )}

      {selectedEvent && (
        <div ref={registerButtonRef} className="relative z-20 mt-8">
          <EventDetails
            name={selectedEvent.name}
            desc={selectedEvent.desc}
            pricing={selectedEvent.pricing}
            evid={selectedEvent.evid}
          />
        </div>
      )}
    </div>
  );
};

export default Events;
