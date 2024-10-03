import { Link } from "react-router-dom";
import BitLogo from "../assets/tech_logo.png";
import { useState } from "react";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import Icon from "react-icons-kit";
// Add these imports for the new icons
import { home } from 'react-icons-kit/feather/home';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart';
import { calendar } from 'react-icons-kit/feather/calendar';
import { bookOpen } from 'react-icons-kit/feather/bookOpen';
import { mail } from 'react-icons-kit/feather/mail';
import { info } from 'react-icons-kit/feather/info';

const NavBar = ({ logged }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full bg-[#17252a] shadow-lg">
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
            className="flex flex-col items-center text-base text-white hover:text-[#af3a40] transition-colors font-medium"
          >
            <Icon icon={home} size={20} className="mb-1" />
            Home
          </Link>
          <a
            href="https://forms.gle/oVjowrQF1KJ7iRHB8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-base text-white hover:text-[#af3a40] transition-colors font-medium"
          >
            <Icon icon={shoppingCart} size={20} className="mb-1" />
            Merchandise
          </a>
          <Link
            to="/competitions"
            className="flex flex-col items-center text-base text-white hover:text-[#af3a40] transition-colors font-medium"
          >
            <Icon icon={calendar} size={20} className="mb-1" />
            Events
          </Link>
          <Link
            to="/workshops"
            className="flex flex-col items-center text-base text-white hover:text-[#af3a40] transition-colors font-medium"
          >
            <Icon icon={bookOpen} size={20} className="mb-1" />
            Workshops
          </Link>
          <Link
            to="/contact"
            className="flex flex-col items-center text-base text-white hover:text-[#af3a40] transition-colors font-medium"
          >
            <Icon icon={mail} size={20} className="mb-1" />
            Contact
          </Link>
          <Link
            to="/about"
            className="flex flex-col items-center text-base text-white hover:text-[#af3a40] transition-colors font-medium"
          >
            <Icon icon={info} size={20} className="mb-1" />
            About
          </Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            to={logged ? "/account" : "/login"}
            className="text-black bg-white px-6 py-2 rounded-full border border-transparent hover:bg-[#af3a40] hover:text-white transition font-medium"
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
            className="flex items-center text-white hover:text-[#af3a40] transition-colors text-2xl"
          >
            <Icon icon={home} size={24} className="mr-2" />
            Home
          </Link>
          <Link
            to="/competitions"
            onClick={handleOpen}
            className="flex items-center text-white hover:text-[#af3a40] transition-colors text-2xl"
          >
            <Icon icon={calendar} size={24} className="mr-2" />
            Competitions
          </Link>
          <a
            href="https://forms.gle/oVjowrQF1KJ7iRHB8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpen}
            className="flex items-center text-white hover:text-[#af3a40] transition-colors text-2xl"
          >
            <Icon icon={shoppingCart} size={24} className="mr-2" />
            Merchandise
          </a>
          <Link
            to="/workshops"
            onClick={handleOpen}
            className="flex items-center text-white hover:text-[#af3a40] transition-colors text-2xl"
          >
            <Icon icon={bookOpen} size={24} className="mr-2" />
            Workshops
          </Link>
          <Link
            to="/contact"
            onClick={handleOpen}
            className="flex items-center text-white hover:text-[#af3a40] transition-colors text-2xl"
          >
            <Icon icon={mail} size={24} className="mr-2" />
            Contact
          </Link>
          <Link
            to="/about"
            onClick={handleOpen}
            className="flex items-center text-white hover:text-[#af3a40] transition-colors text-2xl"
          >
            <Icon icon={info} size={24} className="mr-2" />
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