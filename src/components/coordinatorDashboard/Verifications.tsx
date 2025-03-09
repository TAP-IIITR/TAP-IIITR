import { useState, useMemo } from "react";
import { SearchIcon, X } from "lucide-react";
import { FaBuilding } from "react-icons/fa";
import { MdPendingActions} from "react-icons/md";

const Verifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false);

  // Sample verification data
  const verifications = [
    {
      id: 1,
      type: "recruiter",
      companyName: "TechCorp",
      position: "Software Engineer",
      location: "Ranchi, JH",
      logo: "TC",
      color: "#1D4ED8",
      date: "2023-06-15",
      contactName: "John Anderson",
      email: "john.anderson@techcorp.com",
      phone: "+91 9876543210",
      website: "www.techcorp.com",
    },
    {
      id: 2,
      type: "job",
      companyName: "WebSolutions",
      position: "Frontend Developer",
      location: "Bangalore, KA",
      logo: "WS",
      color: "#9333EA",
      date: "2023-06-16",
      salary: "₹12-15 LPA",
      description:
        "We are looking for a skilled frontend developer with experience in React and modern JavaScript frameworks.",
    },
    {
      id: 3,
      type: "recruiter",
      companyName: "InnovateTech",
      position: "Data Analyst",
      location: "Mumbai, MH",
      logo: "IT",
      color: "#16A34A",
      date: "2023-06-17",
      contactName: "Rahul Verma",
      email: "rahul.verma@innovatetech.com",
      phone: "+91 9876543212",
      website: "www.innovatetech.com",
    },
    {
      id: 4,
      type: "job",
      companyName: "DataMinds",
      position: "Machine Learning Engineer",
      location: "Hyderabad, TS",
      logo: "DM",
      color: "#EA580C",
      date: "2023-06-18",
      salary: "₹18-22 LPA",
      description:
        "Join our AI team to work on cutting-edge machine learning projects for enterprise clients.",
    },
    {
      id: 5,
      type: "recruiter",
      companyName: "CloudTech",
      position: "Cloud Architect",
      location: "Delhi, DL",
      logo: "CT",
      color: "#0284C7",
      date: "2023-06-19",
      contactName: "Aditya Kumar",
      email: "aditya.kumar@cloudtech.com",
      phone: "+91 9876543214",
      website: "www.cloudtech.com",
    },
    {
      id: 6,
      type: "job",
      companyName: "ProductX",
      position: "Product Manager",
      location: "Pune, MH",
      logo: "PX",
      color: "#DC2626",
      date: "2023-06-20",
      salary: "₹20-25 LPA",
      description:
        "Looking for an experienced product manager to lead our fintech product suite development.",
    },
    {
      id: 7,
      type: "recruiter",
      companyName: "QualityTech",
      position: "QA Engineer",
      location: "Chennai, TN",
      logo: "QT",
      color: "#7C3AED",
      date: "2023-06-21",
      contactName: "Arjun Singh",
      email: "arjun.singh@qualitytech.com",
      phone: "+91 9876543216",
      website: "www.qualitytech.com",
    },
    {
      id: 8,
      type: "job",
      companyName: "DesignHub",
      position: "UI/UX Designer",
      location: "Kolkata, WB",
      logo: "DH",
      color: "#DB2777",
      date: "2023-06-22",
      salary: "₹10-14 LPA",
      description:
        "We are hiring a creative UI/UX designer with a portfolio of mobile and web applications.",
    },
    {
      id: 9,
      type: "recruiter",
      companyName: "ServerLogic",
      position: "Backend Developer",
      location: "Ahmedabad, GJ",
      logo: "SL",
      color: "#0369A1",
      date: "2023-06-23",
      contactName: "Rohit Joshi",
      email: "rohit.joshi@serverlogic.com",
      phone: "+91 9876543218",
      website: "www.serverlogic.com",
    },
  ];

  // Get unique types for filter options
  const types = useMemo(() => {
    const uniqueTypes = [...new Set(verifications.map((item) => item.type))];
    return uniqueTypes.sort();
  }, [verifications]);

  // Filter verifications based on search query and type filter
  const filteredVerifications = useMemo(() => {
    return verifications.filter((verification) => {
      const matchesSearch =
        searchQuery === "" ||
        verification.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        verification.position.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = filterBy === "" || verification.type === filterBy;

      return matchesSearch && matchesFilter;
    });
  }, [verifications, searchQuery, filterBy]);

  const handleViewDetails = (verification: any) => {
    setSelectedEntity(verification);
    setIsVerificationDialogOpen(true);
  };

  const handleApprove = () => {
    console.log(`Approved ${selectedEntity.type} ID: ${selectedEntity.id}`);
    setIsVerificationDialogOpen(false);
    setSelectedEntity(null);
  };

  const handleReject = () => {
    console.log(`Rejected ${selectedEntity.type} ID: ${selectedEntity.id}`);
    setIsVerificationDialogOpen(false);
    setSelectedEntity(null);
  };

  const closeDialog = () => {
    setIsVerificationDialogOpen(false);
    setSelectedEntity(null);
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
          <option value="">All Items</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}s
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
                    onClick={() => handleViewDetails(verification)}
                    className="px-[16px] py-[10px] rounded-[10px] bg-white border-[1.5px] border-[#161A80] flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] transition-colors w-full md:w-auto"
                  >
                    <p className="font-[500] text-[14px] text-[#161A80]">
                      View{" "}
                      {verification.type === "recruiter" ? "Recruiter" : "Job"}{" "}
                      Details
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEntity(verification);
                      handleApprove();
                    }}
                    className="px-[16px] py-[10px] rounded-[10px] bg-[#16A34A] flex items-center justify-center cursor-pointer hover:bg-[#138832] transition-colors w-full md:w-auto"
                  >
                    <p className="font-[500] text-[14px] text-white">Approve</p>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEntity(verification);
                      handleReject();
                    }}
                    className="px-[16px] py-[10px] rounded-[10px] bg-[#DC2626] flex items-center justify-center cursor-pointer hover:bg-[#B91C1C] transition-colors w-full md:w-auto"
                  >
                    <p className="font-[500] text-[14px] text-white">Reject</p>
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

      {/* Verification Dialog */}
      {isVerificationDialogOpen && selectedEntity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-[12px] w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-[24px] border-b border-[#E0E0E0]">
              <h2 className="text-[22px] font-[600] text-[#161A80]">
                {selectedEntity.type === "recruiter"
                  ? "Verify Recruiter"
                  : "Verify Job Posting"}
              </h2>
              <button
                onClick={closeDialog}
                className="h-[32px] w-[32px] rounded-full flex items-center justify-center hover:bg-[#F5F5F5]"
              >
                <X className="h-[20px] w-[20px] text-[#666666]" />
              </button>
            </div>

            <div className="p-[24px]">
              <div className="flex items-center gap-4 mb-[24px]">
                <div
                  className="h-[64px] w-[64px] rounded-full flex items-center justify-center text-white font-bold text-2xl"
                  style={{ backgroundColor: selectedEntity.color }}
                >
                  {selectedEntity.logo}
                </div>

                <div>
                  <p className="text-[24px] font-[600] text-[#161A80]">
                    {selectedEntity.companyName}
                  </p>
                  <p className="text-[16px] font-[500] text-[#212121]">
                    {selectedEntity.position}
                  </p>
                  <p className="text-[14px] font-[400] text-[#666666] mt-[4px]">
                    {selectedEntity.location} • Submitted on{" "}
                    {new Date(selectedEntity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Recruiter-specific details */}
              {selectedEntity.type === "recruiter" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[24px]">
                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Contact Person
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.contactName}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Email Address
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.email}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Phone Number
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.phone}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Website
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.website}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F5F5F5] p-[16px] rounded-[8px] mb-[24px]">
                    <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                      Company Description
                    </p>
                    <p className="text-[16px] font-[400] text-[#3D3D3D]">
                      {selectedEntity.companyName} is a technology company that
                      specializes in providing innovative solutions for
                      businesses. Their products help companies streamline
                      operations and improve efficiency.
                    </p>
                  </div>
                </div>
              )}

              {/* Job-specific details */}
              {selectedEntity.type === "job" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[24px]">
                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Position
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.position}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Company
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.companyName}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Location
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.location}
                      </p>
                    </div>

                    <div className="bg-[#F5F5F5] p-[16px] rounded-[8px]">
                      <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                        Salary
                      </p>
                      <p className="text-[16px] font-[400] text-[#3D3D3D]">
                        {selectedEntity.salary}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F5F5F5] p-[16px] rounded-[8px] mb-[24px]">
                    <p className="text-[16px] font-[500] text-[#212121] mb-[8px]">
                      Job Description
                    </p>
                    <p className="text-[16px] font-[400] text-[#3D3D3D]">
                      {selectedEntity.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-[16px] justify-end">
                <button
                  onClick={handleReject}
                  className="h-[44px] px-[24px] rounded-[10px] bg-[#FFFFFF] border-[1.5px] border-[#DC2626] flex items-center justify-center cursor-pointer hover:bg-[#FEF2F2] transition-colors"
                >
                  <p className="font-[600] text-[16px] text-[#DC2626]">
                    Reject{" "}
                    {selectedEntity.type === "recruiter" ? "Recruiter" : "Job"}
                  </p>
                </button>
                <button
                  onClick={handleApprove}
                  className="h-[44px] px-[24px] rounded-[10px] bg-[#16A34A] border-[1.5px] border-[#16A34A] flex items-center justify-center cursor-pointer hover:bg-[#15803D] transition-colors"
                >
                  <p className="font-[600] text-[16px] text-[#FFFFFF]">
                    Approve{" "}
                    {selectedEntity.type === "recruiter" ? "Recruiter" : "Job"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verifications;
