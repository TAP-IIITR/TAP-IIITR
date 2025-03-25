import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdAlarm } from "react-icons/io";
import { MdCorporateFare, MdOutlineBusinessCenter } from "react-icons/md";

interface ApplicationCompanyCardProps {
  data: any;
}

const ApplicationCompanyCard = ({ data }: ApplicationCompanyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function formatTimestamp(timestamp: any) {
    if (!timestamp?.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      {/* Main Card */}
      <div className="h-auto min-h-[127px] w-full border border-[#E0E0E0] rounded-[12px] flex flex-col md:flex-row items-start md:items-center justify-between px-5 py-4">
        <div className="flex flex-col">
          <p className="text-[#212121] font-semibold text-[20px] md:text-[25px]">
            {data.job.title}
          </p>
          <div className="flex gap-2">
            <MdCorporateFare className="h-7 w-7 text-[#212121]" />
            <p className="text-[#3D3D3D] text-[18px] font-medium">
              {data.job.company}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-2">
              <MdOutlineBusinessCenter className="h-4 w-4 text-[#212121]" />
              <p className="text-[#3D3D3D] text-sm">{data.job.jobType}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoMdAlarm className="h-4 w-4 text-[#212121]" />
              <p className="text-[#3D3D3D] text-sm">
                {formatTimestamp(data.job.deadline)}
              </p>
            </div>
          </div>
        </div>

        {/* View Application Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3 md:mt-0"
        >
          View Application
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-center">
              Application Details
            </h2>
            <div className="mt-4">
              {Object.entries(data?.form || {}).map(([key, value]) => (
                <p key={key} className="text-gray-600 text-sm mt-2">
                  <span className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  : {String(value) || "N/A"}
                </p>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationCompanyCard;
