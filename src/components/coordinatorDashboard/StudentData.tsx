import { useState, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";

const StudentData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Sample student data (15 students)
  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      branch: "Computer Science and Engineering",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+91 9876543211",
      branch: "Electronics and Communication Engineering",
    },
    {
      id: 3,
      name: "Raj Kumar",
      email: "raj.kumar@example.com",
      phone: "+91 9876543212",
      branch: "Computer Science and Engineering",
    },
    {
      id: 4,
      name: "Priya Singh",
      email: "priya.singh@example.com",
      phone: "+91 9876543213",
      branch: "Mechanical Engineering",
    },
    {
      id: 5,
      name: "Aditya Sharma",
      email: "aditya.sharma@example.com",
      phone: "+91 9876543214",
      branch: "Electrical Engineering",
    },
    {
      id: 6,
      name: "Neha Patel",
      email: "neha.patel@example.com",
      phone: "+91 9876543215",
      branch: "Computer Science and Engineering",
    },
    {
      id: 7,
      name: "Arjun Reddy",
      email: "arjun.reddy@example.com",
      phone: "+91 9876543216",
      branch: "Electronics and Communication Engineering",
    },
    {
      id: 8,
      name: "Sanya Malhotra",
      email: "sanya.malhotra@example.com",
      phone: "+91 9876543217",
      branch: "Computer Science and Engineering",
    },
    {
      id: 9,
      name: "Rahul Verma",
      email: "rahul.verma@example.com",
      phone: "+91 9876543218",
      branch: "Information Technology",
    },
    {
      id: 10,
      name: "Ananya Desai",
      email: "ananya.desai@example.com",
      phone: "+91 9876543219",
      branch: "Computer Science and Engineering",
    },
    {
      id: 11,
      name: "Vikram Khanna",
      email: "vikram.khanna@example.com",
      phone: "+91 9876543220",
      branch: "Mechanical Engineering",
    },
    {
      id: 12,
      name: "Shreya Gupta",
      email: "shreya.gupta@example.com",
      phone: "+91 9876543221",
      branch: "Electronics and Communication Engineering",
    },
    {
      id: 13,
      name: "Karan Sharma",
      email: "karan.sharma@example.com",
      phone: "+91 9876543222",
      branch: "Computer Science and Engineering",
    },
    {
      id: 14,
      name: "Nisha Patel",
      email: "nisha.patel@example.com",
      phone: "+91 9876543223",
      branch: "Information Technology",
    },
    {
      id: 15,
      name: "Rohan Mehta",
      email: "rohan.mehta@example.com",
      phone: "+91 9876543224",
      branch: "Electrical Engineering",
    },
  ];

  // Get unique branches for filter options
  const branches = useMemo(() => {
    const uniqueBranches = [
      ...new Set(students.map((student) => student.branch)),
    ];
    return uniqueBranches.sort();
  }, [students]);

  // Filter students based on search query and branch filter
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        searchQuery === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = filterBy === "" || student.branch === filterBy;

      return matchesSearch && matchesFilter;
    });
  }, [students, searchQuery, filterBy]);

  const handleViewProfile = (studentId: number) => {
    // Navigate to student profile page (to be implemented)
    console.log(`View profile for student ID: ${studentId}`);
  };

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

      {/* Student Cards Grid - Fixed 3 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
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
