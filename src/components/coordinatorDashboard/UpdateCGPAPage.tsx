import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { FileText, Upload, Database, Info, ChevronDown } from "lucide-react";

const UpdateCGPAPage = () => {
  const [semester, setSemester] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSample, setShowSample] = useState<boolean>(true);

  const handleSemesterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSemester(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !semester) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("semester", semester);
      formData.append("cgpaFile", file);
      console.log([...formData.entries()]);
      const response = await axios.post(
        "https://tap-backend-production-51ea.up.railway.app/api/dashboard/tap",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      toast.success("CGPA data uploaded successfully");

      setSemester("");
      setFile(null);
      const fileInput = document.getElementById(
        "file-input"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading CGPA data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen bg-gradient-to-b from-white to-blue-50 shadow-lg overflow-hidden">
      <div className="bg-white shadow-lg py-6 px-8">
        <h1 className="text-2xl font-bold text-blue-900 flex items-center justify-center">
          <Database className="mr-3" />
          CGPA Upload
        </h1>
      </div>

      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Form */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <Upload className="mr-2 w-5 h-5" />
              Upload CGPA Data
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  Semester
                </label>
                <div className="relative">
                  <select
                    value={semester}
                    onChange={handleSemesterChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select Semester
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        Semester {num}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  Excel File Upload
                </label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer block text-center"
                  >
                    <FileText className="w-10 h-10 mx-auto text-blue-500 mb-2" />
                    <span className="block text-sm font-medium text-blue-600 mb-1">
                      {file ? file.name : "Click to select Excel file"}
                    </span>
                    <span className="text-xs text-gray-500">
                      Only .xlsx or .xls files
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Process CGPA Data
                  </>
                )}
              </button>
            </form>

            {file && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center">
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    File selected:
                  </p>
                  <p className="text-sm text-green-700">{file.name}</p>
                </div>
              </div>
            )}
          </div>
          {/* Right side - Sample data */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                  <Info className="mr-2 w-5 h-5" />
                  Required Excel Format
                </h2>

                <button
                  onClick={() => setShowSample(!showSample)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showSample ? "Hide" : "Show"} Sample
                </button>
              </div>

              {showSample && (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="bg-gray-50 p-3 border-b border-gray-200">
                    <p className="text-sm text-gray-600">
                      Your Excel file must follow this exact format:
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 tracking-wider">
                            reg_no
                          </th>
                          <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 tracking-wider">
                            cgpa
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { reg: "2023UG1020", cgpa: "8.9" },
                          { reg: "2023UG1021", cgpa: "9.1" },
                          { reg: "2023UG1022", cgpa: "8.5" },
                          { reg: "2023UG1023", cgpa: "9.3" },
                        ].map((item, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="py-2 px-6 text-sm text-gray-700">
                              {item.reg}
                            </td>
                            <td className="py-2 px-6 text-sm text-gray-700">
                              {item.cgpa}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mt-4 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="text-md font-medium text-blue-800 mb-2">
                  Important Notes:
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Column headers must be exactly <strong>reg_no</strong> and{" "}
                      <strong>cgpa</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Registration numbers must follow the format shown in the
                      sample
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>CGPA values must be in the range of 0.0 to 10.0</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>

                    <span>
                      The system will validate all entries before processing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-3 px-8 border-t border-gray-200">
        <p className="text-xs text-center text-gray-500">
          For issues with CGPA uploads, please contact the academic office.
        </p>
      </div>
    </div>
  );
};

export default UpdateCGPAPage;
