import React from "react";

function FlowerCarousel({ flowers, onEdit, onDelete }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {flowers.map((flower) => (
        <div
          key={flower._id}
          className="relative bg-slate-800 p-3 rounded-lg shadow overflow-hidden"
        >
          {/* AVAILABILITY RIBBON */}
          <div className="absolute top-0 right-0 w-[90px] h-[90px] pointer-events-none">

            {/* Triangle Background */}
            <div
              className={`absolute top-0 right-0 w-0 h-0 
              border-t-[90px] border-l-[90px] border-l-transparent
              ${
                flower.isAvailable
                  ? "border-t-green-500"
                  : "border-t-red-500"
              }`}
            ></div>

            {/* Centered Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="transform rotate-45 text-[9px] font-bold text-white tracking-wide translate-x-[18px] -translate-y-[18px]">
                {flower.isAvailable ? "FOR SALE" : "OUT OF STOCK"}
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <img
            src={flower.image}
            alt={flower.name}
            className="h-40 w-full object-cover rounded"
          />

          {/* DETAILS */}
          <h3 className="text-lg mt-2 font-semibold">
            {flower.name}
          </h3>

          <p className="text-sm text-gray-300">
            {flower.description}
          </p>

          <p className="mt-1 font-bold">
            ₹ {flower.price}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(flower)}
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(flower._id)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlowerCarousel;