// File: src/departments/CSE.jsx
import React, { useState, useEffect } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const CSE = ({ isAdmin }) => {
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
    f => f.branch === "CSE" && f.semester === selectedSem
  );
  const pdfs = filtered.filter(f => f.type === "pdfs");
  const images = filtered.filter(f => f.type === "images");
  const texts = filtered.filter(f => f.type === "texts");

  // 💻 CSE-themed loading screen
 if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      
      {/* Binary Background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <p
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${12 + Math.random() * 8}px`,
            }}
          >
            {Array.from({ length: 30 })
              .map(() => (Math.random() > 0.5 ? "0" : "1"))
              .join("")}
          </p>
        ))}
      </div>

      {/* Boot Text */}
      <div className="z-10 text-center">
        <p className="text-2xl mb-2 text-green-500 animate-pulse">
          Initializing CSE Core...
        </p>
        <p className="text-sm opacity-70">
          Running diagnostics, decrypting resources...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-gray-800 rounded-full mt-6 overflow-hidden z-10">
        <div className="h-full bg-green-500 animate-progress" />
      </div>

      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          .animate-fall {
            animation-name: fall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes progress {
            0% { width: 0%; }
            50% { width: 80%; }
            100% { width: 100%; }
          }
          .animate-progress {
            animation: progress 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Computer Science & Engineering</h1>
      <img
        src="cse.jpg"
        alt="CSE Department Banner"
        className="w-1/2 max-w-3xl mx-auto rounded-lg mb-6 shadow"
      />

      <div className="text-center mb-8">
        <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
          Welcome to the Computer Science & Engineering resource center. 
          Select your semester below to explore syllabus, notes, lab manuals,
          previous papers, and other useful CSE study materials.
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
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-100"
              }`}
          >
            {`📘 ${sem}`}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-700">
        Need help opening a file? Visit{" "}
        <a
          href="/help"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Help
        </a>{" "}
        page for guidance.
      </p>

      {/* File Summary */}
      <section className="mb-6 p-4 bg-indigo-50 shadow-md rounded-lg border border-indigo-200">
        <h3 className="text-lg font-medium mb-2 text-indigo-800">
          📊 Uploaded Files Summary
        </h3>
        <ul className="text-sm text-indigo-700 space-y-1 pl-3 list-disc">
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
              className="flex justify-between items-center p-2 bg-gray-50 mb-2"
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
              <div key={img.id} className="p-2 bg-gray-50 rounded">
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

export default CSE;
