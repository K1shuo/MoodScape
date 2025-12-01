// client/src/components/Login.tsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// 引入图标
import { LogIn, User, Lock, AlertCircle } from "lucide-react";
// 引入 Context (可选，主要用于更新全局状态，但关键是下面的 Cookie 操作)
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // 获取 Context 的 login 方法

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      
      // ============================================================
      // 👇 关键修复部分：保存 Token
      // ============================================================
      const token = res.data.token;
      
      // 1. 存入 Cookie (Dashboard 页面是通过读取 Cookie 来获取 Token 的)
      // 设置过期时间为 1 小时 (3600秒)
      document.cookie = `jwt=${token}; max-age=3600; path=/`;

      // 2. 更新全局状态 (让 App 知道用户已登录)
      login(token);

      // 3. 跳转
      // alert("Login successful!"); // 可以注释掉弹窗，直接跳转体验更好
      navigate("/dashboard"); 
      
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Please enter your details to login</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200 placeholder-gray-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200 placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-200 bg-red-900/50 border border-red-800 rounded">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 active:scale-95 transition duration-200 shadow-md hover:shadow-lg"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>
        
        {/* Footer Link */}
        <p className="mt-8 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 hover:underline transition duration-200 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;