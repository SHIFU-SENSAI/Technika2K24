import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const EventCard = (props) => {
  const [pricing, setPricing] = useState("");
  const [solo, setSolo] = useState(true);
  const [team, setTeam] = useState(true);
  useEffect(() => {
    switch (props?.reg) {
      case "Solo only":
        setPricing(`Solo Price : ₹${props?.sprice}`);
        setSolo(true);
        setTeam(false);
        break;
      case "Team only":
        setPricing(`Team Price : ₹${props?.tprice} /- per person`);
        setSolo(false);
        setTeam(true);
        break;

      case "Solo or Team":
        setPricing(
          `Solo Price : ₹${props?.sprice} , Team Price : ₹${props?.tprice} /- per person`
        );
        setSolo(true);
        setTeam(true);
        break;

      case "Duo":
        setPricing(`Duo Price : ₹${props?.tprice} /- per person`);
        setSolo(false);
        setTeam(true);
        break;
      case "Duo/Team":
        setPricing(`Duo/Team Price : ₹${props?.tprice} /- per person`);
        setSolo(false);
        setTeam(true);
        break;

      default:
        break;
    }
  }, [props?.reg]);

  return (
    <div className="w-[280px] sm:w-[600px] md:w-[768px]  lg:w-[1120px] min-h-fit md:min-h-fit bg-primary p-3 flex flex-col md:flex-row  gap-5 border-4 border-black contact-form-shadow">
      <div>
        <figure className="w-60 h-auto relative">
          <img src={props?.img} alt="Event" />
        </figure>
        <div className=" absolute top-6 right-5 md:hidden ">
          <p className=" w-28 h-9  bg-[#464646] text-center text-white m-auto pt-1 tracking-widest border-2  border-black">
            {props?.type}
          </p>
        </div>
      </div>

      <div className="font-Default tracking-wide flex justify-between items-start flex-col  gap-5 w-full px-5">
        <div className="flex flex-col gap-2 font-bold w-full md:w-[80%] ">
          <p className="text-xl tracking-[.5rem] font-extrabold break-words">
            {props?.name}
          </p>
          <p className="text-sm md:text-lg">
            theme: <span className="text-gray-700 "> {props?.theme}</span>{" "}
          </p>
          <p className="text-sm md:text-lg">
            description: <span className="text-gray-700 "> {props?.desc}</span>
          </p>
          <p className="text-sm md:text-lg">
            {" "}
            Venue:<span className="text-gray-700 "> {props?.venue}</span>
          </p>
          <p className="text-sm md:text-lg">
            {" "}
            Date:<span className="text-gray-700 "> {props?.date}</span> {" , "}{" "}
            Time: <span className="text-gray-700 "> {props?.time}</span>
          </p>
          <p className="text-sm md:text-lg">{pricing}</p>
          <p className="text-sm md:text-lg">
            Registration Type:
            <span className="text-gray-700 "> {props?.reg}</span>{" "}
          </p>
        </div>
        <div className="flex-inline gap-8">
          <Link className={solo ? "" : "hidden"} to={`/form?id=${props?.evid}`}>
            <button className="bg-[#9360fa] mx-2 w-36 my-2 h-12 text-xl text-white border-2 border-white nav_Box_shadow">
              register solo
            </button>
          </Link>
          <Link
            className={team ? "" : "hidden"}
            to={`/forms?id=${props?.evid}`}
          >
            <button className="bg-[#9360fa] my-2 w-36 mx-2 h-12 text-xl text-white border-2 border-white nav_Box_shadow">
              register team
            </button>
          </Link>
        </div>
      </div>

      <div className="hidden lg:block ">
        <p className=" w-28 h-9  bg-[#464646] text-center text-white m-auto pt-1 tracking-widest border-2  border-black">
          {props?.type}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
