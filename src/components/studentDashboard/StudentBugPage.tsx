import { useState } from "react";
import { toast } from "react-toastify";
// @ts-ignore
import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/68000919c08833336590e90d"
);

const StudentBugPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const timestamp = new Date().toISOString();
      const browserInfo = navigator.userAgent;
      const currentUrl = window.location.href;

      const sheetData = {
        timestamp,
        title: formData.title,
        description: formData.description,
        url: currentUrl,
        browser: browserInfo,
      };
      store.append("Sheet1", [sheetData]);

      toast.success("Bug report submitted successfully!");

      // Clear form
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error submitting bug report:", error);
      toast.error("Failed to submit bug report. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Report a Bug</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">
          Found a bug? Help us improve by submitting a bug report. Please
          provide a title and description of the issue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Bug Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bug Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a brief summary of the issue"
              />
            </div>

            {/* Bug Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please describe the bug in detail"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 disabled:bg-blue-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Bug Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentBugPage;
