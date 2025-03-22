import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // Import your Axios instance

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedTime: string;
  status: string;
  applicants: number;
}

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: { search?: string; sortBy?: string; sortOrder?: string } = {};
        if (searchQuery) {
          params.search = searchQuery;
        }
        if (sortBy) {
          params.sortBy = sortBy === "newest" || sortBy === "oldest" ? "postedTime" : "salary";
          params.sortOrder = sortBy === "newest" ? "desc" : sortBy === "oldest" ? "asc" : "desc";
        }

        const response = await api.get("/jobs/tap", { params });
        setJobs(response.data.data);
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        if (err.response?.status === 401) {
          setError("You are not authorized. Please log in again.");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later or contact support.");
        } else if (err.message === "Network Error") {
          setError("Unable to connect to the server. Please check your network or server status.");
        } else {
          setError(err.response?.data?.message || "Failed to fetch jobs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery, sortBy, navigate]);

  const handleVerifyOffer = async (jobId: string) => {
    try {
      await api.post(`/jobs/tap/${jobId}/verify`);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: "verified" } : job
        )
      );
    } catch (err: any) {
      console.error("Error verifying job:", err);
      setError(err.response?.data?.message || "Failed to verify job");
    }
  };

  const handleViewOffer = (jobId: string) => {
    navigate(`/dashboard/coordinator/job-postings/${jobId}`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-3 md:p-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
        {/* Search Bar */}
        <div className="relative flex items-center px-3 md:px-5 py-2 md:py-3 border-2 border-gray-300 bg-white rounded-xl md:rounded-2xl md:flex-1">
          <SearchIcon size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Jobs..."
            className="w-full bg-transparent text-sm md:text-base focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <select
          className="px-3 md:px-5 py-2 md:py-3 text-sm md:text-base rounded-xl md:rounded-2xl bg-white border-2 border-gray-300 focus:outline-none focus:border-[#14137D] md:w-48"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="salary">Salary</option>
        </select>

        {/* Add Job Button */}
        <button
          onClick={() => navigate("/dashboard/coordinator/job-postings/new")}
          className="bg-[#161A80] text-white px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base hover:bg-[#161A80]/90 md:w-48"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="hidden md:inline">Add New Job</span>
          <span className="md:hidden">Add New Job</span>
        </button>
      </div>

      {/* Job Listings */}
      <div className="space-y-3 md:space-y-4">
        {jobs.length === 0 && (
          <div className="text-center py-10 text-gray-600">
            No jobs found.
          </div>
        )}
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg p-3 md:p-4 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base md:text-lg font-semibold">
                    {job.title}
                  </h3>
                  {job.status === "verified" && (
                    <span className="text-xs border-green-400 border-2 font-semibold text-green-400 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">{job.company}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                {job.status === "pending" ? (
                  <button
                    onClick={() => handleVerifyOffer(job.id)}
                    className="bg-[#14137D] text-white px-4 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-xs"
                  >
                    Verify Offer
                  </button>
                ) : (
                  <button
                    onClick={() => handleViewOffer(job.id)}
                    className="border border-[#14137D] text-[#14137D] px-4 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-xs"
                  >
                    View Offer
                  </button>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {job.type}
              </div>
              <div className="flex items-center gap-1">{job.salary}</div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(job.postedTime).toLocaleDateString()}
              </div>
              {job.applicants > 0 && (
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-green-600">
                    {job.applicants} Applicants
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;