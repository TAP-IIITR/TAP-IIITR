import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { UserPlus, Mail, Lock, User } from "lucide-react";

const AddCoordinator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/tap/register", formData);
      toast.success(data.message || "Coordinator registered successfully!");
      navigate("/dashboard/coordinator");
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || "Failed to register coordinator";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 w-full bg-white md:bg-[#F5F5F5] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#14137D] flex items-center gap-2">
            <UserPlus size={28} />
            Add New TAP Coordinator
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Register a new official coordinator for the Training and Placement Cell.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <User size={16} className="text-[#14137D]" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Mail size={16} className="text-[#14137D]" />
                Official Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john.doe@iiitranchi.ac.in"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Lock size={16} className="text-[#14137D]" />
                Temporary Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">
                The coordinator can change their password later via the reset password link.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/coordinator")}
              className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#14137D] text-white rounded-lg hover:bg-[#1f1e9c] font-medium shadow-md shadow-indigo-900/20 disabled:bg-gray-400 transition-all flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register Coordinator"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoordinator;
