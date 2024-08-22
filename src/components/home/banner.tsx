import React from "react";
import backgroundImg from "@/assets/background-img.jpg";
import iiitr from "@/assets/iiitr-logo.png";
import Navbar from "@/components/navbar";
import { PlacementBrochure } from "@/data";

const Banner: React.FC = () => {
  return (
    <div className="relative bg-blue-50 h-screen">
      <Navbar />
      <div className="w-full h-full">
        <img
          src={backgroundImg}
          className="h-full w-full object-cover "
          alt=""
        />

        <div className="absolute top-1/2 w-full flex items-center flex-col gap-y-6 left-1/2 -translate-x-1/2 -translate-y-[40%]">
          <div className="bg-white backdrop:filter w-fit backdrop-blur-lg shadow-xl bg-opacity-70 rounded-xl p-4">
            <img
              src={iiitr}
              className="md:max-w-[300px] max-w-[250px]"
              alt=""
            />
          </div>
          <div className="bg-white backdrop:filter backdrop-blur-lg shadow-xl bg-opacity-70 rounded-[60px] text-center  py-4 px-10">
            <h1 className="text-primary font-extrabold md:text-5xl sm:text-3xl text-2xl">
              Training and Placement Cell <br />{" "}
              <span className="md:text-4xl sm:text-2xl text-xl">
                IIIT Ranchi
              </span>
            </h1>
          </div>
          <div className="bg-white backdrop:filter backdrop-blur-lg shadow-xl bg-opacity-70 rounded-[40px] px-16 py-4 hover:cursor-pointer">
            <a href={PlacementBrochure} target="_blank">
              <h1 className="text-primary font-extrabold md:text-3xl text-xl">
                Download Brochure
              </h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
