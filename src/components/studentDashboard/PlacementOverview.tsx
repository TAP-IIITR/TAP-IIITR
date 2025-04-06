import { MdApartment, MdOutlineWorkOutline } from "react-icons/md";
import RecentJobOpeningsCard from "./RecentJobOpeningsCard";
import { BsPersonVcardFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApplicationCard from "../applicationCard";

const PlacementOverview = () => {
  const [applicationData, setApplicationData] = useState<any>(null);
  const [placementData, setPlacementData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both API endpoints when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // First API call - Applications
      const applicationsPromise = axios.get(
        `http://localhost:3000/api/jobs/student/mm`,
        { withCredentials: true }
      );

      // Second API call - Jobs/Placements
      const placementsPromise = axios.get(
        `http://localhost:3000/api/jobs/student`,
        { withCredentials: true }
      );

      // Wait for both requests to complete
      const [applicationsResponse, placementsResponse] = await Promise.all([
        applicationsPromise,
        placementsPromise,
      ]);

      // Process applications data
      if (applicationsResponse.data.statusCode === 200) {
        setApplicationData(applicationsResponse.data.applications);
        console.log(
          "Applications data loaded:",
          applicationsResponse.data.applications
        );
      } else {
        toast.error("Failed to load applications data");
      }

      // Process placements/jobs data
      if (placementsResponse.data.statusCode === 200) {
        setPlacementData(placementsResponse.data.jobs);
        console.log("Placement data loaded:", placementsResponse.data.jobs);
      } else {
        toast.error("Failed to load placement data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error fetching data");
        console.error("API Error:", error.response?.data);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
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

  // Calculate actual counts from the fetched data
  const placementOffersCount = placementData?.length || 0;
  const companiesCount = placementData
    ? new Set(placementData.map((job: any) => job.company)).size
    : 0;
  const totalApplicationsCount = placementData
    ? placementData.reduce((total: number, job: any) => {
        return total + (job.applicationCount || 0);
      }, 0)
    : 0;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div
          className="w-full h-[116px] rounded-[12px] bg-[#FFF] flex items-center px-[24px]"
          style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
        >
          <div className="flex gap-[16px] items-center justify-center">
            <div className="bg-[#E0E0E0] h-[66px] w-[66px] rounded-full flex items-center justify-center">
              <MdOutlineWorkOutline className="h-[30px] w-[30px] text-indigo-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-[400] leading-[20px] text-[#666666]">
                Placement Offers
              </p>
              <p className="text-[25px] font-[500] leading-[38px] text-[#000000]">
                {placementOffersCount}
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-full h-[116px] rounded-[12px] bg-[#FFF] flex items-center px-[24px]"
          style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
        >
          <div className="flex gap-[16px] items-center justify-center">
            <div className="bg-[#E0E0E0] h-[66px] w-[66px] rounded-full flex items-center justify-center">
              <MdApartment className="h-[30px] w-[30px] text-indigo-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-[400] leading-[20px] text-[#666666]">
                Companies Registered
              </p>
              <p className="text-[25px] font-[500] leading-[38px] text-[#000000]">
                {companiesCount}
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-full h-[116px] rounded-[12px] bg-[#FFF] flex items-center px-[24px]"
          style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
        >
          <div className="flex gap-[16px] items-center justify-center">
            <div className="bg-[#E0E0E0] h-[66px] w-[66px] rounded-full flex items-center justify-center">
              <BsPersonVcardFill className="h-[30px] w-[30px] text-indigo-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-[400] leading-[20px] text-[#666666]">
                Applications Submitted
              </p>
              <p className="text-[25px] font-[500] leading-[38px] text-[#000000]">
                {totalApplicationsCount}
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
            {placementData &&
              placementData
                .slice(0, 3)
                .map((job: any, index: number) => (
                  <RecentJobOpeningsCard key={job.id || index} jobData={job} />
                ))}
            <Link to={`/dashboard/student/job-offers`}>
              <div className="bg-blue-800 hover:bg-blue-900 w-full h-[44px] rounded-[10px] flex items-center justify-center cursor-pointer">
                <p className="font-[600] text-[16px] text-white">
                  View All Jobs
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div
          className="w-full lg:w-[34.3%] px-[20px] py-[20px] bg-[#FFF] rounded-[12px] flex flex-col gap-3 h-fit"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        >
          <p className="text-[25px] font-[600] leading-[38px] text-[#000]">
            My Applications
          </p>
          {applicationData &&
            applicationData
              .slice(0, 3)
              .map((application: any) => (
                <ApplicationCard
                  key={application.applicationId}
                  data={application}
                />
              ))}

          <Link to={`/dashboard/student/my-applications`}>
            <div className="bg-blue-800 hover:bg-blue-900 w-full h-[44px] rounded-[10px] flex items-center justify-center cursor-pointer">
              <p className="font-[600] text-[16px] text-white">View All Alpplication</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlacementOverview;
