import { useState, useMemo, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Updated interface to match the new data structure
  interface Application {
    id: string;
    jobId: string;
    jobTitle: string;
    company: string;
    createdAt: string;
    student: any;
    form: any;
    job: any;
    // You might want to add a status field if not present in the data
    status?: string;
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/tap/applications`,
        {
          withCredentials: true,
        }
      );
      console.log("data", data);
      if (data.success) {
        // Assuming data.data is the array of applications
        setApplications(data.data);
      } else {
        toast.error(data.message || "Failed to load applications data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching applications data"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Get unique statuses for filter options (if status is available)
  const statuses = useMemo(() => {
    // If status is not directly available, you might derive it from another field
    // For example, using creation date or some other criteria
    const uniqueStatuses = [
      ...new Set(
        applications.map(
          (app) => app.status || new Date(app.createdAt).toLocaleDateString()
        )
      ),
    ];
    return uniqueStatuses.sort();
  }, [applications]);

  // Filter applications based on search query and status filter
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        searchQuery === "" ||
        application.student.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        application.jobTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        application.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.student.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterBy === "" ||
        application.status === filterBy ||
        new Date(application.createdAt).toLocaleDateString() === filterBy;

      return matchesSearch && matchesFilter;
    });
  }, [applications, searchQuery, filterBy]);

  const handleViewApplication = (applicationId: string) => {
    console.log(`View application details for ID: ${applicationId}`);
    // Implement navigation or modal for application details
  };

  const handleViewJobDetails = (jobId: string) => {
    navigate(`/dashboard/coordinator/job-postings/${jobId}`);
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
    <div className="flex flex-col gap-[26px] p-[24px]">
      {/* Header section */}
      <div className="flex flex-col">
        <p className="text-[42px] font-[600] leading-[50px] text-[#161A80]">
          Student Applications
        </p>
        <p className="text-[13px] font-[500] leading-[20px] text-[#212121]">
          View and manage all student applications in one place—track status,
          verify details, and process job applications effectively.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-[16px] w-full">
        {/* Search Bar */}
        <div className="relative flex items-center px-[16px] py-[12px] border-[1.5px] border-[#E0E0E0] bg-white rounded-[10px] flex-grow">
          <SearchIcon size={18} className="text-[#9E9E9E] mr-[8px]" />
          <input
            type="text"
            placeholder="Search by student name, job title, company, or email..."
            className="w-full bg-transparent text-[14px] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <select
          className="px-[16px] py-[12px] text-[14px] rounded-[10px] bg-white border-[1.5px] border-[#E0E0E0] focus:outline-none focus:border-[#14137D] md:w-[240px]"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="">All Applications</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-[14px] font-[500] text-[#666666]">
        Showing {filteredApplications.length}{" "}
        {filteredApplications.length === 1 ? "application" : "applications"}
      </div>

      {/* Applications List */}
      <div className="flex flex-col gap-[16px]">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="w-full bg-[#FFFFFF] rounded-[12px] p-[24px] hover:shadow-lg transition-shadow"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <p className="text-[22px] font-[600] leading-[30px] text-[#161A80]">
                  {application.form?.Name}
                </p>
                <p className="text-[18px] font-[500] leading-[26px] text-[#3D3D3D] mt-[8px]">
                  {application.job?.title}
                </p>
                <p className="text-[16px] font-[400] leading-[22px] text-[#666666] mt-[6px]">
                  {application.job?.company}
                </p>
                {Object.entries(application?.form).map(([key, value]) => (
                  <p
                    key={key}
                    className="text-[14px] font-[400] leading-[20px] text-[#666666] mt-[4px] capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1")}: {String(value) || "N/A"}
                  </p>
                ))}
              </div>

              {/* RIGHT SIDE: Buttons */}
              <div className="flex flex-col items-start md:items-end mt-[16px] md:mt-0">
                <div className="flex flex-col sm:flex-row gap-[12px]">
                  <button
                    onClick={() => handleViewApplication(application.id)}
                    className="h-[44px] px-[16px] rounded-[10px] bg-[#FFFFFF] border-[1.5px] border-[#161A80] flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] transition-colors"
                  >
                    <p className="font-[600] text-[14px] text-[#161A80]">
                      View Application
                    </p>
                  </button>
                  <button
                    onClick={() => handleViewJobDetails(application.jobId)}
                    className="h-[44px] px-[16px] rounded-[10px] bg-[#161A80] border-[1.5px] border-[#161A80] flex items-center justify-center cursor-pointer hover:bg-[#14137D] transition-colors"
                  >
                    <p className="font-[600] text-[14px] text-[#FFFFFF]">
                      View Job Details
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-[40px] text-[#666666]">
          No applications match your search criteria
        </div>
      )}
    </div>
  );
};

export default Applications;
