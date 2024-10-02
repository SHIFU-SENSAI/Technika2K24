import React from "react";
import Icon from "react-icons-kit";
import { x } from "react-icons-kit/feather/x";

const checkoutEventCard = (props) => {
  return (
    <div>
      <div className="flex gap-5 my-5 items-center">
        <figure className="w-28 bg-slate-800 h-28 relative">
          <Icon
            icon={x}
            size={24}
            className="absolute -left-3 -top-[14px] cursor-pointer"
          />
          <img src="" alt="" />
        </figure>
        <div>
          <p className="text-xl font-bold">{props.title}</p>
          <p>price: {props.price}</p>
          <p>date: {props.date}</p>
        </div>
      </div>
    </div>
  );
};

export default checkoutEventCard;
