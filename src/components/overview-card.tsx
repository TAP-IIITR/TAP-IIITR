import React from "react";
import { Button } from "./ui/button";

interface OverviewCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  designation?: { name: string; designation: string; loc: string };
  buttonText: string;
  socialLinks?: { icon: string; url: string }[];
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  image,
  title,
  subtitle,
  description,
  designation,
  buttonText,
  socialLinks,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[80%] mx-auto my-10">
      <div className="flex flex-col-reverse md:flex-row md:p-4">
        <div className="md:w-3/4 p-6">
          <h2 className="text-4xl font-bold text-[#0928A0] mb-4">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">
            <span className="text-[#0928A0] italic">{subtitle} </span>
            {description}
          </p>
          {(designation || buttonText) && (
            <div className="mb-4  rounded-md">
              {buttonText && (
                <a
                  href={
                    buttonText.indexOf("@") == -1
                      ? buttonText
                      : `mailto:${buttonText}`
                  }
                  target="_blank"
                >
                  <Button className="text-sm text-white">
                    {buttonText.split(":")}
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
        <div className="md:w-1/4 flex-col mr-5 mb-4 ">
          <img
            src={image}
            alt={title}
            className="ml-[0.5rem] md:ml-0 mt-10 w-[20rem] h-[14rem] object-contain"
          />
          {designation && (
            <div className="text-right mt-10 mr-10 font-bold text-md">
              <p className="">{designation.name}</p>
              <p className="">{designation.designation}</p>
              <p className="">{designation.loc}</p>
            </div>
          )}
          {socialLinks && (
            <div className="flex space-x-2 gap-4 justify-end">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={link.icon} alt="Social Icon" className="w-8 h-8 scale-125 " />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
