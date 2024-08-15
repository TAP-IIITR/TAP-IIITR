import React from "react";
import iiitr from "../assets/footer-iiitr.svg";
import tw from "../assets/twitter.svg";
import ln from "../assets/linkedin.svg";
import insta from "../assets/insta.svg";
const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        <div className="md:flex items-center mb-4 md:mb-0 hidden ">
          <img
            src={iiitr}
            alt="IIIT Ranchi Logo"
            className="h-8 mr-2"
          />
        </div>
        <p className="text-sm flex-1">
          © 2024 Training and Placement Cell — IIIT Ranchi
        </p>
        <div className="md:flex hidden space-x-4">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ln} alt="LinkedIn" className="h-6" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={insta} alt="Instagram" className="h-6" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={tw} alt="Twitter" className="h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
