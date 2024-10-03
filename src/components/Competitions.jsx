import Astro2 from "../assets/astro2.png";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { search } from "react-icons-kit/feather/search";
import Icon from "react-icons-kit";
import { MagnifyingGlass } from "react-loader-spinner";
import { Fade } from "react-awesome-reveal";

const Competitions = () => {
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [sKey, setSKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "events"));
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
        setDataAll(newData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearch = () => {
      setData(
        dataAll.filter((item) =>
          item.event_title.toLowerCase().includes(sKey.toLowerCase())
        )
      );
    };

    fetchSearch();
  }, [sKey, dataAll]);

  const handleSearch = (e) => {
    setSKey(e.target.value);
  };

  return (
    <div className="relative overflow-hidden">
      <div className={`${data ? "h-full" : "h-screen "}  container mx-auto  `}>
        <figure className="w-full ">
          <img src={Astro2} alt="" className="absolute right-0  opacity-50" />
        </figure>

        <div className="flex items-center justify-center relative z-10">
          <div className="w-full">
            <h1 className="text-4xl font-bold text-white text-center py-5 my-5">
              Events
            </h1>
          </div>
        </div>
        <div className="w-[320px] sm:w-[600px] md:w-[1120px] flex  md:pt-28 text-white items-start md:items-center  mx-auto bg-transparent bg-primary  gap-10 flex-col md:flex-row px-5 md:px-0  ">
          <div className="relative px-auto flex items-center">
            <input
              type="search"
              name="search"
              value={sKey}
              onChange={handleSearch}
              placeholder="search"
              className=" w-64 sm:w-60 md:w-80 text-black py-2 pl-10 pr-2 outline-none border-2 border-black bg-primary contact-form-shadow"
            />
            <Icon icon={search} className="absolute left-3 text-black" />
          </div>
        </div>
        <div className="flex justify-center flex-col items-center relative z-10 my-10 gap-10">
          {loading ? (
            <div className="text-2xl font-bold h-[50vh]">
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#9360FA"
              />
            </div>
          ) : data.length > 0 ? (
            data.map((event, index) => (
              <Fade key={index} triggerOnce duration={400} direction="up">
                <EventCard
                  key={index}
                  evid={event?.id}
                  img={event?.event_img}
                  type={event?.event_category}
                  tprice={event?.team_price}
                  sprice={event?.solo_price}
                  name={event?.event_title}
                  desc={event?.event_desc}
                  venue={event?.event_venue}
                  date={event?.event_date}
                  time={event?.event_time}
                  prize={event?.event_prize}
                  theme={event?.event_theme}
                  reg={event?.event_type}
                />
              </Fade>
            ))
          ) : (
            <p className="text-2xl font-bold h-[50vh] text-white text-center py-5  ">
              No events found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Competitions;
