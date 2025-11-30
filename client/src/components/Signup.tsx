// client/src/components/Signup.tsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await axios.post("/api/auth/register", { username, password });
      alert("Registration successful! Please login."); // 英文提示
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      // 获取后端返回的英文错误信息，或者显示默认英文错误
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-purple-400">Join MoodScape</h2>
        
        <form onSubmit={handleSignup} className="space-y-6">
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
            Sign Up
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 hover:underline transition duration-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;