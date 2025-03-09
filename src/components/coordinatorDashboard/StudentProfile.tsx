import { useParams, useNavigate } from "react-router-dom";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { FaGraduationCap, FaLinkedin, FaBirthdayCake, FaExternalLinkAlt } from "react-icons/fa";

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // In a real application, you would fetch the student data based on the ID
  const student = {
    id: parseInt(studentId || "1"),
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    branch: "Computer Science and Engineering",
    dob: "01 January, 2002",
    linkedin: "linkedin.com/in/john-doe-20swswwdw",
    enrollment: "2020UGCS001",
    cgpa: "9.5",
    batch: "2020-2024",
    resumeUrl: "#",
    resumeName: "Resume_John_Doe.pdf",
    resumeUploadDate: "16 May, 2024",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Python", "Machine Learning", "Data Structures", "Cloud Computing", "AWS", "Docker", "Kubernetes"],
    achievements: [
      "Winner, Inter-College Hackathon 2023",
      "3rd place in CodeChef Regional Contest",
      "Published paper in International Conference on Machine Learning",
      "Smart India Hackathon Finalist 2022",
      "ACM-ICPC Regional Qualifier"
    ],
    projects: [
      {
        title: "Smart Home Automation System",
        description: "IoT-based project to control home appliances using a mobile app and voice commands"
      },
      {
        title: "AI Image Recognition App",
        description: "Mobile application that uses machine learning to identify objects in images with 95% accuracy"
      },
      {
        title: "Blockchain-based Supply Chain",
        description: "Decentralized application for tracking product authenticity and supply chain transparency"
      }
    ]
  };

  // Enhanced mock applications data with more entries
  const applications = [
    {
      id: 1,
      role: "Software Engineer",
      company: "TechCorp",
      status: "Selected",
      appliedDate: "2 May, 2024",
      package: "₹18 LPA",
      location: "Bangalore, India",
      jobType: "Full-time",
      interviewDate: "15 May, 2024"
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "WebSolutions",
      status: "Pending",
      appliedDate: "5 May, 2024",
      package: "₹15 LPA",
      location: "Hyderabad, India",
      jobType: "Full-time",
      interviewDate: "18 May, 2024"
    },
    {
      id: 3,
      role: "Data Scientist",
      company: "DataMinds",
      status: "Rejected",
      appliedDate: "10 May, 2024",
      package: "₹22 LPA",
      location: "Pune, India",
      jobType: "Full-time",
      interviewDate: "12 May, 2024"
    },
    {
      id: 4,
      role: "Product Manager",
      company: "Innovate Tech",
      status: "Selected",
      appliedDate: "15 May, 2024",
      package: "₹20 LPA",
      location: "Mumbai, India",
      jobType: "Full-time",
      interviewDate: "22 May, 2024"
    },
    {
      id: 5,
      role: "Machine Learning Engineer",
      company: "AI Solutions",
      status: "Pending",
      appliedDate: "18 May, 2024",
      package: "₹24 LPA",
      location: "Delhi, India",
      jobType: "Full-time",
      interviewDate: "25 May, 2024"
    },
    {
      id: 6,
      role: "DevOps Engineer",
      company: "CloudTech",
      status: "Pending",
      appliedDate: "20 May, 2024",
      package: "₹16 LPA",
      location: "Chennai, India",
      jobType: "Full-time",
      interviewDate: "27 May, 2024"
    },
    {
      id: 7,
      role: "UI/UX Designer",
      company: "DesignHub",
      status: "Selected",
      appliedDate: "1 May, 2024",
      package: "₹14 LPA",
      location: "Bangalore, India",
      jobType: "Full-time",
      interviewDate: "10 May, 2024"
    },
    {
      id: 8,
      role: "Backend Developer",
      company: "ServerLogic",
      status: "Rejected",
      appliedDate: "8 May, 2024",
      package: "₹17 LPA",
      location: "Hyderabad, India",
      jobType: "Full-time",
      interviewDate: "16 May, 2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selected":
        return "text-green-600 bg-green-50 border-green-200";
      case "Rejected":
        return "text-red-600 bg-red-50 border-red-200";
      case "Pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col gap-[26px]">
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
            {student.name}
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
              <FaBirthdayCake className="text-[#161A80] h-[20px] w-[20px]" />
            </div>
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">Date of Birth</p>
              <p className="text-[16px] font-[400] text-[#212121]">{student.dob}</p>
            </div>
          </div>
          
          <div className="flex gap-[16px] items-center">
            <div className="bg-[#E0E0E0] h-[40px] w-[40px] rounded-full flex items-center justify-center flex-shrink-0">
              <MdOutlineEmail className="text-[#161A80] h-[20px] w-[20px]" />
            </div>
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">Email Address</p>
              <p className="text-[16px] font-[400] text-[#212121]">{student.email}</p>
            </div>
          </div>
          
          <div className="flex gap-[16px] items-center">
            <div className="bg-[#E0E0E0] h-[40px] w-[40px] rounded-full flex items-center justify-center flex-shrink-0">
              <MdPhone className="text-[#161A80] h-[20px] w-[20px]" />
            </div>
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">Phone Number</p>
              <p className="text-[16px] font-[400] text-[#212121]">{student.phone}</p>
            </div>
          </div>
          
          <div className="flex gap-[16px] items-center">
            <div className="bg-[#E0E0E0] h-[40px] w-[40px] rounded-full flex items-center justify-center flex-shrink-0">
              <FaLinkedin className="text-[#161A80] h-[20px] w-[20px]" />
            </div>
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">LinkedIn Profile</p>
              <div className="flex items-center gap-[6px]">
                <p className="text-[16px] font-[400] text-[#212121]">{student.linkedin}</p>
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
              <p className="text-[14px] font-[500] text-[#666666]">Enrollment Number</p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">{student.enrollment}</p>
              </div>
            </div>
            
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">CGPA</p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">{student.cgpa}</p>
              </div>
            </div>
            
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">Batch</p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">{student.batch}</p>
              </div>
            </div>
            
            <div>
              <p className="text-[14px] font-[500] text-[#666666]">Branch</p>
              <div className="flex gap-[10px] items-center mt-[4px]">
                <FaGraduationCap className="text-[#161A80] h-[18px] w-[18px]" />
                <p className="text-[16px] font-[500] text-[#212121]">{student.branch}</p>
              </div>
            </div>
          </div>
          
          {/* Skills section with improved styling */}
          <div className="mt-[24px]">
            <p className="text-[16px] font-[600] text-[#212121] mb-[12px] border-l-4 border-[#161A80] pl-[10px]">Skills</p>
            <div className="flex flex-wrap gap-[8px]">
              {student.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-[#F0F7FF] text-[#161A80] px-[12px] py-[6px] rounded-[20px] text-[14px] font-[500] border border-[#D0E1FF]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
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
            <div className="flex-grow">
              <p className="font-[500] text-[#000] leading-[24px] text-[16px]">
                {student.resumeName}
              </p>
              <p className="font-[400] text-[#666] leading-[20px] text-[13px]">
                Uploaded on {student.resumeUploadDate}
              </p>
            </div>
            <button className="bg-[#161A80] hover:bg-[#29A8EF] rounded-full p-2 transition-colors">
              <FaDownload className="w-[18px] h-[18px] text-white" />
            </button>
          </div>
          
          <button className="w-full mt-[16px] bg-[#161A80] hover:bg-[#29A8EF] text-white py-[10px] rounded-[8px] font-[500] transition-colors flex items-center justify-center gap-[8px]">
            <FaDownload className="w-[14px] h-[14px]" />
            Download Resume
          </button>
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
          <p className="text-[14px] font-[500] text-[#666666]">
            Total: <span className="text-[#161A80]">{applications.length}</span>
          </p>
        </div>
        <div className="border-b border-[#E0E0E0] mb-[16px]"></div>
        
        <div className="flex flex-col gap-[16px]">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-[20px] rounded-[8px] border border-[#E0E0E0] hover:shadow-md transition-shadow"
              >
                <div className="mb-[12px] md:mb-0">
                  <div className="flex flex-wrap items-center gap-[12px]">
                    <p className="font-[600] text-[18px] text-[#212121]">
                      {application.role}
                    </p>
                    <span
                      className={`px-[12px] py-[2px] rounded-full text-[14px] border ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-[24px] mt-[6px]">
                    <p className="font-[500] text-[16px] text-[#484848]">
                      {application.company}
                    </p>
                    <p className="font-[400] text-[14px] text-[#666666]">
                      {application.location}
                    </p>
                    <p className="font-[600] text-[14px] text-[#161A80]">
                      {application.package}
                    </p>
                    <p className="font-[400] text-[14px] text-[#666666]">
                      {application.jobType}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-[24px] mt-[4px]">
                    <p className="font-[400] text-[14px] text-[#9E9E9E]">
                      Applied on: {application.appliedDate}
                    </p>
                    {application.interviewDate && (
                      <p className="font-[400] text-[14px] text-[#9E9E9E]">
                        Interview date: {application.interviewDate}
                      </p>
                    )}
                  </div>
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
