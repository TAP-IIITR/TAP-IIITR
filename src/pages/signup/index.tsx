import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import backgroundImg from "@/assets/background-img-2.png";
import iiitrw from "@/assets/iiitranchi-white-logo.png";

const Signup: React.FC = () => {
  const [activeRole, setActiveRole] = useState("Student");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [passwordhide, setPasswordHide] = useState(true);
  const isStudentFormValid =
    password &&
    password.length > 0 &&
    regNo &&
    regNo.length > 0 &&
    email &&
    email.length > 0 &&
    fullName &&
    fullName.length > 0 &&
    mobile &&
    mobile.length > 0 &&
    linkedin &&
    linkedin.length > 0;

  const isRecruiterFormValid =
    email && email.length > 0 && password && password.length > 0;

  const roles = ["Student", "Recruiter"];

  return (
    <div className="flex h-[100vh] w-screen overflow-auto">
      <div
        className="hidden md:flex md:w-1/2 h-screen bg-cover bg-center flex-col items-center justify-center p-3"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <img src={iiitrw} className="w-[200px] h-auto" alt="" />
        <div className="flex-col gap-2 flex text-center mt-3">
          <h1 className="text-white font-serif font-bold text-xl lg:text-2xl">
            Indian Institute of Information Technology, Ranchi
          </h1>
          <h4 className="text-center text-white font-serif font-bold text-sm lg:text-xl">
            (An Institute of National Importance under MoE, Govt. Of India)
          </h4>
        </div>
        <div className="text-white font-serif text-center py-4 px-10 mt-5 mb-5">
          <h1 className="font-serif font-bold md:text-4xl sm:text-2xl text-xl uppercase">
            Training & Placement Cell <br />{" "}
            {/* <span className="font-serif font-bold md:text-4xl sm:text-2xl text-xl">
                IIIT Ranchi
              </span> */}
          </h1>
        </div>
        <p className="text-center text-white font-serif font-[500] text-xl">
          Your one-stop solution for seamless placements, bridging the gap
          between talent and top recruiters. Unlock opportunities and shape your
          future!
        </p>
      </div>

      <div className="w-full md:w-1/2 px-6 flex items-center justify-center bg-[#E2E2E2] flex-col">
        <div className="w-[213px] h-[51px] rounded-[16px] bg-[#FFF] flex gap-[16px] items-center justify-center mt-[15px] mb-[15px]">
          {roles.map((role) => (
            <div
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-[16px] h-[43px] rounded-[14px] flex items-center justify-center cursor-pointer transition-all duration-300 
                ${
                  activeRole === role
                    ? "bg-[#1E39A4] text-white font-medium cursor-not-allowed"
                    : "border bg-[#FFF] font-normal"
                }`}
            >
              <p className="text-[16px]">{role}</p>
            </div>
          ))}
        </div>
        {activeRole === "Student" ? (
          <>
            <form className="w-full xl:w-3/4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  id="fullName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="mt-[10px]">
                <label className="block text-sm font-medium text-gray-700">
                  Registration number
                </label>
                <input
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  type="text"
                  name="regNo"
                  id="regNo"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="20XXUGXXXX"
                  required
                />
              </div>
              <div className="mt-[10px]">
                <label className="block text-sm font-medium text-gray-700">
                  College Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@iiitranchi.ac.in"
                  required
                />
              </div>
              <div className="mt-[10px]">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile No.
                </label>
                <input
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (value.length <= 10) {
                      setMobile(value);
                    }
                  }}
                  type="text"
                  name="mobile"
                  id="mobile"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="950811XXXX"
                  maxLength={10} // Ensures the user cannot input more than 10 characters
                  required
                />
              </div>
              <div className="mt-[10px]">
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn Profile Url
                </label>
                <input
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  type="linkedin"
                  name="linkedin"
                  id="linkedin"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://www.linkedin.com/in/XXXXX/"
                  required
                />
              </div>
              <div className="mt-[10px]">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordhide ? "password" : "text"}
                    name="password"
                    id="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => {
                      setPasswordHide(!passwordhide);
                    }}
                  >
                    {passwordhide ? (
                      <Eye size={24} className="text-gray-400" />
                    ) : (
                      <EyeOff size={24} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className={`w-1/2 mx-auto flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white mt-[16px] 
    bg-[#1E39A4] hover:bg-[#162C80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E39A4] 
    ${!isStudentFormValid ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!isStudentFormValid}
              >
                Create Account
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-[8px]">
              Already have an account?{" "}
              <a className="font-medium text-[#1E39A4] hover:text-indigo-500 cursor-pointer">
                Login here
              </a>
            </p>
          </>
        ) : (
          <>
            <form className="w-full xl:w-3/4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mt-[16px]">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordhide ? "password" : "text"}
                    name="password"
                    id="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => {
                      setPasswordHide(!passwordhide);
                    }}
                  >
                    {passwordhide ? (
                      <Eye size={24} className="text-gray-400" />
                    ) : (
                      <EyeOff size={24} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end mt-[4px]">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className={`w-1/2 mx-auto flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white mt-[12px] 
    bg-[#1E39A4] hover:bg-[#162C80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E39A4] 
    ${!isRecruiterFormValid ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!isRecruiterFormValid}
              >
                Create Account
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-[8px]">
              Already have an account?{" "}
              <a className="font-medium text-[#1E39A4] hover:text-indigo-500 cursor-pointer">
                Login here
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
