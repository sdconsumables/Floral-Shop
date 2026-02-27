// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
//       <div className="bg-slate-900 p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
//         <h1 className="text-3xl font-bold mb-4">🌸 Admin Dashboard</h1>
//         <p className="text-gray-300 mb-6">
//           Welcome, you are successfully logged in.
//         </p>

//         <button
//           onClick={handleLogout}
//           className="w-full bg-red-500 hover:bg-red-600 transition duration-300 py-3 rounded-lg font-semibold"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// }

export default function AdminDashboard() {
  return (
    <div className="bg-slate-900 p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4">🌸 Admin Dashboard</h1>
      <p className="text-gray-300">
        Welcome, you are successfully logged in.
      </p>
    </div>
  );
}