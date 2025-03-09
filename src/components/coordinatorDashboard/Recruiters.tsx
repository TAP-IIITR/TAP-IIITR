import { useState, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { MdOutlineEmail, MdPhone, MdOutlineVerified } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaBuilding } from "react-icons/fa";

const Recruiters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Sample recruiter data (15 recruiters) with added logo property
  const recruiters = [
    {
      id: 1,
      companyName: "TechCorp",
      contactName: "John Anderson",
      email: "john.anderson@techcorp.com",
      phone: "+91 9876543210",
      website: "www.techcorp.com",
      logo: "TC",
      color: "#1D4ED8",
      verified: true,
    },
    {
      id: 2,
      companyName: "WebSolutions",
      contactName: "Sarah Miller",
      email: "sarah.miller@websolutions.com",
      phone: "+91 9876543211",
      website: "www.websolutions.com",
      logo: "WS",
      color: "#9333EA",
      verified: true,
    },
    {
      id: 3,
      companyName: "InnovateTech",
      contactName: "Rahul Verma",
      email: "rahul.verma@innovatetech.com",
      phone: "+91 9876543212",
      website: "www.innovatetech.com",
      logo: "IT",
      color: "#16A34A",
      verified: true,
    },
    {
      id: 4,
      companyName: "DataMinds",
      contactName: "Priya Sharma",
      email: "priya.sharma@dataminds.com",
      phone: "+91 9876543213",
      website: "www.dataminds.com",
      logo: "DM",
      color: "#EA580C",
      verified: true,
    },
    {
      id: 5,
      companyName: "CloudTech",
      contactName: "Aditya Kumar",
      email: "aditya.kumar@cloudtech.com",
      phone: "+91 9876543214",
      website: "www.cloudtech.com",
      logo: "CT",
      color: "#0284C7",
      verified: true,
    },
    {
      id: 6,
      companyName: "ProductX",
      contactName: "Neha Gupta",
      email: "neha.gupta@productx.com",
      phone: "+91 9876543215",
      website: "www.productx.com",
      logo: "PX",
      color: "#DC2626",
      verified: true,
    },
    {
      id: 7,
      companyName: "QualityTech",
      contactName: "Arjun Singh",
      email: "arjun.singh@qualitytech.com",
      phone: "+91 9876543216",
      website: "www.qualitytech.com",
      logo: "QT",
      color: "#7C3AED",
      verified: false,
    },
    {
      id: 8,
      companyName: "DesignHub",
      contactName: "Sanya Khanna",
      email: "sanya.khanna@designhub.com",
      phone: "+91 9876543217",
      website: "www.designhub.com",
      logo: "DH",
      color: "#DB2777",
      verified: true,
    },
    {
      id: 9,
      companyName: "ServerLogic",
      contactName: "Rohit Joshi",
      email: "rohit.joshi@serverlogic.com",
      phone: "+91 9876543218",
      website: "www.serverlogic.com",
      logo: "SL",
      color: "#0369A1",
      verified: false,
    },
    {
      id: 10,
      companyName: "AILabs",
      contactName: "Ananya Desai",
      email: "ananya.desai@ailabs.com",
      phone: "+91 9876543219",
      website: "www.ailabs.com",
      logo: "AL",
      color: "#15803D",
      verified: true,
    },
    {
      id: 11,
      companyName: "ArchSystems",
      contactName: "Vikram Mehta",
      email: "vikram.mehta@archsystems.com",
      phone: "+91 9876543220",
      website: "www.archsystems.com",
      logo: "AS",
      color: "#4338CA",
      verified: true,
    },
    {
      id: 12,
      companyName: "AppWorks",
      contactName: "Shreya Patel",
      email: "shreya.patel@appworks.com",
      phone: "+91 9876543221",
      website: "www.appworks.com",
      logo: "AW",
      color: "#EAB308",
      verified: true,
    },
    {
      id: 13,
      companyName: "TechSolutions",
      contactName: "Karan Shah",
      email: "karan.shah@techsolutions.com",
      phone: "+91 9876543222",
      website: "www.techsolutions.com",
      logo: "TS",
      color: "#A855F7",
      verified: false,
    },
    {
      id: 14,
      companyName: "CloudNine",
      contactName: "Nisha Reddy",
      email: "nisha.reddy@cloudnine.com",
      phone: "+91 9876543223",
      website: "www.cloudnine.com",
      logo: "CN",
      color: "#0EA5E9",
      verified: true,
    },
    {
      id: 15,
      companyName: "DataCore",
      contactName: "Rohan Malhotra",
      email: "rohan.malhotra@datacore.com",
      phone: "+91 9876543224",
      website: "www.datacore.com",
      logo: "DC",
      color: "#22C55E",
      verified: true,
    },
  ];

  // Get unique first letters of company names for filter options
  const companyFirstLetters = useMemo(() => {
    const uniqueLetters = [
      ...new Set(
        recruiters.map((recruiter) =>
          recruiter.companyName.charAt(0).toUpperCase()
        )
      ),
    ];
    return uniqueLetters.sort();
  }, [recruiters]);

  // Filter recruiters based on search query and letter filter
  const filteredRecruiters = useMemo(() => {
    return recruiters.filter((recruiter) => {
      const matchesSearch =
        searchQuery === "" ||
        recruiter.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        recruiter.contactName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        recruiter.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterBy === "" ||
        recruiter.companyName.charAt(0).toUpperCase() === filterBy;

      return matchesSearch && matchesFilter;
    });
  }, [recruiters, searchQuery, filterBy]);

  const handleViewDetails = (recruiterId: number) => {
    // Navigate to recruiter details page (to be implemented)
    console.log(`View details for recruiter ID: ${recruiterId}`);
  };

  return (
    <div className="flex flex-col gap-[26px] p-[24px]">
      {/* Header section */}
      <div className="flex flex-col">
        <p className="text-[42px] font-[600] leading-[50px] text-[#161A80]">
          Verified Recruiters
        </p>
        <p className="text-[13px] font-[500] leading-[20px] text-[#212121]">
          View and manage all verified recruiter profiles in one place—track
          company details, verify information, and maintain effective
          communication with hiring partners.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-[16px] w-full">
        {/* Search Bar */}
        <div className="relative flex items-center px-[16px] py-[12px] border-[1.5px] border-[#E0E0E0] bg-white rounded-[10px] flex-grow">
          <SearchIcon size={18} className="text-[#9E9E9E] mr-[8px]" />
          <input
            type="text"
            placeholder="Search recruiters by company name, contact name, or email..."
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
        Showing {filteredRecruiters.length}{" "}
        {filteredRecruiters.length === 1 ? "recruiter" : "recruiters"}
      </div>

      {/* Recruiter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {filteredRecruiters.map((recruiter) => (
          <div
            key={recruiter.id}
            className="w-full bg-[#FFFFFF] rounded-[12px] p-[24px] hover:shadow-lg transition-shadow"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <div className="flex items-center gap-4 mb-[16px]">
              {/* Company Logo */}
              <div
                className="h-[48px] w-[48px] rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: recruiter.color }}
              >
                {recruiter.logo}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[22px] font-[600] leading-[30px] text-[#161A80]">
                    {recruiter.companyName}
                  </p>

                  {recruiter.verified && (
                    <MdOutlineVerified
                      className="text-[#16A34A] h-[20px] w-[20px]"
                      title="Verified Company"
                    />
                  )}
                </div>
                <p className="text-[14px] font-[400] text-[#666666]">
                  Registered since Jun 2023
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[12px] mb-[20px]">
              <div className="flex gap-[10px] items-center">
                <div className="bg-[#E0E0E0] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <FaBuilding className="text-[#161A80] h-[16px] w-[16px]" />
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-[500] leading-[22px] text-[#212121]">
                    {recruiter.contactName}
                  </p>
                  <p className="text-[12px] font-[400] text-[#666666]">
                    Contact Person
                  </p>
                </div>
              </div>

              <div className="flex gap-[10px] items-center">
                <div className="bg-[#E0E0E0] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <MdOutlineEmail className="text-[#161A80] h-[18px] w-[18px]" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p
                    className="text-[14px] font-[400] leading-[20px] text-[#3D3D3D] truncate"
                    title={recruiter.email}
                  >
                    {recruiter.email}
                  </p>
                  <p className="text-[12px] font-[400] text-[#666666]">Email</p>
                </div>
              </div>

              <div className="flex gap-[10px] items-center">
                <div className="bg-[#E0E0E0] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <MdPhone className="text-[#161A80] h-[18px] w-[18px]" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-[400] leading-[20px] text-[#3D3D3D]">
                    {recruiter.phone}
                  </p>
                  <p className="text-[12px] font-[400] text-[#666666]">Phone</p>
                </div>
              </div>

              <div className="flex gap-[10px] items-center">
                <div className="bg-[#E0E0E0] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <TbWorld className="text-[#161A80] h-[18px] w-[18px]" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-[400] leading-[20px] text-[#3D3D3D]">
                    {recruiter.website}
                  </p>
                  <p className="text-[12px] font-[400] text-[#666666]">
                    Website
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E0E0E0] pt-[16px]">
              <button
                onClick={() => handleViewDetails(recruiter.id)}
                className="w-full h-[44px] rounded-[10px] bg-[#FFFFFF] border-[1.5px] border-[#161A80] flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] transition-colors"
              >
                <p className="font-[600] text-[16px] text-[#161A80]">
                  View Details
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRecruiters.length === 0 && (
        <div className="text-center py-[40px] text-[#666666]">
          No recruiters match your search criteria
        </div>
      )}
    </div>
  );
};

export default Recruiters;
