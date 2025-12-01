// client/src/components/Dashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// 引入 Lucide 图标
import { Smile, Frown, Meh, CloudRain, LogOut, History, Send } from "lucide-react";
// 引入我们刚才写的图表组件
import MoodChart from "./MoodChart";

interface Mood {
  id: number;
  moodType: string;
  note: string;
  createdAt: string;
}

const Dashboard = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [moodType, setMoodType] = useState("Happy");
  const [note, setNote] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 辅助函数：根据心情返回对应的图标
  const getMoodIcon = (type: string) => {
    switch (type) {
      case "Happy":
        return <Smile className="w-8 h-8 text-yellow-400" />;
      case "Sad":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "Calm":
        return <Meh className="w-8 h-8 text-green-400" />;
      case "Anxious":
        return <Frown className="w-8 h-8 text-purple-400" />;
      default:
        return <Smile className="w-8 h-8 text-gray-400" />;
    }
  };

  const fetchMoods = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];
      const res = await axios.get("/api/moods", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMoods(res.data);
    } catch (err) {
      console.error("Failed to fetch moods", err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];
      await axios.post("/api/moods", 
        { moodType, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNote("");
      fetchMoods(); // 提交后刷新列表和图表
    } catch (err) {
      alert("Failed to log mood");
    }
  };

  const handleLogout = () => {
    logout();
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">MoodScape Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-700 rounded transition duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* 1. 可视化图表区域 */}
        <MoodChart moods={moods} />

        {/* 2. 心情输入卡片 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Smile className="text-purple-400" />
            How are you feeling today?
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <select 
              value={moodType}
              onChange={(e) => setMoodType(e.target.value)}
              className="bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-purple-500 outline-none transition"
            >
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Calm">Calm</option>
              <option value="Anxious">Anxious</option>
            </select>
            <input 
              type="text" 
              placeholder="Add a short note..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-purple-500 outline-none transition"
            />
            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 bg-purple-600 px-6 py-3 rounded font-bold hover:bg-purple-700 transition duration-200"
            >
              <Send size={18} />
              Log
            </button>
          </form>
        </div>

        {/* 3. 历史记录列表 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <History className="text-gray-400" />
            History
          </h2>
          
          {moods.length === 0 && (
            <div className="text-center p-8 text-gray-500 bg-gray-800/50 rounded-lg">
              No moods logged yet. Start by adding one above!
            </div>
          )}

          {moods.map((mood) => (
            <div 
              key={mood.id} 
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border-l-4 border-purple-500 shadow-sm hover:bg-gray-750 transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-700 rounded-full">
                  {getMoodIcon(mood.moodType)}
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-200">{mood.moodType}</div>
                  <div className="text-gray-400 text-sm">{mood.note || "No note added"}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {new Date(mood.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;