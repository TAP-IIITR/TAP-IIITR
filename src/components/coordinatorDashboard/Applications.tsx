import { useState, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineWatchLater } from "react-icons/md";

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Sample applications data (15 applications)
  const applications = [
    {
      id: 1,
      name: "John Doe",
      jobTitle: "Software Engineer",
      company: "TechCorp",
      status: "Selected",
    },
    {
      id: 2,
      name: "Jane Smith",
      jobTitle: "Frontend Developer",
      company: "WebSolutions",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Raj Kumar",
      jobTitle: "Full Stack Developer",
      company: "InnovateTech",
      status: "Pending",
    },
    {
      id: 4,
      name: "Priya Singh",
      jobTitle: "Data Scientist",
      company: "DataMinds",
      status: "Selected",
    },
    {
      id: 5,
      name: "Aditya Sharma",
      jobTitle: "DevOps Engineer",
      company: "CloudTech",
      status: "Pending",
    },
    {
      id: 6,
      name: "Neha Patel",
      jobTitle: "Product Manager",
      company: "ProductX",
      status: "Selected",
    },
    {
      id: 7,
      name: "Arjun Reddy",
      jobTitle: "QA Engineer",
      company: "QualityTech",
      status: "Rejected",
    },
    {
      id: 8,
      name: "Sanya Malhotra",
      jobTitle: "UX Designer",
      company: "DesignHub",
      status: "Pending",
    },
    {
      id: 9,
      name: "Rahul Verma",
      jobTitle: "Backend Developer",
      company: "ServerLogic",
      status: "Selected",
    },
    {
      id: 10,
      name: "Ananya Desai",
      jobTitle: "ML Engineer",
      company: "AILabs",
      status: "Rejected",
    },
    {
      id: 11,
      name: "Vikram Khanna",
      jobTitle: "Systems Architect",
      company: "ArchSystems",
      status: "Pending",
    },
    {
      id: 12,
      name: "Shreya Gupta",
      jobTitle: "Mobile Developer",
      company: "AppWorks",
      status: "Selected",
    },
    {
      id: 13,
      name: "Karan Sharma",
      jobTitle: "Software Engineer",
      company: "TechCorp",
      status: "Pending",
    },
    {
      id: 14,
      name: "Nisha Patel",
      jobTitle: "Cloud Engineer",
      company: "CloudNine",
      status: "Rejected",
    },
    {
      id: 15,
      name: "Rohan Mehta",
      jobTitle: "Database Administrator",
      company: "DataCore",
      status: "Selected",
    },
  ];

  // Get unique statuses for filter options
  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(applications.map((app) => app.status))];
    return uniqueStatuses.sort();
  }, [applications]);

  // Filter applications based on search query and status filter
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        searchQuery === "" ||
        application.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = filterBy === "" || application.status === filterBy;

      return matchesSearch && matchesFilter;
    });
  }, [applications, searchQuery, filterBy]);

  const handleViewApplication = (applicationId: number) => {
    console.log(`View application details for ID: ${applicationId}`);
  };

  const handleViewJobDetails = (applicationId: number) => {
    console.log(`View job details for application ID: ${applicationId}`);
  };

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
            placeholder="Search by student name, job title, or company..."
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
                  {application.name}
                </p>
                <p className="text-[18px] font-[500] leading-[26px] text-[#3D3D3D] mt-[8px]">
                  {application.jobTitle}
                </p>
                <p className="text-[16px] font-[400] leading-[22px] text-[#666666] mt-[6px]">
                  {application.company}
                </p>
              </div>

              {/* RIGHT SIDE: Status and buttons */}
              <div className="flex flex-col items-start md:items-end mt-[16px] md:mt-0">
                {/* Status Indicator */}
                <div className="mb-[16px]">
                  {application.status === "Selected" ? (
                    <div className="bg-[#D6FFD6] rounded-[12px] h-[40px] w-[122px] flex items-center justify-center gap-[4px]">
                      <IoIosCheckmarkCircleOutline className="h-[18px] w-[18px] text-[#16A34A]" />
                      <p className="text-[#16A34A] font-[500] text-[13px]">
                        Selected
                      </p>
                    </div>
                  ) : application.status === "Rejected" ? (
                    <div className="bg-[#F5CDCD] rounded-[12px] h-[40px] w-[122px] flex items-center justify-center gap-[4px]">
                      <RxCrossCircled className="h-[18px] w-[18px] text-[#DC2626]" />
                      <p className="text-[#DC2626] font-[500] text-[13px]">
                        Rejected
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#FFF4CD] rounded-[12px] h-[40px] w-[122px] flex items-center justify-center gap-[4px]">
                      <MdOutlineWatchLater className="h-[18px] w-[18px] text-[#D97706]" />
                      <p className="text-[#D97706] font-[500] text-[13px]">
                        Pending
                      </p>
                    </div>
                  )}
                </div>


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
                    onClick={() => handleViewJobDetails(application.id)}
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
