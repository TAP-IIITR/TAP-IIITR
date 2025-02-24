import { CiLocationOn } from "react-icons/ci";
import { FaGlobeAfrica, FaLinkedin } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import {
  MdApartment,
  MdCurrencyRupee,
  MdOutlineAlternateEmail,
  MdOutlineBusinessCenter,
} from "react-icons/md";
import { useParams } from "react-router-dom";

const FullCompanyDetails = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="flex flex-col gap-[22px]">
      <div className="flex gap-[28px]">
        <div
          className="w-[68%] h-fit bg-[#FFF] rounded-[12px] p-[20px] flex flex-col gap-[10px]"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        >
          <p className="font-[500] text-[28px] text-[#212121]">
            Software Development Intern
          </p>
          <div className="flex gap-[18px]">
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
          </div>
          <div className=""></div>
        </div>
        <div className="flex flex-col w-[29%] gap-[18px]">
          <div
            className="w-full bg-[#FFF] rounded-[12px] p-[20px] h-fit flex flex-col gap-[16px]"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <p className="text-[25px] font-[600] text-[#212121]">
              Company Details
            </p>
            <div className="flex gap-[16px] items-center">
              <div className="flex items-center justify-center h-[40px] w-[40px] bg-[#E0E0E0] rounded-full">
                <MdApartment className="h-[24px] w-[24px]" />
              </div>
              <div className="flex flex-col">
                <p className="leading-[24px] text-[16px] text-[#212121] font-[600]">
                  Vassarlabs IT Solutions Pvt Ltd
                </p>
                <p className="leading-[20px] text-[13px] text-[#212121] font-[600]">
                  POC:
                  <span className="leading-[20px] text-[13px] text-[#212121] font-[400]">
                    {" "}
                    Jane Doe
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-[16px] items-center">
              <div className="flex items-center justify-center h-[40px] w-[40px] bg-[#E0E0E0] rounded-full">
                <IoIosCall className="h-[24px] w-[24px]" />
              </div>
              <p className="text-[#161A80] font-[500] text-[18px] leading-[24px] break-all">
                +91 555 1234567
              </p>
            </div>
            <div className="flex gap-[16px] items-center">
              <div className="flex items-center justify-center h-[40px] w-[40px] bg-[#E0E0E0] rounded-full">
                <MdOutlineAlternateEmail className="h-[24px] w-[24px]" />
              </div>
              <p className="text-[#161A80] font-[500] text-[18px] leading-[24px] break-all">
                contact.poc@vassarlabs.in
              </p>
            </div>
            <div className="flex gap-[16px] items-center">
              <div className="flex items-center justify-center h-[40px] w-[40px] bg-[#E0E0E0] rounded-full">
                <FaGlobeAfrica className="h-[24px] w-[24px]" />
              </div>
              <p className="text-[#161A80] font-[500] text-[18px] leading-[24px] break-all">
                www.vassarlabs.it
              </p>
            </div>
            <div className="flex gap-[16px] items-center">
              <div className="flex items-center justify-center h-[40px] w-[40px] bg-[#E0E0E0] rounded-full">
                <FaLinkedin className="h-[24px] w-[24px]" />
              </div>
              <p className="text-[#161A80] font-[500] text-[18px] leading-[24px] break-all">
                https://www.linkedin.co...
              </p>
            </div>
          </div>
          <div
            className="w-full bg-[#FFF] rounded-[12px] p-[20px] h-fit"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <p className="text-[20px] font-[600] text-[#212121]">
              Important Dates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCompanyDetails;
