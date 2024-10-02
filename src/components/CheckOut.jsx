import { React, useState, useEffect } from "react";
import Icon from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { x } from "react-icons-kit/feather/x";
import CheckoutEventCard from "./checkoutEventCard";
import axios from "axios";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";
const CheckOut = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [qr, setQr] = useState("0");
  const [price, setPrice] = useState({
    id: "",
    price: 0
  });
  const [priceData, setPriceData] = useState({
    solo: true,
    goodies: true,
    edm: true,
    acc: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPriceData({ ...priceData, [name]: checked });
  };
  useEffect(() => {
    console.log(priceData);
    axios.post("http://127.0.0.1:3000/reg", {
      event_id: searchParams.get("ev"),
      leader_id: searchParams.get("ldr"),
      members: [],
      is_solo: true,
    });
    console.log(searchParams.get("ev"));
    axios
      .get(`http://127.0.0.1:3000/events/${searchParams.get("ev")}`)
      .then((response) => {
        setData(response.data);
      });
    axios
      .post(`http://127.0.0.1:3000/topay/${searchParams.get("ev")}`, priceData)
      .then((response) => {
        setPrice(response.data);
        setQr(`upi://pay?pa=rishi.61@paytm&pn=Rishi&am=${response.data.price}&tn=for%20technika%20registration&cu=INR`)
      });
  }, []);
  useEffect(() => {
    axios
      .post(`http://127.0.0.1:3000/topay/${searchParams.get("ev")}`,priceData)
      .then((response) => {
        setPrice(response.data);
        console.log(price);
        setQr(`upi://pay?pa=rishi.61@paytm&pn=Rishi&am=${response.data.price}&tn=for%20technika%20registration&cu=INR`)
      });
      
  }, [priceData]);
  return (
    <div className="h-full p-20 font-Default ">
      <div className="w-[900px]  mx-auto">
        <div className="bg-primary w-full h-full contact-form-shadow border-2 border-black flex">
          <div className="w-[65%]  px-16 py-8 border-r-2 border-black flex flex-col justify-between ">
            <div className="pb-10">
              <div className=" flex justify-between items-center">
                <p className="text-3xl font-bold">summary</p>
                <div className="bg-[#9360FA] w-7 h-7 text-center text-white cursor-pointer ">
                  <Icon icon={plus} size={24} />
                </div>
              </div>
              {/* card here */}

              <CheckoutEventCard
                price={data.solo_price}
                title={data.event_title}
                date={data.event_date}
              />

              {/* card here */}
            </div>
            {/* checkout total here */}
            <div className="h-[25%] p-5  border-black border-t-2  w-full">
              <div className="font-bold  pb-3 ">
                <p className="ml-9">subtotal: ₹{data.solo_price}</p>
                <div className="flex justify-start gap-5 ">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="goodies"
                    id=""
                    checked={priceData.goodies}
                  />
                  <p>goodies: ₹500</p>
                </div>
                <div className="flex justify-start gap-5 ">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="acc"
                    id=""
                    checked={priceData.acc}
                  />
                  <p>accomodation: ₹500</p>
                </div>
                <div className="flex justify-start gap-5 ">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="edm"
                    id=""
                    checked={priceData.edm}
                    className="p-5 bg-primary"
                  />
                  <p>edm: ₹500</p>
                </div>
              </div>
              <div>
                <p className="font-bold ml-8 mt-1 border-black border-t-2 w-40 ">
                  total: ₹{price.price}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[35%] p-4 tracking-widest flex flex-col gap-10 ">
            <div className="flex justify-center items-center flex-col gap-5">
              <div className=" p-3 w-[250px] h-[250px] bg-slate-500 border-2 border-black text-center">
                <QRCode
                className=" border-8 border-white pm-2" 
                value={qr}
                />
              </div>
              <div className="text-3xl font-bold text-center">scan and pay</div>
              <button className="bg-[#9360FA] w-56 h-20 text-lg text-white border-2 border-white font-bold tracking-widest nav_Box_shadow">
                upload receipt (compulsory)
              </button>
            </div>
            {/* terms and conditions */}
            <div className=" p-3">
              <p className="font-bold">terms & conditions:</p>
              <ol className="text-xs list-decimal break-words">
                <li>Registration implies adherence to all event rules.</li>
                <li>
                  Payment confirms understanding of the non-negotiable refund
                  policy.
                </li>
                <li>
                  Organizers reserve the right to modify the event, and
                  participants agree to comply with any changes.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
