import { Link } from "react-router-dom";
import BitLogo from "../assets/mesra_logo.png";
import { useState } from "react";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import Icon from "react-icons-kit";

const NavBar = ({ logged }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full bg-[#f3f4f6] shadow-lg">
      <nav className="flex justify-between items-center py-2 px-4 sm:px-20 h-17">
        {/* Logo */}
        <div className="w-24">
          <Link to="/">
            <img
              src={BitLogo}
              alt="College Logo"
              className="w-full h-auto object-contain"
            />
          </Link>
        </div>

        {/* Centered Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center justify-center mx-auto">
          <Link
            to="/"
            className="text-base text-gray-700 hover:text-[#9360fa] transition-colors font-medium"
          >
            Home
          </Link>
          <a
            href="https://forms.gle/oVjowrQF1KJ7iRHB8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-gray-700 hover:text-[#9360fa] transition-colors font-medium"
          >
            Merchandise
          </a>
          <Link
            to="/competitions"
            className="text-base text-gray-700 hover:text-[#9360fa] transition-colors font-medium"
          >
            Events
          </Link>
          <Link
            to="/workshops"
            className="text-base text-gray-700 hover:text-[#9360fa] transition-colors font-medium"
          >
            Workshops
          </Link>
          <Link
            to="/contact"
            className="text-base text-gray-700 hover:text-[#9360fa] transition-colors font-medium"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="text-base text-gray-700 hover:text-[#9360fa] transition-colors font-medium"
          >
            About
          </Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            to={logged ? "/account" : "/login"}
            className="text-white bg-[#9360FA] px-6 py-2 rounded-full border border-transparent hover:bg-[#7b50d4] transition font-medium"
          >
            {logged ? "Your Account" : "Login"}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={handleOpen} aria-label="Menu Button">
            <Icon icon={menuOpen ? x : menu} size={30} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden absolute top-0 left-0 w-full h-screen bg-black text-white z-50 transition-transform duration-500 ease-in-out`}
      >
        <div className="flex flex-col items-start p-8 space-y-6">
          <button
            onClick={handleOpen}
            className="self-end text-white text-2xl focus:outline-none"
            aria-label="Close Menu"
          >
            <Icon icon={x} size={30} />
          </button>
          <Link
            to="/"
            onClick={handleOpen}
            className="text-white hover:text-[#9360fa] transition-colors text-2xl"
          >
            Home
          </Link>
          <Link
            to="/competitions"
            onClick={handleOpen}
            className="text-white hover:text-[#9360fa] transition-colors text-2xl"
          >
            Competitions
          </Link>
          <a
            href="https://forms.gle/oVjowrQF1KJ7iRHB8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpen}
            className="text-white hover:text-[#9360fa] transition-colors text-2xl"
          >
            Merchandise
          </a>
          <Link
            to="/workshops"
            onClick={handleOpen}
            className="text-white hover:text-[#9360fa] transition-colors text-2xl"
          >
            Workshops
          </Link>
          <Link
            to="/contact"
            onClick={handleOpen}
            className="text-white hover:text-[#9360fa] transition-colors text-2xl"
          >
            Contact
          </Link>
          <Link
            to="/about"
            onClick={handleOpen}
            className="text-white hover:text-[#9360fa] transition-colors text-2xl"
          >
            About
          </Link>
          <Link
            to={logged ? "/account" : "/login"}
            onClick={handleOpen}
            className="text-white bg-[#9360fa] py-2 px-6 rounded-md border border-white hover:brightness-110 transition w-full text-center"
          >
            {logged ? "Your Account" : "Login"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
