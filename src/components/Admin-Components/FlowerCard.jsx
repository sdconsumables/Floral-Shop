import { useEffect, useState } from "react";

const BASEURL = import.meta.env.VITE_BASE_URL;

export default function Flowers() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = async () => {
    try {
      const res = await fetch(`${BASEURL}Flowers`);
      const data = await res.json();
      setFlowers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flowers:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading flowers...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-12">
      {flowers.map((flower) => (
        <div
          key={flower._id}
          className="bg-slate-900/90 backdrop-blur-lg border border-slate-800 rounded-xl p-4 shadow-lg hover:scale-105 transition duration-300"
        >
          <img
            src={flower.image}
            alt={flower.name}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />

          <h3 className="text-white text-lg font-semibold">
            {flower.name}
          </h3>

          <p className="text-pink-400 font-bold mt-2">
            ₹{flower.price}
          </p>
        </div>
      ))}
    </div>
  );
}