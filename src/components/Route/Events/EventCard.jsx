import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({ data }) => {
  return (
    <div className={`w-full   bg-white rounded-lg lg:flex py-5 px-3 mb-12 flex gap-5`}>
      <div className="w-full  lg:flex-1">
        <img className="rounded-sm" src={import.meta.env.VITE_IMAGE + data.images[0]} alt="" />
      </div>
      <div className="w-full lg:flex-1 flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          
        </div>
        <CountDown data={data} />
        <br />
      </div>
    </div>
  );
};

export default EventCard;
