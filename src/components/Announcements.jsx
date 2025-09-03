import React, { useState, useEffect } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const Announcements = () => {
  const branch = "NOTICE";
  const semester = "ANNOUNCEMENTS";

  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = () => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => {
        const parsed = data
          .map((file) => ({
            id: file.id,
            name: file.name,
            url: file.url,
            type: file.type,
            branch: file.branch,
            semester: file.semester,
          }))
          .filter((f) => f.branch === branch && f.semester === semester);

        setAllFiles(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Paper Note */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border border-yellow-200 relative">
        {/* Pin */}
        <div className="w-4 h-4 bg-red-500 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2 border border-red-700 shadow-md"></div>

        {/* Header */}
        <h1 className="text-xl font-bold text-yellow-800 mb-4 text-center">
          📌 University Notice Board
        </h1>

        {/* Animated Dots */}
        <p className="text-gray-600 text-center mb-2">
          Loading the latest announcements
          <span className="animate-bounce inline-block">.</span>
          <span
            className="animate-bounce inline-block"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="animate-bounce inline-block"
            style={{ animationDelay: "0.4s" }}
          >
            .
          </span>
        </p>

        {/* Fake List Items */}
        <ul className="space-y-3 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <li
              key={i}
              className="h-4 bg-yellow-100 rounded animate-pulse"
              style={{ width: `${60 + Math.random() * 30}%` }}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}


  const pdfs = allFiles.filter((f) => f.type.includes("pdf"));
  const images = allFiles.filter((f) => f.type.startsWith("image/"));
  const texts = allFiles.filter((f) => f.type === "text/plain");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Attractive Header */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          📢 Official Announcements
        </h1>
        <p className="text-gray-700 text-sm sm:text-base">
          Stay up to date with all the important notices, circulars, and updates
          released by the university. This section is regularly updated with
          PDFs, images, and text-based notices for your convenience. Make sure
          to check back often for the latest information.
        </p>
      </div>

      <p className="text-sm text-gray-700">
        Not sure how to open a file? Visit{" "}
        <a
          href="/help"
          className="text-blue-600 font-semibold hover:underline"
        >
          Help
        </a>{" "}
        page for guidance.
      </p>

      {/* PDFs */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">📄 PDFs</h3>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs uploaded.</p>
        ) : (
          pdfs.map((file) => (
            <div
              key={file.id}
              className="flex justify-between items-center p-2 bg-gray-100 mb-2 rounded"
            >
              <span>{file.name}</span>
              <div className="space-x-2 text-sm">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  View
                </a>
                <a href={file.url} download className="text-green-600">
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Images */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">🖼️ Images</h3>
        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="p-2 bg-gray-100 rounded shadow"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-auto mb-2 rounded"
                />
                <div className="flex justify-between text-sm">
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    View
                  </a>
                  <a href={img.url} download className="text-green-600">
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Text Notes */}
     
<div className="mt-6">
  <h3 className="text-md font-bold mb-2">📝 Text Notes</h3>
  {texts.length === 0 ? (
    <p className="text-gray-500">No text notes uploaded.</p>
  ) : (
    texts.map(txt => (
      <div key={txt.id} className="p-3 bg-yellow-50 mb-2 rounded">
        <h4 className="font-semibold mb-1">{txt.name}</h4>
        <iframe
          src={txt.url}
          title={txt.name}
          className="w-full h-40 border rounded"
        />
        {/* ✅ Action buttons for Open + Download */}
        <div className="flex justify-end gap-4 text-sm mt-2">
          <a
            href={txt.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open
          </a>
          <a
            href={txt.url}
            download
            className="text-green-600 hover:underline"
          >
            Download
          </a>
        </div>
      </div>
    ))
  )}
</div>

  

      <p className="text-sm text-gray-500 mt-6 text-center">
        Sometimes it may take a few seconds to load. Please wait.
      </p>
    </div>
  );
};

export default Announcements;
