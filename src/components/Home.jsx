import "../general.css";
import CloudLeft from "../assets/cloudLeft.png";
import CloudRight from "../assets/cloudRight.png";
import Rocket from "../assets/rocket.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = ({ logged }) => {
  // console.log({ logged });
  const auth = getAuth();
  const scrollRef = useRef(null);
  const SectionRef = useRef(null);
  const [fire, setFire] = useState(false);

  // console.log(auth?.currentUser);

  useEffect(() => {
    {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement;

        if (scrollTop > 40) {
          setFire(true);
        } else if (scrollTop === 0) {
          setFire(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section
      ref={SectionRef}
      className="relative overflow-hidden  container   mx-auto h-[800px]  "
    >
      <div className="flex flex-col justify-center items-center h-80 mb-7">
        <section className=" text-primary flex flex-col justify-center items-center mt-40  font-Default ">
          <p className="text-lg sm:text-2xl md:text-4xl tracking-[0.5rem] md:tracking-[0.8rem] font-Default">
          26-28th October
          </p>

          <Fade
            className=" text-[2.8rem] sm:text-7xl  md:text-9xl tracking-[0.7rem] md:tracking-[1rem] font-bold text-center font-Default"
            triggerOnce={true}
            delay={500}
            cascade
            damping={0.2}
          >
            TECHNIKA 2K24
          </Fade>

          <p className="text-2xl sm:text-2xl md:text-4xl text-center tracking-[0.7rem] md:tracking-[1rem] font-bold text-[#9360FA] font-Default">
          Innovating today sustaining tomorrow
          </p>
        </section>
        <div>
          <Link to={!logged ? "/register" : "/competitions"}>
            <button className=" w-32 h-12 md:w-40 md:h-12 text-2xl cursor-pointer font-bold transition duration-300 ease-in-out font-Default my-Btn-Custom mt-10">
              {!logged ? "register" : "explore"}
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-end  gap-2 pt-10 ">
        <figure
          className={`absolute -left-14 w-[70%] md:w-[50%] bottom-0  transition-all duration-[5000ms]  ease-in-out ${
            fire ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <img src={CloudLeft} alt="Cloud" />
        </figure>

        <figure
          ref={scrollRef}
          className={`absolute bottom-8 z-10  transition-all duration-[5000ms]  ease-in-out ${
            fire ? "-translate-y-[250%]  " : " translate-y-0"
          } `}
        >
          <img src={Rocket} alt="Rocket" className="w-9/12 mx-auto md:w-full" />
        </figure>

        <figure
          className={`absolute -right-14 w-[70%] md:w-[50%] bottom-0 transition-all duration-[5000ms]  ease-in-out ${
            fire ? "translate-x-full" : "translate-x-0"
          }  transition-all duration-[5000ms]  ease-in-out `}
        >
          <img src={CloudRight} alt="Cloud" />
        </figure>
      </div>
    </section>
  );
};

export default Home;
