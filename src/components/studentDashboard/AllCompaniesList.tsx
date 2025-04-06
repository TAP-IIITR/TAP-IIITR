import { useEffect, useState } from "react";
import CompanyCard from "../company-card";
import { toast } from "react-toastify";
import axios from "axios";

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
  jobid: any;
}

const AllCompaniesList = () => {
  const [jobData, setJobData] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("");

  const fetchJobData = async () => {
    try {
      const query = jobTypeFilter ? `?query=${jobTypeFilter}` : "";
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/student${query}`,
        {
          withCredentials: true,
        }
      );
      if (data.statusCode === 200) {
        setJobData(data.jobs);
        console.log(" the jobs are ", data.jobs)
      } else {
        toast.error("Failed to load jobs data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching jobs data"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, [jobTypeFilter]);

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobTypeFilter(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[20px] p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-[16px] md:gap-[28px]">
        <input
          className="w-full md:w-2/3 rounded-[16px] border border-[#9E9E9E] h-[52px] px-[20px] py-[16px] text-[16px] text-[#9E9E9E] font-[500]"
          placeholder="Search Jobs..."
        />
        <select
          className="w-full md:w-1/3 rounded-[16px] border border-[#9E9E9E] h-[52px] px-[20px] py-[16px] text-[16px] text-[#9E9E9E] font-[500]"
          value={jobTypeFilter}
          onChange={handleJobTypeChange}
        >
          <option value="">Filter by Job Type</option>
          <option value="intern">Internship</option>
          <option value="fte">Full-Time</option>
          <option value="intern_fte">Intern + Full-Time</option>
        </select>
      </div>
      <div
        className="flex flex-col bg-[#FFFFFF] rounded-[16px] w-full h-fit p-[24px] gap-4"
        style={{ boxShadow: "1px 1px 6px 0px #00000040" }}
      >
        {jobData && jobData.length > 0 ? (
          jobData.map((job) => <CompanyCard key={job?.jobid} jobData={job} />)
        ) : (
          <p className="text-center text-gray-600">
            No jobs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllCompaniesList;
