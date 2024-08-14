import React from "react";
import backgroundImg from "../../assets/background-img.jpg";
import iiitr from "../../assets/iiitr-logo.png";
import Navbar from "../navbar";

const Banner: React.FC = () => {
  return (
    <div className="relative bg-blue-50 overflow-hidden">
      <Navbar />
      <div className="absolute inset-0">
        <img
          src={backgroundImg} 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" relative gap-20 z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <img
          src={iiitr}
          alt="IIIT Ranchi Logo"
          className="h-[10rem] mb-4 w-[12rem] md:h-[16rem] md:mb-6 md:w-[18rem] rounded-[2rem] bg-slate-200 opacity-90 shadow-[0px_6px_10px_5px_#1a202c] "
        />
        <div className="p-1 h-[3.6rem] w-[16rem] text-md pl-4 pr-4 md:p-2 md:h-[6rem] md:w-[36rem] md:text-4xl font-bold flex-col items md:pl-10 md:pr-10 rounded-[2rem] bg-slate-200 opacity-90 shadow-[0px_6px_10px_5px_#1a202c] ">
          <h1 className=" text-[#0928A0] mb-2 ">
            Training and Placement Cell
          </h1>
          <h2 className=" text-[#0928A0] ">
            IIIT Ranchi
          </h2>
        </div>
        <button className="h-[2.6rem] w-[12rem] text-sm pl-2 pr-2 md:p-2 md:h-[4rem] md:w-[30rem] md:text-2xl text-[#0928A0] font-bold flex-col items md:pl-10 md:pr-10 rounded-[2rem] bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg">
          Download Brochure
        </button>
      </div>
    </div>
  );
};

export default Banner;
