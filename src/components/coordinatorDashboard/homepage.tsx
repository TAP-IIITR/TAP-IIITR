import JobIcon from "../../assets/coordinatorDashboard/job.png";
import StudentsIcon from "../../assets/coordinatorDashboard/students.png";
import PendingIcon from "../../assets/coordinatorDashboard/pending.png";
import RecruiterIcon from "../../assets/coordinatorDashboard/recruiter.png";
import ApplicationIcon from "../../assets/coordinatorDashboard/application.png";
import DocumentIcon from "../../assets/coordinatorDashboard/document.png";
import LocationIcon from "../../assets/coordinatorDashboard/location.png";
import JobTypeIcon from "../../assets/coordinatorDashboard/job-type.png";
import TimeIcon from "../../assets/coordinatorDashboard/time.png";

const CoordinatorHomepage = () => {
  const stats = [
    { title: "Active Job Postings", count: "25", icon: JobIcon },
    { title: "Students Registered", count: "200", icon: StudentsIcon },
    { title: "Pending Verification", count: "12", icon: PendingIcon },
    { title: "Total Applications", count: "65", icon: ApplicationIcon },
    { title: "Verified Recruiters", count: "11", icon: RecruiterIcon },
    { title: "Placed Students", count: "35", icon: DocumentIcon },
  ];

  const recentJobs = [
    {
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      status: "Pending Verification",
      type: "Full Time",
      time: "3 days ago",
    },
    {
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      status: "Pending Verification",
      type: "Full Time",
      time: "3 days ago",
    },
    {
      title: "Software Engineer",
      company: "TechCorp",
      location: "Ranchi, JH",
      status: "Pending Verification",
      type: "Full Time",
      time: "3 days ago",
    },
  ];

  const recentApplications = [
    { name: "John Doe", role: "Software Dev at TechCorp", status: "Accepted" },
    { name: "John Doe", role: "Software Dev at TechCorp", status: "Rejected" },
    {
      name: "John Doe",
      role: "Software Dev at TechCorp",
      status: "Under Review",
    },
  ];

  return (
    <div className="p-4 md:p-16">
      <div className="mb-8 md:mb-12">
        <h1 className="text-xl md:text-2xl text-[#161A80]">
          Welcome, <span className="text-4xl md:text-5xl font-bold">John Doe!</span>
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          View and manage all the job postings, verify recruiters, and track
          student applications.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 md:p-10 rounded-lg shadow-card">
            <div className="flex items-center gap-2 md:gap-4">
              <img src={stat.icon} className="h-8 w-8 md:h-12 md:w-12" />
              <div>
                <p className="text-gray-600 text-xs md:text-sm">{stat.title}</p>
                <p className="text-lg md:text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Job Openings</h2>
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex flex-col justify-between mt-2">
                    <h3 className="font-bold text-xl md:text-2xl">{job.title}</h3>
                    <p className="text-gray-600 text-base md:text-lg">{job.company}</p>
                    <div className="flex flex-wrap gap-3 md:gap-5 mt-2">
                      <span className="text-xs md:text-sm text-gray-500 flex gap-2 items-center">
                        <img src={LocationIcon} className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 flex gap-2 items-center">
                        <img src={JobTypeIcon} className="h-3 w-3" />
                        {job.type}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 flex gap-2 items-center">
                        <img src={TimeIcon} className="h-3 w-3" />
                        {job.time}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs md:text-sm font-bold bg-[#E7E7FF] text-[#161A80] px-4 py-2 rounded-full mt-2 md:mt-0">
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-[#14137D] text-white py-2 rounded text-sm md:text-base">
            View All Jobs
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {recentApplications.map((application, index) => (
              <div key={index} className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm md:text-base">{application.name}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{application.role}</p>
                </div>
                <span
                  className={`text-xs md:text-sm font-bold px-4 py-2 rounded-full mt-2 md:mt-0 ${
                    application.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : application.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {application.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-[#14137D] text-white py-2 rounded text-sm md:text-base">
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorHomepage