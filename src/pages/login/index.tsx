import React, { useState } from "react";
import logoIIITR from "@/assets/logoIIITR.png";
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const [activeRole, setActiveRole] = useState("Student");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordhide, setPasswordHide] = useState(true);
  const isFormValid =
    password && password.length > 0 && regNo && regNo.length > 0;

  const roles = ["Student", "Recruiter", "Coordinator"];

  return (
    <div className="flex h-[100vh] w-screen">
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-[#E2E2E2] flex-col">
        <div className="flex flex-col gap-[8px] items-center">
          <img
            src={logoIIITR}
            alt="IIITR Logo"
            className="w-[196px] h-[196px] object-contain"
          />
          <h1 className="text-[26px] font-[500] text-[#222222] leading-[30px]">
            IIIT RANCHI TAP Portal
          </h1>
          <p className="text-[18px] font-normal text-indigo-600 leading-[26px]">
            Please login to continue
          </p>
        </div>
        <div className="w-[348px] h-[51px] rounded-[16px] bg-[#FFF] flex gap-[16px] items-center justify-center mt-[25px] mb-[25px]">
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
    ${!isFormValid ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!isFormValid}
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-[8px]">
              Don’t have an account?{" "}
              <a className="font-medium text-[#1E39A4] hover:text-indigo-500 cursor-pointer">
                Create an account
              </a>
            </p>
          </>
        ) : activeRole === "Recruiter" ? (
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
    ${!isFormValid ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!isFormValid}
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-[8px]">
              Don’t have an account?{" "}
              <a className="font-medium text-[#1E39A4] hover:text-indigo-500 cursor-pointer">
                Create an account
              </a>
            </p>
          </>
        ) : (
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
  ${!isFormValid ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={!isFormValid}
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
