import Eco from "../assets/eco.png";
import ContactCard from "./ContactCard";
import Proptypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const Contact = () => {
  const contacts = [
    {
      key: "1",
      image:"src/assets/365293.jpg",
      name: "Suryansh Sinha",
      phone: "+91 8252624667",
      insta:"https://www.instagram.com/_deo.shreyas_?igsh=MXVjcjlkY2ZjNzRpMQ==",
    },
    {
      key: "2",
      image:"src/assets/365293.jpg",
      name: "Balajee",
      phone: "+91 9693650110",
      insta: "https://www.instagram.com/_mr_harsh007_?igsh=OXhnajAwdnF6bnZy",
    },
    {
      key: "3",
      image:"src/assets/AsmanKumari.jpg",
      name: "Asman Kumari",
      phone: "+91 7857809775",
      insta: "https://www.instagram.com/priyanshu24mach/",
    },
    {
      key: "4",
      image:"src/assets/PiyushJha.jpg",
      name: "Piyush Kumar Jha",
      phone: "+91 7970570528",
      insta: "https://www.instagram.com/abhisheekk._?igsh=NXZmNmNtcXRvNXQ0",
    },
    {
      key: "5",
      image:
        "src/assets/PremKumarjpg.jpg",
      name: "Prem Kumar Singh",
      phone: "+91 7464025690",
      insta: "https://www.instagram.com/abhisheekk._?igsh=NXZmNmNtcXRvNXQ0",
    },
    {
      key: "6",
      image:
        "src/assets/365293.jpg",
      name: "Aadarsh Raj Alok",
      phone: "+91 7079901930",
      insta: "https://www.instagram.com/abhisheekk._?igsh=NXZmNmNtcXRvNXQ0",
    },
  ];

  return (
    <div className="relative container h-full mx-auto overflow-hidden w-full">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative">
        CONTACT
      </h1>

      {/* Background Image */}
      <figure className="w-full h-full absolute inset-0">
        <img
          src={Eco}
          alt=""
          className="object-cover w-full h-full opacity-60"
        />
      </figure>

      {/* Cards Section */}
      <div className="py-10 flex justify-center items-center flex-wrap gap-10 z-10 relative">
        {contacts?.map((contact) => (
          <Fade
            key={contact?.key}
            duration={600} // Uniform duration for all animations
            triggerOnce={true}
            direction="up"
          >
            <ContactCard
              image={contact?.image}
              name={contact?.name}
              email={contact?.email}
              phone={contact?.phone}
              linkedin={contact?.linkedin}
              insta={contact?.insta}
            />
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Contact;

Contact.propTypes = {
  contacts: Proptypes.array,
};
