import React from "react";

interface WhyRecuritCardProps {
  image: string;
  title: string;
  description: string;
}

const WhyRecuritCard: React.FC<WhyRecuritCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col justify-center gap-5 items-center p-5 bg-white  w-[20rem] text-center rounded-md">
      <img src={image} alt="" />
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="flex-1 ">{description}</p>
    </div>
  );
};

export default WhyRecuritCard;
