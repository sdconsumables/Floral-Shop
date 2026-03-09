
// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// export default function Navbar({ scrolled }) {
//   const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

//   const user = localStorage.getItem("user");

//   const role= user ? JSON.parse(user).role : null;

//   const desktopLinkClass = ({ isActive }) =>
//     `text-sm lg:text-base ${
//       isActive
//         ? "text-green-400"
//         : "text-gray-300 hover:text-green-400"
//     }`;

//   const mobileLinkClass = ({ isActive }) =>
//     `block text-sm ${
//       isActive
//         ? "text-green-400"
//         : "text-gray-300 hover:text-green-400"
//     }`;

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
//           : "bg-slate-950/20 backdrop-blur-sm"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          
//           <div className="flex items-center space-x-1 group cursor-pointer">
//             <div>
//               <img
//                 src="./logo.png"
//                 alt="CodeFlow"
//                 className="w-6 h-6 sm:w-8 sm:h-8"
//               />
//             </div>
//             <span className="text-lg sm:text-xl md:text-2xl font-medium">
//               <span className="text-blue-400">Florals</span>
//             </span>
//           </div>

//           {/* Desktop Nav Links */}
//           <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
//             <NavLink to="/" className={desktopLinkClass}>
//               Home
//             </NavLink>

//             <NavLink to="/collections" className={desktopLinkClass}>
//               Our Collections
//             </NavLink>

//             {role ? (
//               <NavLink
//                 to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
//                 className={desktopLinkClass}
//               >
//                 Dashboard
//               </NavLink>
//             ) : (
//               <NavLink to="/user/login" className={desktopLinkClass}>
//                 Login
//               </NavLink>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 text-gray-300 hover:text-green-400"
//             onClick={() => setMobileMenuIsOpen((prev) => !prev)}
//           >
//             {mobileMenuIsOpen ? (
//               <X className="w-5 h-5 sm:w-6 sm:h-6" />
//             ) : (
//               <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuIsOpen && (
//         <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
//           <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">

//             <NavLink
//               to="/"
//               onClick={() => setMobileMenuIsOpen(false)}
//               className={mobileLinkClass}
//             >
//               Home
//             </NavLink>

//             <NavLink
//               to="/collections"
//               onClick={() => setMobileMenuIsOpen(false)}
//               className={mobileLinkClass}
//             >
//               Our Collections
//             </NavLink>

//             {role ? (
//               <NavLink
//                 to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
//                 onClick={() => setMobileMenuIsOpen(false)}
//                 className={mobileLinkClass}
//               >
//                 Dashboard
//               </NavLink>
//             ) : (
//               <NavLink
//                 to="/user/login"
//                 onClick={() => setMobileMenuIsOpen(false)}
//                 className={mobileLinkClass}
//               >
//                 Login
//               </NavLink>
//             )}

//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const user = localStorage.getItem("user");
  const role = user ? JSON.parse(user).role : null;

  const location = useLocation();

  const dashboardPath = role === "admin" ? "/admin/dashboard" : "/user/dashboard";
  const dashboardPrefix = role === "admin" ? "/admin" : "/user";

  const isDashboardActive = location.pathname.startsWith(dashboardPrefix);

  const desktopLinkClass = ({ isActive }) =>
    `text-sm lg:text-base ${
      isActive ? "text-green-400" : "text-gray-300 hover:text-green-400"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block text-sm ${
      isActive ? "text-green-400" : "text-gray-300 hover:text-green-400"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-1 group cursor-pointer">
            <img
              src="./logo.png"
              alt="Florals"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <span className="text-blue-400">Florals</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            
            <NavLink to="/" className={desktopLinkClass}>
              Home
            </NavLink>

            <NavLink to="/collections" className={desktopLinkClass}>
              Our Collections
            </NavLink>

            {role ? (
              <NavLink
                to={dashboardPath}
                className={`text-sm lg:text-base ${
                  isDashboardActive
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/user/login" className={desktopLinkClass}>
                Login
              </NavLink>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-green-400"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
          <div className="px-4 py-6 space-y-4">

            <NavLink
              to="/"
              onClick={() => setMobileMenuIsOpen(false)}
              className={mobileLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/collections"
              onClick={() => setMobileMenuIsOpen(false)}
              className={mobileLinkClass}
            >
              Our Collections
            </NavLink>

            {role ? (
              <NavLink
                to={dashboardPath}
                onClick={() => setMobileMenuIsOpen(false)}
                className={`block text-sm ${
                  isDashboardActive
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/user/login"
                onClick={() => setMobileMenuIsOpen(false)}
                className={mobileLinkClass}
              >
                Login
              </NavLink>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}