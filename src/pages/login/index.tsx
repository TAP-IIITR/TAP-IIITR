import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import acadBlock from "../../assets/acad-block.png";
import logo from "../../assets/logoIIITR.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const inputFields = {
  student: { roll_no: "", password: "" },
  recruiter: { email: "", password: "" },
  coordinator: { email: "", password: "" },
};

const LoginPage = () => {
  const [currentTab, setCurrentTab] = useState<keyof typeof inputFields>("student");
  const [formData, setFormData] = useState(inputFields[currentTab]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (tab: keyof typeof inputFields) => {
    setCurrentTab(tab);
    setFormData(inputFields[tab]); // Reset form data when switching tabs
    setShowPassword(false); // Reset password visibility
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiUrls = {
      student: "http://localhost:3000/api/auth/student/login",
      recruiter: "http://localhost:3000/api/auth/recruiter/login",
      coordinator: "http://localhost:3000/api/auth/coordinator/login",
    };

    try {
      const { data } = await axios.post(apiUrls[currentTab], formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ " + (data.message || "Login successful!"));
      localStorage.setItem("userId", data.data.id);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert("❌ " + (error.response?.data?.message || "Login failed!"));
      } else {
        alert("❌ An unexpected error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with background image */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img src={acadBlock} alt="Campus View" className="object-cover w-full h-full" />
        <div className="absolute z-20 text-white p-8 top-[10%] left-8 space-y-4">
          <p className="text-sm">Placements @ IIT Ranchi</p>
          <h1 className="text-4xl font-bold">Connecting Students and Companies.</h1>
          <h2 className="text-3xl font-semibold">Simplifying Opportunities</h2>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="IITR Logo" className="w-32 h-32" />
          <h2 className="text-2xl font-semibold text-blue-800">Indian Institute of Information Technology, Ranchi</h2>
          <p className="text-gray-600">Training and Placements Portal</p>
        </div>

        <div className="flex gap-2 bg-gray-100 rounded-full p-1 w-fit">
          {Object.keys(inputFields).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab as keyof typeof inputFields)}
              className={`flex-1 px-4 py-2 rounded-full ${
                currentTab === tab ? "bg-blue-800 text-white" : "hover:bg-gray-200 text-gray-600"
              } text-sm`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          {Object.keys(inputFields[currentTab]).map((field) => (
            <div key={field} className="relative">
              <input
                type={field === "password" ? (showPassword ? "text" : "password") : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                placeholder={
                  field === "roll_no"
                    ? "Roll No. (20XXUGXXXX)"
                    : field === "email"
                    ? "Registered Email"
                    : "Password"
                }
                className="w-full px-4 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {field === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </button>
              )}
            </div>
          ))}

          <div className="text-right">
            <a href="#" className="text-blue-800 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-800 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
