import { useState, useMemo, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // Import your Axios instance

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
}

const StudentData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params: { branch?: string; batch?: number } = {};
        if (filterBy) {
          params.branch = filterBy;
        }
        // Note: We're not using the batch filter in the UI yet, but you can add it later if needed

        const response = await api.get("/student/tap", { params });
        const studentsData = response.data.data.map((student: any) => ({
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.regEmail || "N/A",
          phone: student.phone || "N/A",
          branch: student.branch || "N/A",
        }));
        setStudents(studentsData);
      } catch (err: any) {
        console.error("Error fetching students:", err);
        if (err.response?.status === 401) {
          setError("You are not authorized. Please log in again.");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later or contact support.");
        } else if (err.message === "Network Error") {
          setError("Unable to connect to the server. Please check your network or server status.");
        } else {
          setError(err.response?.data?.message || "Failed to fetch students");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [filterBy, navigate]); // Re-fetch when filterBy changes

  // Get unique branches for filter options
  const branches = useMemo(() => {
    const uniqueBranches = [...new Set(students.map((student) => student.branch))];
    return uniqueBranches.sort();
  }, [students]);

  // Filter students based on search query (client-side filtering for name, email, etc.)
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        searchQuery === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [students, searchQuery]);

  const handleViewProfile = (studentId: string) => {
    navigate(`/dashboard/coordinator/student/${studentId}`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-[26px] p-[24px]">
      {/* Header section */}
      <div className="flex flex-col">
        <p className="text-[42px] font-[600] leading-[50px] text-[#161A80]">
          Registered Students
        </p>
        <p className="text-[13px] font-[500] leading-[20px] text-[#212121]">
          View and manage all registered student profiles in one place—track
          progress, verify details, and monitor academic performance.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-[16px] w-full">
        {/* Search Bar */}
        <div className="relative flex items-center px-[16px] py-[12px] border-[1.5px] border-[#E0E0E0] bg-white rounded-[10px] flex-grow">
          <SearchIcon size={18} className="text-[#9E9E9E] mr-[8px]" />
          <input
            type="text"
            placeholder="Search students by name, email, or branch..."
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
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-[14px] font-[500] text-[#666666]">
        Showing {filteredStudents.length}{" "}
        {filteredStudents.length === 1 ? "student" : "students"}
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="w-full bg-[#FFFFFF] rounded-[12px] p-[24px] hover:shadow-lg transition-shadow"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <p className="text-[22px] font-[600] leading-[30px] text-[#161A80] mb-[16px]">
              {student.name}
            </p>

            <div className="flex flex-col gap-[12px] mb-[20px]">
              {/* Contact information */}
              <div className="flex gap-[10px] items-center">
                <div className="bg-[#E0E0E0] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <MdOutlineEmail className="text-[#161A80] h-[18px] w-[18px]" />
                </div>
                <p className="text-[14px] font-[400] leading-[20px] text-[#3D3D3D]">
                  {student.email}
                </p>
              </div>

              <div className="flex gap-[10px] items-center">
                <div className="bg-[#E0E0E0] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <MdPhone className="text-[#161A80] h-[18px] w-[18px]" />
                </div>
                <p className="text-[14px] font-[400] leading-[20px] text-[#3D3D3D]">
                  {student.phone}
                </p>
              </div>

              <div className="flex gap-[10px] items-center">
                <div className="bg-[#E0E0E0] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                </div>
                <p className="text-[14px] font-[400] leading-[20px] text-[#3D3D3D]">
                  {student.branch}
                </p>
              </div>
            </div>

            <div className="border-t border-[#E0E0E0] pt-[16px]">
              <button
                onClick={() => handleViewProfile(student.id)}
                className="w-full h-[44px] rounded-[10px] bg-[#FFFFFF] border-[1.5px] border-[#161A80] flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] transition-colors"
              >
                <p className="font-[600] text-[16px] text-[#161A80]">
                  View Profile
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-[40px] text-[#666666]">
          No students match your search criteria
        </div>
      )}
    </div>
  );
};

export default StudentData;