import { FaFacebookF, FaYoutube, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import BitLogo from "../assets/mesra_logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#17252a] text-white py-4 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section: Text and Social Icons */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold">TECHNIKA 2024</h3>
            <p className="text-base">INNOVATING TODAY, SUSTAINING TOMORROW</p>
            <div className="mt-3 flex flex-col items-center md:items-start">
              <span className="text-base mb-2">FOLLOW US ON</span>
              <div>
                
                <a href="https://www.youtube.com/@Technikabitp" className="text-white hover:text-red-500 inline-block mx-2">
                  <FaYoutube size={24} />
                </a>
                <a href="https://www.instagram.com/technika_bitp/" className="text-white hover:text-pink-500 inline-block mx-2">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
            <img
              src={BitLogo}
              alt="BIT Mesra Logo"
              className="w-24 md:w-28 h-auto object-contain pointer-events-none mb-3"
            />
            <p className="text-base text-gray-400">&copy; 2024 TECHNIKA. All rights reserved.</p>
          </div>

          {/* Right Section: Contact Information */}
          <div className="w-full md:w-1/3 text-center md:text-right text-base">
            <p>Birla Institute of Technology</p>
            <p>Patna, Bihar 800014, India</p>
            <div className="mt-3">
              <FaEnvelope size={18} className="inline mr-2" />
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=technika@bitmesra.ac.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                technika@bitmesra.ac.in
              </a>
            </div>
            <div className="mt-1">
              <FaPhone size={18} className="inline mr-2" />
              <span>+91 8252624667</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
