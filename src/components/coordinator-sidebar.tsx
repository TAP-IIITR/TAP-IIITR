import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ImageLoader } from "./ui/ImageLoader";
import logo from "../assets/iiitranchi-white-logo.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Bug,
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Building2,
  CheckCircle,
  GraduationCap,
  UserPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const CoordinatorSidebar = ({ isMobile }: { isMobile?: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard/coordinator",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Job Postings",
      path: "/dashboard/coordinator/job-postings",
      icon: <Briefcase size={20} />,
    },
    {
      title: "Student Data",
      path: "/dashboard/coordinator/student-data",
      icon: <Users size={20} />,
    },
    {
      title: "Applications",
      path: "/dashboard/coordinator/applications",
      icon: <FileText size={20} />,
    },
    {
      title: "Recruiters",
      path: "/dashboard/coordinator/recruiters",
      icon: <Building2 size={20} />,
    },
    {
      title: "Verifications",
      path: "/dashboard/coordinator/verifications",
      icon: <CheckCircle size={20} />,
    },
    {
      title: "Update Cgpa",
      path: "/dashboard/coordinator/updatecgpa",
      icon: <GraduationCap size={20} />,
    },
  ];

  if (role === "tpo") {
    menuItems.push({
      title: "Manage Members",
      path: "/dashboard/coordinator/manage-members",
      icon: <UserPlus size={20} />,
    });
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/tap/logout`,
        {}, // No body needed for logout in most cases
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // This ensures cookies are sent
        }
      );

      toast.success(data.message || "Logout successful!");
      localStorage.removeItem("role");
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      <div className="p-6 flex justify-center items-center border-b border-slate-800">
        <ImageLoader
          src={logo}
          alt="IIIT Ranchi"
          className="object-contain w-32 h-auto"
        />
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname === `${item.path}/`;

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => isMobile && setIsDropdownOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                {item.icon}
              </span>
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => {
            navigate("/dashboard/coordinator/report-bugs");
            if (isMobile) setIsDropdownOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Bug size={20} className="text-slate-400" />
          Report Bug
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Topbar */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900 z-50 flex items-center justify-between px-4 shadow-md">
          <div className="flex items-center gap-3">
            <ImageLoader src={logo} alt="IIIT Ranchi" className="h-10 w-auto" />
            <span className="text-white font-semibold tracking-wide">
              Tap Portal
            </span>
          </div>
          <button
            onClick={() => setIsDropdownOpen(true)}
            className="text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Flyout Menu */}
        {isDropdownOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Sidebar Panel */}
            <div className="relative w-64 h-full bg-slate-900 shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="p-1 text-slate-400 hover:text-white bg-slate-800 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="h-screen w-64 shrink-0">
      <SidebarContent />
    </div>
  );
};

export default CoordinatorSidebar;
