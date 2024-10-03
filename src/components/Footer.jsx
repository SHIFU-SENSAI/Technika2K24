import { FaFacebookF, FaYoutube, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import BitLogo from "../assets/mesra_logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-teal-300 py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Text and Social Icons */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold">TECHNIKA 2024</h3>
          <p>INNOVATING TODAY, SUSTAINING TOMORROW</p>
          <p className="mt-4">FOLLOW US ON</p>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            {/* Social Media Icons */}
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        <div className="text-center md:text-right mb-6 md:mb-0">
          <p>Birla Institute of Technology</p>
          <p>Patna, Bihar 800014, India</p>
          <div className="flex items-center justify-center md:justify-end mt-4 space-x-2">
            <FaEnvelope />
            <p>technika@bitmesra.ac.in</p>
          </div>
          <div className="flex items-center justify-center md:justify-end mt-2 space-x-2">
            <FaPhone />
            <p>+91 8252624667</p>
          </div>
        </div>

        <div className="w-24 md:w-32 flex justify-center md:justify-end">
          <img
            src={BitLogo}
            alt="BIT Mesra Logo"
            className="w-full h-auto object-contain pointer-events-none"
          />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 TECHNIKA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
