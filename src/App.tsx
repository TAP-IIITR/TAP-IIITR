import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const StudentDashboard = lazy(() => import("./pages/dashboard/student"));
const StudentProfile = lazy(
  () => import("./components/studentDashboard/StudentProfile")
);
const PlacementOverview = lazy(
  () => import("./components/studentDashboard/PlacementOverview")
);
const AllCompaniesList = lazy(
  () => import("./components/studentDashboard/AllCompaniesList")
);
const FullCompanyDetails = lazy(
  () => import("./components/company/FullCompanyDetails")
);
const MyApplication = lazy(
  () => import("./components/studentDashboard/MyApplication")
);
const CoordinatorHomepage = lazy(
  () => import("./components/coordinatorDashboard/homepage")
);
const CoordinatorLayout = lazy(() => import("./pages/dashboard/coordinator"));
const JobListings = lazy(
  () => import("./components/coordinatorDashboard/JobListings")
);
const CreateJobPosting = lazy(
  () => import("./components/coordinatorDashboard/CreateJobPosting")
);
import StudentData from "./components/coordinatorDashboard/StudentData";
import Applications from "./components/coordinatorDashboard/Applications";
import Recruiters from "./components/coordinatorDashboard/Recruiters";
import Verifications from "./components/coordinatorDashboard/Verifications";
import CoordinatorStudentProfile from "@/components/coordinatorDashboard/StudentProfile";
import JobDetails from "./components/coordinatorDashboard/JobDetails";
import UpdateCGPAPage from "./components/coordinatorDashboard/UpdateCGPAPage";
import FullCompanyInfo from "./components/coordinatorDashboard/FullCompanyInfo";
import StudentBugPage from "./components/studentDashboard/StudentBugPage";
import CoordinatorBugPage from "./components/coordinatorDashboard/CoordinatorBugPage";

function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />

          <Route path="/dashboard/student" element={<StudentDashboard />}>
            <Route index element={<StudentProfile />} /> {/* Default route */}
            <Route path="profile" element={<StudentProfile />} />
            <Route path="placement-overview" element={<PlacementOverview />} />
            <Route path="job-offers" element={<AllCompaniesList />} />
            <Route
              path="full-company-detail/:id"
              element={<FullCompanyDetails />}
            />
            <Route path="my-applications" element={<MyApplication />} />
            <Route path="report-bugs" element={<StudentBugPage />} />
          </Route>
          <Route path="/dashboard/coordinator" element={<CoordinatorLayout />}>
            <Route index element={<CoordinatorHomepage />} />
            <Route path="job-postings">
              <Route index element={<JobListings />} />
              <Route path="new" element={<CreateJobPosting />} />
              <Route path=":id" element={<FullCompanyInfo />} />
            </Route>
            <Route path="student-data" element={<StudentData />} />
            <Route path="applications" element={<Applications />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="verifications" element={<Verifications />} />
            <Route path="updatecgpa" element={<UpdateCGPAPage />} />
            <Route
              path="student/:studentId"
              element={<CoordinatorStudentProfile />}
            />
            <Route path="job-details/:id" element={<JobDetails />} />
            <Route path="report-bugs" element={<CoordinatorBugPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
