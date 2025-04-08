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
  const [filteredJobData, setFilteredJobData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/student`,
        {
          withCredentials: true,
        }
      );
      if (data.statusCode === 200) {
        setJobData(data.jobs);
        setFilteredJobData(data.jobs);
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
   
  useEffect(()=>{
    if (!jobData) return; 
    const filtered = jobData.filter((item: any) => {
      // Check if title or company matches search term
      const matchesSearch = searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.company.toLowerCase().includes(searchTerm.toLowerCase());


      let matchesJobType = true;
      if (jobTypeFilter !== "") {
          if (jobTypeFilter === "Internship") {
            matchesJobType = item.jobType === "Internship";
          } else if (jobTypeFilter === "Full Time") {
            matchesJobType = item.jobType === "Full Time";
          } else if (jobTypeFilter === "Intern + Full-Time") {
            matchesJobType = item.jobType === "Intern + Full-Time";
          }
        }
        
        return matchesSearch && matchesJobType;
    });
    setFilteredJobData(filtered);



  },[searchTerm,jobData,jobTypeFilter])



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
      <div className="w-full md:w-2/3 relative">
          <input
            className="w-full rounded-[16px] border border-[#9E9E9E] h-[52px] px-[20px] py-[16px] text-[16px] text-gray-700"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-6 top-4 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <select
          className="w-full md:w-1/3 rounded-[16px] border border-[#9E9E9E] h-[52px] px-[20px] py-[16px] text-[16px] text-[#9E9E9E] font-[500]"
          value={jobTypeFilter}
          onChange={handleJobTypeChange}
        >
          <option value="">All Job Types</option>
          <option value="Internship">Internship</option>
          <option value="Full Time">Full-Time</option>
          <option value="Intern + Full-Time">Intern + Full-Time</option>
        </select>   
      </div>
      <div
        className="flex flex-col bg-[#FFFFFF] rounded-[16px] w-full h-fit p-[24px] gap-4"
        style={{ boxShadow: "1px 1px 6px 0px #00000040" }}
      >
        {filteredJobData && filteredJobData.length > 0 ? (
          filteredJobData.map((job:any) => <CompanyCard key={job.id} jobData={job} />)
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
