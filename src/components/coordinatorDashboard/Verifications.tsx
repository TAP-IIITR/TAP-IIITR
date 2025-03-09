import { useState, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { FaBuilding } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const Verifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Sample verification data
  const verifications = [
    {
      id: 1,
      companyName: "TechCorp",
      position: "Software Engineer",
      location: "Ranchi, JH",
      logo: "TC",
      color: "#1D4ED8",
      date: "2023-06-15",
    },
    {
      id: 2,
      companyName: "WebSolutions",
      position: "Frontend Developer",
      location: "Bangalore, KA",
      logo: "WS",
      color: "#9333EA",
      date: "2023-06-16",
    },
    {
      id: 3,
      companyName: "InnovateTech",
      position: "Data Analyst",
      location: "Mumbai, MH",
      logo: "IT",
      color: "#16A34A",
      date: "2023-06-17",
    },
    {
      id: 4,
      companyName: "DataMinds",
      position: "Machine Learning Engineer",
      location: "Hyderabad, TS",
      logo: "DM",
      color: "#EA580C",
      date: "2023-06-18",
    },
    {
      id: 5,
      companyName: "CloudTech",
      position: "Cloud Architect",
      location: "Delhi, DL",
      logo: "CT",
      color: "#0284C7",
      date: "2023-06-19",
    },
    {
      id: 6,
      companyName: "ProductX",
      position: "Product Manager",
      location: "Pune, MH",
      logo: "PX",
      color: "#DC2626",
      date: "2023-06-20",
    },
    {
      id: 7,
      companyName: "QualityTech",
      position: "QA Engineer",
      location: "Chennai, TN",
      logo: "QT",
      color: "#7C3AED",
      date: "2023-06-21",
    },
    {
      id: 8,
      companyName: "DesignHub",
      position: "UI/UX Designer",
      location: "Kolkata, WB",
      logo: "DH",
      color: "#DB2777",
      date: "2023-06-22",
    },
    {
      id: 9,
      companyName: "ServerLogic",
      position: "Backend Developer",
      location: "Ahmedabad, GJ",
      logo: "SL",
      color: "#0369A1",
      date: "2023-06-23",
    },
  ];

  // Get unique first letters of company names for filter options
  const companyFirstLetters = useMemo(() => {
    const uniqueLetters = [
      ...new Set(
        verifications.map((verification) =>
          verification.companyName.charAt(0).toUpperCase()
        )
      ),
    ];
    return uniqueLetters.sort();
  }, [verifications]);

  // Filter verifications based on search query and letter filter
  const filteredVerifications = useMemo(() => {
    return verifications.filter((verification) => {
      const matchesSearch =
        searchQuery === "" ||
        verification.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        verification.position.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterBy === "" ||
        verification.companyName.charAt(0).toUpperCase() === filterBy;

      return matchesSearch && matchesFilter;
    });
  }, [verifications, searchQuery, filterBy]);

  const handleViewDetails = (recruiterId: number) => {
    console.log(`View details for recruiter ID: ${recruiterId}`);
  };

  const handleApprove = (id: number) => {
    console.log(`Approved verification ID: ${id}`);
  };

  const handleReject = (id: number) => {
    console.log(`Rejected verification ID: ${id}`);
  };

  return (
    <div className="flex flex-col gap-[26px] p-[24px]">
      {/* Header section */}
      <div className="flex flex-col">
        <p className="text-[42px] font-[600] leading-[50px] text-[#161A80]">
          Pending Verifications
        </p>
        <p className="text-[13px] font-[500] leading-[20px] text-[#212121]">
          Review and manage all pending job verifications—approve legitimate
          offerings, reject suspicious listings, and ensure only quality
          opportunities reach students.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-[16px] w-full">
        {/* Search Bar */}
        <div className="relative flex items-center px-[16px] py-[12px] border-[1.5px] border-[#E0E0E0] bg-white rounded-[10px] flex-grow">
          <SearchIcon size={18} className="text-[#9E9E9E] mr-[8px]" />
          <input
            type="text"
            placeholder="Search by company name or position..."
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
          <option value="">All Companies</option>
          {companyFirstLetters.map((letter) => (
            <option key={letter} value={letter}>
              Companies starting with '{letter}'
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-[14px] font-[500] text-[#666666]">
        Showing {filteredVerifications.length}{" "}
        {filteredVerifications.length === 1 ? "verification" : "verifications"}
      </div>

      {/* Verification Cards */}
      <div className="grid grid-cols-1 gap-[20px]">
        {filteredVerifications.map((verification) => (
          <div
            key={verification.id}
            className="w-full bg-white rounded-[12px] p-[24px] hover:shadow-lg transition-shadow"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-[16px]">
                {/* Company Logo */}
                <div
                  className="h-[48px] w-[48px] rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: verification.color }}
                >
                  {verification.logo}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[18px] font-[600] leading-[24px] text-[#161A80]">
                      {verification.companyName}
                    </p>
                  </div>
                  <p className="text-[16px] font-[500] leading-[24px] text-[#212121] mt-[2px]">
                    {verification.position}
                  </p>
                  <div className="flex items-center gap-[6px] mt-[6px]">
                    <FaBuilding className="text-[#666666] h-[14px] w-[14px]" />
                    <p className="text-[14px] font-[400] leading-[20px] text-[#666666]">
                      {verification.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-[16px] w-full md:w-auto mt-4 md:mt-0">
                <div className="flex items-center gap-[8px] bg-[#FFF9C4] px-[16px] py-[8px] rounded-full">
                  <MdPendingActions className="text-[#FFA000] h-[16px] w-[16px]" />
                  <span className="text-[14px] font-[600] text-[#FFA000]">
                    Pending
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-[12px] w-full md:w-auto">
                  <button
                    onClick={() => handleViewDetails(verification.id)}
                    className="px-[16px] py-[10px] rounded-[10px] bg-white border-[1.5px] border-[#E0E0E0] flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] transition-colors w-full md:w-auto"
                  >
                    <p className="font-[500] text-[14px] text-[#212121]">
                      View Recruiter Details
                    </p>
                  </button>
                  <button
                    onClick={() => handleApprove(verification.id)}
                    className="px-[16px] py-[10px] rounded-[10px] bg-[#E6F4EA] flex items-center justify-center cursor-pointer hover:bg-[#D6EAD7] transition-colors w-full md:w-auto"
                  >
                    <p className="font-[500] text-[14px] text-[#16A34A]">
                      Approve
                    </p>
                  </button>
                  <button
                    onClick={() => handleReject(verification.id)}
                    className="px-[16px] py-[10px] rounded-[10px] bg-[#FEEFEF] flex items-center justify-center cursor-pointer hover:bg-[#FDE0DF] transition-colors w-full md:w-auto"
                  >
                    <p className="font-[500] text-[14px] text-[#DC2626]">
                      Reject
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVerifications.length === 0 && (
        <div className="text-center py-[40px] text-[#666666]">
          No pending verifications match your search criteria
        </div>
      )}
    </div>
  );
};

export default Verifications;
