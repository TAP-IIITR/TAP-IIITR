import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import acadBlock from "../../assets/acad-block.png";
import logo from "../../assets/logoIIITR.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";

const tabs = ["student", "recruiter"];

const initialState = {
  student: {
    first_name: "",
    last_name: "",
    reg_email: "",
    personal_email: "",
    mobile: "",
    linkedin: "",
    password: "",
  },
  recruiter: {
    company_name: "",
    contact_name: "",
    email: "",
    mobile: "",
    linkedin: "",
    password: "",
  },
  // coordinator: {
  //   name: "",
  //   email: "",
  //   mobile: "",
  //   password: "",
  // },
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState("student");
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [currentTab]: {
        ...formData[currentTab as keyof typeof initialState],
        [e.target.name]: e.target.value,
      },
    });
  };

  const isFormComplete = () => {
    return Object.values(
      formData[currentTab as keyof typeof initialState]
    ).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiUrls: { [key: string]: string } = {
      student:
        "https://tap-backend-production-51ea.up.railway.app/api/auth/student/register",
      recruiter:
        "https://tap-backend-production-51ea.up.railway.app/api/auth/recruiter/register",
      // coordinator: "/api/auth/coordinator/register",
    };

    try {
      const { data } = await axios.post(
        apiUrls[currentTab],
        formData[currentTab as keyof typeof initialState],
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message || "Registration successful!");
      toast.success(`Verification email sent on College Email`);
      setFormData(initialState);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.errors[0]?.message || "Registration failed!"
        );
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

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
            Connecting Students and <br />
            Companies.
          </h1>
          <h2 className="text-3xl font-semibold">Simplifying Opportunities</h2>
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="w-full md:w-1/2 ml-auto flex flex-col items-center justify-center p-8 space-y-8 overflow-auto">
        <div className="flex flex-col items-center space-y-4 mt-3">
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
          {Object.entries(
            formData[currentTab as keyof typeof initialState]
          ).map(([key, value]) => (
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
                placeholder={key
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
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

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
            disabled={!isFormComplete() || loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center text-sm text-gray-600 mb-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
