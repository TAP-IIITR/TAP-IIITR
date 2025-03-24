import axios from "axios";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAlarm } from "react-icons/io";
import { MdCurrencyRupee, MdOutlineBusinessCenter } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { toast } from "react-toastify";

interface FormField {
  id: string;
  label: string;
  type: "text" | "file" | "number" | "textarea";
  required: boolean;
  placeholder?: string;
  accept?: string;
  readOnly?: boolean;
  value?: string | number;
}

interface FormSection {
  sectionId: string;
  title: string;
  fields: FormField[];
}

const FullCompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const applicationFormRef = useRef<HTMLDivElement>(null);
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/student/${id}`,
        {
          withCredentials: true,
        }
      );
      
      if (data.success) {
        setJobData(data.data);
      } else {
        toast.error("Failed to load job data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching job data"
        );
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

  const handleApplyNow = () => {
    setShowApplicationForm(true);
    setTimeout(() => {
      applicationFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleExitApplication = () => {
    setShowApplicationForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    handleExitApplication();
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

  if (!jobData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No job data available</p>
      </div>
    );
  }

  // Define pre-filled fields
  const preFilledFields: FormSection[] = [
    {
      sectionId: "personal",
      title: "Personal Information",
      fields: [
        {
          id: "fullName",
          label: "Name",
          type: "text",
          required: true,
          readOnly: true,
          value: `${jobData.student.firstName} ${jobData.student.lastName}`,
        },
        {
          id: "email",
          label: "Email",
          type: "text",
          required: true,
          readOnly: true,
          value: jobData.student.regEmail,
        },
        {
          id: "phone",
          label: "Phone Number",
          type: "text",
          required: true,
          readOnly: true,
          value: jobData.student.mobile,
        },
      ],
    },
    {
      sectionId: "academic",
      title: "Academic Information",
      fields: [
        {
          id: "rollNumber",
          label: "Roll Number",
          type: "text",
          required: true,
          readOnly: true,
          value: jobData.student.id,
        },
        {
          id: "branch",
          label: "Branch",
          type: "text",
          required: true,
          readOnly: true,
          value: jobData.student.branch,
        },
        {
          id: "cgpa",
          label: "CGPA",
          type: "text",
          required: true,
          readOnly: true,
          value: jobData.student.cgpa.toString(),
        },
      ],
    },
  ];

  // Get labels of pre-filled fields to filter out duplicates
  const preFilledLabels = new Set(
    preFilledFields
      .flatMap(section => section.fields)
      .map(field => field.label.toLowerCase())
  );

  // Filter out fields that are already pre-filled
  const additionalFields = jobData.form.filter(
    (field: any) => !preFilledLabels.has(field.label.toLowerCase())
  );

  // Generate form configuration
  const applicationFormConfig: FormSection[] = [
    ...preFilledFields,
    ...(additionalFields.length > 0
      ? [{
          sectionId: "additional",
          title: "Additional Information",
          fields: additionalFields.map((field: any, index: number) => ({
            id: `additional-${index}`,
            label: field.label,
            type: field.type as "text" | "file" | "textarea",
            required: true,
            placeholder: `Enter ${field.label.toLowerCase()}`,
            accept: field.type === "file" ? ".pdf,.doc,.docx" : undefined,
          })),
        }]
      : []),
  ];

  return (
    <div className="flex flex-col gap-[16px] p-[8px] md:p-[16px]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#161A80] hover:text-[#29A8EF] w-fit transition-colors"
      >
        <FaArrowLeft size={14} /> Back to Applications
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
                Required Skills
              </p>
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
            onClick={handleApplyNow}
            disabled={showApplicationForm || jobData.hasApplied}
            className={`w-full py-[12px] rounded-[10px] font-[600] text-[16px] transition-colors sticky bottom-4 lg:static ${
              showApplicationForm || jobData.hasApplied
                ? "bg-[#A0A0A0] cursor-not-allowed"
                : "bg-[#161A80] hover:bg-[#14137D] text-white"
            }`}
          >
            {showApplicationForm
              ? "Application in Progress"
              : jobData.hasApplied
              ? "Already Applied"
              : "Apply Now"}
          </button>
        </div>
      </div>

      {showApplicationForm && (
        <div
          ref={applicationFormRef}
          className="mt-8 bg-white rounded-[12px] p-[16px] md:p-[24px]"
          style={{
            boxShadow:
              "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="mb-6">
            <h2 className="text-[28px] font-[600] text-[#161A80]">
              Application Form
            </h2>
            <p className="text-[#666666] text-[14px] mt-2">
              Please fill in all the required fields marked with an asterisk (*).
              Pre-filled fields cannot be modified.
            </p>
          </div>

          <form onSubmit={handleSubmitApplication} className="space-y-8">
            {applicationFormConfig.map((section) => (
              <div key={section.sectionId} className="space-y-4">
                <h3 className="text-[20px] font-[600] text-[#161A80] pb-2 border-b-2 border-[#E0E0E0]">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.map((field) => (
                    <div
                      key={field.id}
                      className={`${
                        field.type === "file" || field.type === "textarea"
                          ? "md:col-span-2"
                          : ""
                      } transition-all duration-200 ease-in-out`}
                    >
                      <label className="block text-[15px] font-[500] text-[#444444] mb-2">
                        {field.label}
                        {field.required && (
                          <span className="text-[#DC2626] ml-1">*</span>
                        )}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          required={field.required}
                          placeholder={field.placeholder}
                          className={`w-full p-3 border-2 border-[#E0E0E0] rounded-[8px] focus:outline-none transition-all
                            ${field.readOnly ? 'bg-gray-100 cursor-not-allowed' : 'focus:border-[#161A80] focus:ring-1 focus:ring-[#161A80]'}
                            min-h-[100px]`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          required={field.required}
                          accept={field.accept}
                          placeholder={field.placeholder}
                          value={field.value}
                          readOnly={field.readOnly}
                          className={`w-full p-3 border-2 border-[#E0E0E0] rounded-[8px] focus:outline-none transition-all
                            ${field.readOnly ? 'bg-gray-100 cursor-not-allowed' : 'focus:border-[#161A80] focus:ring-1 focus:ring-[#161A80]'}
                            file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold
                            file:bg-[#161A80] file:text-white hover:file:bg-[#14137D]`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="submit"
                className="flex-1 bg-[#161A80] hover:bg-[#14137D] text-white py-[14px] rounded-[10px] font-[600] text-[16px] transition-all duration-200 hover:shadow-lg"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={handleExitApplication}
                className="flex-1 border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] py-[14px] rounded-[10px] font-[600] text-[16px] transition-all duration-200"
              >
                Cancel Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FullCompanyDetails;