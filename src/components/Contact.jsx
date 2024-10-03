import Eco from "../assets/eco.png";
import ContactCard from "./ContactCard";
import Proptypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const Contact = () => {
  const contacts = [
    {
      key: "1",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihb3DnYBj7HHZcl1MU4MizVgqFyPy2uVfvdn8puFqYH7rlf4uhW7-HgObKby_Sa7uageKLIGt4D7MfFPh9tSh1pDd2mdAQ=w350-h633",
      name: "Suryansh Sinha",
      phone: "+91 8252624667",
      insta:"https://www.instagram.com/_deo.shreyas_?igsh=MXVjcjlkY2ZjNzRpMQ==",
    },
    {
      key: "2",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihaj8xrlXGKgcxeIHQVPz9ADRKoJ4zUj8nz_trV0nH2yONokbWt64aXVGrPm4Fc8uzVkfVYdZFmNuN0wb7mKavOf_ABaOQ=w1366-h633",
      name: "Balajee",
      phone: "+91 9693650110",
      insta: "https://www.instagram.com/_mr_harsh007_?igsh=OXhnajAwdnF6bnZy",
    },
    {
      key: "3",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihZuyZYBItbmqTuxdC0pYoUD1xODrEAaYxIdNS1gpTe31LPAAWTXWus1rcjar2ibhjg4N-bMG769GdFQkdv8Mpckmmn7=w1366-h633",
      name: "Asman Kumari",
      phone: "+91 7857809775",
      insta: "https://www.instagram.com/priyanshu24mach/",
    },
    {
      key: "4",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihbUwof0cypTfGzpBMXtCq86ISTv4Z3rZk1oHY44tFYYNnFTl6Omj0O_WUQPHdDr7d2dhossUraS7EqGooe1Bj-0qpKJGg=w1366-h633",
      name: "Piyush Kumar Jha",
      phone: "+91 7970570528",
      insta: "https://www.instagram.com/abhisheekk._?igsh=NXZmNmNtcXRvNXQ0",
    },
    {
      key: "5",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihbUwof0cypTfGzpBMXtCq86ISTv4Z3rZk1oHY44tFYYNnFTl6Omj0O_WUQPHdDr7d2dhossUraS7EqGooe1Bj-0qpKJGg=w1366-h633",
      name: "Prem Kumar Singh",
      phone: "+91 7464025690",
      insta: "https://www.instagram.com/abhisheekk._?igsh=NXZmNmNtcXRvNXQ0",
    },
    {
      key: "6",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihbUwof0cypTfGzpBMXtCq86ISTv4Z3rZk1oHY44tFYYNnFTl6Omj0O_WUQPHdDr7d2dhossUraS7EqGooe1Bj-0qpKJGg=w1366-h633",
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
