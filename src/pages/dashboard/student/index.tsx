import StudentSidebar from "@/components/student-sidebar";
import { Outlet } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Sidebar - No scrolling */}
      <div className="h-screen flex-shrink-0">
        <StudentSidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="p-7 w-full bg-[#F5F5F5] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
