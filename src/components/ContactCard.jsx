import Icon from "react-icons-kit";
import { instagram } from "react-icons-kit/fa/instagram";
import { linkedinSquare } from "react-icons-kit/fa/linkedinSquare";
import Proptypes from "prop-types";

const ContactCard = ({ image, name, email, phone, insta, linkedin }) => {
  return (
    <div className="relative ">
      <div className="w-[285px] h-[310px] md:w-[380px] bg-primary  p-5 border-4 border-black contact-form-shadow z-10 mx-auto font-Default tracking-widest flex flex-col justify-between ">
        <div className="flex justify-start  items-center gap-2  w-full  ">
          <figure className="overflow-hidden w-1/2 ">
            <img className="object-cover w-32 h-32" src={`${image}`} alt="" />
          </figure>
          <p className="text-2xl font-bold  break-words  w-1/2 ">{name}</p>
        </div>

        <div className="flex flex-col gap-2 my-5 text-xl font-bold break-words">
          <p>{phone}</p>
          <p className="text-sm">{email}</p>
        </div>
        <div className="flex justify-around">
          <a href={`${insta}`} target="_blank" rel="noopener noreferrer">
            <Icon icon={instagram} size={48} />
          </a>
          <a href={`${linkedin}`} target="_blank" rel="noopener noreferrer">
            <Icon icon={linkedinSquare} size={48} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

ContactCard.propTypes = {
  image: Proptypes.string,
  name: Proptypes.string,
  email: Proptypes.string,
  phone: Proptypes.string,
  linkedin: Proptypes.string,
  insta: Proptypes.string,
};
