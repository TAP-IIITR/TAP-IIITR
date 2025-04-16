import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import acadBlock from "../../assets/acad-block.png";
import logo from "../../assets/logoIIITR.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "https://tap-backend-production-51ea.up.railway.app/", // Your backend server URL
});
import { toast } from "react-toastify";

const inputFields = {
  reg_email: "",
  password: "",
};

const tabs = ["student", "recruiter", "coordinator"];

const LoginPage = () => {
  const [currentTab, setCurrentTab] = useState("student");
  const [formData, setFormData] = useState(inputFields);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.reg_email == "") {
      toast.error("Please fill the email field");
      return;
    }

    if (formData.password == "") {
      toast.error("Please fill the password field");
      return;
    }

    const apiUrls: { [key: string]: string } = {
      student: "/api/auth/student/login",
      recruiter: "/api/auth/recruiter/login",
      coordinator: "/api/auth/tap/login",
    };

    try {
      const { data } = await api.post(apiUrls[currentTab], formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Include cookies if your backend uses them (e.g., JWT)
      });
      toast.success(data.message);
      setFormData(inputFields);
      if (currentTab === "student") {
        navigate("/dashboard/student");
      } else if (currentTab === "coordinator") {
        navigate("/dashboard/coordinator");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.errors[0]?.message || "Login failed!"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (formData.reg_email == "") {
      toast.error("Please fill the email field");
      return;
    }

    setLoading(true);

    const apiUrls: { [key: string]: string } = {
      student: "/api/auth/student/forgot-password",
      recruiter: "/api/auth/recruiter/forgot-password",
      coordinator: "/api/auth/tap/forgot-password",
    };

    try {
      const { data } = await axios.post(
        apiUrls[currentTab],
        { reg_email: formData.reg_email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.errors[0]?.message ||
            "Problem in sending Password reset email"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component remains unchanged...
  return (
    <div className="flex min-h-screen">
      {/* Left side with background image */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 fixed top-0 left-0 bottom-0 max-h-screen ">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={acadBlock}
          alt="Campus View"
          className="object-cover w-full h-full"
        />
        <div className="absolute z-20 text-white p-8 top-[20%] left-8 space-y-4">
          <p className="text-sm">Placements @ IIIT Ranchi</p>
          <h1 className="text-4xl font-bold">
            Connecting Students and Companies.
          </h1>
          <h2 className="text-3xl font-semibold">Simplifying Opportunities</h2>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center  md:p-8 p-4  overflow-y-auto space-y-8 ml-auto">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="IIITR Logo" className="w-32 h-32" />
          <h2 className="text-2xl font-semibold text-blue-800 text-center">
            Indian Institute of Information Technology, Ranchi
          </h2>
          <p className="text-gray-600">Training and Placements Portal</p>
        </div>

        <div className="flex gap-2 bg-gray-100 rounded-full p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`flex-1 px-4 py-2 rounded-full ${
                currentTab === tab
                  ? "bg-blue-800 text-white"
                  : "hover:bg-gray-200 text-gray-600"
              } text-sm`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="relative">
              <input
                type={
                  key === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : "text"
                }
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={
                  key === "reg_email" ? "Registered Email" : "Password"
                }
                className="w-full px-4 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {key === "password" && (
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
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-blue-800 text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
            disabled={!isFormComplete() || loading}
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
