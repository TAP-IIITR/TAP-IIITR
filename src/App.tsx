import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import StudentDashboard from "./pages/dashboard/student";
import StudentProfile from "./components/studentDashboard/StudentProfile";
import PlacementOverview from "./components/studentDashboard/PlacementOverview";
import AllCompaniesList from "./components/studentDashboard/AllCompaniesList";
import FullCompanyDetails from "./components/company/FullCompanyDetails";
import MyApplication from "./components/studentDashboard/MyApplication";
import CoordinatorHomepage from "./components/coordinatorDashboard/homepage";
import CoordinatorLayout from "./pages/dashboard/coordinator";
import JobListings from "./components/coordinatorDashboard/JobListings";
import CreateJobPosting from "./components/coordinatorDashboard/CreateJobPosting";
import StudentData from "./components/coordinatorDashboard/StudentData";
import Applications from "./components/coordinatorDashboard/Applications";

function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
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
        </Route>
        <Route path="/dashboard/coordinator" element={<CoordinatorLayout />}>
          <Route index element={<CoordinatorHomepage />} />
          <Route path="job-postings">
            <Route index element={<JobListings />} />
            <Route path="new" element={<CreateJobPosting />} />
          </Route>
          <Route path="student-data" element={<StudentData />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
