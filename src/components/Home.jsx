import "../general.css";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { getAuth } from "firebase/auth";

const Home = ({ logged }) => {
  const auth = getAuth();

  return (
    <section className="relative overflow-hidden container mx-auto h-[800px]">
      <div className="flex flex-col justify-center items-center h-80 mb-7">
        <section className="text-primary flex flex-col justify-center items-center mt-40 font-Default">
          <p className="text-lg sm:text-2xl md:text-4xl tracking-[0.5rem] md:tracking-[0.8rem] font-Default">
            26-28th October
          </p>
          <Fade
            className="text-[2.8rem] sm:text-7xl md:text-9xl tracking-[0.7rem] md:tracking-[1rem] font-bold text-center font-Default"
            triggerOnce={true}
            delay={500}
            cascade
            damping={0.2}>
            TECHNIKA 2K24
          </Fade>

          <p className="text-2xl sm:text-2xl md:text-4xl text-center tracking-[0.7rem] md:tracking-[1rem] font-bold text-[#ffffff] font-Default">
            Innovating Today, Sustaining Tomorrow
          </p>
        </section>
        <div>
          <Link to={!logged ? "/register" : "/competitions"}>
            <button className="w-32 h-12 md:w-40 md:h-12 text-2xl cursor-pointer font-bold transition duration-300 ease-in-out font-Default font-default mt-10 rounded-3xl bg-white hover:bg-[#af3a40] hover:text-white">
              {!logged ? "Register" : "Explore"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
