import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/iiitranchi-white-logo.png";

const StudentSidebar = () => {
  const location = useLocation();
  return (
    <div
      className="h-screen w-[12.7%] min-w-[184px] py-5 flex flex-col justify-between"
      style={{
        background: "linear-gradient(180deg, #03007F 0%, #0500E5 100%)",
      }}
    >
      {/* Logo Section */}
      <div className="flex flex-col gap-5">
        <img
          src={logo}
          alt="Campus View"
          className="object-contain w-[141px] h-[118px] mx-auto"
        />

        {/* Navigation Links */}
        <div className="flex flex-col gap-[10px]">
          <NavLink
            to="/dashboard/student/profile"
            className={() =>
              `h-[40px] w-full flex items-center justify-center cursor-pointer ${
                location.pathname === "/dashboard/student" ||
                location.pathname === "/dashboard/student/" ||
                location.pathname === "/dashboard/student/profile" ||
                location.pathname === "/dashboard/student/profile/"
                  ? "bg-[#29A8EF]"
                  : "bg-transparent"
              }`
            }
          >
            <p className="text-[16px] font-[600] text-[#FFF]">
              Student Profile
            </p>
          </NavLink>

          <NavLink
            to="/dashboard/student/placement-overview"
            className={({ isActive }) =>
              `h-[40px] w-full flex items-center justify-center cursor-pointer ${
                isActive ? "bg-[#29A8EF]" : "bg-transparent"
              }`
            }
          >
            <p className="text-[16px] font-[600] text-[#FFF]">
              Placement Overview
            </p>
          </NavLink>

          <NavLink
            to="/dashboard/student/job-offers"
            className={({ isActive }) =>
              `h-[40px] w-full flex items-center justify-center cursor-pointer ${
                isActive ? "bg-[#29A8EF]" : "bg-transparent"
              }`
            }
          >
            <p className="text-[16px] font-[600] text-[#FFF]">Job Offers</p>
          </NavLink>

          <NavLink
            to="/dashboard/student/my-applications"
            className={({ isActive }) =>
              `h-[40px] w-full flex items-center justify-center cursor-pointer ${
                isActive ? "bg-[#29A8EF]" : "bg-transparent"
              }`
            }
          >
            <p className="text-[16px] font-[600] text-[#FFF]">
              My Applications
            </p>
          </NavLink>
        </div>
      </div>

      {/* Logout Button */}
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          `h-[40px] w-full flex items-center justify-center cursor-pointer ${
            isActive ? "bg-[#29A8EF]" : "bg-transparent"
          }`
        }
      >
        <p className="text-[16px] font-[600] text-[#FFF]">Logout</p>
      </NavLink>
    </div>
  );
};

export default StudentSidebar;
