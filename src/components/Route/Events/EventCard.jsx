import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({ data }) => {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2 mb-12`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14 pro max 8/256gb</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
          voluptatum commodi laborum, quidem explicabo numquam obcaecati a,
          ipsam modi consequuntur alias corporis distinctio dignissimos totam,
          doloremque excepturi accusantium? Minus, beatae! Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Maiores quasi consequuntur sunt
          saepe illum animi facilis quas repellat itaque obcaecati nostrum quis,
          est nam amet perspiciatis consectetur molestias, aut quia!
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1200$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              1000$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
      </div>
    </div>
  );
};

export default EventCard;
