import React, { useState, useEffect, useCallback } from "react";
import EventCard from "./eventCard";
import Eco from "../assets/eco.png";
import "../general.css";

const eventsData = [
    {
        id: 1,
        name: "Dev Conquest",
        img: "/images/event1.jpg",
        desc: "Unleash your creativity and coding skills in an intense hackathon. Compete with the brightest minds to develop innovative solutions to real-world problems and claim the title of Tech Wizard!",
        pricing: "$10",
        evid: "event1",
    },
    {
        id: 2,
        name: "Algo Apex",
        img: "/images/event2.jpg",
        desc: "Sharpen your algorithms and take on complex coding challenges in this competitive programming event. Show your problem-solving prowess and climb the leaderboard to emerge as the algorithm master.",
        pricing: "$10",
        evid: "event2",
    },
    {
        id: 3,
        name: "Ampere Assemble",
        img: "/images/event3.jpg",
        desc: "Dive into the world of circuits and electronics with Ampere Assemble. This electrifying competition will test your knowledge and practical skills in assembling and troubleshooting complex electronic systems.",
        pricing: "$10",
        evid: "event3",
    },
    {
        id: 4,
        name: "Robo Gladiators (Robo War)",
        img: "/images/event4.jpg",
        desc: "This is a description for Sample Event 4.",
        pricing: "$10",
        evid: "event4",
    },
    {
        id: 5,
        name: "Robo Gladiators (Robo War)",
        img: "/images/event5.jpg",
        desc: "This is a description for Sample Event 5.",
        pricing: "$10",
        evid: "event5",
    },
    {
        id: 6,
        name: "Robo Gladiators (Robo War)",
        img: "/images/event6.jpg",
        desc: "This is a description for Sample Event 6.",
        pricing: "$10",
        evid: "event6",
    },

];

const Events = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [animate, setAnimate] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const filteredEvents = eventsData.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleEventClick = useCallback((event) => {
        setSelectedEvent(event);
        setTimeout(() => {
            const detailsSection = document.getElementById("event-details");
            if (detailsSection) {
                detailsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }, 0);
    }, []);

    return (
        <div id="events-section" className="relative container mx-auto overflow-hidden w-full px-4 py-8">
            <h1 className="text-4xl font-bold text-white text-center mb-8 z-10 relative">
                 EVENTS
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

            <div className="flex flex-wrap -mx-2 relative z-10">
                {filteredEvents.map((event, index) => (
                    <div
                        key={event.id}
                        className={`w-full sm:w-1/2 md:w-1/3 p-2 transform ${animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                            } transition-all duration-500 ease-out`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <EventCard
                            img={event.img}
                            name={event.name}
                            desc={event.desc}
                            pricing={event.pricing}
                            evid={event.evid}
                            onClick={() => handleEventClick(event)}
                        />
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <div id="event-details" className="relative z-20">
                    {/* Add your event details component here */}
                </div>
            )}

            {filteredEvents.length === 0 && (
                <p className="text-white text-center mt-4">No events found.</p>
            )}
        </div>
    );
};

export default Events;
