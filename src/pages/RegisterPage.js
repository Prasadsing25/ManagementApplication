import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", { fullName, email, password });
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl mb-4">Register</h2>
        <input type="text" placeholder="Full Name" className="border p-2 mb-2 w-full"
          value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input type="email" placeholder="Email" className="border p-2 mb-2 w-full"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 mb-2 w-full"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
