const BASEURL = import.meta.env.VITE_BASE_URL;
import Notiflix from "notiflix";
import setupNotiflix from "../../utils/notiflixConfig";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function UserLayout() {
  setupNotiflix();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";
  

const handleLogout = () => {

  Notiflix.Confirm.show(
    "Logout",
    "You will be logged out",
    "Logout",
    "Cancel",

    async function okCb() {

      try {
        setLoading(true);

        await fetch(`${BASEURL}User?action=logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        localStorage.removeItem("user");

        navigate("/user/login", { replace: true });

      } catch (err) {
        console.error("Logout failed", err);
      } finally {
        setLoading(false);
      }

    },

    function cancelCb() {
      // user cancelled — do nothing
    }

  );

};


  const linkClasses = ({ isActive }) =>
    `p-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-slate-800 border-l-4 border-green-400 pl-2 font-semibold text-green-400"
        : "hover:bg-slate-800"
    }`;

  return (
    <>

      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#22c55e" size={60} />
        </div>
      )}

      <Navbar />

      

      <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-16">
        <div className="flex flex-1 relative">
          
          {/* Sidebar */}
          <div
            className={`
              bg-slate-900 p-6 flex flex-col
              transform transition-transform duration-300 z-40
              w-64 min-h-[calc(100vh-4rem)]
              fixed top-16 left-0
              md:sticky md:top-16 md:translate-x-0
              ${open ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div>
              <h1 className="text-2xl font-bold mb-8">{username}</h1>

              <nav className="flex flex-col gap-4">
                
                <NavLink
                  to="/user/dashboard"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/user/orders"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  Orders
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 hover:bg-red-600 py-2 rounded-lg text-center font-semibold transition"
                >
                  Logout
                </button>

              </nav>
            </div>
          </div>

          {/* Overlay for mobile */}
          {open && (
            <div
              className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />
          )}

          {/* Content */}
          <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
            
            {/* Mobile Topbar */}
            <div className="md:hidden flex items-center justify-between bg-slate-900 p-4">
              <button onClick={() => setOpen(true)}>
                <Menu size={28} />
              </button>
              <h2 className="font-semibold">Welcome <span className="text-green-500">{username}</span></h2>
            </div>

            <div className="p-6 flex-1">
              <Outlet />
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}