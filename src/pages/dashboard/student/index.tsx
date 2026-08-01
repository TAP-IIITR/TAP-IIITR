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
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <div className="hidden md:block md:flex-shrink-0">
          <StudentSidebar isMobile={false} />
        </div>

        {/* Mobile Sidebar (handled internally by the component but placed here if logic changes,
            but for now the StudentSidebar handles isMobile prop to return mobile version.
            However, the current StudentSidebar logic says: if isMobile return Topbar + Flyout.
            So we just need to render it conditionally or let it handle itself.
            Checking StudentSidebar code: if isMobile it returns Fragment with Topbar.
            So we can just render it.
        */}
        {isMobile && <StudentSidebar isMobile={true} />}

        {/* Main content */}
        <main
          className={`flex-1 overflow-hidden flex flex-col ${isMobile ? "pt-16" : ""
            }`}
        >
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
