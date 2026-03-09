// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import { HashLoader } from "react-spinners";
// import AddForm from "./addForm";
// import FlowerCarousel from "../FlowerCarousel";

// const BASEURL = import.meta.env.VITE_BASE_URL;

// function ManageFlowers() {
//   const [flowers, setFlowers] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingFlower, setEditingFlower] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 🔍 Search + Pagination
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const flowersPerPage = 6;

//   // ================= FETCH FLOWERS =================
//   const fetchFlowers = async () => {
//     try {
//       const res = await fetch(`${BASEURL}Flowers`);
//       const data = await res.json();
//       setFlowers(data);
//     } catch {
//       toast.error("Failed to fetch flowers ❌");
//     }
//   };

//   useEffect(() => {
//     fetchFlowers();
//   }, []);

//   // ================= FILTER =================
//   const filteredFlowers = flowers.filter((flower) =>
//     flower.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // ================= PAGINATION =================
//   const totalPages = Math.ceil(filteredFlowers.length / flowersPerPage);

//   const indexOfLastFlower = currentPage * flowersPerPage;
//   const indexOfFirstFlower = indexOfLastFlower - flowersPerPage;

//   const currentFlowers = filteredFlowers.slice(
//     indexOfFirstFlower,
//     indexOfLastFlower
//   );

//   // ================= AUTO PAGE CORRECTION =================
//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [filteredFlowers.length]);

//   // ================= ADD / UPDATE =================
//   const handleSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       // console.log("Formdata  ",JSON.stringify(formData));

//       const method = editingFlower ? "PUT" : "POST";
//       const url = editingFlower
//         ? `${BASEURL}Flowers?id=${editingFlower._id}`
//         : `${BASEURL}Flowers`;

//       const res = await fetch(url, {
//         method,
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error();

//       toast.success(
//         editingFlower ? "Flower Updated ✨" : "Flower Created 🌸"
//       );

//       setShowForm(false);
//       setEditingFlower(null);
//       await fetchFlowers();
//     } catch (error) {
//       console.error("Flower request error:", error);
//       toast.error("Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This flower will be deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       setLoading(true);

//       await fetch(`${BASEURL}Flowers?id=${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       toast.success("Flower Deleted 🗑️");

//       // Remove deleted flower locally
//       const updatedFlowers = flowers.filter((f) => f._id !== id);
//       setFlowers(updatedFlowers);

//       // FIX: Move to previous page if current page becomes empty
//       const newTotalPages = Math.ceil(
//         updatedFlowers.filter((flower) =>
//           flower.name.toLowerCase().includes(search.toLowerCase())
//         ).length / flowersPerPage
//       );

//       if (currentPage > newTotalPages && newTotalPages > 0) {
//         setCurrentPage(newTotalPages);
//       }

//     } catch {
//       toast.error("Delete failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (flower) => {
//     setEditingFlower(flower);
//     setShowForm(true);
//   };

//   return (
//     <div className="p-6 text-white relative">

//       {/* GLOBAL LOADER */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <HashLoader color="#22c55e" size={60} />
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Manage Flowers</h2>

//         <button
//           onClick={() => {
//             setEditingFlower(null);
//             setShowForm(true);
//           }}
//           className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add Flower
//         </button>
//       </div>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search flowers..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1);
//         }}
//         className="w-full mt-6 mb-4 p-2 rounded bg-slate-700"
//       />

//       {/* CAROUSEL */}
//       <FlowerCarousel
//         flowers={currentFlowers}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       {/* PAGINATION */}
//       <div className="flex justify-center items-center gap-4 mt-6">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//           className="bg-slate-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-slate-600"
//         >
//           Prev
//         </button>

//         <span className="text-sm">
//           Page {currentPage} of {totalPages || 1}
//         </span>

//         <button
//           disabled={currentPage === totalPages || totalPages === 0}
//           onClick={() => setCurrentPage(currentPage + 1)}
//           className="bg-slate-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-slate-600"
//         >
//           Next
//         </button>
//       </div>

//       {/* POPUP FORM */}
//       <AddForm
//         isOpen={showForm}
//         onClose={() => {
//           setShowForm(false);
//           setEditingFlower(null);
//         }}
//         onSubmit={handleSubmit}
//         editingFlower={editingFlower}
//         loading={loading}
//       />
//     </div>
//   );
// }

// export default ManageFlowers;


import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import AddForm from "./addForm";
import FlowerCarousel from "../FlowerCarousel";

const BASEURL = import.meta.env.VITE_BASE_URL;

function ManageFlowers() {
  const [flowers, setFlowers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFlower, setEditingFlower] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true); // ⭐ new loader

  // 🔍 Search + Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const flowersPerPage = 6;

  // ================= FETCH FLOWERS =================
  const fetchFlowers = async () => {
    try {
      setFetchLoading(true);

      const res = await fetch(`${BASEURL}Flowers`);
      const data = await res.json();
      setFlowers(data);

    } catch {
      toast.error("Failed to fetch flowers ❌");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  // ================= FILTER =================
  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredFlowers.length / flowersPerPage);

  const indexOfLastFlower = currentPage * flowersPerPage;
  const indexOfFirstFlower = indexOfLastFlower - flowersPerPage;

  const currentFlowers = filteredFlowers.slice(
    indexOfFirstFlower,
    indexOfLastFlower
  );

  // ================= AUTO PAGE CORRECTION =================
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredFlowers.length]);

  // ================= ADD / UPDATE =================
  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const method = editingFlower ? "PUT" : "POST";
      const url = editingFlower
        ? `${BASEURL}Flowers?id=${editingFlower._id}`
        : `${BASEURL}Flowers`;

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      toast.success(
        editingFlower ? "Flower Updated ✨" : "Flower Created 🌸"
      );

      setShowForm(false);
      setEditingFlower(null);
      await fetchFlowers();

    } catch (error) {
      console.error("Flower request error:", error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This flower will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      setFetchLoading(true);

      await fetch(`${BASEURL}Flowers?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      toast.success("Flower Deleted 🗑️");

      const updatedFlowers = flowers.filter((f) => f._id !== id);
      setFlowers(updatedFlowers);

      const newTotalPages = Math.ceil(
        updatedFlowers.filter((flower) =>
          flower.name.toLowerCase().includes(search.toLowerCase())
        ).length / flowersPerPage
      );

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

    } catch {
      toast.error("Delete failed ❌");
    } finally {
      setFetchLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (flower) => {
    setEditingFlower(flower);
    setShowForm(true);
  };

  return (
    <div className="p-6 text-white relative">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Flowers</h2>

        <button
          onClick={() => {
            setEditingFlower(null);
            setShowForm(true);
          }}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Add Flower
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search flowers..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full mt-6 mb-4 p-2 rounded bg-slate-700"
      />

      {/* FETCH LOADER */}
      {fetchLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <HashLoader color="#22c55e" size={60} />
        </div>
      ) : (
        <FlowerCarousel
          flowers={currentFlowers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-slate-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-slate-600"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-slate-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-slate-600"
        >
          Next
        </button>
      </div>

      {/* POPUP FORM */}
      <AddForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingFlower(null);
        }}
        onSubmit={handleSubmit}
        editingFlower={editingFlower}
        loading={loading}
      />
    </div>
  );
}

export default ManageFlowers;