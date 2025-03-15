import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/iiitranchi-white-logo.png";
import { useState } from "react";

type StudentSidebarProps = {
  isMobile: boolean;
};

const StudentSidebar = ({ isMobile }: StudentSidebarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: "Student Profile", path: "/dashboard/student/profile" },
    { title: "Placement Overview", path: "/dashboard/student/placement-overview" },
    { title: "Job Offers", path: "/dashboard/student/job-offers" },
    { title: "My Applications", path: "/dashboard/student/my-applications" },
  ];

  if (isMobile) {
    return (
      <>
        {/* Fixed Topbar */}
        <div className="fixed top-0 left-0 right-0 h-16 gradient-bg-sidebar z-20">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex gap-5 items-center">
              <img src={logo} alt="IIIT Ranchi" className="h-12 w-auto" />
              <span className="text-lg text-white font-regular">IIIT Ranchi</span>
            </div>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsDropdownOpen(false)} />
            <div className="fixed top-16 left-0 right-0 gradient-bg-sidebar z-30">
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsDropdownOpen(false)}
                  className={({ isActive }) =>
                    `h-12 text-sm flex items-center px-6 text-white ${
                      isActive ? "bg-[#29A8EF]" : "hover:bg-[#29A8EF]/20"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              <button className="w-full h-12 text-sm flex items-center px-6 text-white hover:bg-[#29A8EF]/20">
                Logout
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div
      className="h-screen w-[180px] py-4 flex flex-col justify-between overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, #03007F 0%, #0500E5 100%)",
      }}
    >
      {/* Logo Section */}
      <div className="flex flex-col gap-4">
        <img
          src={logo}
          alt="Campus View"
          className="object-contain w-[120px] h-[100px] mx-auto"
        />

        {/* Navigation Links */}
        <div className="flex flex-col gap-[8px] px-2">
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
      <div className="px-2">
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
    </div>
  );
};

export default StudentSidebar;
