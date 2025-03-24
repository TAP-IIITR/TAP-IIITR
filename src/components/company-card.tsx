import { Link } from "react-router-dom";
import { MdCorporateFare } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  package: string;
  eligibility: string;
  skills: string[];
  applicationCount: number;
  createdAt: string;
  deadline: string;
  status: string;
  jobType: string;
}

interface CompanyCardProps {
  jobData: Job;
}

const CompanyCard = ({ jobData }: CompanyCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link to={`/dashboard/student/full-company-detail/${jobData.id}`} className="block">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-[12px] p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-[#E0E0E0] rounded-full flex items-center justify-center">
            <MdCorporateFare className="w-5 h-5 text-[#212121]" />
          </div>
          <div>
            <h3 className="text-[18px] font-[600] text-[#212121]">{jobData.title}</h3>
            <p className="text-[14px] text-[#666666]">{jobData.company}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CiLocationOn className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#3D3D3D]">{jobData.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdCurrencyRupee className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#3D3D3D]">{jobData.package}</p>
          </div>
          <p className="text-[12px] text-[#666666]">
            Deadline: {formatDate(jobData.deadline)}
          </p>
          <p className="text-[12px] text-[#666666]">
            Applicants: {jobData.applicationCount}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;