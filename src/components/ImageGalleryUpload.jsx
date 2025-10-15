import React, { useState } from "react";
import axios from "axios";

export default function ImageGalleryUpload({ onUpload }) {
  const [mediaType, setMediaType] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const scriptURL = "https://script.google.com/macros/s/AKfycbxvT2idWeasA-u7rVv3yeV-oEN2TDKg9dzjky-cyqiAFNaVTbiGJ2YryYfikOvDY2P9MA/exec";

  // Convert Google Drive link to direct viewable link
  const convertDriveLink = (url) => {
    const match = url.match(/[-\w]{25,}/);
    return match ? `https://drive.google.com/uc?export=view&id=${match[0]}` : url;
  };

  const handleUpload = async () => {
    if (!mediaType || !driveLink || !description) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      // Use GET request for localhost dev (avoids CORS)
      const url = `${scriptURL}?action=upload&type=${encodeURIComponent(
        mediaType
      )}&link=${encodeURIComponent(convertDriveLink(driveLink))}&description=${encodeURIComponent(
        description
      )}`;

      await axios.get(url);

      alert("✅ Uploaded successfully!");
      setMediaType("");
      setDriveLink("");
      setDescription("");

      if (onUpload) onUpload(); // refresh gallery
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-10 bg-white shadow-md p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Photo / Video</h2>

      <select
        className="w-full border p-2 rounded mt-3"
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="photo">Photo</option>
        <option value="video">Video</option>
      </select>

      <input
        type="text"
        className="w-full border p-2 rounded mt-3"
        placeholder="Enter Google Drive link"
        value={driveLink}
        onChange={(e) => setDriveLink(e.target.value)}
      />

      <input
        type="text"
        className="w-full border p-2 rounded mt-3"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className={`w-full p-2 mt-4 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
