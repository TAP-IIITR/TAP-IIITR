import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { Users, UserPlus, Download, Upload, Trash2, ShieldCheck, Mail, Loader2 } from "lucide-react";

const ManageMembers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coordinators, setCoordinators] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchCoordinators = async () => {
    try {
      setFetchLoading(true);
      const { data } = await api.get("/auth/tap/coordinators");
      setCoordinators(data.data || []);
    } catch (error: any) {
      toast.error("Failed to fetch coordinators");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name}? This will delete their account.`)) return;

    try {
      setLoading(true);
      await api.delete(`/auth/tap/coordinators/${id}`);
      toast.success("Coordinator removed successfully");
      fetchCoordinators();
    } catch (error: any) {
      toast.error("Failed to remove coordinator");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await api.get("/auth/tap/sample-csv", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'coordinator_template.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to download template");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const { data } = await api.post("/auth/tap/bulk-register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success(data.message);
      fetchCoordinators();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Bulk registration failed");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="p-4 md:p-10 w-full bg-white md:bg-[#F5F5F5] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#14137D] flex items-center gap-2">
              <Users size={28} />
              Manage Cell Members
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Add, remove, and manage TAP coordinators and TPO staff.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadTemplate}
              className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Download size={18} />
              Template
            </button>

            <label className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors">
              <Upload size={18} />
              Bulk Upload
              <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} disabled={loading} />
            </label>

            <button
              onClick={() => navigate("/dashboard/coordinator/add-coordinator")}
              className="px-4 py-2 bg-[#14137D] text-white rounded-lg hover:bg-[#1f1e9c] flex items-center gap-2 text-sm font-medium transition-all shadow-md shadow-indigo-900/20"
            >
              <UserPlus size={18} />
              Add Member
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {fetchLoading ? (
            <div className="p-20 flex flex-col items-center justify-center text-gray-400 gap-3">
              <Loader2 className="animate-spin" size={40} />
              <p>Fetching members...</p>
            </div>
          ) : coordinators.length === 0 ? (
            <div className="p-20 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-4 opacity-20" />
              <p>No coordinators found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {coordinators.map((coordinator) => (
                    <tr key={coordinator.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#14137D] flex items-center justify-center font-bold">
                            {coordinator.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{coordinator.name}</p>
                            <p className="text-xs text-gray-500">ID: {coordinator.id?.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${coordinator.role === 'tpo'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-800'
                          }`}>
                          <ShieldCheck size={14} />
                          {coordinator.role?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} />
                          {coordinator.regEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {coordinator.createdAt ? new Date(coordinator.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(coordinator.id, coordinator.name)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          disabled={loading || coordinator.role === 'tpo'}
                          title={coordinator.role === 'tpo' ? "Cannot remove TPO accounts" : "Remove member"}
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
