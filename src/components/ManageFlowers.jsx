// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { HashLoader } from "react-spinners";
// import Swal from "sweetalert2";

// const BASEURL = import.meta.env.VITE_BASE_URL;

// function ManageFlowers() {
//   const [flowers, setFlowers] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [editingId, setEditingId] = useState(null);

//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [actionType, setActionType] = useState("");

//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const flowersPerPage = 6;

//   // ================= FETCH FLOWERS =================
//   const fetchFlowers = async () => {
//     const res = await fetch(`${BASEURL}Flowers`);
//     const data = await res.json();
//     setFlowers(data);
//   };

//   useEffect(() => {
//     fetchFlowers();
//   }, []);

//   // ================= IMAGE UPLOAD =================
//   const handleImageUpload = (file) => {
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // ================= ADD FLOWER =================
//   const handleAddFlower = async () => {
//     if (!name || !price || !image) {
//       toast.error("All fields required");
//       return;
//     }

//     try {
//       setLoading(true);
//       setActionType("add");

//       const res = await fetch(`${BASEURL}Flowers`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, price, image, description, isAvailable }),
//       });

//       if (!res.ok) throw new Error();

//       toast.success("Flower Created 🌸");
//       clearForm();
//       fetchFlowers();
//     } catch {
//       toast.error("Create Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= UPDATE FLOWER =================
//   const handleUpdateFlower = async () => {
//     try {
//       setLoading(true);
//       setActionType("update");

//       const res = await fetch(`${BASEURL}Flowers?id=${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, price, image, description, isAvailable }),
//       });

//       if (!res.ok) throw new Error();

//       toast.success("Flower Updated ✨");
//       clearForm();
//       fetchFlowers();
//     } catch {
//       toast.error("Update Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= DELETE FLOWER =================
//   const handleDeleteFlower = async (id) => {

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This flower will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, delete it",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       setLoading(true);
//       setActionType(id);

//       const res = await fetch(`${BASEURL}Flowers?id=${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error();

//       toast.success("Flower Deleted 🗑️");
//       fetchFlowers();

//     } catch {
//       toast.error("Delete Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= EDIT MODE =================
//   const handleEdit = (flower) => {
//     setName(flower.name);
//     setPrice(flower.price);
//     setImage(flower.image);
//     setPreview(flower.image);
//     setDescription(flower.description || "");
//     setIsAvailable(flower.isAvailable ?? true);
//     setEditingId(flower._id);
//   };

//   // ================= CLEAR =================
//   const clearForm = () => {
//     setName("");
//     setPrice("");
//     setImage("");
//     setPreview(null);
//     setDescription("");
//     setIsAvailable(true);
//     setEditingId(null);
//   };

//   // ================= SEARCH =================
//   const filteredFlowers = flowers.filter((flower) =>
//     flower.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // ================= PAGINATION =================
//   const indexOfLastFlower = currentPage * flowersPerPage;
//   const indexOfFirstFlower = indexOfLastFlower - flowersPerPage;
//   const currentFlowers = filteredFlowers.slice(
//     indexOfFirstFlower,
//     indexOfLastFlower
//   );

//   const totalPages = Math.ceil(filteredFlowers.length / flowersPerPage);

//   return (
//     <>
//       {/* LOADING OVERLAY */}
//       {loading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <HashLoader color="#22c55e" size={60} />
//         </div>
//       )}

//       <div className="p-6 text-white">
//         <h2 className="text-2xl font-bold mb-4">
//           {editingId ? "Update Flower" : "Add Flower"}
//         </h2>

//         {/* FORM */}
//         <div className="bg-slate-800 p-4 rounded-lg mb-6 space-y-3">
//           <input
//             type="text"
//             placeholder="Flower Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 rounded bg-slate-700"
//           />

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full p-2 rounded bg-slate-700"
//           />

//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 rounded bg-slate-700"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageUpload(e.target.files[0])}
//             className="w-full p-2 rounded bg-slate-700"
//           />

