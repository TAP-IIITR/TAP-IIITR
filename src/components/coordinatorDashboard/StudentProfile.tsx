import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Linkedin,
  ExternalLink,
  Download,
  FileText,
  Building,
  MapPin,
  Calendar,
  ChevronRight,
  BookOpen,
  Award,
  Briefcase,
} from "lucide-react";

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<any>(null);
  const [applications, setApplications] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [error, setError] = useState<string | null>(null);

  const fetchStudentData = async () => {
    try {
      const { data } = await axios.get(
        `https://tap-backend-production-51ea.up.railway.app/api/student/tap/${studentId}`,
        { withCredentials: true }
      );

      if (data.success) {
        console.log(" the student data is ", data.data);
        setStudentData(data.data);
      } else {
        toast.error("Failed to load student data");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching student data"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `https://tap-backend-production-51ea.up.railway.app/api/student/tap/applications/${studentId}`,
        { withCredentials: true }
      );

      if (data.success) {
        setApplications(data.data);
      } else {
        toast.error("Failed to load application data");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching application data"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchStudentData();
    fetchApplications();
  }, [studentId]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "selected":
      case "approved":
      case "accepted":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "rejected":
      case "declined":
        return "text-red-600 bg-red-50 border-red-200";
      case "pending":
      case "in review":
        return "text-amber-600 bg-amber-50 border-amber-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading student profile...
          </p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Student Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find the student profile you're looking for.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-600 text-white p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors duration-300 group mb-4"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span>Back to Student List</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {studentData.firstName} {studentData.lastName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-indigo-100">
                  <GraduationCap size={16} />
                  <span>{studentData.branch}</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-100">
                  <Calendar size={16} />
                  <span>
                    {Number(studentData.batch) - 4} -{" "}
                    {Number(studentData.batch)}
                  </span>
                </div>
              </div>
            </div>

            {studentData?.resume?.url && (
              <Link
                to={studentData.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium group"
              >
                <Download
                  size={16}
                  className="group-hover:translate-y-1 transition-transform duration-300"
                />
                Download Resume
              </Link>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-8 border-b border-indigo-700/30">
            <button
              className={`px-4 py-3 font-medium transition-all duration-300 border-b-2 ${
                activeTab === "personal"
                  ? "border-white text-white"
                  : "border-transparent text-indigo-200 hover:text-white hover:border-indigo-300"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Details
            </button>
            <button
              className={`px-4 py-3 font-medium transition-all duration-300 border-b-2 ${
                activeTab === "academic"
                  ? "border-white text-white"
                  : "border-transparent text-indigo-200 hover:text-white hover:border-indigo-300"
              }`}
              onClick={() => setActiveTab("academic")}
            >
              Academic Details
            </button>
            <button
              className={`px-4 py-3 font-medium transition-all duration-300 border-b-2 ${
                activeTab === "applications"
                  ? "border-white text-white"
                  : "border-transparent text-indigo-200 hover:text-white hover:border-indigo-300"
              }`}
              onClick={() => setActiveTab("applications")}
            >
              Applications
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Personal Details Tab */}
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information Card */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Mail size={18} className="text-indigo-600" />
                  Contact Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="text-sm font-medium text-gray-500 mb-1 block">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 mt-1 group-hover:text-indigo-700 transition-colors duration-300">
                      <div className="bg-indigo-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors duration-300">
                        <Mail size={18} className="text-indigo-600" />
                      </div>
                      <span className="text-base font-medium text-gray-800 md:overflow-hidden overflow-x-auto">
                        {studentData.regEmail || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-gray-500 mb-1 block">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-3 mt-1 group-hover:text-indigo-700 transition-colors duration-300">
                      <div className="bg-indigo-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors duration-300">
                        <Phone size={18} className="text-indigo-600" />
                      </div>
                      <span className="text-base font-medium text-gray-800">
                        {studentData.mobile || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="group md:col-span-2">
                    <label className="text-sm font-medium text-gray-500 mb-1 block">
                      LinkedIn Profile
                    </label>
                    <div className="flex items-center gap-3 mt-1 group-hover:text-indigo-700 transition-colors duration-300">
                      <div className="bg-indigo-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors duration-300">
                        <Linkedin size={18} className="text-indigo-600" />
                      </div>
                      <span className="text-base font-medium text-gray-800 overflow-x-auto">
                        {studentData.linkedin || "Not provided"}
                      </span>
                      {studentData.linkedin && (
                        <a
                          href={
                            studentData.linkedin.startsWith("http")
                              ? studentData.linkedin
                              : `https://${studentData.linkedin}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText size={18} className="text-indigo-600" />
                  Resume
                </h2>
              </div>

              <div className="p-6">
                {studentData?.resume?.url ? (
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                      <FileText size={40} className="text-indigo-600" />
                    </div>

                    <h3 className="font-medium text-gray-800 mb-1">
                      Resume.pdf
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                      Uploaded on{" "}
                      {studentData?.resume.lastUpdated
                        ? new Date(
                            studentData.resume.lastUpdated.seconds * 1000 +
                              Math.floor(
                                studentData.resume.lastUpdated.nanoseconds / 1e6
                              )
                          ).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>

                    <Link
                      to={studentData.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 px-4 font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <Download
                        size={16}
                        className="group-hover:translate-y-1 transition-transform duration-300"
                      />
                      Download Resume
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <FileText size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-center">
                      No resume uploaded yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Academic Details Tab */}
        {activeTab === "academic" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Academic Information */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <BookOpen size={18} className="text-indigo-600" />
                  Academic Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="text-sm font-medium text-gray-500 mb-1 block">
                      Enrollment Number
                    </label>
                    <div className="flex items-center gap-3 mt-1 group-hover:text-indigo-700 transition-colors duration-300">
                      <div className="bg-indigo-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors duration-300">
                        <GraduationCap size={18} className="text-indigo-600" />
                      </div>
                      <span className="text-base font-medium text-gray-800">
                        {studentData.rollNumber || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-gray-500 mb-1 block">
                      CGPA
                    </label>
                    <div className="flex items-center gap-3 mt-1 group-hover:text-indigo-700 transition-colors duration-300">
                      <div className="bg-indigo-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors duration-300">
                        <Award size={18} className="text-indigo-600" />
                      </div>
                      <span className="text-base font-medium text-gray-800">
                        {studentData.cgpa || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-gray-500 mb-1 block">
                      Batch
                    </label>
                    <div className="flex items-center gap-3 mt-1 group-hover:text-indigo-700 transition-colors duration-300">
                      <div className="bg-indigo-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors duration-300">
                        <Calendar size={18} className="text-indigo-600" />
                      </div>
                      <span className="text-base font-medium text-gray-800">
                        {Number(studentData.batch) - 4} -{" "}
                        {Number(studentData.batch)}
                      </span>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-gray-500 mb-1 block">
                      Branch
                    </label>
                    <div className="flex items-center gap-3 mt-1 group-hover:text-indigo-700 transition-colors duration-300">
                      <div className="bg-indigo-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors duration-300">
                        <BookOpen size={18} className="text-indigo-600" />
                      </div>
                      <span className="text-base font-medium text-gray-800">
                        {studentData.branch || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Skills/Additional Info Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Award size={18} className="text-indigo-600" />
                  Additional Information
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Degree Status
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium">
                    {Number(studentData.batch) > new Date().getFullYear()
                      ? "Enrolled"
                      : "Graduated"}
                  </span>
                </div>

                {/* Add any additional academic information if available */}
                <p className="text-sm text-gray-500 italic mt-8">
                  Contact student directly for additional academic information.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-600" />
                Job Applications
              </h2>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                Total: {applications?.length || 0}
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {applications && applications.length > 0 ? (
                applications.map((application: any) => (
                  <div
                    key={application.id}
                    className="p-6 transition-all duration-300 hover:bg-indigo-50/30 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                            {application.job?.title || "Unknown Position"}
                          </h3>
                          {application.status && (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                application.status
                              )}`}
                            >
                              {application.status}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 my-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Building size={14} className="text-gray-400" />
                            <span>
                              {application.job?.company || "Unknown Company"}
                            </span>
                          </div>

                          {application.job?.location && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={14} className="text-gray-400" />
                              <span>{application.job.location}</span>
                            </div>
                          )}

                          {application.job?.package && (
                            <div className="flex items-center gap-2  font-medium text-indigo-600">
                              <span>{application.job.package}</span>
                            </div>
                          )}
                        </div>

                        {application?.form &&
                          Object.keys(application.form).length > 0 && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                              {Object.entries(application.form).map(
                                ([key, value]) => (
                                  <div key={key} className="text-sm">
                                    <span className="text-gray-500 capitalize">
                                      {key.replace(/([A-Z])/g, " $1")}:{" "}
                                    </span>
                                    <span className="text-gray-700">
                                      {String(value) || "N/A"}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6">
                        <button
                          className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-700 rounded-lg 
                                   hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 
                                   font-medium group/btn"
                        >
                          View Details
                          <ChevronRight
                            size={16}
                            className="group-hover/btn:translate-x-1 transition-transform duration-300"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No Applications Found
                  </h3>
                  <p className="text-gray-500 text-center max-w-md">
                    This student hasn't applied to any jobs yet or no
                    application records are available.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
