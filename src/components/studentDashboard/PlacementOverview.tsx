import { MdApartment, MdOutlineWorkOutline } from "react-icons/md";
import RecentJobOpeningsCard from "./RecentJobOpeningsCard";
import { BsPersonVcardFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ApplicationCard from "../applicationCard";

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

const PlacementOverview = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<any>(null);
  const [placementData, setPlacementData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<StudentData | null>(null);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://tap-backend.up.railway.app/api/dashboard/student",
        {
          withCredentials: true,
        }
      );
      if (data.status === 200) {
        setUserData(data.student);
        console.log(data.student);
      } else {
        toast.error("Failed to load student data");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (axios.isAxiosError(error)) {
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

  const fetchData = async () => {
    setLoading(true);
    try {
      // First API call - Applications
      const applicationsPromise = axios.get(
        `https://tap-backend.up.railway.app/api/jobs/student/mm`,
        { withCredentials: true }
      );

      // Second API call - Jobs/Placements
      const placementsPromise = axios.get(
        `https://tap-backend.up.railway.app/api/jobs/student`,
        { withCredentials: true }
      );

      // Wait for both requests to complete
      const [applicationsResponse, placementsResponse] = await Promise.all([
        applicationsPromise,
        placementsPromise,
      ]);

      // Process applications data
      if (applicationsResponse.data.statusCode === 200) {
        console.log(applicationsResponse.data.applications);
        setApplicationData(applicationsResponse.data.applications);
      } else {
        toast.error("Failed to load applications data");
      }

      // Process placements/jobs data
      if (placementsResponse.data.statusCode === 200) {
        console.log("userData batch:", userData?.batch);
        console.log(placementsResponse.data.jobs);
        const filteredJobsWithBatches = placementsResponse.data.jobs.filter(
          (job: any) =>
            job?.eligibleBatches?.includes(userData?.batch.toString())
        );
        console.log("filet::", filteredJobsWithBatches);
        setPlacementData(filteredJobsWithBatches);
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

  useEffect(() => {
    if (userData) {
      fetchData();
    }
  }, [userData]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-red-700 font-semibold text-lg mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
  // const totalApplicationsCount = placementData
  //   ? placementData.reduce((total: number, job: any) => {
  //       return total + (job.applicationCount || 0);
  //     }, 0)
  //   : 0;

  // Count user's applications not whole applications
  const totalApplicationsCount = applicationData ? applicationData.length : 0;

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
              <p className="font-[600] text-[16px] text-white">
                View All Alpplication
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlacementOverview;
