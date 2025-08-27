import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Briefcase,
  Users,
  Clock,
  CheckCircle,
  Building,
  FileCheck,
  MapPin,
  Calendar,
  Tag,
  ChevronRight,
  Menu,
} from "lucide-react";

// Define interfaces for the data
interface Stat {
  title: string;
  count: string;
  icon: string;
  color: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  type: string;
  time: string;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  createdAt: string;
  student: any;
  status?: string;
  job: any;
  form: any;
}

const CoordinatorHomepage = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `https://tap-backend.up.railway.app/api/jobs/tap/applications`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        console.log(" the applictaion is ", data.data);
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch dashboard stats
        const statsResponse = await api.get("/dashboard/tap");
        const statsData = statsResponse.data.data;

        const iconColors = [
          "bg-blue-100 text-blue-600",
          "bg-green-100 text-green-600",
          "bg-yellow-100 text-yellow-600",
          "bg-purple-100 text-purple-600",
          "bg-indigo-100 text-indigo-600",
          "bg-pink-100 text-pink-600",
        ];

        setStats([
          {
            title: "Active Job Postings",
            count: statsData.activeJobs?.toString() || "0",
            icon: "job",
            color: iconColors[0],
          },
          {
            title: "Students Registered",
            count: statsData.totalStudents?.toString() || "0",
            icon: "students",
            color: iconColors[1],
          },
          {
            title: "Pending Verification",
            count: statsData.pendingVerifications?.toString() || "0",
            icon: "pending",
            color: iconColors[2],
          },
          {
            title: "Total Applications",
            count: statsData.totalApplications?.toString() || "0",
            icon: "application",
            color: iconColors[3],
          },
          {
            title: "Verified Recruiters",
            count: statsData.verifiedRecruiters?.toString() || "0",
            icon: "recruiter",
            color: iconColors[4],
          },
          {
            title: "Placed Students",
            count: statsData.placedStudents?.toString() || "0",
            icon: "document",
            color: iconColors[5],
          },
        ]);

        // Fetch recent jobs
        const jobsResponse = await api.get("/jobs/tap?limit=3");
        const jobsData = jobsResponse.data.data.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.company || "Unknown Company",
          location: job.location || "Unknown Location",
          status:
            job.status === "pending_verification"
              ? "Pending Verification"
              : "Verified",
          type: job.jobType || "Full Time",
          time: job.createdAt
            ? new Date(job.createdAt).toLocaleDateString()
            : "Unknown Date",
        }));
        setRecentJobs(jobsData);
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
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
          setError(
            err.response?.data?.message || "Failed to fetch dashboard data"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "job":
        return <Briefcase size={24} />;
      case "students":
        return <Users size={24} />;
      case "pending":
        return <Clock size={24} />;
      case "application":
        return <FileCheck size={24} />;
      case "recruiter":
        return <Building size={24} />;
      case "document":
        return <CheckCircle size={24} />;
      default:
        return <Briefcase size={24} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-800"></div>
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
      {/* Top Navigation */}
      <div className="bg-white border-b shadow-sm py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Menu className="text-gray-600 md:hidden" />
            <h1 className="text-xl font-semibold text-indigo-900">
              T&P Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, <span className="text-indigo-800">T&P Coordinator</span>
          </h1>
          <p className="text-gray-600">
            View and manage all the job postings, verify recruiters, and track
            student applications.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-200 hover:shadow-xl hover:translate-y-[-5px]"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {renderIcon(stat.icon)}
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Job Openings
                </h2>
                <span className="text-xs bg-blue-50 text-blue-700 py-1 px-2 rounded-full">
                  {recentJobs.length} jobs
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 cursor-pointer transform transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:translate-y-[-2px] group"
                  >
                    <div className="flex flex-col relative">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors duration-300">
                        {job.title}
                      </h3>

                      <p className="text-gray-700 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                        {job.company}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-gray-600 flex items-center gap-1 group-hover:text-gray-800 transition-all duration-300 hover:text-indigo-600">
                          <MapPin
                            size={14}
                            className="group-hover:text-indigo-500 transition-colors duration-300"
                          />
                          {job.location}
                        </span>
                        <span className="text-gray-600 flex items-center gap-1 group-hover:text-gray-800 transition-all duration-300 hover:text-indigo-600">
                          <Tag
                            size={14}
                            className="group-hover:text-indigo-500 transition-colors duration-300"
                          />
                          {job.type}
                        </span>
                        <span className="text-gray-600 flex items-center gap-1 group-hover:text-gray-800 transition-all duration-300 hover:text-indigo-600">
                          <Calendar
                            size={14}
                            className="group-hover:text-indigo-500 transition-colors duration-300"
                          />
                          {job.time}
                        </span>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span
                          className={`inline-block text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                            job.status === "Verified"
                              ? "bg-green-50 text-green-700 group-hover:bg-green-100 group-hover:shadow-sm"
                              : "bg-yellow-50 text-yellow-700 group-hover:bg-yellow-100 group-hover:shadow-sm"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No recent jobs available.
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <button
                onClick={() => navigate("/dashboard/coordinator/job-postings")}
                className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                View All Jobs
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Applications
                </h2>
                <span className="text-xs bg-purple-50 text-purple-700 py-1 px-2 rounded-full">
                  {applications.slice(0, 5).length} applications
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {applications.length > 0 ? (
                applications.slice(0, 5).map((application, index) => (
                  <div
                    key={index}
                    className="p-6 cursor-pointer transform transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:translate-y-[-2px] group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors duration-300">
                          {application?.form?.Name || "Unnamed Student"}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {application?.job?.company || "Unnamed Position"} at{" "}
                          {application?.job?.title || "Unknown Company"}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-block text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                            application?.status === "Verified"
                              ? "bg-green-50 text-green-700 group-hover:bg-green-100 group-hover:shadow-sm"
                              : "bg-yellow-50 text-yellow-700 group-hover:bg-yellow-100 group-hover:shadow-sm"
                          }`}
                        >
                          {application?.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No recent applications available.
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <button
                onClick={() => navigate("/dashboard/coordinator/applications")}
                className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                View All Applications
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorHomepage;
