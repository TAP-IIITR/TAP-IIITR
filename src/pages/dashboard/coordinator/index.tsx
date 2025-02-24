import CoordinatorSidebar from "@/components/coordinator-sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block md:flex-shrink-0">
        <CoordinatorSidebar isMobile={false} />
      </div>

      {/* Mobile Topbar */}
      {isMobile && <CoordinatorSidebar isMobile={true} />}

      {/* Main content */}
      <main className={`flex-1 overflow-auto bg-[#F5F5F5] ${isMobile ? 'pt-16' : ''}`}>
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;