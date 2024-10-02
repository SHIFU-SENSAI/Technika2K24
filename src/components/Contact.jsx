import Astro3 from "../assets/Astro3.png";
import ContactCard from "./ContactCard";
import Proptypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const Contact = () => {
  const contacts = [
    {
      key: "1",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihb3DnYBj7HHZcl1MU4MizVgqFyPy2uVfvdn8puFqYH7rlf4uhW7-HgObKby_Sa7uageKLIGt4D7MfFPh9tSh1pDd2mdAQ=w350-h633",
      name: "Sheryas Deo",
      email: "deoshreyas31@gmail.com",
      phone: "+91 9983334549",
      insta:
        "https://www.instagram.com/_deo.shreyas_?igsh=MXVjcjlkY2ZjNzRpMQ==",
    },

    {
      key: "2",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihaj8xrlXGKgcxeIHQVPz9ADRKoJ4zUj8nz_trV0nH2yONokbWt64aXVGrPm4Fc8uzVkfVYdZFmNuN0wb7mKavOf_ABaOQ=w1366-h633",
      name: "Harsh Raj",
      email: "rajstark700@gmail.com",
      phone: "+91 7004654911",
      linkedin: "https://www.linkedin.com/in/imharsh911/",
      insta: "https://www.instagram.com/_mr_harsh007_?igsh=OXhnajAwdnF6bnZy",
    },
    {
      key: "3",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihZuyZYBItbmqTuxdC0pYoUD1xODrEAaYxIdNS1gpTe31LPAAWTXWus1rcjar2ibhjg4N-bMG769GdFQkdv8Mpckmmn7=w1366-h633",
      name: "Priyanshu",
      email: "priyanshu24mach@gmail.com",
      phone: "+91 9199895545",
      linkedin:
        "https://www.linkedin.com/in/prian24mach?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      insta: "https://www.instagram.com/priyanshu24mach/",
    },
    {
      key: "4",
      image:
        "https://lh3.googleusercontent.com/drive-viewer/AKGpihbUwof0cypTfGzpBMXtCq86ISTv4Z3rZk1oHY44tFYYNnFTl6Omj0O_WUQPHdDr7d2dhossUraS7EqGooe1Bj-0qpKJGg=w1366-h633",
      name: "Abhishek Kumar",
      email: "akhilabhishek1711@gmail.com",
      phone: "+91 9065539429",
      linkedin: "https://www.linkedin.com/in/abhishek-kumar-9aa54a248",
      insta: "https://www.instagram.com/abhisheekk._?igsh=NXZmNmNtcXRvNXQ0",
    },
  ];

  return (
    <div className="relative container h-full  mx-auto overflow-hidden w-full ">
      <h1 className="text-4xl font-bold text-white text-center pt-6 z-10 relative ">
        Contact
      </h1>

      <figure className="w-screen ">
        <img
          src={Astro3}
          alt=""
          className="absolute left-0 top-0 opacity-50 "
        />
      </figure>

      <div className="py-10 flex justify-center items-center flex-wrap  gap-10   ">
        {contacts?.map((contact) => (
          <Fade
            key={contact?.key}
            duration={contact.key * 300}
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
