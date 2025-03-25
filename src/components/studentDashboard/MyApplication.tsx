import { toast } from "react-toastify";
import ApplicationCompanyCard from "../application-company-card";
import axios from "axios";
import { useEffect, useState } from "react";

const MyApplication = () => {
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/student/mm`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.statusCode === 200) {
        setJobData(data.applications);
      } else {
        toast.error("Failed to load jobs data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching jobs data"
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
  }, []);

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
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col md:flex-row gap-[16px] md:gap-[28px]">
        <input
          className="w-full md:w-2/3 rounded-[16px] border border-[#9E9E9E] h-[52px] px-[20px] py-[16px] text-[16px] text-[#9E9E9E] font-[500]"
          placeholder="Search Jobs..."
        />
        <input className="w-full md:w-1/3 rounded-[16px] border border-[#9E9E9E] h-[52px]" />
      </div>
      <div
        className="flex flex-col bg-[#FFFFFF] rounded-[16px] w-full h-fit p-[24px] gap-[10px]"
        style={{ boxShadow: "1px 1px 6px 0px #00000040" }}
      >
        {jobData && jobData.length > 0 ? (
          jobData.map((data: any) => <ApplicationCompanyCard data={data} />)
        ) : (
          <p>No data to Show</p>
        )}
      </div>
    </div>
  );
};

export default MyApplication;
