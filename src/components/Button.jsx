import React from "react";

const Button = ({ text, type = "none", disabled= false }) => {

  return (
    <button
      type={type}
      className={`w-full h-10 flex justify-center py-2 px-4  border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${disabled&&"cursor-not-allowed"}`}
    >
      {text}
    </button>
  );
};

export default Button;
