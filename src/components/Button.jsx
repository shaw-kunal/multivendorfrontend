import React from "react";
import styles from "../styles/styles";

const Button = ({ text, type = "none" }) => {
  return (
    <button
      type={type}
      className="w-full h-10 flex justify-center py-2 px-4  border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      {text}
    </button>
  );
};

export default Button;
