import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

// Import icons (ensure these files exist in your project)
import JobIcon from "../../assets/coordinatorDashboard/job.png";
import StudentsIcon from "../../assets/coordinatorDashboard/students.png";
import PendingIcon from "../../assets/coordinatorDashboard/pending.png";
import RecruiterIcon from "../../assets/coordinatorDashboard/recruiter.png";
import ApplicationIcon from "../../assets/coordinatorDashboard/application.png";
import DocumentIcon from "../../assets/coordinatorDashboard/document.png";
import LocationIcon from "../../assets/coordinatorDashboard/location.png";
import JobTypeIcon from "../../assets/coordinatorDashboard/job-type.png";
import TimeIcon from "../../assets/coordinatorDashboard/time.png";
import { toast } from "react-toastify";
import axios from "axios";

// Define interfaces for the data
interface Stat {
  title: string;
  count: string;
  icon: string;
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

  const [applications, setApplications] = useState<Application[]>([]); // Hardcoded data for recent applications
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch data from the backend on component mount (excluding recent applications)

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `https://s6dohx6twlodp6xdapdb4q4pea0gsvia.lambda-url.ap-south-1.on.aws/api/jobs/tap/applications`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.success) {
        // Assuming data.data is the array of applications
        console.log("newwwww", data.data);
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
        console.log("HIII", statsResponse.data);
        const statsData = statsResponse.data.data;
        setStats([
          {
            title: "Active Job Postings",
            count: statsData.activeJobs?.toString() || "0",
            icon: JobIcon,
          },
          {
            title: "Students Registered",
            count: statsData.totalStudents?.toString() || "0",
            icon: StudentsIcon,
          },
          {
            title: "Pending Verification",
            count: statsData.pendingVerifications?.toString() || "0",
            icon: PendingIcon,
          },
          {
            title: "Total Applications",
            count: statsData.totalApplications?.toString() || "0",
            icon: ApplicationIcon,
          },
          {
            title: "Verified Recruiters",
            count: statsData.verifiedRecruiters?.toString() || "0",
            icon: RecruiterIcon,
          },
          {
            title: "Placed Students",
            count: statsData.placedStudents?.toString() || "0",
            icon: DocumentIcon,
          },
        ]);

        // Fetch recent jobs (limit to 3)
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
          type: job.jobType || "Full Time", // Adjust based on your backend schema
          time: job.createdAt
            ? new Date(job.createdAt).toLocaleDateString()
            : "Unknown Date",
        }));
        setRecentJobs(jobsData);

        // Note: We're skipping the fetch for recent applications and using hardcoded data instead
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        if (err.response?.status === 401) {
          setError("You are not authorized. Please log in again.");
          // setTimeout(() => navigate("/login"), 2000);
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

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-8 md:mb-12">
        <h1 className="text-xl md:text-2xl text-[#161A80]">
          Welcome,{" "}
          <span className="text-4xl md:text-5xl font-bold">
            T&P Coordinator
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          View and manage all the job postings, verify recruiters, and track
          student applications.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 md:p-10 rounded-lg shadow-card"
          >
            <div className="flex items-center gap-2 md:gap-4">
              <img
                src={stat.icon}
                className="h-8 w-8 md:h-12 md:w-12"
                alt={stat.title}
              />
              <div>
                <p className="text-gray-600 text-xs md:text-sm">{stat.title}</p>
                <p className="text-lg md:text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Recent Job Openings
          </h2>
          <div className="space-y-4">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <div key={job.id} className="border-b pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col justify-between mt-2">
                      <h3 className="font-bold text-xl md:text-2xl">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg">
                        {job.company}
                      </p>
                      <div className="flex flex-wrap gap-3 md:gap-5 mt-2">
                        <span className="text-xs md:text-sm text-gray-500 flex gap-2 items-center">
                          <img
                            src={LocationIcon}
                            className="h-3 w-3"
                            alt="Location"
                          />
                          {job.location}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 flex gap-2 items-center">
                          <img
                            src={JobTypeIcon}
                            className="h-3 w-3"
                            alt="Job Type"
                          />
                          {job.type}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 flex gap-2 items-center">
                          <img src={TimeIcon} className="h-3 w-3" alt="Time" />
                          {job.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No recent jobs available.
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/dashboard/coordinator/job-postings")}
            className="w-full mt-4 bg-[#14137D] text-white py-2 rounded text-sm md:text-base"
          >
            View All Jobs
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Recent Applications
          </h2>
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.slice(0, 5).map((application, index) => (
                <div
                  key={index}
                  className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between"
                >
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-sm md:text-base">
                      {application?.form?.Name}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {application?.job.title} at {application?.job.company}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No recent applications available.
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/dashboard/coordinator/applications")}
            className="w-full mt-4 bg-[#14137D] text-white py-2 rounded text-sm md:text-base"
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorHomepage;
