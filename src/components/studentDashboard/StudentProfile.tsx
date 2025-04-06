import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaDownload, FaEdit, FaUpload } from "react-icons/fa";
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
      console.log(" the data is ",file)

      const { data } = await axios.put("/api/student/resume/", {resume:file,resumeUrl:userData?.resume}, {
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[23px]">
      <div className="flex flex-col">
        <p className="font-[400] text-[28px] text-[#161A80]">
          Welcome,{" "}
          <span className="font-[500] text-[36px] text-[#161A80]">
            {userData?.first_name} {userData?.last_name}
          </span>
        </p>
      </div>
      <div
        className="w-full bg-[#FFFFFF] h-fit rounded-[8px] px-[16px] py-[20px]"
        style={{ boxShadow: "0px 2px 4px 0px #00000040" }}
      >
        <p className="font-[600] text-[20px] text-[#212121] pl-[16px]">
          Personal Details
        </p>
        <div className="border border-[#212121] mt-[2px]"></div>
        <div className="flex flex-col gap-[5px] mt-[12px] px-[16px]">
          <p className="font-[500] text-[#212121] text-[16px]">
            Email Address:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              {userData?.email}
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            Phone Number:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              +91 {userData?.mobile}
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            LinkedIn Profile:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              {userData?.linkedin}
            </span>
          </p>
        </div>
      </div>
      <div
        className="w-full bg-[#FFFFFF] h-fit rounded-[8px] px-[16px] py-[20px]"
        style={{ boxShadow: "0px 2px 4px 0px #00000040" }}
      >
        <p className="font-[600] text-[20px] text-[#212121] pl-[16px]">
          Academic Details
        </p>
        <div className="border border-[#212121] mt-[2px]"></div>
        <div className="flex flex-col gap-[5px] mt-[12px] px-[16px]">
          <p className="font-[500] text-[#212121] text-[16px]">
            Enrollment Number:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              {userData?.rollNumber.toUpperCase()}
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            CGPA:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              {userData?.cgpa}
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            Batch:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              {Number(userData?.batch) - 4} - {Number(userData?.batch)}
            </span>
          </p>
          <p className="font-[500] text-[#212121] text-[16px]">
            Branch:
            <span className="font-[400] text-[#212121] text-[16px]">
              {" "}
              {userData?.branch}
            </span>
          </p>
        </div>
      </div>
      <div
        className="w-full bg-[#FFFFFF] h-fit rounded-[8px] px-[16px] py-[20px]"
        style={{ boxShadow: "0px 2px 4px 0px #00000040" }}
      >
        <p className="font-[600] text-[20px] text-[#212121] pl-[16px]">
          Student's Resume
        </p>
        <div className="border border-[#212121] mt-[2px]"></div>

        {userData?.resume ? (
          <div
            className="flex gap-[20px] items-center justify-between mt-[12px] px-[32px] py-[16px] bg-[#1E40AF21]  rounded-[12px] w-full"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            <div className=" flex items-center  gap-2">
            <BiSolidFilePdf className="w-[32px] h-[32px] text-[#282FE6]" />
            <div className="flex flex-col">
              <p className="font-[500] text-[#000] leading-[24px] text-[16px]">
                Resume
              </p>
            </div>
            </div>

            <div className="flex gap-[20px]">
              <Link to={userData.resume} target="_blank" rel="noopener noreferrer">
                <FaDownload 
                  className="w-[20px] h-[20px] text-[#000] cursor-pointer" 
                  title="Download Resume"
                />
              </Link>

              <FaEdit 
                className="w-[20px] h-[20px] text-[#000] cursor-pointer" 
                onClick={handleUpdateClick}
                title="Update Resume"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-[20px] gap-[16px]">
            <p className="text-gray-500">No resume uploaded yet</p>
            <button
              onClick={handleUploadClick}
              disabled={uploading}
              className="flex items-center gap-2 bg-[#161A80] text-white px-4 py-2 rounded-md hover:bg-[#10126e] transition-colors"
            >
              <FaUpload />
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        )}

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
    </div>
  );
};

export default StudentProfile;