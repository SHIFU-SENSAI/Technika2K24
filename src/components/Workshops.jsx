import React, { useState, useEffect, useCallback } from "react";
import WorkshopCard from "./WorkshopCard";
import CardContainer from "./CardContainer"; // Import CardContainer
import Eco from "../assets/eco.png";
import "../general.css";

const workshopsData = [
  {
    id: 1,
    title: "Generative AI Workshop",
    image: "/images/web-dev.jpg",
    description:
      "Explore the innovative world of artificial intelligence in this hands-on workshop focused on Generative AI. Learn about neural networks, machine learning models, and how AI can be used to generate creative content, from art and music to text and more. Ideal for those passionate about AI innovation.",
    formLink: "https://forms.gle/2frqAkrnNz9wUhwP9",
  },
  {
    id: 2,
    title: "Basic Trading Workshop",
    image: "/images/ml-workshop.jpg",
    description:
      "Learn the fundamentals of stock market trading and investment strategies in this beginner-friendly workshop. Gain insights into financial markets, trading platforms, and techniques to analyse stocks, making you ready to start your trading journey with confidence.",
    formLink: "https://forms.gle/1PiBsS4NDLagxspi6",
  },
  {
    id: 3,
    title: "Reel making Workshop",
    image: "/images/ui-ux.jpg",
    description:
      "Unlock your creativity with our hands-on Reel Making Workshop! Learn the essentials of storytelling, shooting, and editing short videos for platforms like Instagram and TikTok. From ideation to execution, you'll discover techniques to make visually captivating reels that stand out.",
    formLink: "https://forms.gle/UAc3pX6SpfPsWQMy5",
  },
  {
    id: 4,
    title: "Drone Workshop",
    image: "/images/ui-ux.jpg",
    description:
      "Dive into the world of drones in this interactive workshop. Learn about UAV design, flight control, and drone applications in various industries. Whether you are an aspiring drone pilot or an enthusiast, this workshop will provide hands-on experience in flying and maintaining drones.",
    formLink: "https://forms.gle/dmNccfHBhiz9FTpY7",
  },
  {
    id: 5,
    title: "MATLAB",
    image: "/images/ui-ux.jpg",
    description:
      "Join our hands-on MATLAB workshop to learn the essentials of numerical computing, data analysis, and programming. You'll explore the MATLAB interface, basic coding concepts, data visualization, and real-world applications across various fields.",
    formLink: "https://forms.gle/rmvJYxSqsEDaHU4A9",
  },
];

const WorkshopDetails = ({ title, description, formLink }) => {
  return (
    <div className="bg-white bg-opacity-90 p-6 border-4 border-green-600 text-black rounded-lg max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-lg mb-4 text-center">{description}</p>
      <div className="flex justify-center">
        <a
          href={formLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 duration-300"
        >
          Register Now
        </a>
      </div>
    </div>
  );
};

const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleWorkshopClick = useCallback((workshop) => {
    setSelectedWorkshop(workshop);
    setTimeout(() => {
      const detailsSection = document.getElementById("workshop-details");
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 0);
  }, []);

  return (
    <div className="relative container mx-auto overflow-hidden w-full">
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative">
        OUR WORKSHOPS
      </h1>

      <figure className="w-full h-full absolute inset-0 z-0">
        <img
          src={Eco}
          alt="Technika"
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      {/* Wrap workshop cards with CardContainer */}
      <CardContainer>
        {workshopsData.map((workshop, index) => (
          <div
            key={workshop.id}
            className={`transform ${
              animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            } transition-all duration-500 ease-out`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <WorkshopCard
              image={workshop.image}
              title={workshop.title}
              description={workshop.description}
              onClick={() => handleWorkshopClick(workshop)}
            />
          </div>
        ))}
      </CardContainer>

      {selectedWorkshop && (
        <div id="workshop-details" className="relative z-20">
          <WorkshopDetails
            title={selectedWorkshop.title}
            description={selectedWorkshop.description}
            formLink={selectedWorkshop.formLink}
          />
        </div>
      )}
    </div>
  );
};

export default Workshops;
