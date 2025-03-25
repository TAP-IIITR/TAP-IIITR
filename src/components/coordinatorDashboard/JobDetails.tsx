import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  MdCorporateFare,
  MdCurrencyRupee,
  MdOutlineWorkOutline,
  MdEdit,
} from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoMdAlarm } from "react-icons/io";
import { TbCircleX } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineWatchLater } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/tap/${id}`,
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        setJobData(data.data);
      } else {
        toast.error("Failed to load job data");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error);
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

  // Sample static data
  const jobDetails = {
    company: "TechCorp",
    title: "Software Engineer",
    location: "Ranchi, Jharkhand",
    type: "Full Time",
    package: "₹12,00,000/annum",
    description:
      "We are seeking an exceptional Software Engineer to join our innovative technology team. This is an extraordinary opportunity to work on cutting-edge projects while learning from industry experts in a dynamic, fast-paced environment.",
    applicationDeadline: "December 15, 2023",
    startDate: "January 15, 2024",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "AWS",
      "Docker",
      "Kubernetes",
      "Python",
      "SQL",
      "REST APIs",
      "GraphQL",
    ],
  };

  const applications = [
    {
      id: 1,
      name: "John Doe",
      status: "Selected",
      rollNo: "2021PGCACA001",
      branch: "CSE",
      cgpa: "8.5",
      resume: "https://example.com/resume1.pdf",
      appliedDate: "15 Dec 2023",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "Interview Scheduled",
      rollNo: "2021PGCACA002",
      branch: "CSE",
      cgpa: "9.2",
      resume: "https://example.com/resume2.pdf",
      appliedDate: "14 Dec 2023",
    },
    {
      id: 3,
      name: "Raj Kumar",
      status: "Selected",
      rollNo: "2021PGCACA003",
      branch: "ECE",
      cgpa: "8.9",
      resume: "https://example.com/resume3.pdf",
      appliedDate: "13 Dec 2023",
    },
    {
      id: 4,
      name: "Priya Singh",
      status: "Selected",
      rollNo: "2021PGCACA004",
      branch: "CSE",
      cgpa: "7.8",
      resume: "https://example.com/resume4.pdf",
      appliedDate: "12 Dec 2023",
    },
    {
      id: 5,
      name: "Amit Patel",
      status: "Interview Scheduled",
      rollNo: "2021PGCACA005",
      branch: "CSE",
      cgpa: "8.7",
      resume: "https://example.com/resume5.pdf",
      appliedDate: "11 Dec 2023",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Selected":
        return (
          <div className="bg-[#D6FFD6] rounded-full px-3 py-1 flex items-center gap-2">
            <IoCheckmarkCircleOutline className="text-[#16A34A]" />
            <span className="text-[#16A34A] font-medium">Selected</span>
          </div>
        );
      case "Rejected":
        return (
          <div className="bg-[#F5CDCD] rounded-full px-3 py-1 flex items-center gap-2">
            <RxCrossCircled className="text-[#DC2626]" />
            <span className="text-[#DC2626] font-medium">Rejected</span>
          </div>
        );
      default:
        return (
          <div className="bg-[#FFF4CD] rounded-full px-3 py-1 flex items-center gap-2">
            <MdOutlineWatchLater className="text-[#D97706]" />
            <span className="text-[#D97706] font-medium">{status}</span>
          </div>
        );
    }
  };

  const formatFirestoreTimestamp = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) return "Invalid timestamp";

    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
    <div className="flex flex-col gap-[20px] p-[24px]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#161A80] hover:text-[#29A8EF] w-fit transition-colors"
      >
        <FaArrowLeft size={14} /> Back to Applications
      </button>

      {/* Company & Job Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-[12px] p-6 shadow-sm">
        <div className="w-full md:w-auto mb-6 md:mb-0">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-[#E0E0E0] rounded-full flex items-center justify-center">
              <MdCorporateFare className="w-6 h-6 text-[#212121]" />
            </div>
            <p className="text-[20px] font-[600] text-[#161A80]">
              {jobData.company}
            </p>
          </div>
          <h1 className="text-[24px] md:text-[32px] font-[600] text-[#212121]">
            {jobData.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[20px]">
        {/* Left Section */}
        <div className="w-full lg:w-[75%] flex flex-col gap-[20px]">
          {/* Job Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-[12px] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <CiLocationOn className="w-5 h-5 text-[#161A80]" />
                <p className="text-[14px] text-[#666666]">Location</p>
              </div>
              <p className="text-[16px] font-[500]">{jobData.location}</p>
            </div>

            <div className="bg-white rounded-[12px] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <MdOutlineWorkOutline className="w-5 h-5 text-[#161A80]" />
                <p className="text-[14px] text-[#666666]">Job Type</p>
              </div>
              <p className="text-[16px] font-[500]">{jobData.jobType}</p>
            </div>

            <div className="bg-white rounded-[12px] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <MdCurrencyRupee className="w-5 h-5 text-[#161A80]" />
                <p className="text-[14px] text-[#666666]">Package</p>
              </div>
              <p className="text-[16px] font-[500]">{jobData.package}</p>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="bg-white rounded-[12px] p-6 shadow-sm">
            <h2 className="text-[20px] font-[600] text-[#212121] mb-4">
              Job Description
            </h2>
            <div className="prose max-w-none">
              <p className="text-[16px] text-[#3D3D3D] mb-4">{jobData.JD}</p>
            </div>
          </div>

          {/* Required Skills */}
          <div className="bg-white rounded-[12px] p-6 shadow-sm">
            <h2 className="text-[20px] font-[600] text-[#212121] mb-4">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-[8px]">
              {jobData.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-[#F0F7FF] text-[#161A80] px-[12px] py-[6px] rounded-[20px] text-[14px] font-[500] border border-[#D0E1FF]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="bg-white rounded-[12px] p-6 shadow-sm">
            <h2 className="text-[20px] font-[600] text-[#212121] mb-4">
              Timeline
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center mr-4">
                  <IoMdAlarm className="w-4 h-4 text-[#161A80]" />
                </div>
                <div>
                  <p className="text-[14px] text-[#666666]">
                    Application Deadline
                  </p>
                  <p className="text-[16px] font-[500]">
                    {formatFirestoreTimestamp(jobData.deadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications Section */}
          <div className="bg-white rounded-[12px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[20px] font-[600] text-[#212121]">
                Applications ({jobData.applications.length})
              </h2>
              <button
                className="flex items-center gap-2 text-[#161A80] font-[500] hover:text-[#29A8EF] transition-colors"
                onClick={() => navigate("/dashboard/coordinator/applications")}
              >
                View All Applications
                <FaArrowRight size={12} />
              </button>
            </div>

            {jobData.applications.length == 0 ? (
              <p>No applications right now</p>
            ) : (
              <div className="flex flex-col gap-5">
                {jobData.applications.map((application: any) => (
                  <div
                    key={application.id}
                    className="bg-white border border-[#E0E0E0] rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-[16px] font-[600] text-[#212121]">
                          {application.student}
                        </h3>
                        {/* <p className="text-[14px] text-[#666666]">
                          {application.rollNo} • {application.branch}
                        </p> */}
                      </div>
                    </div>

                    {/* <div className="flex items-center gap-4 text-sm text-[#666666]">
                      <span>CGPA: {application.cgpa}</span>
                      <span>•</span>
                      <span>Applied: {application.appliedDate}</span>
                    </div> */}

                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 text-[#161A80] border border-[#161A80] rounded-lg hover:bg-[#F5F5F5] text-sm font-medium transition-colors">
                        View Resume
                      </button>
                      <button className="px-4 py-2 bg-[#161A80] text-white rounded-lg hover:bg-[#14137D] text-sm font-medium transition-colors">
                        View Application
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions Card */}
        <div className="w-full lg:w-[25%]">
          <div className="bg-white rounded-[12px] p-6 shadow-sm sticky top-[24px]">
            <h2 className="text-[20px] font-[600] text-[#212121] mb-4">
              Actions
            </h2>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 w-full py-3 px-4 rounded-lg border border-[#161A80] text-[#161A80] hover:bg-[#F5F5F5] transition-colors">
                <MdEdit className="w-5 h-5" />
                <span className="font-[500]">Edit Job Details</span>
              </button>
              <button className="flex items-center gap-2 w-full py-3 px-4 rounded-lg border border-[#DC2626] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors">
                <TbCircleX className="w-5 h-5" />
                <span className="font-[500]">Close Job Posting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
