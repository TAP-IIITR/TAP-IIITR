import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { Building2, Clock, IndianRupee } from "lucide-react";
import { MdBusinessCenter } from "react-icons/md";

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

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
  deadline: Timestamp|string;
  status: string;
  jobType: string;
}

interface CompanyCardProps {
  jobData: Job;
}

const CompanyCard = ({ jobData }: CompanyCardProps) => {
  const formatDate = (deadline: Timestamp | string) => {
    let date: Date;

    // Check if deadline is a Firestore timestamp object
    if (deadline && typeof deadline === "object" && "seconds" in deadline) {
      // Convert Firestore timestamp to Date
      date = new Date(deadline.seconds * 1000);
    }
    // Check if deadline is an ISO string
    else if (typeof deadline === "string") {
      // Parse ISO string to Date
      date = new Date(deadline);
    }
    // Fallback for unexpected format
    else {
      return "Invalid date";
    }

    // Return formatted date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  return (
    <div className="group relative overflow-hidden bg-white rounded-lg px-6 py-5 shadow-sm border  border-gray-300 hover:shadow-md hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1 ">
      {/* Gradient accent on hover */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">{jobData.title}</h2>
          
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
              <Building2 className="text-indigo-600 text-sm" />
            </div>
            <span className="text-sm text-gray-600 font-medium">{jobData.company}</span>
          </div>
          
          <div className="flex items-center flex-wrap gap-4 mt-1">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
              <IoLocationOutline className="text-gray-500 group-hover:text-indigo-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">{jobData.location}</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
              <MdBusinessCenter className="text-gray-500 group-hover:text-indigo-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">{jobData.jobType}</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
              <IndianRupee className="text-gray-500 size-4 group-hover:text-indigo-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">{jobData.package}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
              <Clock className="text-gray-500 size-4 group-hover:text-indigo-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">{formatDate(jobData.deadline)}</span>
            </div>

          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">

          
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-indigo-50 rounded-full text-xs font-medium text-indigo-600">
              {jobData.applicationCount} Applicants
            </div>
          </div>
          
          <Link 
            to={`/dashboard/student/full-company-detail/${jobData.id}`}
            className="relative overflow-hidden bg-indigo-600 text-white text-sm font-medium py-2 px-5 rounded-md group-hover:bg-indigo-700 transition-all duration-300"
          >
            <span className="relative z-10">Apply Now</span>
            <span className="absolute inset-0 w-full h-full bg-indigo-800 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;