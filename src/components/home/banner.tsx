import React, { useEffect, useState } from "react";
import backgroundImg from "@/assets/background-img-2.png";
import iiitrw from "@/assets/iiitranchi-white-logo.png";
import Navbar from "@/components/navbar";
import { PlacementBrochure } from "@/data";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const Banner: React.FC = () => {
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    // Add or remove scroll lock class based on scrollLocked state
    if (scrollLocked) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [scrollLocked]);

  const handleArrowClick = () => {
    setScrollLocked(false); // Unlock scroll
  };

  return (
    <div className="relative bg-blue-50 h-screen scroll-mb-[100%] scroll-smooth">
      <Navbar />
      <div className="w-full h-full">
        <img
          src={backgroundImg}
          className="h-full w-full object-cover "
          alt=""
        />

        <div className="absolute top-1/2 w-full flex items-center flex-col gap-y-6 left-1/2 -translate-x-1/2 -translate-y-[40%]">
          <div className="p-4">
            <img
              src={iiitrw}
              className="md:max-w-[300px] max-w-[250px]"
              alt=""
            />
          </div>
          <div className="text-white font-serif text-center py-4 px-10">
            <h1 className="font-serif font-bold md:text-5xl sm:text-3xl text-2xl uppercase">
              Training & Placement Cell <br />{" "}
              <span className="font-serif font-bold md:text-4xl sm:text-2xl text-xl">
                IIIT Ranchi
              </span>
            </h1>
          </div>
          <div className="bg-white backdrop:filter backdrop-blur-lg shadow-xl bg-opacity-70 rounded-[40px] px-10 py-2 hover:cursor-pointer">
            <a href={PlacementBrochure} target="_blank" rel="noopener noreferrer">
              <h1 className="text-primary font-extrabold md:text-3xl text-xl">
                Download Brochure
              </h1>
            </a>
          </div>
          <div className="text-white text-2xl hover:cursor-pointer">
            <a href="#About" onClick={handleArrowClick}>
              <MdKeyboardDoubleArrowDown />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
