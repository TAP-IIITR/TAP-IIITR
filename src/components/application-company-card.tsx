import { AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline, IoMdAlarm } from "react-icons/io";
import {
  MdCorporateFare,
  MdCurrencyRupee,
  MdOutlineBusinessCenter,
} from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

interface ApplicationCompanyCardProps {
  applicationStatus: string;
}

const ApplicationCompanyCard = ({
  applicationStatus,
}: ApplicationCompanyCardProps) => {
  return (
    <div className="h-auto min-h-[127px] w-full border-[0.75px] border-[#E0E0E0] rounded-[12px] flex flex-col md:flex-row items-start md:items-center justify-between px-[20px] py-[15px] md:py-0">
      <div className="flex flex-col">
        <p className="text-[#212121] font-[600] text-[20px] md:text-[25px] leading-[30px] md:leading-[38px]">
          Software Engineer
        </p>
        <div className="flex gap-[10px]">
          <MdCorporateFare className="h-[28px] w-[28px] text-[#212121]" />
          <p className="text-[#3D3D3D] text-[18px] md:text-[20px] font-[500] leading-[30px]">
            TechCorp
          </p>
        </div>
        <div className="flex flex-wrap gap-[10px] md:gap-[18px] mt-[8px]">
          <div className="flex items-center justify-center gap-[6px]">
            <CiLocationOn className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              Ranchi, JH
            </p>
          </div>
          <div className="flex items-center justify-center gap-[6px]">
            <MdOutlineBusinessCenter className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              Full-Time
            </p>
          </div>
          <div className="flex items-center justify-center gap-[6px]">
            <MdCurrencyRupee className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              120,000/annum
            </p>
          </div>
          <div className="flex items-center justify-center gap-[6px]">
            <IoMdAlarm className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              25/01/2025
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 md:mt-0 self-end md:self-auto">
        {applicationStatus == "Selected" ? (
          <div className="bg-[#D6FFD6] rounded-[12px] h-[40px] w-[122px] flex items-center justify-center gap-[4px]">
            <IoIosCheckmarkCircleOutline className="h-[18px] w-[18px] text-[#16A34A]" />
            <p className="text-[#16A34A] font-[500] text-[13px]">Selected</p>
          </div>
        ) : applicationStatus == "Rejected" ? (
          <div className="bg-[#F5CDCD] rounded-[12px] h-[40px] w-[122px] flex items-center justify-center gap-[4px]">
            <RxCrossCircled className="h-[18px] w-[18px] text-[#DC2626]" />
            <p className="text-[#DC2626] font-[500] text-[13px]">Rejected</p>
          </div>
        ) : (
          <div className="bg-[#FFF1C3] rounded-[12px] h-[40px] w-[122px] flex items-center justify-center gap-[4px]">
            <AiOutlineClockCircle className="h-[18px] w-[18px] text-[#FFC715]" />
            <p className="text-[#FFC715] font-[500] text-[13px]">Pending</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationCompanyCard;
