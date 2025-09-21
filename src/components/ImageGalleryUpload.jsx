// File: src/ImageGalleryUpload.jsx
import React, { useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbygW_keokwXtI57CoFb5hOcLb19iJMeMnswDl-n8Edt9HltIDuX31Ra_yySFSlB-L298A/exec";

const ImageGalleryUpload = ({ refreshGallery }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (msg) => {
    setPopup(msg);
    setLoading(false);
  };

  const closePopup = () => setPopup(null);

  const handleUpload = () => {
    if (!file) return showPopup("❌ Please select a file to upload.");

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result.split(",")[1]; // remove "data:*/*;base64,"
        
        const payload = {
          filedata: base64,
          filename: file.name,
          mimetype: file.type,
          description: description || "",
        };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
          showPopup(`✅ ${file.name} uploaded successfully!`);
          setFile(null);
          setDescription("");
          document.getElementById("file-input-upload").value = null;
          if (refreshGallery) refreshGallery();
        } else {
          showPopup(`❌ Upload failed: ${result.error || "Unknown error"}`);
        }
      } catch (err) {
        console.error("Upload error:", err);
        showPopup("❌ Upload failed. Please check the console for details.");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-6 relative">
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">{popup}</p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4 text-center">
         Upload Image / Video
      </h2>

      <div className="mb-4">
        <input
          id="file-input-upload"
          type="file"
          accept="image/*,video/*"  // ✅ allow both images & videos
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full"
        />
      </div>

      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description (optional)"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full font-semibold py-2 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageGalleryUpload;
