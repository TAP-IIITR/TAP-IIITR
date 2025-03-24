import { CiLocationOn } from "react-icons/ci";
import { IoMdAlarm } from "react-icons/io";
import {
  MdCorporateFare,
  MdCurrencyRupee,
  MdOutlineBusinessCenter,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  package: string;
  eligibility: string;
  skills: string[];
  applicationCount: number;
  createdAt: { seconds: number; nanoseconds: number } | string;
  deadline: { seconds: number; nanoseconds: number } | string;
  status: string;
  jd: string;
  job_id: string;
  job_type: string;
}

const CompanyCard = ({ jobData }: { jobData: Job }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate(`/dashboard/student/full-company-detail/${jobData.id}`);
  };

  const formatDeadline = () => {
    if (!jobData.deadline) return "N/A";

    let deadlineDate;
    if (typeof jobData.deadline === "object" && "seconds" in jobData.deadline) {
      // Handle Firestore timestamp format
      deadlineDate = new Date(jobData.deadline.seconds * 1000);
    } else if (typeof jobData.deadline === "string") {
      // Handle ISO string format
      deadlineDate = new Date(jobData.deadline);
    } else {
      return "N/A";
    }

    return deadlineDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const deadlineDate = formatDeadline();

  return (
    <div className="h-auto min-h-[127px] w-full border-[0.75px] border-[#E0E0E0] rounded-[12px] flex flex-col md:flex-row items-start md:items-center justify-between px-[20px] py-[15px] md:py-0">
      <div className="flex flex-col">
        <p className="text-[#212121] font-[600] text-[20px] md:text-[25px] leading-[30px] md:leading-[38px]">
          {jobData?.title}
        </p>
        <div className="flex gap-[10px]">
          <MdCorporateFare className="h-[28px] w-[28px] text-[#212121]" />
          <p className="text-[#3D3D3D] text-[18px] md:text-[20px] font-[500] leading-[30px]">
            {jobData?.company}
          </p>
        </div>
        <div className="flex flex-wrap gap-[10px] md:gap-[18px] mt-[8px]">
          <div className="flex items-center justify-center gap-[6px]">
            <CiLocationOn className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              {jobData?.location}
            </p>
          </div>
          <div className="flex items-center justify-center gap-[6px]">
            <MdOutlineBusinessCenter className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              {jobData?.job_type?.toLocaleUpperCase()}
            </p>
          </div>
          <div className="flex items-center justify-center gap-[6px]">
            <MdCurrencyRupee className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              {jobData?.package}
            </p>
          </div>
          <div className="flex items-center justify-center gap-[6px]">
            <IoMdAlarm className="h-[16px] w-[16px] text-[#212121]" />
            <p className="text-[#3D3D3D] font-[400] text-[13px] leading-[20px]">
              {deadlineDate}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] mt-3 md:mt-0 self-end md:self-auto">
        <p className="text-[#3D3D3D] font-[400] text-[13px] text-right">
          {jobData.applicationCount} Applicants
        </p>
        <div
          onClick={handleApplyClick}
          className="w-[113px] h-[39px] bg-[#161A80] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#0F1163] transition-colors"
        >
          <p className="text-[#FFF] font-[500] text-[14px]">Apply Now</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
