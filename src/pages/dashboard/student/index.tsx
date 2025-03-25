import StudentSidebar from "@/components/student-sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        .gradient-bg-sidebar {
          background: linear-gradient(180deg, #03007F 0%, #0500E5 100%);
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block md:flex-shrink-0">
          <StudentSidebar isMobile={false} />
        </div>

        {/* Mobile Topbar */}
        {isMobile && <StudentSidebar isMobile={true} />}

        {/* Main content */}
        <main
          className={`flex-1 overflow-auto bg-[#F5F5F5] ${
            isMobile ? "pt-16" : ""
          }`}
        >
          <div className="h-full p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
