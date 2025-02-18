import { useState } from "react";
import acadBlock from "../../assets/acad-block.png";
import logo from "../../assets/logoIIITR.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const inputs = [
  {
    tab: "student",
    fields: [
      {
        type: "text",
        placeholder: "Roll No. (20XXUGXXXX)",
      },
      {
        type: "password",
        placeholder: "Password",
      },
    ],
  },
  {
    tab: "recruiter",
    fields: [
      {
        type: "email",
        placeholder: "Registered email",
      },
      {
        type: "password",
        placeholder: "Password",
      },
    ],
  },
  {
    tab: "coordinator",
    fields: [
      {
        type: "email",
        placeholder: "Registered email",
      },
      {
        type: "password",
        placeholder: "Password",
      },
    ],
  },
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState("student");

  return (
    <div className="flex h-screen">
      {/* Left side with background image */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={acadBlock}
          alt="Campus View"
          className="object-cover w-full h-full"
        />
        <div className="absolute z-20 text-white p-8 top-[10%] left-8 space-y-4">
          <p className="text-sm">Placements @ IIT Ranchi</p>

          <h1 className="text-4xl font-bold">
            Connecting Students and
            <br />
            Companies.
          </h1>
          <h2 className="text-3xl font-semibold">Simplifying Opportunities</h2>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="IITR Logo" className="w-32 h-32" />
          <h2 className="text-2xl font-semibold text-blue-800">
            Indian Institute of Information Technology, Ranchi
          </h2>
          <p className="text-gray-600">Training and Placements Portal</p>
        </div>

        <div className="flex gap-2 bg-gray-100 rounded-full p-1 w-fit">
          <button
            onClick={() => setCurrentTab("student")}
            className={`flex-1 px-4 py-2 rounded-full ${
              currentTab === "student"
                ? "bg-blue-800 text-white"
                : "hover:bg-gray-200 text-gray-600"
            } text-sm`}
          >
            Student
          </button>
          <button
            onClick={() => setCurrentTab("recruiter")}
            className={`flex-1 px-4 py-2 rounded-full ${
              currentTab === "recruiter"
                ? "bg-blue-800 text-white"
                : "hover:bg-gray-200 text-gray-600"
            } text-sm`}
          >
            Recruiter
          </button>
          <button
            onClick={() => setCurrentTab("coordinator")}
            className={`flex-1 px-4 py-2 rounded-full ${
              currentTab === "coordinator"
                ? "bg-blue-800 text-white"
                : "hover:bg-gray-200 text-gray-600"
            } text-sm`}
          >
            Coordinator
          </button>
        </div>

        <form className="w-full max-w-md space-y-4">
          {inputs.map((input) => {
            if (input.tab === currentTab) {
              return input.fields.map((field) => (
                <div key={field.type} className="relative">
                  <input
                    type={field.type === "password" ? (!showPassword ? "password" : "text") : field.type} 
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {field.type === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {!showPassword ? <BsEyeSlash /> : <BsEye />}
                    </button>
                  )}
                </div>
              ));
            }
          })}

          <div className="text-right">
            <a href="#" className="text-blue-800 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="signup" className="text-blue-800 hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
