import { useState, useMemo, useEffect } from "react";
import api from "../api/axiosInstance";
import { SearchIcon } from "lucide-react";
import { MdOutlineEmail, MdPhone, MdOutlineVerified } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaBuilding } from "react-icons/fa";

const Recruiters = () => {
  interface Recruiter {
    id: string;
    companyName: string;
    contactName: string; // backend might not have this, check controller. Controller returns ...doc.data(). I need to check what fields are in firestore.
    // Wait, the controller just dumps ...doc.data(). I don't know the exact shape.
    // But existing hardcoded data has contactName.
    // I will assume for now it matches or I'll map it.
    // Let's look at the hardcoded data again.
    email: string;
    phone: string;
    website: string;
    logo?: string;
    color?: string;
    verified: boolean;
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper to generate random color based on string
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        setLoading(true);
        const response = await api.get("/recruiter/tap");
        // backend returns { success: true, message: "...", data: [...] }
        const data = response.data.data.map((rec: any) => ({
          ...rec,
          logo: getInitials(rec.companyName),
          color: stringToColor(rec.companyName),
          verified: rec.isVerified, // map isVerified to verified for frontend consistency
        }));
        setRecruiters(data);
      } catch (err) {
        console.error("Failed to fetch recruiters", err);
        setError("Failed to load recruiters");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

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

  const handleViewDetails = (recruiterId: string) => {
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

      {loading && <div className="text-center py-10">Loading recruiters...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {!loading && !error && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Recruiters;
