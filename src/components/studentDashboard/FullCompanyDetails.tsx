import { MdCorporateFare, MdCurrencyRupee, MdOutlineWorkOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoMdAlarm } from "react-icons/io";
import { useState } from "react";

const FullCompanyDetails = () => {
  const [isApplied, setIsApplied] = useState(false);
  
  const handleApply = () => {
    setIsApplied(true);
    setTimeout(() => {
      alert("Application submitted successfully!");
    }, 100);
  };

  return (
    <div className="flex flex-col gap-[20px] px-4 md:px-6 py-6 max-w-[1200px] mx-auto">
      {/* Company & Job Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-[12px] p-6 shadow-sm">
        <div className="w-full md:w-auto mb-6 md:mb-0">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-[#E0E0E0] rounded-full flex items-center justify-center">
              <MdCorporateFare className="w-6 h-6 text-[#212121]" />
            </div>
            <p className="text-[20px] font-[600] text-[#161A80]">TechCorp</p>
          </div>
          <h1 className="text-[24px] md:text-[32px] font-[600] text-[#212121]">
            Software Engineer
          </h1>
        </div>
        <button
          onClick={handleApply}
          disabled={isApplied}
          className={`${
            isApplied ? 'bg-gray-500' : 'bg-[#DC2626] hover:bg-[#B91C1C]'
          } text-white px-6 py-3 rounded-lg font-[600] text-[16px] transition-colors w-full md:w-auto`}
        >
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>

      {/* Job Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CiLocationOn className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#666666]">Location</p>
          </div>
          <p className="text-[16px] font-[500]">Ranchi, Jharkhand</p>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MdOutlineWorkOutline className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#666666]">Job Type</p>
          </div>
          <p className="text-[16px] font-[500]">Full Time</p>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MdCurrencyRupee className="w-5 h-5 text-[#161A80]" />
            <p className="text-[14px] text-[#666666]">Package</p>
          </div>
          <p className="text-[16px] font-[500]">₹12,00,000/annum</p>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm">
        <h2 className="text-[20px] font-[600] text-[#212121] mb-4">Job Description</h2>
        <div className="prose max-w-none">
          <p className="text-[16px] text-[#3D3D3D] mb-4">
            We are looking for a skilled Software Engineer to join our development team.
          </p>
          <div className="mb-4">
            <h3 className="text-[18px] font-[500] text-[#212121] mb-2">Responsibilities:</h3>
            <ul className="list-disc list-inside space-y-1 text-[#3D3D3D]">
              <li>Developing and maintaining web applications</li>
              <li>Collaborating with cross-functional teams</li>
              <li>Writing clean, maintainable code</li>
              <li>Implementing best practices in software development</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-[500] text-[#212121] mb-2">Requirements:</h3>
            <ul className="list-disc list-inside space-y-1 text-[#3D3D3D]">
              <li>3+ years of experience in full-stack development</li>
              <li>Strong proficiency in React and Node.js</li>
              <li>Experience with cloud technologies</li>
              <li>Excellent problem-solving skills</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm">
        <h2 className="text-[20px] font-[600] text-[#212121] mb-4">Timeline</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center mr-4">
              <IoMdAlarm className="w-4 h-4 text-[#161A80]" />
            </div>
            <div>
              <p className="text-[14px] text-[#666666]">Application Deadline</p>
              <p className="text-[16px] font-[500]">December 15, 2023</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center mr-4">
              <IoMdAlarm className="w-4 h-4 text-[#161A80]" />
            </div>
            <div>
              <p className="text-[14px] text-[#666666]">Starting Date</p>
              <p className="text-[16px] font-[500]">January 15, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Apply Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
        <button
          onClick={handleApply}
          disabled={isApplied}
          className={`${
            isApplied ? 'bg-gray-500' : 'bg-[#DC2626] hover:bg-[#B91C1C]'
          } text-white px-6 py-3 rounded-lg font-[600] text-[16px] transition-colors w-full`}
        >
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default FullCompanyDetails;
