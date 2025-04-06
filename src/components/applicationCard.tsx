import { Building2 } from "lucide-react";

interface ApplicationCompanyCardProps {
  data: any;
}

const ApplicationCard = ({ data }: ApplicationCompanyCardProps) => {


  return (
    <>
      {/* Main Card */}
      <div className="group relative overflow-hidden bg-white rounded-lg px-6 py-2 shadow-sm border border-gray-300 hover:shadow-md hover:border-blue-100 transition-all duration-300 transform ">
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex items-center ">
          <div className="flex flex-col gap-1">


            <div className="flex items-center gap-1.5 text-lg">
              <div className="flex  items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                <Building2 className="text-indigo-600 w-6 h-6" />
              </div>
              <span className=" text-gray-900 font-medium">
                {data.job.company}
              </span>
            </div>
            <h2 className=" font-semibold text-gray-600 group-hover:text-indigo-700 transition-colors duration-300">
              {data.job.title}
            </h2>
          </div>


        </div>
      </div>

    </>
  );
};



export default ApplicationCard
