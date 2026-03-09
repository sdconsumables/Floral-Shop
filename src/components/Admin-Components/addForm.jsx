import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

function AddForm({
  isOpen,
  onClose,
  onSubmit,
  editingFlower,
  loading,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    isAvailable: true,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editingFlower) {
      setFormData(editingFlower);
      setPreview(editingFlower.image);
    } else {
      // Reset form when opening for Add
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        isAvailable: true,
      });
      setPreview(null);
    }
  }, [editingFlower, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.image) return;
    if (loading) return;
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      {/* MODAL */}
      <div className="relative bg-slate-800 p-6 rounded-lg w-full max-w-md space-y-3">

        {/* LOADER OVERLAY */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center rounded-lg z-10">
            <HashLoader color="#22c55e" size={50} />
          </div>
        )}

        <h2 className="text-xl font-bold">
          {editingFlower ? "Update Flower" : "Add Flower"}
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          disabled={loading}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full p-2 rounded bg-slate-700"
        />

        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          disabled={loading}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          className="w-full p-2 rounded bg-slate-700"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          disabled={loading}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 rounded bg-slate-700"
        />

        <input
          type="file"
          accept="image/*"
          disabled={loading}
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="w-full p-2 rounded bg-slate-700"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="h-32 rounded border"
          />
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isAvailable}
            disabled={loading}
            onChange={() =>
              setFormData({
                ...formData,
                isAvailable: !formData.isAvailable,
              })
            }
          />
          Available
        </label>

        <div className="flex gap-3">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded ${
              editingFlower
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            } disabled:opacity-50`}
          >
            {loading ? (
              <span className="text-sm">Processing...</span>
            ) : editingFlower ? (
              "Update"
            ) : (
              "Add"
            )}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddForm;