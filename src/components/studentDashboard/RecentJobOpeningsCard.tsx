import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { TbClock } from "react-icons/tb";

const RecentJobOpeningsCard = () => {
  return (
    <div className="flex px-[8px] py-[12px] justify-between items-center">
      <div className="flex flex-col gap-[8.5px]">
        <div className="flex flex-col">
          <p className="text-[20px] font-[600] leading-[30px] text-[#212121]">
            Software Engineer
          </p>
          <p className="text-[16px] font-[500] leading-[24px] text-[#9E9E9E]">
            TechCorp
          </p>
        </div>
        <div className="flex gap-[18px] ">
          <div className="flex gap-[6px] items-center justify-center">
            <CiLocationOn className="text-[#212121] h-[16px] w-[16px]" />
            <p className="text-[#9E9E9E] text-[10px] font-[400]">Ranchi, JH</p>
          </div>
          <div className="flex gap-[6px] items-center justify-center">
            <CiLocationOn className="text-[#212121] h-[16px] w-[16px]" />
            <p className="text-[#9E9E9E] text-[10px] font-[400]">Full-Time</p>
          </div>
          <div className="flex gap-[6px] items-center justify-center">
            <TbClock className="text-[#212121] h-[16px] w-[16px]" />
            <p className="text-[#9E9E9E] text-[10px] font-[400]">3 days ago</p>
          </div>
        </div>
      </div>
      <IoIosArrowForward className="text-[#161A80] h-[24px] w-[24px]" />
    </div>
  );
};

export default RecentJobOpeningsCard;
