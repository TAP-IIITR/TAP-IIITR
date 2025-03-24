import { CiLocationOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAlarm } from "react-icons/io";
import { MdCurrencyRupee, MdOutlineBusinessCenter } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";

interface FormFieldBase {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string;
}

interface TextFieldConfig extends FormFieldBase {
  type: 'text';
}

interface FileFieldConfig extends FormFieldBase {
  type: 'file';
  accept: string;
}

type FormFieldConfig = TextFieldConfig | FileFieldConfig;

const FullCompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const applicationFormRef = useRef<HTMLDivElement>(null);

  const skills = [
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
    "Java",
    "Spring Boot",
    "Redis",
    "Git",
  ];

  const formFields: FormFieldConfig[] = [
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name'
    },
    {
      id: 'photo',
      label: 'Profile Photo',
      type: 'file',
      required: true,
      accept: 'image/*'
    },
    {
      id: 'resume',
      label: 'Resume',
      type: 'file',
      required: true,
      accept: '.pdf,.doc,.docx'
    }
  ];

  const handleApplyNow = () => {
    setShowApplicationForm(true);
    setTimeout(() => {
      applicationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleExitApplication = () => {
    setShowApplicationForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted successfully!');
    handleExitApplication();
  };

  return (
    <div className="flex flex-col gap-[16px] p-[8px] md:p-[16px]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#161A80] hover:text-[#29A8EF] w-fit transition-colors"
      >
        <FaArrowLeft size={14} /> Full time Intern
      </button>

      {/* Company Name */}
      <p className="text-[28px] md:text-[36px] font-[600] text-[#161A80] leading-[34px] md:leading-[44px]">
        ARYA'S DUMMY COMPANY
      </p>

      <div className="flex flex-col lg:flex-row gap-[16px]">
        {/* Left Section - Job Details */}
        <div className="w-full lg:w-[78%] flex flex-col gap-[16px]">
          {/* Job Header Section */}
          <div
            className="bg-[#FFF] rounded-[12px] p-[16px] flex flex-col gap-[16px]"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <p className="font-[600] text-[28px] text-[#212121] leading-[34px]">
              Software Developer Intern
            </p>
            <div className="flex flex-wrap gap-[20px]">
              <div className="flex items-center gap-[6px]">
                <CiLocationOn className="h-[20px] w-[20px] text-[#212121]" />
                <p className="text-[#3D3D3D] font-[500] text-[14px] leading-[20px]">
                  Ranchi, JH
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <MdOutlineBusinessCenter className="h-[20px] w-[20px] text-[#212121]" />
                <p className="text-[#3D3D3D] font-[500] text-[14px] leading-[20px]">
                  Full-Time
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <MdCurrencyRupee className="h-[20px] w-[20px] text-[#212121]" />
                <p className="text-[#3D3D3D] font-[500] text-[14px] leading-[20px]">
                  12 LPA
                </p>
              </div>
            </div>

            {/* Job Description */}
            <div className="mt-[12px]">
              <p className="text-[22px] font-[600] text-[#212121] mb-[12px]">
                Job Description
              </p>
              <div className="space-y-[12px] text-[14px] text-[#3D3D3D] leading-[22px]">
                <p>
                  We are seeking an exceptional Software Developer Intern to
                  join our innovative technology team. This is an extraordinary
                  opportunity to work on cutting-edge projects while learning
                  from industry experts in a dynamic, fast-paced environment.
                </p>
                <div>
                  <p className="font-[500] mb-[8px]">Key Responsibilities:</p>
                  <ul className="list-disc list-inside space-y-[8px] ml-[16px]">
                    <li>Develop and maintain scalable software solutions</li>
                    <li>
                      Collaborate with cross-functional teams on project
                      requirements
                    </li>
                    <li>Write clean, maintainable, and efficient code</li>
                    <li>
                      Participate in code reviews and software architecture
                      discussions
                    </li>
                    <li>Debug and troubleshoot software issues</li>
                    <li>Create technical documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div className="mt-[16px]">
              <p className="text-[22px] font-[600] text-[#212121] mb-[12px]">
                Required Skills
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#F0F7FF] text-[#161A80] px-[12px] py-[6px] rounded-[20px] text-[14px] font-[500] border border-[#D0E1FF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="mt-[16px]">
              <p className="text-[22px] font-[600] text-[#212121] mb-[12px]">
                Eligibility Criteria
              </p>
              <ul className="list-disc list-inside text-[14px] text-[#3D3D3D] leading-[22px] space-y-[8px]">
                <li>B.Tech/B.E. in Computer Science or related field</li>
                <li>Minimum CGPA of 7.5 throughout academic career</li>
                <li>No active backlogs at the time of application</li>
                <li>Strong problem-solving and analytical skills</li>
                <li>Excellent written and verbal communication abilities</li>
                <li>Ability to work independently and in a team environment</li>
                <li>Prior internship experience is a plus</li>
                <li>
                  Open to full-time employment after internship completion
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[22%] flex flex-col gap-[16px] order-first lg:order-last">
          {/* Important Dates */}
          <div
            className="bg-[#FFF] rounded-[12px] p-[16px]"
            style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
          >
            <p className="text-[20px] md:text-[22px] font-[600] text-[#212121] mb-[12px]">
              Important Dates
            </p>
            <div className="flex lg:flex-col gap-[12px] overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {/* Date items in horizontal scroll on mobile */}
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
                      December 15, 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-[280px] lg:w-auto">
                <div className="flex items-center gap-[12px]">
                  <div className="bg-[#F5F5F5] h-[40px] w-[40px] rounded-full flex items-center justify-center">
                    <IoMdAlarm className="h-[20px] w-[20px] text-[#161A80]" />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#666666]">
                      Assessment Round
                    </p>
                    <p className="text-[16px] font-[500] text-[#212121]">
                      December 20, 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-[280px] lg:w-auto">
                <div className="flex items-center gap-[12px]">
                  <div className="bg-[#F5F5F5] h-[40px] w-[40px] rounded-full flex items-center justify-center">
                    <IoMdAlarm className="h-[20px] w-[20px] text-[#161A80]" />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#666666]">
                      Interview Round
                    </p>
                    <p className="text-[16px] font-[500] text-[#212121]">
                      December 25, 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApplyNow}
            className="w-full bg-[#161A80] hover:bg-[#14137D] text-white py-[12px] rounded-[10px] font-[600] text-[16px] transition-colors sticky bottom-4 lg:static"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Application Form Section */}
      {showApplicationForm && (
        <div 
          ref={applicationFormRef}
          className="mt-8 bg-white rounded-[12px] p-[16px] md:p-[24px]"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        >
          <h2 className="text-[24px] font-[600] text-[#212121] mb-6">Application Form</h2>
          <form onSubmit={handleSubmitApplication} className="space-y-6">
            {formFields.map((field) => (
              <div key={field.id}>
                <label className="block text-[14px] font-[500] text-[#666666] mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  accept={field.type === 'file' ? field.accept : undefined}
                  placeholder={field.type === 'text' ? field.placeholder : undefined}
                  className="w-full p-3 border border-[#E0E0E0] rounded-[8px] focus:outline-none focus:border-[#161A80]"
                />
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#161A80] hover:bg-[#14137D] text-white py-[12px] rounded-[10px] font-[600] text-[16px] transition-colors"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={handleExitApplication}
                className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white py-[12px] rounded-[10px] font-[600] text-[16px] transition-colors"
              >
                Exit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FullCompanyDetails;
