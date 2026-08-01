import { useState, useMemo, useEffect } from "react";
import { SearchIcon, X, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Updated interface to match the new data structure
  interface Application {
    id: string;
    jobId: string;
    studentId?: string; // Add this if it's available in your data
    jobTitle: string;
    company: string;
    createdAt: string;
    student: any;
    form: any;
    job: any;
    status?: string;
    appliedAt?: string;
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/tap/applications`,
        {
          withCredentials: true,
        }
      );
      console.log("data", data);
      if (data.success) {
        // Assuming data.data is the array of applications
        setApplications(data.data);
      } else {
        toast.error(data.message || "Failed to load applications data");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (axios.isAxiosError(error)) {
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

  // Get unique statuses for filter options (if status is available)
  const statuses = useMemo(() => {
    // If status is not directly available, you might derive it from another field
    // For example, using creation date or some other criteria
    const uniqueStatuses = [
      ...new Set(
        applications.map(
          (app) => app.status || new Date(app.createdAt).toLocaleDateString()
        )
      ),
    ];
    return uniqueStatuses.sort();
  }, [applications]);

  // Filter applications based on search query and status filter
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        searchQuery === "" ||
        application.student.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        application.jobTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        application.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.student.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterBy === "" ||
        application.status === filterBy ||
        new Date(application.createdAt).toLocaleDateString() === filterBy;

      return matchesSearch && matchesFilter;
    });
  }, [applications, searchQuery, filterBy]);

  const handleViewApplication = (applicationId: string) => {
    const app = applications.find((a) => a.id === applicationId);
    if (app) {
      setSelectedApplication(app);
      setIsModalOpen(true);
    }
  };

  const handleViewJobDetails = (jobId: string) => {
    navigate(`/dashboard/coordinator/job-postings/${jobId}`);
  };

  const handleStatusUpdate = async (jobId: string, studentId: string, status: string) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/tap/applications/${jobId}/${studentId}`,
        { status },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(`Application status updated to ${status}`);

        // Update local state
        setApplications(prev => prev.map(app => {
          if (app.id === selectedApplication?.id) {
            const updatedApp = { ...app, status: status === "selected" ? "Selected" : "Rejected" }; // Mapping lowercase to Title Case for UI consistency if needed, but backend sends lowercase typically. Adjust based on your UI needs.
            // Actually, the API might return the updated application or we just update locally.
            // Let's assume we update the status field directly.
            // Note: The UI display logic uses Title Case "Verified", "Selected" etc.
            // Let's map it: selected -> Selected, rejected -> Rejected
            const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);
            setSelectedApplication({ ...updatedApp, status: displayStatus });
            return { ...updatedApp, status: displayStatus };
          }
          return app;
        }));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const downloadCSV = () => {
    if (filteredApplications.length === 0) {
      toast.info("No data to export");
      return;
    }

    // Define headers
    const headers = ["Student Name", "Email", "Roll Number", "Branch", "Job Title", "Company", "Status", "Applied At"];

    // Map data to rows
    const rows = filteredApplications.map(app => [
      app.form?.Name || "N/A",
      app.student?.regEmail || "N/A",
      app.student?.rollNumber || "N/A",
      app.student?.branch || "N/A",
      app.job?.title || "N/A",
      app.job?.company || "N/A",
      app.status || "Pending",
      app.appliedAt ? new Date(app.appliedAt).toLocaleString() : app.createdAt ? new Date(app.createdAt).toLocaleString() : "N/A"
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[26px] p-[24px]">
      {/* Header section */}
      <div className="flex flex-col">
        <p className="text-[42px] font-[600] leading-[50px] text-[#161A80]">
          Student Applications
        </p>
        <p className="text-[13px] font-[500] leading-[20px] text-[#212121]">
          View and manage all student applications in one place—track status,
          verify details, and process job applications effectively.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-[16px] w-full">
        {/* Search Bar */}
        <div className="relative flex items-center px-[16px] py-[12px] border-[1.5px] border-[#E0E0E0] bg-white rounded-[10px] flex-grow">
          <SearchIcon size={18} className="text-[#9E9E9E] mr-[8px]" />
          <input
            type="text"
            placeholder="Search by student name, job title, company, or email..."
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
          <option value="">All Applications</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Export Button */}
        <button
          onClick={downloadCSV}
          className="flex items-center justify-center gap-2 px-[16px] py-[12px] text-[14px] font-[600] rounded-[10px] bg-white border-[1.5px] border-[#161A80] text-[#161A80] hover:bg-[#F5F5F5] transition-all duration-200 md:w-auto"
        >
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="text-[14px] font-[500] text-[#666666]">
        Showing {filteredApplications.length}{" "}
        {filteredApplications.length === 1 ? "application" : "applications"}
      </div>

      {/* Applications List */}
      <div className="flex flex-col gap-[16px]">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="w-full bg-[#FFFFFF] rounded-[12px] p-[24px] hover:shadow-lg transition-shadow"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <p className="text-[22px] font-[600] leading-[30px] text-[#161A80]">
                  {application.form?.Name}
                </p>
                <p className="text-[18px] font-[500] leading-[26px] text-[#3D3D3D] mt-[8px]">
                  {application.job?.title}
                </p>
                <p className="text-[16px] font-[400] leading-[22px] text-[#666666] mt-[6px]">
                  {application.job?.company}
                </p>
                {Object.entries(application?.form).map(([key, value]) => (
                  <p
                    key={key}
                    className="text-[14px] font-[400] leading-[20px] text-[#666666] mt-[4px] capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1")}: {String(value) || "N/A"}
                  </p>
                ))}
              </div>

              {/* RIGHT SIDE: Buttons */}
              <div className="flex flex-col items-start md:items-end mt-[16px] md:mt-0">
                <div className="flex flex-col sm:flex-row gap-[12px]">
                  <button
                    onClick={() => handleViewApplication(application.id)}
                    className="h-[44px] px-[16px] rounded-[10px] bg-[#FFFFFF] border-[1.5px] border-[#161A80] flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] transition-colors"
                  >
                    <p className="font-[600] text-[14px] text-[#161A80]">
                      View Application
                    </p>
                  </button>
                  <button
                    onClick={() => handleViewJobDetails(application.jobId)}
                    className="h-[44px] px-[16px] rounded-[10px] bg-[#161A80] border-[1.5px] border-[#161A80] flex items-center justify-center cursor-pointer hover:bg-[#14137D] transition-colors"
                  >
                    <p className="font-[600] text-[14px] text-[#FFFFFF]">
                      View Job Details
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-[40px] text-[#666666]">
          No applications match your search criteria
        </div>
      )}
      {/* Application Details Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Application Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedApplication.job?.title} @ {selectedApplication.job?.company}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                {/* Student Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">
                    Student Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        Full Name
                      </label>
                      <p className="font-medium text-gray-900">
                        {selectedApplication.form?.Name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        Email Address
                      </label>
                      <p className="font-medium text-gray-900">
                        {selectedApplication.student?.regEmail || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        Phone Number
                      </label>
                      <p className="font-medium text-gray-900">
                        {selectedApplication.student?.mobile || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        Roll Number
                      </label>
                      <p className="font-medium text-gray-900">
                        {selectedApplication.student?.rollNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Form Data */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">
                    Form Responses
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {Object.entries(selectedApplication.form || {}).map(
                      ([key, value]) => {
                        // Skip Name as it's already shown above
                        if (key === "Name") return null;
                        return (
                          <div key={key} className="bg-gray-50 p-4 rounded-lg">
                            <label className="text-sm text-gray-500 block mb-2 capitalize font-medium">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <p className="text-gray-900 whitespace-pre-wrap">
                              {String(value) || "N/A"}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Application Metadata */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">
                    Metadata
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        Applied On
                      </label>
                      <p className="font-medium text-gray-900">
                        {selectedApplication.appliedAt
                          ? new Date(selectedApplication.appliedAt).toLocaleString()
                          : selectedApplication.createdAt
                            ? new Date(selectedApplication.createdAt).toLocaleString()
                            : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        Current Status
                      </label>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${selectedApplication.status === 'Verified' || selectedApplication.status === 'Selected' ? 'bg-green-100 text-green-800' :
                        selectedApplication.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {selectedApplication.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <div className="flex gap-3">
                {selectedApplication.status !== "Selected" && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication.jobId, selectedApplication.student?.id || selectedApplication.studentId, "selected")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center gap-2"
                  >
                    Select Candidate
                  </button>
                )}
                {selectedApplication.status !== "Rejected" && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication.jobId, selectedApplication.student?.id || selectedApplication.studentId, "rejected")}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center gap-2"
                  >
                    Reject Application
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    handleViewJobDetails(selectedApplication.jobId);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                >
                  View Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
