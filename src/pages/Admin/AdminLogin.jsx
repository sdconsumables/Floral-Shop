import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/admin.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { HashLoader } from "react-spinners";

const BASEURL = import.meta.env.VITE_BASE_URL;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      function handleScroll() {
        setScrolled(window.scrollY > 50);
      }
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(`${BASEURL}Admin-Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // ✅ No localStorage needed anymore
      navigate("/admin/dashboard", { replace: true });
    } else {
      alert(data.message || "Login Failed");
    }

  } catch (error) {
    setLoading(false);
    console.error("Login error:", error);
    alert("Server error");
  }
};

  return (
    <>
    {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#22c55e" size={60} />
        </div>
      )} 
    <Navbar scrolled={scrolled} />
    <div className="admin-login-container">
      <div className="login-card">
        <h2>Admin Panel</h2>
        <p>Login to manage flowers</p>

        {loading && <div className="loading-bar"></div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}