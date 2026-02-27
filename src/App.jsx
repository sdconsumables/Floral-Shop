import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManageFlowers from "./components/ManageFlowers.jsx";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/AdminLayout";

import { useEffect, useState } from "react";


// ---------------- HOME LAYOUT ----------------
function HomeLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}


// ---------------- APP ROUTING ----------------
function App() {
  return (
    <>
      {/* 🔥 GLOBAL TOASTER (works everywhere now) */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1e293b",
            color: "#fff",
          },
        }}
      />

      <BrowserRouter>
        <Routes>

          {/* WEBSITE */}
          <Route path="/" element={<HomeLayout />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ADMIN PANEL */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="flowers" element={<ManageFlowers />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;