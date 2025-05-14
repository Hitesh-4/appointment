import { FiLoader } from "react-icons/fi";
import React from "react";

const Loading = () => {
  return (
    <div className="  h-screen w-full flex items-center justify-center">
      <FiLoader className=" opacity-85 animate-spin text-3xl " />
    </div>
  );
};

export default Loading;



