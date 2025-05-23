import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/iiitranchi-white-logo.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Bug } from "lucide-react";

const CoordinatorSidebar = ({ isMobile }: { isMobile?: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", path: "/dashboard/coordinator" },
    { title: "Job Postings", path: "/dashboard/coordinator/job-postings" },
    { title: "Student Data", path: "/dashboard/coordinator/student-data" },
    { title: "Applications", path: "/dashboard/coordinator/applications" },
    { title: "Recruiters", path: "/dashboard/coordinator/recruiters" },
    { title: "Verifications", path: "/dashboard/coordinator/verifications" },
    { title: "Update Cgpa", path: "/dashboard/coordinator/updatecgpa" },
  ];

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "https://tap-backend-production-51ea.up.railway.app/api/auth/tap/logout",
        {}, // No body needed for logout in most cases
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // This ensures cookies are sent
        }
      );

      toast.success(data.message || "Logout successful!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.errors[0]?.message || "Logout failed!"
        );
      } else {
        toast.error("An unexpected error occurred!");
      }
    }
  };

  if (isMobile) {
    return (
      <>
        {/* Fixed Topbar */}
        <div className="fixed top-0 left-0 right-0 h-16 gradient-bg-sidebar z-20">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex gap-5 items-center">
              <img src={logo} alt="Campus View" className="h-12 w-auto" />
              <span className="text-lg text-white font-regular">
                IIIT Ranchi
              </span>
            </div>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-20"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Menu */}
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
              <button
                className="w-full h-12 text-sm flex items-center px-6 text-white hover:bg-[#29A8EF]/20"
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
              <button
                className="w-full h-12 text-sm flex items-center px-6 text-white hover:bg-[#29A8EF]/20"
                onClick={() => {
                  navigate("/dashboard/coordinator/report-bugs");
                  setIsDropdownOpen(false);
                }}
              >
                Bug Report
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop sidebar remains unchanged
  return (
    <div className="flex flex-col h-screen w-56 gradient-bg-sidebar text-white">
      <div className="p-4">
        <img
          src={logo}
          alt="Campus View"
          className="object-contain w-[141px] h-[118px] mx-auto"
        />
      </div>

      <nav className="flex-1 mt-5">
        {menuItems.map((item, index) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname === `${item.path}/`;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={`h-14 text-sm flex items-center justify-center px-6 ${
                isActive ? "bg-[#29A8EF]" : "hover:bg-[#29A8EF]/20"
              }`}
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <button
        className="h-12 w-full flex items-center justify-center px-6 hover:bg-[#29A8EF]/50"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="w-full py-2 px-3 mb-4 flex items-center gap-2 text-blue-100 hover:bg-blue-700 rounded-md transition-colors text-sm justify-center"
        onClick={() => {
          navigate("/dashboard/coordinator/report-bugs");
        }}
        aria-label="Report a bug"
      >
        <Bug size={16} />
        <span>Bug Report</span>
      </button>
    </div>
  );
};

export default CoordinatorSidebar;
