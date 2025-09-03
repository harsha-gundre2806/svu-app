// File: src/departments/CEM.jsx
import React, { useState, useEffect } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const CEM = ({ isAdmin }) => {
  const [selectedSem, setSelectedSem] = useState("Sem-1");
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const semesters = [
    "Sem-1", "Sem-2", "Sem-3", "Sem-4",
    "Sem-5", "Sem-6", "Sem-7", "Sem-8"
  ];

  useEffect(() => {
    let timerDone = false;
    let fetchDone = false;

    const timer = setTimeout(() => {
      timerDone = true;
      if (fetchDone) setLoading(false);
    }, 500);

    fetch(BACKEND_URL)
      .then(res => res.json())
      .then(data => {
        const parsed = data
          .map(file => ({
            id: file.id,
            name: file.name,
            file: file.url,
            type: file.type.includes("pdf")
              ? "pdfs"
              : file.type.startsWith("image/")
              ? "images"
              : file.type === "text/plain"
              ? "texts"
              : null,
            branch: file.branch,
            semester: file.semester
          }))
          .filter(f => f.type && f.branch && f.semester);

        setAllFiles(parsed);
        fetchDone = true;
        if (timerDone) setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        fetchDone = true;
        if (timerDone) setLoading(false);
      });

    return () => clearTimeout(timer);
  }, []);

  const filtered = allFiles.filter(
    f => f.branch === "CEM" && f.semester === selectedSem
  );
  const pdfs = filtered.filter(f => f.type === "pdfs");
  const images = filtered.filter(f => f.type === "images");
  const texts = filtered.filter(f => f.type === "texts");

  // 🧪 Chemistry-themed loading screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <div className="animate-bounce text-6xl">🧪</div>
        <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-yellow-600 via-orange-700 to-red-800 bg-clip-text text-transparent">
          Mixing Chemicals...
        </h1>
        <p className="mt-2 text-gray-600">Performing experiments, please wait...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chemical Engineering</h1>
      <img
        src="cem.jpg"
        alt="CEM Department Banner"
        className="w-1/2 max-w-3xl mx-auto rounded-lg mb-6 shadow"
      />

      <div className="text-center mb-8">
        <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
          Welcome to the Chemical Engineering resource center. Select your semester
          below to explore and download syllabus, lecture notes, lab manuals,
          previous papers, and other study materials curated specifically for
          CEM students.
        </p>
      </div>

      {/* Semester Buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {semesters.map(sem => (
          <button
            key={sem}
            onClick={() => setSelectedSem(sem)}
            className={`px-5 py-2 rounded-full shadow transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
              ${
                selectedSem === sem
                  ? "bg-gradient-to-r from-yellow-600 to-orange-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-100"
              }`}
          >
            {`📘 ${sem}`}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-700">
        Not sure how to open a file? Visit{" "}
        <a
          href="/help"
          className="text-yellow-700 font-semibold hover:underline"
        >
          Help
        </a>{" "}
        page for guidance.
      </p>

      {/* File Summary */}
      <section className="mb-6 p-4 bg-yellow-100 shadow-md rounded-lg border border-yellow-300">
        <h3 className="text-lg font-medium mb-2 text-yellow-800">
          📊 Uploaded Files Summary
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1 pl-3 list-disc">
          <li>📄 PDFs: {pdfs.length}</li>
          <li>🖼️ Images: {images.length}</li>
          <li>📝 Text Notes: {texts.length}</li>
        </ul>
      </section>

      {/* PDFs */}
      <div className="mt-6">
        <h3 className="text-md font-bold mb-2">📄 PDFs</h3>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs uploaded.</p>
        ) : (
          pdfs.map(file => (
            <div
              key={file.id}
              className="flex justify-between items-center p-2 bg-yellow-50 mb-2"
            >
              <span>{file.name}</span>
              <div className="space-x-2">
                <a
                  href={file.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  View
                </a>
                <a href={file.file} download className="text-green-600">
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Images */}
      <div className="mt-6">
        <h3 className="text-md font-bold mb-2">🖼️ Images</h3>
        <div className="grid grid-cols-2 gap-4">
          {images.length === 0 ? (
            <p className="text-gray-500">No images uploaded.</p>
          ) : (
            images.map(img => (
              <div key={img.id} className="p-2 bg-yellow-50 rounded">
                <img
                  src={img.file}
                  alt={img.name}
                  className="w-full h-auto mb-2"
                />
                <div className="flex justify-between">
                  <a
                    href={img.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    View
                  </a>
                  <a href={img.file} download className="text-green-600">
                    Download
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Text Notes */}
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
          src={txt.file}
          title={txt.name}
          className="w-full h-40 border rounded"
        />
        {/* ✅ Action buttons for Open + Download */}
        <div className="flex justify-end gap-4 text-sm mt-2">
          <a
            href={txt.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open
          </a>
          <a
            href={txt.file}
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


      
    </div>
  );
};

export default CEM;
