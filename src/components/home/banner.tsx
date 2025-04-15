import React, { useEffect, useState } from "react";
import backgroundImg from "@/assets/background-img-2.png";
import iiitrw from "@/assets/iiitranchi-white-logo.png";
import Navbar from "@/components/navbar";
import { contactEmail, JNF, PlacementBrochure } from "@/data";
import {
  MdDownload,
  MdKeyboardDoubleArrowDown,
  MdMail,
  MdShare,
} from "react-icons/md";

import { Link } from "react-scroll";

const Banner: React.FC = () => {
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    // Function to prevent scrolling
    const preventScroll = (e: Event) => {
      if (scrollLocked) {
        e.preventDefault();
        window.scrollTo(0, 0);
      }
    };

    // Add event listeners for different scroll events
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", (e) => {
      // Prevent scroll with arrow keys, space, page up/down
      const keys = ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown", " "];
      if (scrollLocked && keys.includes(e.key)) {
        e.preventDefault();
      }
    });

    // Force scroll position to top when locked
    if (scrollLocked) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // Clean up event listeners on unmount
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "auto";
    };
  }, [scrollLocked]);

  const handleArrowClick = () => {
    setScrollLocked(false); // Unlock scroll
  };

  return (
    <div className="relative bg-blue-50 h-screen scroll-mb-[100%]">
      {!scrollLocked && <Navbar />}
      <div className="w-full h-full">
        <img
          src={backgroundImg}
          className="h-full w-full object-cover "
          alt=""
        />

        <div className="absolute top-1/2 w-full flex items-center flex-col gap-y-2 lg:gap-y-6 left-1/2 -translate-x-1/2  md:-translate-y-[45%] -translate-y-[55%]">
          <div className="p-4 flex items-center flex-col md:flex-row">
            <img
              src={iiitrw}
              className="lg:max-w-[225px] md:max-w-[10rem] max-w-[8rem] h-auto"
              alt=""
            />
            <div className="lg:flex-col gap-6 flex-row lg:flex text-center">
              <h1 className="text-white font-serif font-bold md:text-2xl lg:text-4xl sm:text-2xl text-xl">
                Indian Institute of Information Technology, Ranchi
              </h1>
              <h4 className="text-center text-white font-serif font-bold lg:text-2xl sm:text-xl text-sm">
                (An Institute of National Importance under MoE, Govt. Of India)
              </h4>
            </div>
          </div>
          <div className="text-white font-serif text-center py-4 px-10">
            <h1 className="font-serif font-bold md:text-4xl sm:text-2xl text-xl uppercase">
              Training & Placement Cell <br />{" "}
              {/* <span className="font-serif font-bold md:text-4xl sm:text-2xl text-xl">
                IIIT Ranchi
              </span> */}
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 text-center">
            <div className="bg-white backdrop:filter backdrop-blur-lg shadow-xl bg-opacity-70 rounded-[40px] px-6 py-1 lg:px-10  lg:py-2 hover:cursor-pointer text-center">
              <a
                href={PlacementBrochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 className="text-primary font-extrabold md:text-2xl lg:text-3xl text-xl flex items-center gap-3">
                  <MdDownload /> Download Brochure
                </h1>
              </a>
            </div>
            <div className="bg-white backdrop:filter backdrop-blur-lg shadow-xl bg-opacity-70 rounded-[40px]  px-6 py-1 lg:px-10  lg:py-2 hover:cursor-pointer text-center">
              <a href={JNF} target="_blank" rel="noopener noreferrer">
                <h1 className="text-primary font-extrabold md:text-2xl lg:text-3xl text-xl flex items-center gap-3">
                  <MdShare /> Participate in Our Drive
                </h1>
              </a>
            </div>
            <div className="bg-white backdrop:filter backdrop-blur-lg shadow-xl bg-opacity-70 rounded-[40px] px-6 py-1 lg:px-10  lg:py-2 hover:cursor-pointer text-center">
              <a href={contactEmail} target="_blank" rel="noopener noreferrer">
                <h1 className="text-primary font-extrabold md:text-2xl lg:text-3xl text-xl flex items-center gap-3">
                  <MdMail />
                  Contact Us
                </h1>
              </a>
            </div>
          </div>
          <Link
            activeClass="active"
            to="About"
            spy={true}
            smooth={true}
            offset={-30}
            duration={500}
            onClick={handleArrowClick}
          >
            <div className="text-white text-2xl hover:cursor-pointer animate-size-grow-shrink md:mt-10">
              <MdKeyboardDoubleArrowDown />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
