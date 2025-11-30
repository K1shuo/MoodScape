import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 默认路由跳转到注册页，或者可以稍后改为 Home */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        {  <Route path="/login" element={<Login />} /> }
      </Routes>
    </BrowserRouter>
  );
}

export default App;