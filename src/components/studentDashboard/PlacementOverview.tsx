import { MdApartment, MdOutlineWorkOutline } from "react-icons/md";
import RecentJobOpeningsCard from "./RecentJobOpeningsCard";
import { BsPersonVcardFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PlacementOverview = () => {
  const [applicationData, setApplicationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/student/mm`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.statusCode === 200) {
        setApplicationData(data.applications);
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
    fetchApplications();
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
    <div className="flex flex-col gap-[26px]">
      <div className="flex flex-col">
        <p className="text-[42px] font-[600] leading-[50px] text-[#161A80]">
          Placement Overview
        </p>
        <p className="text-[13px] font-[500] leading-[20px] text-[#212121]">
          View and manage all your job placements in one place—track progress,
          stay organized, and take the next step in your career.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-[36px] gap-y-[24px]">
        <div
          className="w-[360px] h-[116px] rounded-[12px] bg-[#FFF] flex items-center px-[24px]"
          style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
        >
          <div className="flex gap-[16px] items-center justify-center">
            <div className="bg-[#E0E0E0] h-[66px] w-[66px] rounded-full flex items-center justify-center">
              <MdOutlineWorkOutline className="h-[30px] w-[30px]" />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-[400] leading-[20px] text-[#666666]">
                Placement Offers
              </p>
              <p className="text-[25px] font-[500] leading-[38px] text-[#000000]">
                60
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-[360px] h-[116px] rounded-[12px] bg-[#FFF] flex items-center px-[24px]"
          style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
        >
          <div className="flex gap-[16px] items-center justify-center">
            <div className="bg-[#E0E0E0] h-[66px] w-[66px] rounded-full flex items-center justify-center">
              <MdApartment className="h-[30px] w-[30px]" />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-[400] leading-[20px] text-[#666666]">
                Companies Registered
              </p>
              <p className="text-[25px] font-[500] leading-[38px] text-[#000000]">
                22
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-[360px] h-[116px] rounded-[12px] bg-[#FFF] flex items-center px-[24px]"
          style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
        >
          <div className="flex gap-[16px] items-center justify-center">
            <div className="bg-[#E0E0E0] h-[66px] w-[66px] rounded-full flex items-center justify-center">
              <BsPersonVcardFill className="h-[30px] w-[30px]" />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-[400] leading-[20px] text-[#666666]">
                Applications Submitted
              </p>
              <p className="text-[25px] font-[500] leading-[38px] text-[#000000]">
                12
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-[26px]">
        <div
          className="w-full lg:w-[63.6%] py-[20px] px-[20px] bg-[#FFF] rounded-[12px] h-fit"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        >
          <div className="flex flex-col gap-[10px]">
            <p className="text-[25px] font-[600] leading-[38px] text-[#000]">
              Recent Job Openings
            </p>
            <RecentJobOpeningsCard />
            <RecentJobOpeningsCard />
            <RecentJobOpeningsCard />
            <div className="bg-[#161A80] w-full h-[44px] rounded-[10px] flex items-center justify-center cursor-pointer">
              <p className="font-[600] text-[16px] text-[#FFF]">
                View All Jobs
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-full lg:w-[34.3%] px-[20px] py-[20px] bg-[#FFF] rounded-[12px] flex flex-col gap-[10px] h-fit"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        >
          <p className="text-[25px] font-[600] leading-[38px] text-[#000]">
            My Applications
          </p>
          <div className="flex flex-col">
            <p className="text-[20px] font-[600] leading-[30px] text-[#212121]">
              Software Engineer
            </p>
            <p className="text-[16px] font-[500] leading-[24px] text-[#9E9E9E]">
              TechCorp
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[20px] font-[600] leading-[30px] text-[#212121]">
              Software Engineer
            </p>
            <p className="text-[16px] font-[500] leading-[24px] text-[#9E9E9E]">
              TechCorp
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[20px] font-[600] leading-[30px] text-[#212121]">
              Software Engineer
            </p>
            <p className="text-[16px] font-[500] leading-[24px] text-[#9E9E9E]">
              TechCorp
            </p>
          </div>
          <div className="bg-[#161A80] w-full h-[40px] rounded-[11px] flex items-center justify-center cursor-pointer">
            <p className="font-[600] text-[16px] text-[#FFF]">
              View All Applications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementOverview;
