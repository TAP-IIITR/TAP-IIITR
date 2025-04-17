import { Building2, IndianRupee, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // Import your Axios instance
import { IoLocationOutline } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";

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
  jobType: any;
  applications: any;
  deadline: any;
  package: any;
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

        const params: { search?: string; sortBy?: string; sortOrder?: string } =
          {};
        if (searchQuery) {
          params.search = searchQuery;
        }
        if (sortBy) {
          params.sortBy =
            sortBy === "newest" || sortBy === "oldest"
              ? "postedTime"
              : "salary";
          params.sortOrder =
            sortBy === "newest" ? "desc" : sortBy === "oldest" ? "asc" : "desc";
        }

        const response = await api.get("/jobs/tap", { params });
        setJobs(response.data.data);
        console.log(response.data.data);
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        if (err.response?.status === 401) {
          setError("You are not authorized. Please log in again.");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later or contact support.");
        } else if (err.message === "Network Error") {
          setError(
            "Unable to connect to the server. Please check your network or server status."
          );
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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-red-700 font-semibold text-lg mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar with animation */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon
              size={18}
              className="text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
            />
          </div>
          <input
            type="text"
            placeholder="Search Jobs..."
            className="w-full bg-white pl-12 pr-4 py-3 text-gray-700 border-2 border-gray-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 hover:border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
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

          {/* Animated bottom border */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-[calc(100%-2rem)] transition-all duration-300 rounded-full"></div>
        </div>

        {/* Filter Dropdown with enhanced styling */}
        <div className="relative w-full md:w-48">
          <select
            className="appearance-none w-full pl-4 pr-10 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 cursor-pointer font-medium"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="salary">Salary: High to Low</option>
          </select>

          {/* Custom dropdown arrow with animation */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg
              className="h-4 w-4 transform transition-transform duration-300 group-focus-within:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 bg-indigo-50 filter blur-xl -z-10 transition-opacity duration-300"></div>
        </div>

        {/* Add Job Button with enhanced styling and animations */}
        <div className="relative w-full md:w-48 overflow-hidden group">
          <button
            onClick={() => navigate("/dashboard/coordinator/job-postings/new")}
            className="w-full bg-indigo-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:bg-indigo-800 shadow-sm hover:shadow-md"
          >
            {/* Animated plus icon */}
            <span className="relative flex items-center justify-center w-5 h-5">
              <svg
                className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300"
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
            </span>
            <span>Add New Job</span>
          </button>

          {/* Moving background gradient effect */}
          <div className="absolute -z-10 inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>

          {/* Edge glow effect */}
          <div className="absolute inset-0 -z-20 bg-indigo-400 opacity-0 group-hover:opacity-30 blur-xl group-hover:animate-pulse transition-opacity duration-300"></div>
        </div>
      </div>
      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-base font-medium text-gray-600">
              No jobs found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search filters or check back later.
            </p>
          </div>
        )}

        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer relative overflow-hidden"
          >
            {/* Colored accent line that expands on hover */}
            <div className="absolute top-0 left-0 w-0 h-1 bg-indigo-600 group-hover:w-full transition-all duration-500 ease-out"></div>

            <div className="flex flex-row md:justify-between md:items-start gap-3">
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                    {job.title}
                  </h3>
                  {job.status === "verified" && (
                    <span className="text-xs border-green-500 border font-medium text-green-600 px-2.5 py-0.5 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                    <Building2 className="text-indigo-600 text-sm" size={18} />
                  </div>
                  <span className="text-sm font-medium">{job.company}</span>
                </div>
              </div>

              {/* Action Button with hover animation */}
              <div className="flex justify-end mt-2 md:mt-0">
                {job.status === "pending" ? (
                  <button
                    onClick={() => handleVerifyOffer(job.id)}
                    className="relative overflow-hidden bg-indigo-600 text-white text-sm font-medium py-2 px-5 rounded-md group-hover:bg-indigo-700 transition-all duration-300 flex gap-2 items-center justify-center"
                  >
                    <span>Verify Offer</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleViewOffer(job.id)}
                    className="relative overflow-hidden bg-indigo-600 text-white text-sm font-medium py-2 px-5 rounded-md group-hover:bg-indigo-700 transition-all duration-300 flex gap-2 items-center justify-center"
                  >
                    <span>View Offer</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Job Details with hover animations */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-all duration-300">
                <IoLocationOutline className="text-gray-500 group-hover:text-indigo-500 transition-colors duration-300" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-all duration-300">
                <MdBusinessCenter className="text-gray-500 group-hover:text-indigo-500 transition-colors duration-300" />
                <span>{job.jobType}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-all duration-300">
                <IndianRupee size={12} />
                <span>{job.package}</span>
              </div>

              {true && (
                <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full group-hover:bg-green-100 transition-all duration-300 ml-auto">
                  <svg
                    className="w-3.5 h-3.5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-green-700 font-medium">
                    {job.applications.length} Applicants
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
