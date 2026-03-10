import React from "react";

export default function FlowerModal({ flower, onClose }) {
  if (!flower) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 p-6 rounded-xl w-[400px] relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl cursor-pointer"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={flower.image}
          alt={flower.name}
          className="h-52 w-full object-contain mb-4"
        />

        {/* DETAILS */}
        <h2 className="text-xl font-bold">
          {flower.name}
        </h2>

        <p className="text-gray-400 mt-2">
          {flower.description}
        </p>

        <p className="text-green-400 font-bold text-lg mt-3">
          ₹{flower.price}
        </p>

        <p className="mt-2">
          Status:{" "}
          <span
            className={
              flower.isAvailable
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {flower.isAvailable ? "Available" : "Out of Stock"}
          </span>
        </p>

      </div>

    </div>
  );
}