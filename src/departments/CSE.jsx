// File: src/departments/CSE.jsx
import React, { useState, useEffect } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const CSE = ({ isAdmin }) => {
  const [selectedSem, setSelectedSem] = useState("Sem-1");
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup state
  const [popupType, setPopupType] = useState(null); // "pdfs" | "images" | "texts" | null

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

  // Helper for rendering files
  const renderFileCard = (file, icon) => (
    <div
      key={file.id}
      className="cursor-pointer p-3 bg-gray-300 rounded-md shadow-sm hover:shadow-lg"
      onClick={() => window.open(file.file, "_blank")}
    >
      <div className="flex items-center justify-center h-24 bg-white/50 rounded mb-2">
        <span className="text-gray-700 text-lg">{icon}</span>
      </div>
      <p className="text-center text-sm font-semibold truncate">{file.name}</p>
    </div>
  );

  // Popup files
  const popupFiles =
    popupType === "pdfs" ? pdfs : popupType === "images" ? images : popupType === "texts" ? texts : [];

  // Loading animation
  if (loading) {
    return (
      <div className="flex font-inter flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
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

        <div className="z-10 text-center">
          <p className="text-2xl mb-2 text-green-500 animate-pulse">
            Initializing CSE Core...
          </p>
          <p className="text-sm opacity-70">
            Running diagnostics, decrypting resources...
          </p>
        </div>

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
    <div className="p-6 font-inter">
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

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {semesters.map(sem => (
          <button
            key={sem}
            onClick={() => setSelectedSem(sem)}
            className={`px-5 py-2 rounded-full shadow transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
              ${selectedSem === sem
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {` ${sem}`}
          </button>
        ))}
      </div>

      <section className="mb-6 p-4 bg-indigo-50 shadow-md rounded-lg border border-indigo-200">
        <h3 className="text-lg font-medium mb-2 text-indigo-800">
          📊 Uploaded Files Summary
        </h3>
        <ul className="text-sm text-indigo-700 space-y-1 pl-3 list-disc">
          <li> PDFs: {pdfs.length}</li>
          <li> Images: {images.length}</li>
          <li> Text Notes: {texts.length}</li>
        </ul>
      </section>

      {/* PDFs */}
      <div className="mt-6 border rounded-md p-4 shadow">
        <h3 className="text-md font-bold mb-2"> PDFs</h3>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs uploaded.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {pdfs.slice(0, 4).map((f) => renderFileCard(f, <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg>))}
            </div>
            {pdfs.length > 4 && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setPopupType("pdfs")}
                  className="text-sm text-indigo-600 font-semibold hover:underline"
                >
                  View More →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Images */}
      <div className="mt-6 border rounded-md p-4 shadow">
        <h3 className="text-md font-bold mb-2"> Images</h3>
        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {images.slice(0, 4).map((f) => renderFileCard(f, <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg>))}
            </div>
            {images.length > 4 && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setPopupType("images")}
                  className="text-sm text-indigo-600 font-semibold hover:underline"
                >
                  View More →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Text Notes */}
      <div className="mt-6 border rounded-md p-4 shadow">
        <h3 className="text-md font-bold mb-2"> Text Notes</h3>
        {texts.length === 0 ? (
          <p className="text-gray-500">No text notes uploaded.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {texts.slice(0, 4).map((f) => renderFileCard(f, <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>))}
            </div>
            {texts.length > 4 && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setPopupType("texts")}
                  className="text-sm text-indigo-600 font-semibold hover:underline"
                >
                  View More →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Popup (Shared for PDFs, Images, Texts) */}
      {popupType && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          onClick={() => setPopupType(null)}
        >
          <div
            className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[80vh] rounded-lg shadow-lg p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {popupType === "pdfs" && "All PDFs"}
                {popupType === "images" && "All Images"}
                {popupType === "texts" && "All Text Notes"}
              </h2>
              <button
                onClick={() => setPopupType(null)}
                className="text-gray-600 hover:text-red-500 text-lg"
              >
                ✖
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {popupFiles.map((f) =>
                popupType === "pdfs"
                  ? renderFileCard(f, <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg>)
                  : popupType === "images"
                  ? renderFileCard(f, <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg>)
                  : renderFileCard(f, <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSE;
