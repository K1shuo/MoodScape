// client/src/components/Login.tsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // 暂时注释，如果你在 AuthContext 里加了类型，这里解开

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { login } = useAuth(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      
      // 登录逻辑：保存 Token
      // login(res.data.token); 
      
      // 这里的 alert 用于调试，实际项目中可以去掉
      alert("Login successful!"); 
      navigate("/dashboard"); 
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-purple-400">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-200 bg-red-900/50 border border-red-800 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 font-bold text-white bg-purple-600 rounded hover:bg-purple-700 active:scale-95 transition duration-200"
          >
            Login
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 hover:underline transition duration-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;