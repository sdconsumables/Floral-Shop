// import { useRef, useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import FlowerModal from "./FlowerModal";

// const BASEURL = import.meta.env.VITE_BASE_URL;

// export default function Carousel() {

//   const scrollRef = useRef(null);
//   const navigate = useNavigate();

//   const CACHE_KEY = "flowers_cache";
//   const CART_KEY = "cart_items";
//   const CACHE_TIME = 60 * 60 * 1000;

//   const [flowers, setFlowers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedFlower, setSelectedFlower] = useState(null);

//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem(CART_KEY);
//     return savedCart ? JSON.parse(savedCart) : {};
//   });

//   useEffect(() => {

//     const cachedData = localStorage.getItem(CACHE_KEY);

//     if (cachedData) {

//       const parsed = JSON.parse(cachedData);
//       const isExpired = Date.now() - parsed.timestamp > CACHE_TIME;

//       if (!isExpired) {
//         setFlowers(parsed.data);
//         setLoading(false);
//         return;
//       }
//     }

//     fetchFlowers();

//   }, []);

//   useEffect(() => {
//     localStorage.setItem(CART_KEY, JSON.stringify(cart));
//   }, [cart]);

//   const fetchFlowers = async () => {

//     try {

//       const res = await fetch(`${BASEURL}Flowers`);
//       const data = await res.json();

//       setFlowers(data);

//       localStorage.setItem(
//         CACHE_KEY,
//         JSON.stringify({
//           data,
//           timestamp: Date.now(),
//         })
//       );

//     } catch (error) {

//       console.error("Error fetching flowers:", error);

//     } finally {

//       setLoading(false);

//     }

//   };

//   const scroll = (direction) => {

//     const container = scrollRef.current;
//     if (!container) return;

//     const scrollAmount = container.clientWidth;

//     container.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });

//   };

//   const addItem = (flower) => {

//     const token = localStorage.getItem("user");

//     if (!token) {
//       alert("Please login first");
//       navigate("/user/login");
//       return;
//     }

//     setCart((prev) => ({
//       ...prev,
//       [flower._id]: 1,
//     }));

//   };

//   const increase = (flowerId) => {

//     setCart((prev) => ({
//       ...prev,
//       [flowerId]: prev[flowerId] + 1,
//     }));

//   };

//   const decrease = (flowerId) => {

//     setCart((prev) => {

//       const updated = { ...prev };

//       updated[flowerId] -= 1;

//       if (updated[flowerId] <= 0) delete updated[flowerId];

//       return updated;

//     });

//   };

//   if (loading) {
//     return (
//       <section className="py-16 flex justify-center">
//         <p className="text-gray-400 text-lg">Loading flowers...</p>
//       </section>
//     );
//   }

//   const availableFlowers = flowers.filter((flower) => flower.isAvailable);

//   return (
//     <>
//       <section className="py-20 px-4 sm:px-8 lg:px-12">

//         <h1 className="text-4xl font-bold text-center mb-14 tracking-wide">
//           🌸 Available Flowers
//         </h1>

//         <div className="relative">

//           {/* LEFT BUTTON */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur border border-slate-700 p-3 rounded-full z-10 hover:bg-slate-700 transition"
//           >
//             <ChevronLeft size={22} />
//           </button>

//           {/* CAROUSEL */}
//           <div
//             ref={scrollRef}
//             className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
//           >

//             {availableFlowers.map((flower) => (

//               <div
//                 key={flower._id}
//                 onClick={() => setSelectedFlower(flower)}
//                 className="relative cursor-pointer flex-shrink-0 w-full sm:w-[48%] md:w-[32%] lg:w-[260px] bg-slate-900 border border-slate-800 rounded-2xl shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300"
//               >

//                 {/* AVAILABILITY RIBBON */}
//                 <div className="absolute top-0 right-0 w-[90px] h-[90px] pointer-events-none">

//                   <div
//                     className={`absolute top-0 right-0 w-0 h-0 
//                     border-t-[90px] border-l-[90px] border-l-transparent
//                     ${
//                       flower.isAvailable
//                         ? "border-t-green-500"
//                         : "border-t-red-500"
//                     }`}
//                   ></div>

//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="transform rotate-45 text-[9px] font-bold text-white tracking-wide translate-x-[18px] -translate-y-[18px]">
//                       {flower.isAvailable
//                         ? "FOR SALE"
//                         : "OUT OF STOCK"}
//                     </span>
//                   </div>

//                 </div>

//                 {/* IMAGE */}
//                 <div className="overflow-hidden rounded-t-2xl bg-slate-800">
//                   <img
//                     src={flower.image}
//                     alt={flower.name}
//                     className="h-56 w-full object-contain p-2"
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-5 text-center">

//                   <h2 className="text-lg font-semibold mb-2">
//                     {flower.name}
//                   </h2>

//                   <p className="text-green-400 font-bold text-lg mb-3">
//                     ₹{flower.price}
//                   </p>

