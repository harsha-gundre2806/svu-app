// File: src/ImageGalleryUpload.jsx
import React, { useState } from "react";
import { apiCall } from "./apiService";

const ImageGalleryUpload = ({ refreshGallery }) => {
  const [uploadedFileId, setUploadedFileId] = useState(null);
  const [type, setType] = useState("image");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (msg) => {
    setPopup(msg);
    setLoading(false);
  };
  const closePopup = () => setPopup(null);

  const svgToBase64 = (svg) =>
    `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

  const handleUpload = async () => {
    if (!link.trim()) return showPopup("❌ Please enter a valid link");

    setLoading(true);
    try {
      const imageCoverSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg>`;
      const videoCoverSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M205-333h400L476-508 370-368l-71-90-94 125Zm-65 173q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140Zm0-60h520v-520H140v520Zm0 0v-520 520Z"/></svg>`;

      const cover =
        type === "video"
          ? svgToBase64(videoCoverSVG)
          : svgToBase64(imageCoverSVG);

      const payload = {
        type,
        link,
        description,
        cover,
        filename: `${type}_${Date.now()}.json`,
      };

      const result = await apiCall(payload, "POST");
      
      showPopup(`✅ ${type === "video" ? "Video" : "Image"} added successfully!`);
      setUploadedFileId(result.fileId);
      setLink("");
      setDescription("");
      if (refreshGallery) refreshGallery();
      
    } catch (err) {
      console.error(err);
      showPopup(`❌ Upload failed: ${err.message || "Check console."}`);
    }
  };

  const handleRename = async () => {
    if (!uploadedFileId) return showPopup("❌ No file to rename");
    const newName = prompt("Enter new file name:");
    if (!newName) return;

    try {
      const payload = { action: "rename", fileId: uploadedFileId, newName };
      const result = await apiCall(payload, "POST");
      
      showPopup(`✅ File renamed to ${result.name}`);
      if (refreshGallery) refreshGallery();
      
    } catch (err) {
      console.error(err);
      showPopup(`❌ Rename failed: ${err.message || "Check console."}`);
    }
  };

  const handleDelete = async () => {
    if (!uploadedFileId) return showPopup("❌ No file to delete");
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const payload = { action: "delete", fileId: uploadedFileId };
      await apiCall(payload, "POST");
      
      showPopup("✅ File deleted successfully");
      setUploadedFileId(null);
      if (refreshGallery) refreshGallery();
      
    } catch (err) {
      console.error(err);
      showPopup(`❌ Delete failed: ${err.message || "Check console."}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-6 relative">
      {/* Popup message */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
            <p className="mb-4">{popup}</p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4 text-center">
        Add Image / Video (Google Icon)
      </h2>

      {/* Type Selector */}
      <div className="mb-4">
        <label className="mr-4 font-semibold">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      {/* Link Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Google Drive or YouTube link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        ></textarea>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 rounded font-semibold ${
          loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : "Add to Gallery"}
      </button>

      {/* Rename / Delete Controls */}
      {uploadedFileId && (
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleRename}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Rename
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryUpload;