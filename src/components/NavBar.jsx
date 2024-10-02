import { Link } from "react-router-dom";
import BitLogo from "../assets/mesra_logo.png";
import { useEffect, useState } from "react";
import { menu } from "react-icons-kit/feather/menu";
import Icon from "react-icons-kit";
import { x } from "react-icons-kit/feather/x";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const NavBar = ({ logged }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  };
  // console.log(menuOpen);

  // console.log(logged);

  return (
    <div>
      <nav className="flex justify-between  px-4 sm:px-20 bg-primary py-3 md:flex md:items-center md:justify-between relative items-center">
        <div className="w-20">
          <img src={BitLogo} alt="College Logo" />
        </div>
        <div className="text-black font-bold md:flex justify-center lg:gap-12 gap-6 items-center h-14 rounded-xl mx-auto font-Default lowercase text-sm lg:text-lg hidden ">
          <Link to="/" className="hover:text-[#9360fa] duration-500">
            Home
          </Link>
          <a
            href="https://forms.gle/oVjowrQF1KJ7iRHB8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Merchandise
          </a>
          <Link
            to="/competitions"
            className="hover:text-[#9360fa] duration-500"
          >
            Events
          </Link>
          <Link to="/workshops" className="hover:text-[#9360fa] duration-500">
            Workshops
          </Link>
          <Link to="/contact" className="hover:text-[#9360fa] duration-500">
            Contact
          </Link>
          <Link to="/about" className="hover:text-[#9360fa] duration-500">
            About
          </Link>
        </div>

        <div
          className={`absolute right-20 ${
            menuOpen ? "flex" : "hidden"
          } justify-between gap-5 items-start flex-col bg-black text-white font-bold h-[85vh]  mx-auto font-Default lowercase text-lg top-24 z-40 w-full left-0  px-8  ease-in-out duration-500 border-b-2 border-[#9360fa] pb-7 `}
        >
          <h1 className="text-5xl ">Menu</h1>
          <Link
            onClick={handleOpen}
            to="/"
            className="hover:text-[#9360fa] duration-500"
          >
            Home
          </Link>
          <Link
            onClick={handleOpen}
            to="/competitions"
            className="hover:text-[#9360fa] duration-500"
          >
            Competitions
          </Link>
          <a
            onClick={handleOpen}
            href="https://forms.gle/oVjowrQF1KJ7iRHB8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Merchandise
          </a>
          <Link
            onClick={handleOpen}
            to="/workshops"
            className="hover:text-[#9360fa] duration-500"
          >
            Workshops
          </Link>
          <Link
            onClick={handleOpen}
            to="/contact"
            className="hover:text-[#9360fa] duration-500"
          >
            Contact
          </Link>
          <Link
            onClick={handleOpen}
            to="/about"
            className="hover:text-[#9360fa] duration-500"
          >
            About
          </Link>
          <Link
            onClick={handleOpen}
            to={logged ? "/account" : "/login"}
            className="hover:text-white duration-500 bg-[#9360FA] w-full py-2 px-4 rounded -ml-4 border border-white hover:brightness-50"
          >
            {logged ? "Your Account" : "Login"}
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            to={logged ? "/account" : "/login"}
            className="text-white bg-[#9360FA] p-3 border border-white nav_Box_shadow h-full font-Default text-sm duration-500 lg:text-lg "
          >
            {logged ? "Your Account" : "Login"}
          </Link>
        </div>
        <div className="block md:hidden">
          <button onClick={handleOpen}>
            <Icon
              className="duration-1000"
              icon={menuOpen ? x : menu}
              size={30}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
