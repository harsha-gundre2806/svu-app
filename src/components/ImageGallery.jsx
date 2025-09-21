// File: src/ImageGallery.jsx
import React, { useState, useEffect } from "react";

// Google Apps Script API
const API_URL =
  "https://script.google.com/macros/s/AKfycbygW_keokwXtI57CoFb5hOcLb19iJMeMnswDl-n8Edt9HltIDuX31Ra_yySFSlB-L298A/exec";

const ImageGallery = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched files:", data);
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading gallery...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        University Events Gallery
      </h1>

      {/* Grid of files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map((file) => {
          // Google Drive link for opening full file
          const driveLink = `https://drive.google.com/file/d/${file.id}/view`;

          return (
            <div
              key={file.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <a
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Show placeholders from public folder */}
                <img
                  src={file.type === "image" ? "/img1.png" : "/img2.png"}
                  alt={file.name}
                  className="w-full h-48 object-cover"
                />
              </a>
              <div className="p-3">
                <h4 className="font-semibold text-gray-800 truncate">
                  {file.name}
                </h4>
                {file.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {file.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