//                   {!cart[flower._id] ? (

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addItem(flower);
//                       }}
//                       className="w-full bg-green-600 hover:bg-green-500 py-2 rounded-lg font-medium transition"
//                     >
//                       Add to Cart 🛒
//                     </button>

//                   ) : (

//                     <div
//                       onClick={(e) => e.stopPropagation()}
//                       className="flex items-center justify-center gap-5"
//                     >

//                       <button
//                         onClick={() => decrease(flower._id)}
//                         className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg"
//                       >
//                         -
//                       </button>

//                       <span className="text-lg font-semibold text-green-400">
//                         {cart[flower._id]}
//                       </span>

//                       <button
//                         onClick={() => increase(flower._id)}
//                         className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded-lg"
//                       >
//                         +
//                       </button>

//                     </div>

//                   )}

//                 </div>

//               </div>

//             ))}

//           </div>

//           {/* RIGHT BUTTON */}
//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur border border-slate-700 p-3 rounded-full hover:bg-slate-700 transition"
//           >
//             <ChevronRight size={22} />
//           </button>

//         </div>

//       </section>

//       {/* MODAL COMPONENT */}
//       <FlowerModal
//         flower={selectedFlower}
//         onClose={() => setSelectedFlower(null)}
//       />
//     </>
//   );
// }


import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FlowerModal from "./FlowerModal";

export default function Carousel({ flowers = [] }) {

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const CART_KEY = "cart_items";

  const [selectedFlower, setSelectedFlower] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const scroll = (direction) => {

    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

  };

  const addItem = (flower) => {

    const token = localStorage.getItem("user");

    if (!token) {
      alert("Please login first");
      navigate("/user/login");
      return;
    }

    setCart((prev) => ({
      ...prev,
      [flower._id]: 1,
    }));

  };

  const increase = (flowerId) => {

    setCart((prev) => ({
      ...prev,
      [flowerId]: prev[flowerId] + 1,
    }));

  };

  const decrease = (flowerId) => {

    setCart((prev) => {

      const updated = { ...prev };

      updated[flowerId] -= 1;

      if (updated[flowerId] <= 0) delete updated[flowerId];

      return updated;

    });

  };


  return (
    <>
      <section className="py-20 px-4 sm:px-8 lg:px-12">

        <h1 className="text-4xl font-bold text-center mb-14 tracking-wide">
          🌸 Available Flowers
        </h1>

        <div className="relative">

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur border border-slate-700 p-3 rounded-full z-10 hover:bg-slate-700 transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* CAROUSEL */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >

            {flowers.map((flower) => (

              <div
                key={flower._id}
                onClick={() => setSelectedFlower(flower)}
                className="relative cursor-pointer shrink-0 w-full sm:w-[48%] md:w-[32%] lg:w-[260px] bg-slate-900 border border-slate-800 rounded-2xl shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300"
              >

                {/* AVAILABILITY RIBBON */}
                <div className="absolute top-0 right-0 w-[90px] h-[90px] pointer-events-none">

                  <div
                    className={`absolute top-0 right-0 w-0 h-0 
                    border-t-[90px] border-l-[90px] border-l-transparent
                    ${
                      flower.isAvailable
                        ? "border-t-green-500"
                        : "border-t-red-500"
                    }`}
                  ></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="transform rotate-45 text-[9px] font-bold text-white tracking-wide translate-x-[18px] -translate-y-[18px]">
                      {flower.isAvailable
                        ? "FOR SALE"
                        : "OUT OF STOCK"}
                    </span>
                  </div>

                </div>

                {/* IMAGE */}
                <div className="overflow-hidden rounded-t-2xl bg-slate-800">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="h-56 w-full object-contain p-2"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 text-center">

                  <h2 className="text-lg font-semibold mb-2">
                    {flower.name}
                  </h2>

                  <p className="text-green-400 font-bold text-lg mb-3">
                    ₹{flower.price}
                  </p>

                  {!cart[flower._id] ? (

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(flower);
                        }}
                        disabled={!flower.isAvailable}
                        className={`w-full py-2 rounded-lg font-medium transition
                          ${
                            flower.isAvailable
                              ? "bg-green-600 hover:bg-green-500"
                              : "bg-gray-600 cursor-not-allowed opacity-70"
                          }
                        `}
                      >
                        {flower.isAvailable ? "Add to Cart 🛒" : "Out of Stock"}
                      </button>

                    ) : (

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-5"
                    >

                      <button
                        onClick={() => decrease(flower._id)}
                        className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg"
                      >
                        -
                      </button>

                      <span className="text-lg font-semibold text-green-400">
                        {cart[flower._id]}
                      </span>

                      <button
                        onClick={() => increase(flower._id)}
                        className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded-lg"
                      >
                        +
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur border border-slate-700 p-3 rounded-full hover:bg-slate-700 transition"
          >
            <ChevronRight size={22} />
          </button>

        </div>

      </section>

      {/* MODAL */}
      <FlowerModal
        flower={selectedFlower}
        onClose={() => setSelectedFlower(null)}
      />
    </>
  );
}