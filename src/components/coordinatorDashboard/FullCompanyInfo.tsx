import axios from "axios";
import {
  Trash2,
  Download,
  ArrowLeft,
  Calendar,
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Eye,
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { ExternalLink, FileText } from "lucide-react";

const FullCompanyInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to open the PDF in a new tab
  const openPdfInNewTab = () => {
    if (jobData?.jdFileUrl) {
      window.open(jobData.jdFileUrl, "_blank");
    }
  };

  const handleDelete = () => {
    // Implement actual deletion logic here
    console.log("Deleting job...");
    setShowModal(false);
  };

  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(
        `https://tap-backend.up.railway.app/api/jobs/tap/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        console.log(" the data is ", data.data);
        setJobData(data.data);
        setApplications(data.data.applications);
      } else {
        toast.error("Failed to load job data");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error fetching job data");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, [id]);

  const exportToExcel = () => {
    if (!applications || applications.length === 0) return;

    // Extract all unique keys from all form objects
    const allKeysSet = new Set<string>();
    applications.forEach((application: any) => {
      Object.keys(application.form || {}).forEach((key) => allKeysSet.add(key));
    });

    const allKeys = Array.from(allKeysSet);

    // Create data array: first row is headers, rest are application values
    const data = applications.map((application: any) => {
      const row: Record<string, string> = {};
      allKeys.forEach((key) => {
        row[key.replace(/([A-Z])/g, " $1")] = String(
          application.form?.[key] || "N/A"
        );
      });
      return row;
    });

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    // Export the file
    XLSX.writeFile(workbook, `${jobData.company}-studentApplications.xlsx`);
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
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Back button with hover animation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-indigo-700 font-medium w-fit transition-all duration-300 hover:translate-x-[-4px] group"
      >
        <ArrowLeft
          size={18}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <span className="relative">
          Back to Job Postings
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </span>
      </button>

      {/* Company name with animated underline */}
      <div className="relative group inline-block w-fit">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 leading-tight">
          {jobData.company}
        </h1>
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-500 opacity-75 group-hover:w-full transition-all duration-500 rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content area */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl shadow-md border border-gray-100">
            {/* Job title with animated gradient on hover */}
            <div className="relative group inline-block mb-4">
              <h2 className="font-bold text-2xl md:text-3xl text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                {jobData.title}
              </h2>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
            </div>

            {/* Job details with icon animations */}
            <div className="flex flex-wrap gap-5 mb-6">
              <div className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-100">
                  <MapPin
                    size={16}
                    className="text-indigo-700 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-gray-700 font-medium text-sm">
                  {jobData.location}
                </p>
              </div>

              <div className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-100">
                  <Briefcase
                    size={16}
                    className="text-indigo-700 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-gray-700 font-medium text-sm">
                  {jobData.jobType}
                </p>
              </div>

              <div className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-100">
                  <IndianRupee
                    size={16}
                    className="text-indigo-700 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-gray-700 font-medium text-sm">
                  {jobData.package}
                </p>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                Job Description
                <div className="h-px flex-grow ml-4 bg-gradient-to-r from-indigo-200 to-transparent"></div>
              </h3>
              <div className="prose text-gray-600 leading-relaxed">
                <p>{jobData.JD}</p>
              </div>
              {jobData.jdFileUrl && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mt-4"
                >
                  <FileText size={16} />
                  <span>View Full JD</span>
                </button>
              )}
            </div>

            {/* Eligible Batches */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                Eligible Batches
                <div className="h-px flex-grow ml-4 bg-gradient-to-r from-indigo-200 to-transparent"></div>
              </h3>
              <div className="flex flex-wrap gap-2">
                {jobData?.eligibleBatches?.map(
                  (skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium border border-indigo-100 transition-all duration-300 hover:bg-indigo-100 hover:shadow-sm hover:scale-105"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                Eligibility Criteria
                <div className="h-px flex-grow ml-4 bg-gradient-to-r from-indigo-200 to-transparent"></div>
              </h3>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2 pl-1">
                <li>{jobData.eligibility}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6 order-first lg:order-last">
          {/* Important Dates */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Important Dates
            </h3>
            <div className="space-y-4">
              <div className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-100">
                  <Calendar
                    size={18}
                    className="text-indigo-700 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Deadline</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(jobData.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Job Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Trash2 size={18} />
            <span>Delete Job</span>
          </button>
        </div>
      </div>

      {/* Student Applications */}
      <div className="w-full bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl shadow-md mt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Student Applications
          </h3>
          <button
            onClick={exportToExcel}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download size={16} />
            <span>Download Excel</span>
          </button>
        </div>
        <div className="border-b border-gray-200 mb-6"></div>

        <div className="flex flex-col gap-4">
          {applications && applications.length > 0 ? (
            applications.map((application: any) => (
              <div
                key={application.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/30 group"
              >
                <div className="mb-4 md:mb-0">
                  {Object.entries(application?.form).map(([key, value]) => (
                    <p
                      key={key}
                      className="text-sm leading-relaxed text-gray-600 mb-1 capitalize group-hover:text-gray-800 transition-colors duration-300"
                    >
                      <span className="font-medium text-gray-800">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>{" "}
                      {String(value) || "N/A"}
                    </p>
                  ))}
                </div>

                <button className="px-4 py-2.5 bg-gray-100 hover:bg-indigo-100 rounded-lg text-sm font-medium text-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <Eye size={16} />
                  <span>View Details</span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <Clock size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">
                No applications found for this job posting
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Applications will appear here once students apply
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl animate-scaleIn">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this job posting? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 min-w-[100px]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-300 min-w-[100px]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-4/5 lg:w-3/4 h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {`${jobData?.title} at ${jobData?.company}` ||
                  "Job Description"}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={openPdfInNewTab}
                  className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100"
                  title="Open in new tab"
                >
                  <ExternalLink size={20} />
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-700 hover:text-red-600 rounded-full hover:bg-gray-100"
                  title="Close"
                >
                  <span className="text-xl font-medium">X</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-2 overflow-hidden">
              {jobData?.jdFileUrl ? (
                <iframe
                  src={`${jobData.jdFileUrl}#view=FitH`}
                  className="w-full h-full border-none"
                  title="Job Description PDF"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">PDF not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add these keyframe animations to your global CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FullCompanyInfo;
