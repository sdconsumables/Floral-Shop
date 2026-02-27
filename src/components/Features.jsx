// import { useEffect, useState } from "react";
// import FlowerCard from "./FlowerCard";

// const BASEURL = import.meta.env.VITE_BASE_URL;

// export default function Features() {
//   const cardsPerView = 3;

//   const [flowers, setFlowers] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Fetch flowers from backend
//   useEffect(() => {
//     const fetchFlowers = async () => {
//       try {
//         const res = await fetch(`${BASEURL}Flowers`);
//         const data = await res.json();
//         setFlowers(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching flowers:", error);
//         setLoading(false);
//       }
//     };

//     fetchFlowers();
//   }, []);

//   const total = flowers.length;
//   const totalSlides = Math.ceil(total / cardsPerView);

//   // Auto Slide (Paused on Hover)
//   useEffect(() => {
//     if (isHovered || totalSlides === 0) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % totalSlides);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [totalSlides, isHovered]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   // Dot Window Logic
//   const maxDots = 7;
//   const start =
//     currentSlide < Math.floor(maxDots / 2)
//       ? 0
//       : Math.min(
//           currentSlide - Math.floor(maxDots / 2),
//           totalSlides - maxDots
//         );

//   const end = Math.min(start + maxDots, totalSlides);

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-gray-400">
//         Loading flowers...
//       </div>
//     );
//   }

//   if (!flowers.length) {
//     return (
//       <div className="text-center py-20 text-gray-400">
//         No flowers available
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 px-6 relative z-10 overflow-hidden">
//       <div className="max-w-6xl mx-auto">

//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-5xl font-bold">
//             <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
//               Our Beautiful
//             </span>
//             <br />
//             <span className="bg-gradient-to-b from-pink-400 to-rose-400 bg-clip-text text-transparent">
//               Flower Collection
//             </span>
//           </h2>
//         </div>

//         {/* Carousel */}
//         <div
//           className="relative overflow-hidden"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <div
//             className="flex transition-transform duration-700 ease-in-out"
//             style={{
//               transform: `translateX(-${currentSlide * 100}%)`,
//             }}
//           >
//             {Array.from({ length: totalSlides }).map((_, slideIndex) => {
//               const startIndex = slideIndex * cardsPerView;
//               const slideItems = flowers.slice(
//                 startIndex,
//                 startIndex + cardsPerView
//               );

//               return (
//                 <div
//                   key={slideIndex}
//                   className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                 >
//                   {slideItems.map((flower) => (
//                     <FlowerCard key={flower._id} flower={flower} />
//                   ))}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Controls */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur px-4 py-2 rounded-lg"
//           >
//             ◀
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur px-4 py-2 rounded-lg"
//           >
//             ▶
//           </button>
//         </div>

//         {/* Pagination Dots */}
//         <div className="flex justify-center mt-8 gap-2 flex-wrap">
//           {Array.from({ length: totalSlides })
//             .slice(start, end)
//             .map((_, index) => {
//               const realIndex = start + index;
//               return (
//                 <button
//                   key={realIndex}
//                   onClick={() => setCurrentSlide(realIndex)}
//                   className={`w-3 h-3 rounded-full transition-all ${
//                     realIndex === currentSlide
//                       ? "bg-pink-500 scale-125"
//                       : "bg-gray-400"
//                   }`}
//                 />
//               );
//             })}
//         </div>
//       </div>
//     </section>
//   );
// }




import { useEffect, useState } from "react";
import FlowerCard from "./FlowerCard";

const BASEURL = import.meta.env.VITE_BASE_URL;

export default function Features() {
  const cardsPerView = 3;

  const [flowers, setFlowers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await fetch(`${BASEURL}Flowers`);
        const data = await res.json();
        setFlowers(data);
      } catch (error) {
        console.error("Error fetching flowers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlowers();
  }, []);

  const totalItems = flowers.length;
  const totalSlides = Math.ceil(totalItems / cardsPerView);

  // Auto slide
  useEffect(() => {
    if (isHovered || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading flowers...</div>;
  if (!flowers.length) return <div className="text-center py-20 text-gray-400">No flowers available</div>;

  return (
    <section className="py-16 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Our Beautiful
            </span>
            <br />
            <span className="bg-gradient-to-b from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Flower Collection
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${(100 / cardsPerView) * totalItems}%`,
              transform: `translateX(-${currentSlide * (100 / totalItems) * cardsPerView}%)`,
            }}
          >
            {flowers.map((flower) => (
              <div
                key={flower._id}
                className="flex-shrink-0 px-3"
                style={{ flex: `0 0 ${100 / cardsPerView}%` }}
              >
                <FlowerCard flower={flower} />
              </div>
            ))}
          </div>

          {/* Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur px-4 py-2 rounded-lg"
              >
                ◀
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur px-4 py-2 rounded-lg"
              >
                ▶
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}