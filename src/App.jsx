// import { HashRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Footer from "./components/Footer";
// import { Toaster } from "react-hot-toast";

// import AdminLogin from "./pages/Admin/AdminLogin.jsx";
// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import ManageFlowers from "./components/Admin-Components/ManageFlowers.jsx";

// import ProtectedRoute from "./components/ProtectedRoute"; 
// import AdminLayout from "./pages/Admin/AdminLayout";

// import { useEffect, useState } from "react";
// import UserLogin from "./pages/User/UserLogin.jsx";
// import UserRegister from "./pages/User/UserRegister.jsx";
// import UserDashboard from "./pages/User/UserDashboard.jsx";
// import ProtectedUserRoute from "./components/ProtectedUserRoute.jsx";
// import UserLayout from "./pages/User/UserLayout.jsx";
// import UserForgotPassword from "./pages/User/ForgotPassword.jsx";
// import Collections from "./components/Collections.jsx";
// import Carousel from "./components/User-Components/Carousel.jsx";


// // ---------------- HOME LAYOUT ----------------
// function HomeLayout() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     function handleScroll() {
//       setScrolled(window.scrollY > 50);
//     }

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
//       <Navbar scrolled={scrolled} />
//       <Hero />
//       <Carousel/>
//       <Footer />
//     </div>
//   );
// }


// // ---------------- APP ROUTING ----------------
// function App() {
//   return (
//     <>
//       {/* 🔥 GLOBAL TOASTER */}
//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//         toastOptions={{
//           duration: 2000,
//           style: {
//             background: "#1e293b",
//             color: "#fff",
//           },
//         }}
//       />

//       <HashRouter>
//         <Routes>

//           {/* WEBSITE */}
//           <Route path="/" element={<HomeLayout />} />

//           {/* Collections */}
//           <Route path="/collections" element={<Collections/>} />

//           {/* User LOGIN */}
//           <Route path="/user/login" element={<UserLogin />} />

//           {/* User Register */}
//           <Route path="/user/register" element={<UserRegister />} />

//           {/* User Forgot Password */}
//           <Route path="/user/forgot-password" element={<UserForgotPassword />} />

//           {/* User Panel */}
//           <Route
//               path="/user/*"
//               element={
//                 <ProtectedUserRoute>
//                   <UserLayout />
//                 </ProtectedUserRoute>
//               }
//             >
//               <Route path="dashboard" element={<UserDashboard />} />
//             </Route>



//           {/* ADMIN LOGIN */}
//           <Route path="/admin" element={<AdminLogin />} />

//           {/* ADMIN PANEL */}
//           <Route
//             path="/admin/*"
//             element={
//               <ProtectedRoute>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="flowers" element={<ManageFlowers />} />
//           </Route>

//         </Routes>
//       </HashRouter>
//     </>
//   );
// }

// export default App;


import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ManageFlowers from "./components/Admin-Components/ManageFlowers.jsx";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/Admin/AdminLayout";

import { useEffect, useState } from "react";

import UserLogin from "./pages/User/UserLogin.jsx";
import UserRegister from "./pages/User/UserRegister.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import ProtectedUserRoute from "./components/ProtectedUserRoute.jsx";
import UserLayout from "./pages/User/UserLayout.jsx";
import UserForgotPassword from "./pages/User/ForgotPassword.jsx";

import Collections from "./components/Collections.jsx";
import Carousel from "./components/User-Components/Carousel.jsx";

import { useFlowers } from "./context/FlowerContext";


// ---------------- HOME LAYOUT ----------------
function HomeLayout() {

  const { flowers, loading } = useFlowers();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      <Navbar scrolled={scrolled} />

      <Hero />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          Loading flowers...
        </div>
      ) : (
        <Carousel flowers={flowers} />
      )}

      <Footer />

    </div>
  );
}


// ---------------- APP ROUTING ----------------
function App() {

  return (
    <>

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

      <HashRouter>

        <Routes>

          {/* HOME */}
          <Route path="/" element={<HomeLayout />} />

          {/* COLLECTIONS */}
          <Route path="/collections" element={<Collections />} />

          {/* USER LOGIN */}
          <Route path="/user/login" element={<UserLogin />} />

          {/* USER REGISTER */}
          <Route path="/user/register" element={<UserRegister />} />

          {/* USER FORGOT PASSWORD */}
          <Route path="/user/forgot-password" element={<UserForgotPassword />} />

          {/* USER PANEL */}
          <Route
            path="/user/*"
            element={
              <ProtectedUserRoute>
                <UserLayout />
              </ProtectedUserRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>

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

      </HashRouter>

    </>
  );
}

export default App;