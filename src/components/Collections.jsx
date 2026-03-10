// // import Footer from "./Footer";
// // import Navbar from "./Navbar";
// // import { HashLoader } from "react-spinners";
// // import { useState, useEffect } from "react";


// // export default function Collections() {
// //   const [loading, setLoading] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);


// //   useEffect(() => {
// //     function handleScroll() {
// //       setScrolled(window.scrollY > 50);
// //     }

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   return (
// //     <>
// //         {loading && (
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
// //           <HashLoader color="#22c55e" size={60} />
// //         </div>
// //       )}

// //       <Navbar scrolled={scrolled} />

// //       <Footer/>
// //     </>
// //   );
// // }





// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { HashLoader } from "react-spinners";
// import { useState, useEffect } from "react";

// import FlowerCarousel from "../components/User-Components/Carousel";
// import SpecialItems from "../components/User-Components/SpecialItems";

// export default function Collections() {
//   const [loading, setLoading] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     function handleScroll() {
//       setScrolled(window.scrollY > 50);
//     }

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <HashLoader color="#22c55e" size={60} />
//         </div>
//       )}

//       <Navbar scrolled={scrolled} />

//       <div className="pt-2 pb-2 px-2 bg-slate-900 text-white min-h-screen">

//         <FlowerCarousel />

//         <SpecialItems />

//       </div>

//       <Footer />
//     </>
//   );
// }




import Footer from "./Footer";
import Navbar from "./Navbar";
import { HashLoader } from "react-spinners";
import { useState, useEffect } from "react";

import FlowerCarousel from "../components/User-Components/Carousel";
import SpecialItems from "../components/User-Components/SpecialItems";

import { useFlowers } from "../context/FlowerContext";

export default function Collections() {

  const { flowers, loading } = useFlowers();

  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar scrolled={scrolled} />

      <div className="pt-24 pb-6 px-4 bg-slate-900 text-white min-h-screen">

        {/* SEARCH */}
        <div className="max-w-xl mx-auto mb-4">
          <input
            type="text"
            placeholder="Search flowers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* FLOWERS */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <HashLoader color="#22c55e" size={60} />
          </div>
        ) : filteredFlowers.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 mb-10">
            No flowers found 🌸
          </p>
        ) : (
          <FlowerCarousel flowers={filteredFlowers} />
        )}

        <SpecialItems />

      </div>

      <Footer />
    </>
  );
}