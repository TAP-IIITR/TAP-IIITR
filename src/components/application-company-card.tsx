import { Building2, Clock, IndianRupee } from "lucide-react";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

interface ApplicationCompanyCardProps {
  data: any;
}

const ApplicationCompanyCard = ({ data }: ApplicationCompanyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (deadline: Timestamp | string) => {
    let date: Date;

    // Check if deadline is a Firestore timestamp object
    if (deadline && typeof deadline === "object" && "seconds" in deadline) {
      // Convert Firestore timestamp to Date
      date = new Date(deadline.seconds * 1000);
    }
    // Check if deadline is an ISO string
    else if (typeof deadline === "string") {
      // Parse ISO string to Date
      date = new Date(deadline);
    }
    // Fallback for unexpected format
    else {
      return "Invalid date";
    }

    // Return formatted date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Main Card */}
      <div className="group relative overflow-hidden bg-white rounded-lg px-6 py-5 shadow-sm border border-gray-300 hover:shadow-md hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1">
        {/* Gradient accent on hover */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
              {data.job.title}
            </h2>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                <Building2 className="text-indigo-600 w-4 h-4" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {data.job.company}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-4 mt-1">
              {data.job.location && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
                  <IoLocationOutline className="text-gray-500 group-hover:text-indigo-500 transition-colors duration-300" />
                  <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">
                    {data.job.location}
                  </span>
                </div>
              )}
              {data.job.jobType && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
                  <MdBusinessCenter className="text-gray-500 group-hover:text-indigo-500 transition-colors duration-300" />
                  <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">
                    {data.job.jobType}
                  </span>
                </div>
              )}
              {data.job.package && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
                  <IndianRupee className="text-gray-500 w-4 h-4 group-hover:text-indigo-500 transition-colors duration-300" />
                  <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">
                    {data.job.package}
                  </span>
                </div>
              )}
              {data.job.deadline && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-indigo-50 transition-colors duration-300">
                  <Clock className="text-gray-500 w-4 h-4 group-hover:text-indigo-500 transition-colors duration-300" />
                  <span className="text-xs text-gray-600 group-hover:text-indigo-600 transition-colors duration-300">
                    {formatDate(data.job.deadline)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative overflow-hidden bg-indigo-600 text-white text-sm font-medium py-2 px-5 rounded-md hover:bg-indigo-700 transition-all duration-300"
            >
              <span className="relative z-10">View Application </span>
              <div className="absolute inset-0 w-full h-full bg-indigo-800 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-center">
              Application Details
            </h2>
            <div className="mt-4">
            {data.form &&
                Object.entries(data.form).map(([key, value]) => (
                  <div
                    key={key}
                    className="py-2 border-b border-gray-100 dark:border-gray-700 flex gap-3"
                  >
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize block">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-sm text-gray-800 dark:text-gray-200">
                      {value !== null && value !== undefined
                        ? String(value)
                        : "N/A"}
                    </span>
                  </div>
                ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
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
