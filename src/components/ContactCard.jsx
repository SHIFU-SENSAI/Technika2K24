import Icon from "react-icons-kit";
import { instagram } from "react-icons-kit/fa/instagram";
import { linkedinSquare } from "react-icons-kit/fa/linkedinSquare";
import PropTypes from "prop-types";

const ContactCard = ({ image, name, email, phone, insta, linkedin }) => {
  return (
    <div className="relative">
      <div className="w-[285px] h-[340px] md:w-[380px] bg-gradient-to-r from-green-300 via-blue-400 to-teal-600 p-6 border-4 border-green-600 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out mx-auto font-Default tracking-wider flex flex-col justify-between">
        {/* Profile Section */}
        <div className="flex justify-center items-center gap-4 w-full">
          <figure className="overflow-hidden w-32 h-32 rounded-full border-4 border-teal-100">
            <img
              className="object-cover w-full h-full rounded-full transition-transform duration-300 hover:scale-110"
              src={image}
              alt={name}
            />
          </figure>
        </div>

        {/* Name and Contact Info */}
        <div className="text-center mt-3">
          <p className="text-2xl font-bold text-gray-900 break-words">{name}</p>
        </div>
        <div className="flex flex-col gap-2 mt-2 text-lg font-bold text-gray-800 text-center break-words">
          <p>{phone}</p>
          <p className="text-sm">{email}</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-around mt-5">
          <a
            href={insta}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-125"
          >
            <Icon icon={instagram} size={40} className="text-gray-900 hover:text-pink-400" />
          </a>
         
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  linkedin: PropTypes.string,
  insta: PropTypes.string,
};

export default ContactCard;