//           {preview && (
//             <img src={preview} alt="Preview" className="h-32 rounded border mt-2" />
//           )}

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={isAvailable}
//               onChange={() => setIsAvailable(!isAvailable)}
//             />
//             Available
//           </label>

//           <div className="flex gap-3">
//             {editingId ? (
//               <>
//                 <button
//                   disabled={loading}
//                   onClick={handleUpdateFlower}
//                   className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
//                 >
//                   Update Flower
//                 </button>

//                 <button
//                   disabled={loading}
//                   onClick={clearForm}
//                   className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 disabled={loading}
//                 onClick={handleAddFlower}
//                 className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Add Flower
//               </button>
//             )}
//           </div>
//         </div>

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search flowers..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full mb-4 p-2 rounded bg-slate-700"
//         />

//         {/* FLOWER LIST */}
//         <div className="grid md:grid-cols-3 gap-4">
//           {currentFlowers.map((flower) => (
//             <div key={flower._id} className="relative bg-slate-800 p-3 rounded-lg shadow overflow-hidden">

//              <div className="absolute top-0 right-0 w-[90px] h-[90px] pointer-events-none">

//               {/* Triangle */}
//               <div
//                 className={`absolute top-0 right-0 w-0 h-0 border-t-[90px] border-l-[90px] border-l-transparent
//                 ${flower.isAvailable ? "border-t-green-500" : "border-t-red-500"}`}
//               ></div>

//               {/* TRUE CENTER TEXT */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="transform rotate-45 text-[9px] font-bold text-white tracking-wide translate-x-[18px] -translate-y-[18px]">
//                   {flower.isAvailable ? "FOR SALE" : "OUT OF STOCK"}
//                 </span>
//               </div>

//             </div>

//               <img
//                 src={flower.image}
//                 alt={flower.name}
//                 className="h-40 w-full object-cover rounded"
//               />
//               <h3 className="text-lg mt-2">{flower.name}</h3>
//               <p>{flower.description}</p>
//               <p>₹ {flower.price}</p>

//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() => handleEdit(flower)}
//                   className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDeleteFlower(flower._id)}
//                   className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* PAGINATION */}
//         <div className="flex justify-center items-center gap-4 mt-6">

//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//             className="bg-slate-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-slate-600"
//           >
//             Prev
//           </button>

//           <span className="text-sm">
//             Page {currentPage} of {totalPages || 1}
//           </span>

//           <button
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage(currentPage + 1)}
//             className="bg-slate-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-slate-600"
//           >
//             Next
//           </button>

//         </div>
//       </div>
//     </>
//   );
// }

// export default ManageFlowers;


import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import AddForm from "./addForm";
import FlowerCarousel from "./FlowerCarousel";

const BASEURL = import.meta.env.VITE_BASE_URL;

function ManageFlowers() {
  const [flowers, setFlowers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFlower, setEditingFlower] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔍 Search + Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const flowersPerPage = 6;

  // ================= FETCH FLOWERS =================
  const fetchFlowers = async () => {
    try {
      const res = await fetch(`${BASEURL}Flowers`);
      const data = await res.json();
      setFlowers(data);
    } catch {
      toast.error("Failed to fetch flowers ❌");
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
      // console.log("Formdata  ",JSON.stringify(formData));

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
      setLoading(true);

      await fetch(`${BASEURL}Flowers?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      toast.success("Flower Deleted 🗑️");

      // Remove deleted flower locally
      const updatedFlowers = flowers.filter((f) => f._id !== id);
      setFlowers(updatedFlowers);

      // FIX: Move to previous page if current page becomes empty
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
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (flower) => {
    setEditingFlower(flower);
    setShowForm(true);
  };

  return (
    <div className="p-6 text-white relative">

      {/* GLOBAL LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#22c55e" size={60} />
        </div>
      )}

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

      {/* CAROUSEL */}
      <FlowerCarousel
        flowers={currentFlowers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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