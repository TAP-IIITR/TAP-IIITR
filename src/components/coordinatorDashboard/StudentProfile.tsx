import { useParams, useNavigate, Link } from "react-router-dom";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { FaGraduationCap, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<any>(null);
  const [applications, setApplications] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStudentData = async () => {
    try {
      console.log(`http://localhost:3000/api/student/tap/${studentId}`);
      const { data } = await axios.get(
        `http://localhost:3000/api/student/tap/${studentId}`,
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        setStudentData(data.data);
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

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/student/tap/applications/${studentId}`,
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        setApplications(data.data);
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
    fetchStudentData();
    fetchApplications();
  }, [studentId]);

  // In a real application, you would fetch the student data based on the ID
  // const student = {
  //   id: parseInt("dkhagsk" || "1"),
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   phone: "+91 9876543210",
  //   branch: "Computer Science and Engineering",
  //   dob: "01 January, 2002",
  //   linkedin: "linkedin.com/in/john-doe-20swswwdw",
  //   enrollment: "2020UGCS001",
  //   cgpa: "9.5",
  //   batch: "2020-2024",
  //   resumeUrl: "#",
  //   resumeName: "Resume_John_Doe.pdf",
  //   resumeUploadDate: "16 May, 2024",
  //   skills: [
  //     "React",
  //     "TypeScript",
  //     "Node.js",
  //     "MongoDB",
  //     "Express",
  //     "Python",
  //     "Machine Learning",
  //     "Data Structures",
  //     "Cloud Computing",
  //     "AWS",
  //     "Docker",
  //     "Kubernetes",
  //   ],
  //   achievements: [
  //     "Winner, Inter-College Hackathon 2023",
  //     "3rd place in CodeChef Regional Contest",
  //     "Published paper in International Conference on Machine Learning",
  //     "Smart India Hackathon Finalist 2022",
  //     "ACM-ICPC Regional Qualifier",
  //   ],
  //   projects: [
  //     {
  //       title: "Smart Home Automation System",
  //       description:
  //         "IoT-based project to control home appliances using a mobile app and voice commands",
  //     },
  //     {
  //       title: "AI Image Recognition App",
  //       description:
  //         "Mobile application that uses machine learning to identify objects in images with 95% accuracy",
  //     },
  //     {
  //       title: "Blockchain-based Supply Chain",
  //       description:
  //         "Decentralized application for tracking product authenticity and supply chain transparency",
  //     },
  //   ],
  // };

  // // Enhanced mock applications data with more entries
  // const applications = [
  //   {
  //     id: 1,
  //     role: "Software Engineer",
  //     company: "TechCorp",
  //     status: "Selected",
  //     appliedDate: "2 May, 2024",
  //     package: "₹18 LPA",
  //     location: "Bangalore, India",
  //     jobType: "Full-time",
  //     interviewDate: "15 May, 2024",
  //   },
  //   {
  //     id: 2,
  //     role: "Full Stack Developer",
  //     company: "WebSolutions",
  //     status: "Pending",
  //     appliedDate: "5 May, 2024",
  //     package: "₹15 LPA",
  //     location: "Hyderabad, India",
  //     jobType: "Full-time",
  //     interviewDate: "18 May, 2024",
  //   },
  //   {
  //     id: 3,
  //     role: "Data Scientist",
  //     company: "DataMinds",
  //     status: "Selected",
  //     appliedDate: "10 May, 2024",
  //     package: "₹22 LPA",
  //     location: "Pune, India",
  //     jobType: "Full-time",
  //     interviewDate: "12 May, 2024",
  //   },
  //   {
  //     id: 4,
  //     role: "Product Manager",
  //     company: "Innovate Tech",
  //     status: "Selected",
  //     appliedDate: "15 May, 2024",
  //     package: "₹20 LPA",
  //     location: "Mumbai, India",
  //     jobType: "Full-time",
  //     interviewDate: "22 May, 2024",
  //   },
  //   {
  //     id: 5,
  //     role: "Machine Learning Engineer",
  //     company: "AI Solutions",
  //     status: "Pending",
  //     appliedDate: "18 May, 2024",
  //     package: "₹24 LPA",
  //     location: "Delhi, India",
  //     jobType: "Full-time",
  //     interviewDate: "25 May, 2024",
  //   },
  //   {
  //     id: 6,
  //     role: "DevOps Engineer",
  //     company: "CloudTech",
  //     status: "Pending",
  //     appliedDate: "20 May, 2024",
  //     package: "₹16 LPA",
  //     location: "Chennai, India",
  //     jobType: "Full-time",
  //     interviewDate: "27 May, 2024",
  //   },
  //   {
  //     id: 7,
  //     role: "UI/UX Designer",
  //     company: "DesignHub",
  //     status: "Selected",
  //     appliedDate: "1 May, 2024",
  //     package: "₹14 LPA",
  //     location: "Bangalore, India",
  //     jobType: "Full-time",
  //     interviewDate: "10 May, 2024",
  //   },
  //   {
  //     id: 8,
  //     role: "Backend Developer",
  //     company: "ServerLogic",
  //     status: "Selected",
  //     appliedDate: "8 May, 2024",
  //     package: "₹17 LPA",
  //     location: "Hyderabad, India",
  //     jobType: "Full-time",
  //     interviewDate: "16 May, 2024",
  //   },
  // ];

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Selected":
  //       return "text-green-600 bg-green-50 border-green-200";
  //     case "Rejected":
  //       return "text-red-600 bg-red-50 border-red-200";
  //     case "Pending":
  //       return "text-yellow-600 bg-yellow-50 border-yellow-200";
  //     default:
  //       return "text-gray-600 bg-gray-50 border-gray-200";
  //   }
  // };

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
    <div className="flex flex-col gap-[26px] p-6">
      {/* Back button and header */}
      <div className="flex flex-col gap-[10px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#161A80] hover:text-[#29A8EF] w-fit mb-2 transition-colors"
        >
          <FaArrowLeft size={14} /> Student Details
        </button>

        <div className="flex flex-col">
          <p className="font-[500] text-[36px] text-[#161A80] mt-[-8px]">
            {studentData.firstName} {studentData.lastName}
          </p>
        </div>
      </div>

      {/* Personal Details Card - Full Width */}
      <div
        className="w-full bg-[#FFFFFF] rounded-[12px] px-[24px] py-[24px]"
        style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
      >
        <p className="font-[600] text-[22px] text-[#212121] mb-[16px]">
          Personal Details
        </p>
        <div className="border-b border-[#E0E0E0] mb-[16px]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <div className="flex gap-[16px] items-center">
            <div className="bg-[#E0E0E0] h-[40px] w-[40px] rounded-full flex items-center justify-center flex-shrink-0">
              <MdOutlineEmail className="text-[#161A80] h-[20px] w-[20px]" />
            </div>
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">
                Email Address
              </p>
              <p className="text-[16px] font-[400] text-[#212121]">
                {studentData.regEmail}
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] items-center">
            <div className="bg-[#E0E0E0] h-[40px] w-[40px] rounded-full flex items-center justify-center flex-shrink-0">
              <MdPhone className="text-[#161A80] h-[20px] w-[20px]" />
            </div>
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">
                Phone Number
              </p>
              <p className="text-[16px] font-[400] text-[#212121]">
                {studentData.mobile}
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] items-center">
            <div className="bg-[#E0E0E0] h-[40px] w-[40px] rounded-full flex items-center justify-center flex-shrink-0">
              <FaLinkedin className="text-[#161A80] h-[20px] w-[20px]" />
            </div>
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">
                LinkedIn Profile
              </p>
              <div className="flex items-center gap-[6px]">
                <p className="text-[16px] font-[400] text-[#212121]">
                  {studentData.linkedin}
                </p>
                <FaExternalLinkAlt className="text-[#161A80] h-[12px] w-[12px] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Details and Resume - Side by Side */}
      <div className="flex flex-col md:flex-row gap-[26px]">
        {/* Academic Details */}
        <div
          className="w-full md:w-1/2 bg-[#FFFFFF] rounded-[12px] px-[24px] py-[24px]"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        >
          <p className="font-[600] text-[22px] text-[#212121] mb-[16px]">
            Academic Details
          </p>
          <div className="border-b border-[#E0E0E0] mb-[16px]"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">
                Enrollment Number
              </p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">
                  {studentData.rollNumber}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[14px] font-[500] text-[#666666]">CGPA</p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">
                  {studentData.cgpa}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[14px] font-[500] text-[#666666]">Batch</p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">
                  {Number(studentData.batch) - 4} - {Number(studentData.batch)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[14px] font-[500] text-[#666666]">Branch</p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">
                  {studentData.branch}
                </p>
              </div>
            </div>
          </div>

          {/* Skills section with improved styling */}
        </div>

        {/* Student's Resume */}
        <div
          className="w-full md:w-1/2 bg-[#FFFFFF] rounded-[12px] px-[24px] py-[24px]"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        >
          <p className="font-[600] text-[22px] text-[#212121] mb-[16px]">
            Student's Resume
          </p>
          <div className="border-b border-[#E0E0E0] mb-[16px]"></div>

          <div
            className="flex gap-[20px] items-center mt-[20px] px-[24px] py-[20px] bg-[#1E40AF10] rounded-[12px] border border-[#1E40AF20]"
            style={{ boxShadow: "0px 2px 4px 0px #00000010" }}
          >
            <BiSolidFilePdf className="w-[40px] h-[40px] text-[#282FE6] flex-shrink-0" />
            {studentData?.resume?.url ? (
              <div className="flex-grow">
                <p className="font-[500] text-[#000] leading-[24px] text-[16px]">
                  Resume.pdf
                </p>
                <p className="font-[400] text-[#666] leading-[20px] text-[13px]">
                  <span>
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
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "N/A"}
                  </span>
                </p>
              </div>
            ) : (
              <p className="font-[500] text-[#000] leading-[24px] text-[16px]">
                No Resume Uploaded
              </p>
            )}
          </div>

          {studentData?.resume?.url && (
            <Link
              to={studentData?.resume?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-[16px] bg-[#161A80] hover:bg-[#29A8EF] text-white py-[10px] rounded-[8px] font-[500] transition-colors flex items-center justify-center gap-[8px]"
            >
              <FaDownload className="w-[14px] h-[14px]" />
              Download Resume
            </Link>
          )}
        </div>
      </div>

      {/* Student Applications - Full Width */}
      <div
        className="w-full bg-[#FFFFFF] rounded-[12px] px-[24px] py-[24px]"
        style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
      >
        <div className="flex justify-between items-center mb-[16px]">
          <p className="font-[600] text-[22px] text-[#212121]">
            Student Applications
          </p>
          {/* <p className="text-[14px] font-[500] text-[#666666]">
            Total: <span className="text-[#161A80]">{applications.length}</span>
          </p> */}
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
                    <p className="font-[600] text-[18px] text-[#212121]">
                      {application.job.title}
                    </p>
                    {/* <span
                      className={`px-[12px] py-[2px] rounded-full text-[14px] border ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span> */}
                  </div>

                  <div className="flex flex-wrap gap-x-[24px] mt-[6px]">
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
                  </div>

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
    </div>
  );
};

export default StudentProfile;
