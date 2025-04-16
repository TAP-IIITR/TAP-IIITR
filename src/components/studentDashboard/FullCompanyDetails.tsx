import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MdCorporateFare,
  MdCurrencyRupee,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoMdAlarm } from "react-icons/io";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  regEmail: string;
  mobile: string;
  cgpa: number;
  resume: {
    url: string;
    lastUpdated: { seconds: number; nanoseconds: number };
  };
  branch: string;
}

interface Job {
  id: string;
  title: string;
  JD?: string;
  location: string;
  jobType: string;
  package: string;
  eligibility: string;
  skills: string[];
  deadline: string;
  form: string;
  company: string;
  applications: any[];
  createdAt: string;
  student: Student | null;
  hasApplied: boolean;
}

const FullCompanyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetails = async () => {
    if (!id) {
      toast.error("Invalid job ID");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        `https://tap-backend-production-51ea.up.railway.app/api/jobs/student/${id}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setJob(data.data);
      } else {
        toast.error("Failed to load job details");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching job details"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    if (!job) return;
    navigate(`/jobs/${id}/apply`, { state: { job } });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[20px] px-4 md:px-6 py-6 max-w-[1200px] mx-auto">
      {/* Company & Job Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-[12px] p-6 shadow-sm">
        <div className="w-full md:w-auto mb-6 md:mb-0">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-[#E0E0E0] rounded-full flex items-center justify-center">
              <MdCorporateFare className="w-6 h-6 text-[#212121]" />
            </div>
            <p className="text-[20px] font-[600] text-[#161A80]">
              {job.company}
            </p>
          </div>
          <h1 className="text-[24px] md:text-[32px] font-[600] text-[#212121]">
            {job.title}
          </h1>
        </div>
        <button
          onClick={handleApply}
          disabled={job.hasApplied || new Date(job.deadline) < new Date()}
          className={`${
            job.hasApplied || new Date(job.deadline) < new Date()
              ? "bg-gray-500"
              : "bg-[#DC2626] hover:bg-[#B91C1C]"
          } text-white px-6 py-3 rounded-lg font-[600] text-[16px] transition-colors w-full md:w-auto`}
        >
          {job.hasApplied
            ? "Applied"
            : new Date(job.deadline) < new Date()
            ? "Expired"
            : "Apply Now"}
        </button>
      </div>

      {/* Student Details Section (Prefilled and Read-Only) */}
      {job.student && (
        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <h2 className="text-[20px] font-[600] text-[#212121] mb-4">
            Your Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={`${job.student.firstName} ${job.student.lastName}`}
                className="w-full p-2 border rounded-lg bg-gray-200 text-gray-600 opacity-75"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={job.student.regEmail}
                className="w-full p-2 border rounded-lg bg-gray-200 text-gray-600 opacity-75"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={job.student.mobile || "Not provided"}
                className="w-full p-2 border rounded-lg bg-gray-200 text-gray-600 opacity-75"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CGPA
              </label>
              <input
                type="text"
                value={job.student.cgpa || "Not provided"}
                className="w-full p-2 border rounded-lg bg-gray-200 text-gray-600 opacity-75"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                value={job.student.branch || "Not provided"}
                className="w-full p-2 border rounded-lg bg-gray-200 text-gray-600 opacity-75"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume URL
              </label>
              <input
                type="text"
                value={job.student.resume?.url || "Not provided"}
                className="w-full p-2 border rounded-lg bg-gray-200 text-gray-600 opacity-75"
                disabled
              />
            </div>
          </div>
        </div>
      )}

      {/* Job Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CiLocationOn className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#666666]">Location</p>
          </div>
          <p className="text-[16px] font-[500]">{job.location}</p>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MdOutlineWorkOutline className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#666666]">Job Type</p>
          </div>
          <p className="text-[16px] font-[500]">{job.jobType}</p>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MdCurrencyRupee className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#666666]">Package</p>
          </div>
          <p className="text-[16px] font-[500]">{job.package}</p>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm">
        <h2 className="text-[20px] font-[600] text-[#212121] mb-4">
          Job Description
        </h2>
        <div className="prose max-w-none">
          <p className="text-[16px] text-[#3D3D3D] mb-4">
            {job.JD || "No job description provided."}
          </p>
          <div className="mb-4">
            <h3 className="text-[18px] font-[500] text-[#212121] mb-2">
              Eligibility:
            </h3>
            <p className="text-[16px] text-[#3D3D3D]">{job.eligibility}</p>
          </div>
          <div>
            <h3 className="text-[18px] font-[500] text-[#212121] mb-2">
              Required Skills:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-[#3D3D3D]">
              {job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm">
        <h2 className="text-[20px] font-[600] text-[#212121] mb-4">Timeline</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center mr-4">
              <IoMdAlarm className="w-4 h-4 text-[#161A80]" />
            </div>
            <div>
              <p className="text-[14px] text-[#666666]">Application Deadline</p>
              <p className="text-[16px] font-[500]">
                {formatDate(job.deadline)}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center mr-4">
              <IoMdAlarm className="w-4 h-4 text-[#161A80]" />
            </div>
            <div>
              <p className="text-[14px] text-[#666666]">Posted On</p>
              <p className="text-[16px] font-[500]">
                {formatDate(job.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Apply Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
        <button
          onClick={handleApply}
          disabled={job.hasApplied || new Date(job.deadline) < new Date()}
          className={`${
            job.hasApplied || new Date(job.deadline) < new Date()
              ? "bg-gray-500"
              : "bg-[#DC2626] hover:bg-[#B91C1C]"
          } text-white px-6 py-3 rounded-lg font-[600] text-[16px] transition-colors w-full`}
        >
          {job.hasApplied
            ? "Applied"
            : new Date(job.deadline) < new Date()
            ? "Expired"
            : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default FullCompanyDetails;
