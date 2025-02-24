import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    jobType: "",
    description: "",
    location: "",
    salary: "",
    eligibility: "",
    requiredSkills: "",
    applicationDeadline: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // navigate('/job-posting'); // Navigate back to job listings after submission
  };

  const jobTypes = ["Full Time", "Part Time", "Internship", "Contract"];

  return (
    <div className="p-4 md:p-10 w-full bg-white md:bg-[#F5F5F5]">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#14137D]">
          Post New Job Opening
        </h1>
        <p className="text-sm md:text-base text-gray-600 hidden md:block">
          Fill in the details below to create a new job posting
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details Section */}
        <section className="space-y-4 md:bg-white md:p-6 md:rounded-lg md:shadow-sm">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-[#14137D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Recent Job Openings
          </h2>

          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g Software Engineer"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="">Select job type</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="Your company name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the role, requirements, and responsibilities"
              rows={4}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Location and Compensation Section */}
        <section className="space-y-4 md:bg-white md:p-6 md:rounded-lg md:shadow-sm">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-[#14137D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            Location and Compensation
          </h2>

          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Lucknow"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                placeholder="e.g. Rs. 12 lakh"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="space-y-4 md:bg-white md:p-6 md:rounded-lg md:shadow-sm">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-[#14137D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Requirements
          </h2>

          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility Criteria
              </label>
              <input
                type="text"
                name="eligibility"
                placeholder="e.g. B.S CGPA"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.eligibility}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills
              </label>
              <input
                type="text"
                name="requiredSkills"
                placeholder="e.g. Python, React"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.requiredSkills}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="space-y-4 pb-20 md:bg-white md:p-6 md:rounded-lg md:shadow-sm">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-[#14137D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Timeline
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
              value={formData.applicationDeadline}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex gap-4 fixed bottom-0 left-0 right-0 p-4 bg-white md:relative md:bg-transparent">
          <button
            type="button"
            onClick={() => navigate("/job-posting")}
            className="flex-1 py-2 border border-[#14137D] text-[#14137D] rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 bg-[#14137D] text-white rounded-lg hover:bg-[#14137D]/90"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPosting;
