import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      type: "Full-Time",
      salary: "₹ 15,00,000/annum",
      postedTime: "3 days ago",
      status: "pending",
      applicants: 23,
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      type: "Full-Time",
      salary: "₹ 15,00,000/annum",
      postedTime: "3 days ago",
      status: "pending",
      applicants: 23,
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      type: "Full-Time",
      salary: "₹ 15,00,000/annum",
      postedTime: "3 days ago",
      status: "verified",
      applicants: 23,
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      type: "Full-Time",
      salary: "₹ 15,00,000/annum",
      postedTime: "3 days ago",
      status: "pending",
      applicants: 23,
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      type: "Full-Time",
      salary: "₹ 15,00,000/annum",
      postedTime: "3 days ago",
      status: "pending",
      applicants: 23,
    },
    {
      id: 6,
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      type: "Full-Time",
      salary: "₹ 15,00,000/annum",
      postedTime: "3 days ago",
      status: "pending",
      applicants: 23,
    },
  ];

  const navigate = useNavigate();

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
          <option value="">Sort By Role</option>
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
                    {/* ... SVG path ... */}
                  </svg>
                  <span className="text-sm md:text-base">{job.company}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                {job.status === "pending" ? (
                  <button className="bg-[#14137D] text-white px-4 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-xs">
                    Verify Offer
                  </button>
                ) : (
                  <button className="border border-[#14137D] text-[#14137D] px-4 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-xs">
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
                  {/* ... SVG path ... */}
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
                  {/* ... SVG path ... */}
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
                  {/* ... SVG path ... */}
                </svg>
                {job.postedTime}
              </div>
              {job.applicants && (
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
