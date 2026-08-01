import { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: { branch?: string } = {};
        if (filterBy) {
          params.branch = filterBy;
        }

        const response = await api.get("/student/tap", { params });
        const studentsData = response.data.data.map((student: any) => ({
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.regEmail || "N/A",
          phone: student.mobile || "N/A",
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
          setError(
            "Unable to connect to the server. Please check your network or server status."
          );
        } else {
          setError(err.response?.data?.message || "Failed to fetch students");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [filterBy, navigate]);

  // Get unique branches for filter options
  const branches = useMemo(() => {
    const uniqueBranches = [
      ...new Set(students.map((student) => student.branch)),
    ];
    return uniqueBranches.sort();
  }, [students]);

  // Filter students based on search query
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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-700"></div>
      </div>
    );
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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section with gradient background */}
        <div className="bg-gradient-to-r from-indigo-800 to-blue-600 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Registered Students
          </h1>
          <p className="text-indigo-100 text-sm md:text-base max-w-3xl">
            View and manage all registered student profiles in one place—track
            progress, verify details, and monitor academic performance.
          </p>

          {/* Search and Filter Controls in header */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-300" />
              </div>
              <input
                type="text"
                placeholder="Search students by name, email, or branch..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300
                         border border-indigo-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50
                         transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                className="flex items-center px-4 py-3 bg-white/10 backdrop-blur-sm text-white
                         border border-indigo-400/30 rounded-lg hover:bg-white/20 transition-all duration-200"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} className="mr-2" />
                <span>{filterBy || "All Branches"}</span>
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 animate-fadeIn">
                  <div className="py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                      onClick={() => {
                        setFilterBy("");
                        setIsFilterOpen(false);
                      }}
                    >
                      All Branches
                    </button>
                    {branches.map((branch) => (
                      <button
                        key={branch}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                        onClick={() => {
                          setFilterBy(branch);
                          setIsFilterOpen(false);
                        }}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-medium text-gray-700">
            Showing{" "}
            <span className="text-indigo-700 font-semibold">
              {filteredStudents.length}
            </span>{" "}
            {filteredStudents.length === 1 ? "student" : "students"}
            {filterBy && (
              <>
                {" "}
                in{" "}
                <span className="text-indigo-700 font-semibold">
                  {filterBy}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Branch
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                            {student.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {student.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewProfile(student.id)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end w-full"
                      >
                        View Profile
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <div className="flex flex-col items-center">
              <Search size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No matching students found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search criteria or branch filter to find what
                you're looking for
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentData;
