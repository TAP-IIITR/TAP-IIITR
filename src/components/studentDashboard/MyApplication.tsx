import { toast } from "react-toastify";
import ApplicationCompanyCard from "../application-company-card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyApplication = () => {
  const [jobData, setJobData] = useState<any>(null);
  const [filteredJobData, setFilteredJobData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(
        `https://tap-backend-production-51ea.up.railway.app/api/jobs/student/mm`,
        {
          withCredentials: true,
        }
      );

      if (data.statusCode === 200) {
        setJobData(data.applications);
        setFilteredJobData(data.applications);
      } else {
        toast.error("Failed to load jobs data");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (axios.isAxiosError(error)) {
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

  // Fetch data only once when component mounts
  useEffect(() => {
    fetchJobData();
  }, []);

  // Filter data whenever searchTerm, jobTypeFilter or jobData changes
  useEffect(() => {
    if (!jobData) return;

    const filtered = jobData.filter((item: any) => {
      // Check if title or company matches search term
      const matchesSearch =
        searchTerm === "" ||
        item.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.job.company.toLowerCase().includes(searchTerm.toLowerCase());

      // Check job type filter
      let matchesJobType = true;
      if (jobTypeFilter !== "") {
        if (jobTypeFilter === "Internship") {
          matchesJobType = item.job.jobType === "Internship";
        } else if (jobTypeFilter === "Full Time") {
          matchesJobType = item.job.jobType === "Full Time";
        } else if (jobTypeFilter === "Intern + Full-Time") {
          matchesJobType = item.job.jobType === "Intern + Full-Time";
        }
      }

      return matchesSearch && matchesJobType;
    });

    setFilteredJobData(filtered);
  }, [searchTerm, jobData, jobTypeFilter]);

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobTypeFilter(e.target.value);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-red-700 font-semibold text-lg mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
    <div className="flex flex-col gap-[20px]">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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
          filteredJobData.map((data: any, index: number) => (
            <ApplicationCompanyCard
              key={data.applicationId || index}
              data={data}
            />
          ))
        ) : (
          <p className="text-center py-4">No matching applications found</p>
        )}
      </div>
    </div>
  );
};

export default MyApplication;
