// import { Github, Twitter, Linkedin, Mail } from "lucide-react";
// import { Link } from "react-router-dom";

// const footerLinks = {
//   Product: [
//     { name: "Features", path: "/" },
//     { name: "Pricing", path: "/" },
//     { name: "Security", path: "/" },
//     { name: "Roadmap", path: "/" },
//     { name: "Changelog", path: "/" },
//   ],
//   Company: [
//     { name: "About", path: "/" },
//     { name: "Blog", path: "/" },
//     { name: "Careers", path: "/" },
//     { name: "Press", path: "/" },
//     { name: "Partners", path: "/" },
//   ],
//   Resources: [
//     { name: "Documentation", path: "/" },
//     { name: "Help Center", path: "/" },
//     { name: "Community", path: "/" },
//     { name: "API Reference", path: "/" },
//     { name: "Status", path: "/" },
//   ],
//   Legal: [
//     { name: "Privacy", path: "/" },
//     { name: "Terms", path: "/" },
//     { name: "Cookie Policy", path: "/" },
//     { name: "Licenses", path: "/" },
//     { name: "Compliance", path: "/" },
//   ],
// };

// export default function Footer() {
//   return (
//     <footer className="border-t border-slate-800 bg-slate-950 backdrop-blur-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

//         {/* Main footer content */}
//         <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">

//           {/* Logo Section */}
//           <div className="col-span-1 sm:col-span-3 lg:col-span-2 text-center sm:text-left">
//             <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4">
//               <img
//                 src="./logo.png"
//                 alt="Florals Logo"
//                 className="w-6 h-6 sm:w-8 sm:h-8"
//               />
//               <span className="text-lg sm:text-xl font-bold text-blue-400">
//                 Florals
//               </span>
//             </div>

//             <p className="text-gray-400 mb-4 sm:mb-6 max-w-xs mx-auto sm:mx-0 text-sm sm:text-base">
//               Transform your workflow with AI-powered tools and automation.
//               Built for modern teams.
//             </p>

//             <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
//               >
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a
//                 href="https://github.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
//               >
//                 <Github className="w-5 h-5" />
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
//               >
//                 <Linkedin className="w-5 h-5" />
//               </a>
//               <a
//                 href="mailto:example@email.com"
//                 className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
//               >
//                 <Mail className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Footer Links */}
//           <div className="sm:col-span-3 lg:col-span-4">
//             <div className="grid grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
//               {Object.entries(footerLinks).map(([category, links]) => (
//                 <div key={category}>
//                   <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
//                     {category}
//                   </h3>
//                   <ul className="space-y-2 sm:space-y-3">
//                     {links.map((link) => (
//                       <li key={link.name}>
//                         <Link
//                           to={link.path}
//                           className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
//                         >
//                           {link.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-6 sm:pt-8 border-t border-slate-800">
//           <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
//             <p className="text-gray-400 text-xs sm:text-sm">
//               © 2025 Florals. All rights reserved.
//             </p>
//             <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
//               <Link
//                 to="/"
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 to="/"
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 Terms of Service
//               </Link>
//               <Link
//                 to="/"
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 Cookie Settings
//               </Link>
//             </div>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }



import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left - Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="./logo.png"
              alt="Florals Logo"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-lg font-bold text-blue-400">
              Florals
            </span>
          </div>

          {/* Center - Copyright */}
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            © 2025 Florals. All rights reserved.
          </p>


        </div>

      </div>
    </footer>
  );
}