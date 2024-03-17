import { KeyboardArrowUp } from "@mui/icons-material";
import React, { useState } from "react";
const FormCheckbox = ({ label = "Select Your category", option, onChange, value = [] }) => {
  // const categoryOption =["clothes","mobile","laptop",]

  const [open, setOpen] = useState(true);
  return (
    <div>
    <div className="flex items-center">
      <label className="font-Poppins text-slate-700 mb-2 ">{label}</label>
        <div className={`${open?"rotate-180":"-rotate-180"} cursor-pointer`} onClick={()=>setOpen(!open)}> <KeyboardArrowUp /></div>
      </div>
      
      <div className={`${open ? "max-h-fit" : "max-h-0"} overflow-hidden flex-col gap-1 transition-max-height ease-in-out duration-1000 `}>
        {option.map((item) => {
          return (
            <div
              key={item.id}
              className="flex gap-1 font-Poppins items-center text-slate-700"
            >
              <input id={item.id} name={item.title} value={item.title} type="checkbox" checked={value.includes[item.title]} onChange={onChange} />
              <label
                htmlFor={item.id}
                onChange={onChange}
                className="cursor-pointer hover:underline hover:text-purple-700"
              >
                {item.title}
              </label>
            </div>
          );
        })}
      </div>
      </div>

  );
};

export default FormCheckbox;
