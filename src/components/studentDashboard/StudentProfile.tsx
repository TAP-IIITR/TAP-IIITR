import { BiSolidFilePdf } from "react-icons/bi";
import { FaDownload, FaEdit } from "react-icons/fa";

const StudentProfile = () => {
  return (
    <div className="flex flex-col gap-[23px]">
      <div className="flex flex-col">
        <p className="font-[400] text-[28px] text-[#161A80]">
          Welcome,{" "}
          <span className="font-[500] text-[36px] text-[#161A80]">
            Shubh Shubhanjal
          </span>
        </p>
      </div>
      <div
        className="w-full bg-[#FFFFFF] h-fit rounded-[8px] px-[16px] py-[20px]"
        style={{ boxShadow: "0px 2px 4px 0px #00000040" }}
      >
        <p className="font-[600] text-[20px] text-[#212121] pl-[16px]">
          Personal Details
        </p>
        <div className="border border-[#212121] mt-[2px]"></div>
        <div className="flex flex-col gap-[5px] mt-[12px] px-[16px]">
          <p className="font-[500] text-[#212121] text-[16px]">
            Date of Birth:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              01 January, 1971
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            Email Address:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              lorem_ipsum@iiitranchi.ac.in
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            Phone Number:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              +91 555 1234 567
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            LinkedIn Profile:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              linkedin.com/john-doe-20swswwdw
            </span>
          </p>
        </div>
      </div>
      <div
        className="w-full bg-[#FFFFFF] h-fit rounded-[8px] px-[16px] py-[20px]"
        style={{ boxShadow: "0px 2px 4px 0px #00000040" }}
      >
        <p className="font-[600] text-[20px] text-[#212121] pl-[16px]">
          Academic Details
        </p>
        <div className="border border-[#212121] mt-[2px]"></div>
        <div className="flex flex-col gap-[5px] mt-[12px] px-[16px]">
          <p className="font-[500] text-[#212121] text-[16px]">
            Enrollment Number:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              20XXUGXXXX
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            CGPA:
            <span className="font-[400] text-[#212121] text-[16px]"> 9.5</span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            Batch:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              2022-2026
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            Branch:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              Computer Science and Engineering
            </span>
          </p>
        </div>
      </div>
      <div
        className="w-full bg-[#FFFFFF] h-fit rounded-[8px] px-[16px] py-[20px]"
        style={{ boxShadow: "0px 2px 4px 0px #00000040" }}
      >
        <p className="font-[600] text-[20px] text-[#212121] pl-[16px]">
          Student’s Resume
        </p>
        <div className="border border-[#212121] mt-[2px]"></div>
        <div
          className="flex gap-[20px] items-center justify-center mt-[12px] px-[32px] py-[16px] bg-[#1E40AF21] w-fit rounded-[12px]"
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          <BiSolidFilePdf className="w-[32px] h-[32px] text-[#282FE6]" />
          <div className="flex flex-col">
            <p className="font-[500] text-[#000] leading-[24px] text-[16px]">
              Resume_John_Doe.pdf
            </p>
            <p className="font-[400] text-[#000] leading-[20px] text-[13px]">
              Uploaded on 16 May, 2024
            </p>
          </div>
          <div className="flex gap-[20px]">
            <FaDownload className="w-[20px] h-[20px] text-[#000] cursor-pointer" />
            <FaEdit className="w-[20px] h-[20px] text-[#000] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
