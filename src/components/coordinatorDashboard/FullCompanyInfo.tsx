import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAlarm } from "react-icons/io";
import { MdCurrencyRupee, MdOutlineBusinessCenter } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const FullCompanyInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    // Implement actual deletion logic here
    console.log("Deleting job...");
    setShowModal(false);
  };

  const fetchJobData = async () => {
    console.log("HIII");
    try {
      console.log(`http://localhost:3000/api/jobs/tap/${id}`);
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/tap/${id}`,
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        setJobData(data.data);
        setApplications(data.data.applications);
        console.log(data.data);
      } else {
        toast.error("Failed to load job data");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px] p-[8px] md:p-[16px]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#161A80] hover:text-[#29A8EF] w-fit transition-colors"
      >
        <FaArrowLeft size={14} /> Back to Job Postings
      </button>

      <p className="text-[28px] md:text-[36px] font-[600] text-[#161A80] leading-[34px] md:leading-[44px]">
        {jobData.company}
      </p>

      <div className="flex flex-col lg:flex-row gap-[16px]">
        <div className="w-full lg:w-[78%] flex flex-col gap-[16px]">
          <div
            className="bg-[#FFF] rounded-[12px] p-[16px] flex flex-col gap-[16px]"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <p className="font-[600] text-[28px] text-[#212121] leading-[34px]">
              {jobData.title}
            </p>
            <div className="flex flex-wrap gap-[20px]">
              <div className="flex items-center gap-[6px]">
                <CiLocationOn className="h-[20px] w-[20px] text-[#212121]" />
                <p className="text-[#3D3D3D] font-[500] text-[14px] leading-[20px]">
                  {jobData.location}
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <MdOutlineBusinessCenter className="h-[20px] w-[20px] text-[#212121]" />
                <p className="text-[#3D3D3D] font-[500] text-[14px] leading-[20px]">
                  {jobData.jobType}
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <MdCurrencyRupee className="h-[20px] w-[20px] text-[#212121]" />
                <p className="text-[#3D3D3D] font-[500] text-[14px] leading-[20px]">
                  {jobData.package}
                </p>
              </div>
            </div>

            <div className="mt-[12px]">
              <p className="text-[22px] font-[600] text-[#212121] mb-[12px]">
                Job Description
              </p>
              <div className="space-y-[12px] text-[14px] text-[#3D3D3D] leading-[22px]">
                <p>{jobData.JD}</p>
              </div>
            </div>

            <div className="mt-[16px]">
              <p className="text-[22px] font-[600] text-[#212121] mb-[12px]">
                Eligible Batches
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {jobData?.eligibleBatches?.map(
                  (skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#F0F7FF] text-[#161A80] px-[12px] py-[6px] rounded-[20px] text-[14px] font-[500] border border-[#D0E1FF]"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-[16px]">
              <p className="text-[22px] font-[600] text-[#212121] mb-[12px]">
                Eligibility Criteria
              </p>
              <ul className="list-disc list-inside text-[14px] text-[#3D3D3D] leading-[22px] space-y-[8px]">
                <li>{jobData.eligibility}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[22%] flex flex-col gap-[16px] order-first lg:order-last">
          <div
            className="bg-[#FFF] rounded-[12px] p-[16px]"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <p className="text-[20px] md:text-[22px] font-[600] text-[#212121] mb-[12px]">
              Important Dates
            </p>
            <div className="flex lg:flex-col gap-[12px] overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              <div className="flex-shrink-0 w-[280px] lg:w-auto">
                <div className="flex items-center gap-[12px]">
                  <div className="bg-[#F5F5F5] h-[40px] w-[40px] rounded-full flex items-center justify-center">
                    <IoMdAlarm className="h-[20px] w-[20px] text-[#161A80]" />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#666666]">
                      Application Deadline
                    </p>
                    <p className="text-[16px] font-[500] text-[#212121]">
                      {new Date(jobData.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 px-4 rounded-lg font-semibold text-base transition-colors bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Delete Job
          </button>
        </div>
      </div>

      <div
        className="w-full bg-[#FFFFFF] rounded-[12px] px-[24px] py-[24px]"
        style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
      >
        <div className="flex justify-between items-center mb-[16px]">
          <p className="font-[600] text-[22px] text-[#212121]">
            Student Applications
          </p>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Excel
          </button>
        </div>
        <div className="border-b border-[#E0E0E0] mb-[16px]"></div>

        <div className="flex flex-col gap-[16px]">
          {applications && applications.length > 0 ? (
            applications.map((application: any) => (
              <div
                key={application.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-[20px] rounded-[8px] border border-[#E0E0E0] hover:shadow-md transition-shadow"
              >
                <div className="mb-[12px] md:mb-0">
                  <div className="flex flex-wrap items-center gap-[12px]">
                    {/* <p className="font-[600] text-[18px] text-[#212121]">
                      {application.job.title}
                    </p> */}
                    {/* <span
                      className={`px-[12px] py-[2px] rounded-full text-[14px] border ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span> */}
                  </div>

                  {/* <div className="flex flex-wrap gap-x-[24px] mt-[6px]">
                    <p className="font-[500] text-[16px] text-[#484848]">
                      {application.job.company}
                    </p>
                    <p className="font-[400] text-[14px] text-[#666666]">
                      {application.job.location}
                    </p>
                    <p className="font-[600] text-[14px] text-[#161A80]">
                      {application.job.package}
                    </p>
                    <p className="font-[400] text-[14px] text-[#666666]">
                      {application.job.jobType}
                    </p>
                  </div> */}

                  {Object.entries(application?.form).map(([key, value]) => (
                    <p
                      key={key}
                      className="text-[14px] font-[400] leading-[20px] text-[#666666] mt-[4px] capitalize"
                    >
                      {key.replace(/([A-Z])/g, " $1")}: {String(value) || "N/A"}
                    </p>
                  ))}

                  {/* <div className="flex flex-wrap gap-x-[24px] mt-[4px]">
                    <p className="font-[400] text-[14px] text-[#9E9E9E]">
                      Applied on: {application.appliedDate}
                    </p>
                    {application.interviewDate && (
                      <p className="font-[400] text-[14px] text-[#9E9E9E]">
                        Interview date: {application.interviewDate}
                      </p>
                    )}
                  </div> */}
                </div>

                <button className="px-[16px] py-[8px] bg-[#F5F5F5] hover:bg-[#E0E0E0] rounded-[6px] text-[14px] font-[500] text-[#161A80] transition-colors">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center py-[40px] text-[#666666]">
              No applications found for this student
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullCompanyInfo;
