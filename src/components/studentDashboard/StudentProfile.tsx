import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaDownload, FaEdit, FaUpload, FaUserCircle, FaGraduationCap, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface StudentData {
  first_name: string;
  last_name: string;
  email: string;
  resume: string | null;
  any_other_demands: string | null;
  batch: string;
  branch: string;
  cgpa: number;
  linkedin: string;
  mobile: string;
  rollNumber: string;
}

const StudentProfile = () => {
  const [userData, setUserData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateInputRef = useRef<HTMLInputElement>(null);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/student", {
        withCredentials: true,
      });

      if (data.status === 200) {
        setUserData(data.student);
        console.log(data.student);
      } else {
        toast.error("Failed to load student data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleUpdateClick = () => {
    updateInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is a PDF
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await axios.post("/api/student/resume/upload-url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (data.status === 200) {
        toast.success("Resume uploaded successfully");
        fetchUserData(); 
      } else {
        toast.error("Failed to upload resume");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error uploading resume");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is a PDF
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setUploading(true);

    try { 
      console.log(" the data is ", file);

      const { data } = await axios.put("/api/student/resume/", {resume: file, resumeUrl: userData?.resume}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (data.status === 200) {
        toast.success("Resume updated successfully");
        fetchUserData(); 
      } else {
        toast.error("Failed to update resume");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error updating resume");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header with avatar */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md">
        <div className="h-[60px] w-[60px] md:h-[80px] md:w-[80px] bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
          <span className="text-xl md:text-3xl font-bold">
            {userData?.first_name.charAt(0)}{userData?.last_name.charAt(0)}
          </span>
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            {userData?.first_name} {userData?.last_name}
          </h1>
          <p className="text-indigo-600 font-medium">{userData?.branch} • {Number(userData?.batch) - 4} - {Number(userData?.batch)}</p>
        </div>
      </div>

      {/* Personal Details Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex items-center gap-3 p-5 bg-indigo-50 border-b border-indigo-100">
          <FaUserCircle className="text-indigo-700 text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">Email Address</span>
              <span className="text-gray-800 font-medium">{userData?.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">Phone Number</span>
              <span className="text-gray-800 font-medium">+91 {userData?.mobile}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">LinkedIn Profile</span>
              <a href={userData?.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                {userData?.linkedin}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Details Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex items-center gap-3 p-5 bg-indigo-50 border-b border-indigo-100">
          <FaGraduationCap className="text-indigo-700 text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">Academic Details</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">Enrollment Number</span>
              <span className="text-gray-800 font-medium">{userData?.rollNumber.toUpperCase()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">CGPA</span>
              <div className="flex items-center">
                <span className="text-gray-800 font-medium">{userData?.cgpa}</span>
                <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full" 
                    style={{ width: `${((userData?.cgpa?userData.cgpa:0 )/ 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">Batch</span>
              <span className="text-gray-800 font-medium">{Number(userData?.batch) - 4} - {Number(userData?.batch)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">Branch</span>
              <span className="text-gray-800 font-medium">{userData?.branch}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex items-center gap-3 p-5 bg-indigo-50 border-b border-indigo-100">
          <FaFileAlt className="text-indigo-700 text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">Resume</h2>
        </div>
        <div className="p-6">
          {userData?.resume ? (
            <div className="bg-white border border-indigo-100 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <BiSolidFilePdf className="text-indigo-600 text-2xl" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Resume.pdf</p>
                  <p className="text-gray-500 text-sm">Click on the download icon to view your resume</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link 
                  to={userData.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-indigo-50 hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaDownload className="text-indigo-700" title="Download Resume" />
                </Link>
                <button
                  onClick={handleUpdateClick}
                  className="h-10 w-10 bg-indigo-50 hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaEdit className="text-indigo-700" title="Update Resume" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <FaFileAlt className="text-indigo-600 text-2xl" />
              </div>
              <p className="text-gray-600 mb-4 text-center">No resume uploaded yet. Upload your resume to make it available to recruiters.</p>
              <button
                onClick={handleUploadClick}
                disabled={uploading}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-70"
              >
                <FaUpload />
                {uploading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="application/pdf"
      />
      <input
        type="file"
        ref={updateInputRef}
        onChange={handleResumeUpdate}
        className="hidden"
        accept="application/pdf"
      />
    </div>
  );
};

export default StudentProfile;