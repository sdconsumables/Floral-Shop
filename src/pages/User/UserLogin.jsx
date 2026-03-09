import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import loginImg from "../../assets/login.png";
import userIcon from "../../assets/user.png";

const BASEURL = import.meta.env.VITE_BASE_URL;

export default function UserLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

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

      const res = await fetch(`${BASEURL}User?action=login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      localStorage.setItem("user", JSON.stringify({ role: "user", email: email, username: data.username }));

      // console.log("Data response status:", data);

      setLoading(false);

      if (res.ok) {
        navigate("/user/dashboard", { replace: true });
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#22c55e" size={60} />
        </div>
      )}

      <Navbar scrolled={scrolled} />

      <section className="min-h-screen bg-slate-950 text-white flex items-center py-20">
        <div className="max-w-5xl mx-auto px-4 w-full">

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Image */}
            <div className="hidden md:block">
              <img src={loginImg} alt="login" className="max-w-md" />
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 shadow-xl">

              <div className="flex justify-center mb-6">
                <img src={userIcon} alt="user" width="60" />
              </div>

              <h2 className="text-3xl font-bold text-center mb-6">
                User Login
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
                />

                {/* Password with Eye Toggle */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pr-10 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white cursor-pointer"
                    >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 bg-green-500 hover:bg-green-600 transition py-3 rounded-lg font-semibold"
                >
                  {loading ? "Checking..." : "Login"}
                </button>

              </form>

              <p className="text-center text-slate-400 mt-6">
                Don't have an account?{" "}
                <Link
                  to="/user/register"
                  className="text-green-400 hover:text-green-300"
                >
                  Create
                </Link>
              </p>

              <p className="text-center text-slate-400 mt-6">
                Forgot Password?{" "}
                <Link to="/user/forgot-password" className="text-green-400 cursor-pointer">
                  Reset Password
                </Link>
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}