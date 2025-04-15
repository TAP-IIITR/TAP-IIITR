import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // Import your Axios instance
import { FaFileUpload, FaGraduationCap } from "react-icons/fa";

interface FormField {
  label: string;
  type: string;
  mandatory?: boolean;
}

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
    eligibleBatches: "",
    applicationDeadline: "",
  });

  const [jdFile, setJdFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Initialize formFields with mandatory fields
  const [formFields, setFormFields] = useState<FormField[]>([
    { label: "Name", type: "text", mandatory: true },
    { label: "Email", type: "text", mandatory: true },
    { label: "Phone Number", type: "text", mandatory: true },
    { label: "Roll Number", type: "text", mandatory: true },
    { label: "Branch", type: "text", mandatory: true },
    { label: "Resume Link", type: "text", mandatory: false }, // Non-mandatory default field
  ]);

  const [newField, setNewField] = useState({ label: "", type: "text" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Only accept PDF files
      if (file.type !== "application/pdf") {
        setError("Only PDF files are accepted");
        return;
      }
      setJdFile(file);
      console.log(file);
      setFileName(file.name);
      setError(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFormField = () => {
    if (!newField.label || !newField.type) {
      setError("Please provide a label and type for the new form field.");
      return;
    }
    setFormFields([
      ...formFields,
      { label: newField.label, type: newField.type, mandatory: false },
    ]);
    setNewField({ label: "", type: "text" }); // Reset the new field input
  };

  const removeFormField = (index: number) => {
    const field = formFields[index];
    if (field.mandatory) {
      setError(
        "Cannot remove mandatory fields (Name, Email, Phone Number, Roll Number, Branch)."
      );
      return;
    }
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const jobData = {
        title: formData.jobTitle,
        JD: formData.description,
        location: formData.location,
        salaryPackage: formData.salary,
        eligibility: formData.eligibility,
        eligibleBatches: formData.eligibleBatches
          .split(",")
          .map((skill: string) => skill.trim())
          .filter((skill: string) => skill.length > 0),
        deadline: formData.applicationDeadline,
        form: formFields.map(({ label, type }) => ({ label, type })), // Exclude the mandatory flag from the payload
        company: formData.company,
        jobType: formData.jobType,
      };

      const combinedData = new FormData();
      combinedData.append("jobData", JSON.stringify(jobData));
      if (jdFile) combinedData.append("jdFile", jdFile);

      const response = await api.post("/jobs/tap", combinedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(response.data.message || "Job created successfully!");
      setTimeout(() => {
        navigate("/dashboard/coordinator/job-postings");
      }, 2000);
    } catch (err: any) {
      console.error("Error creating job:", err);
      if (err.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (err.response?.status === 400) {
        setError(
          err.response.data.message ||
            "Invalid input. Please check the form fields."
        );
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later or contact support.");
      } else if (err.message === "Network Error") {
        setError(
          "Unable to connect to the server. Please check your network or server status."
        );
      } else {
        setError("Failed to create job. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const jobTypes = ["Internship", "Full-Time", "Intern + Full-Time"];
  const fieldTypes = ["text", "textarea", "file"];

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

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

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
            Job Details
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
                required
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
                required
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
                required
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
              required
            />
          </div>

          {/* Add JD File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description Document (PDF)
            </label>
            <div className="flex items-center space-x-2">
              <label className="flex items-center justify-center px-4 py-2 border border-[#14137D] text-[#14137D] rounded-lg cursor-pointer hover:bg-gray-50">
                <FaFileUpload className="mr-2" />
                {fileName ? "Change File" : "Upload JD PDF"}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {fileName && (
                <span className="text-sm text-gray-600">{fileName}</span>
              )}
            </div>
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
                required
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
                required
              />
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="space-y-4 md:bg-white md:p-6 md:rounded-lg md:shadow-sm">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <FaGraduationCap className="text-[#14137D]" size={20} />
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligible Batches
              </label>
              <input
                type="text"
                name="eligibleBatches"
                placeholder="e.g. 2026, 2027"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={formData.eligibleBatches}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Application Form Fields Section */}
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
                d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Application Form Fields
          </h2>

          <div className="space-y-2">
            {formFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 p-2 bg-gray-100 rounded-lg">
                  {field.label} ({field.type}){" "}
                  {field.mandatory && (
                    <span className="text-red-600 text-sm">(Required)</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => removeFormField(index)}
                  className={`p-2 ${
                    field.mandatory
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:text-red-800"
                  }`}
                  disabled={field.mandatory}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Label
              </label>
              <input
                type="text"
                name="label"
                placeholder="e.g. Portfolio Link"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={newField.label}
                onChange={handleNewFieldChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Type
              </label>
              <select
                name="type"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
                value={newField.type}
                onChange={handleNewFieldChange}
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={addFormField}
              className="self-end px-4 py-2 bg-[#14137D] text-white rounded-lg hover:bg-[#14137D]/90"
            >
              Add Field
            </button>
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
              type="datetime-local"
              name="applicationDeadline"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#14137D]"
              value={formData.applicationDeadline}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex gap-4 fixed bottom-0 left-0 right-0 p-4 bg-white md:relative md:bg-transparent">
          <button
            type="button"
            onClick={() => navigate("/dashboard/coordinator/job-postings")}
            className="flex-1 py-2 border border-[#14137D] text-[#14137D] rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 bg-[#14137D] text-white rounded-lg hover:bg-[#14137D]/90 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPosting;
