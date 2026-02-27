// import { ArrowRight, Play } from "lucide-react";
// import img from "../assets/bg.jpg";

// export default function Hero() {
//   return (
//     <section
//       className="relative h-screen flex items-center justify-center text-center px-6"
//       style={{
//         backgroundImage: `url(${img})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60" />

//       {/* Content */}
//       <div className="relative z-10 max-w-3xl">
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
//           Code Faster <br />
//           Build Better <br />
//           With CodeFlow AI
//         </h1>

//         <p className="text-lg sm:text-xl text-gray-300 mb-8">
//           Accelerate your development workflow with intelligent code
//           completion and smart debugging. Ship production-ready code 10x faster.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2">
//             Start Coding Free
//             <ArrowRight size={18} />
//           </button>

//           <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition duration-300 flex items-center justify-center gap-2">
//             <Play size={18} />
//             Watch Demo
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


import { ArrowRight, Play } from "lucide-react";
import img from "../assets/bg.jpg";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center px-6"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
          Fresh Flowers <br />
          Delivered with Love <br />
          Brighten Every Moment
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Discover handpicked bouquets and floral arrangements crafted to
          celebrate every occasion. Same-day delivery available to make your
          special moments unforgettable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2">
            Shop Now
            <ArrowRight size={18} />
          </button>

          <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition duration-300 flex items-center justify-center gap-2">
            <Play size={18} />
            View Collection
          </button>
        </div>
      </div>
    </section>
  );
}