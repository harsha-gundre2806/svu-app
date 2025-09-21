// File: src/departments/MEC.jsx
import React, { useState, useEffect } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const MEC = ({ isAdmin }) => {
  const [selectedSem, setSelectedSem] = useState("Sem-1");
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFiles, setModalFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    f => f.branch === "MEC" && f.semester === selectedSem
  );
  const pdfs = filtered.filter(f => f.type === "pdfs");
  const images = filtered.filter(f => f.type === "images");
  const texts = filtered.filter(f => f.type === "texts");

  const openModal = (files) => {
    setModalFiles(files);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalFiles([]);
  };

  // ⚙️ Mechanical-themed loading screen
  if (loading) {
    return (
      <div className="flex font-inter flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="animate-spin text-6xl">⚙️</div>
        <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-clip-text text-transparent">
          Turning the Gears...
        </h1>
        <p className="mt-2 text-gray-600">Engineering in progress, please wait...</p>
      </div>
    );
  }

  return (
    <div className="p-6 font-inter">
      <h1 className="text-2xl font-bold mb-4">Mechanical Engineering</h1>
      <img
        src="mec.jpg"
        alt="MEC Department Banner"
        className="w-1/2 max-w-3xl mx-auto rounded-lg mb-6 shadow"
      />

      <div className="text-center mb-8">
        <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
          Welcome to the Mechanical Engineering resource center. Select your semester
          below to explore and download syllabus, lecture notes, lab manuals,
          previous papers, and other study materials curated specifically for
          MEC students.
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
                  ? "bg-gradient-to-r from-gray-700 to-black text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-100"
              }`}
          >
            {`${sem}`}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-700">
        Not sure how to open a file? Visit{" "}
        <a
          href="/help"
          className="text-gray-800 font-semibold hover:underline"
        >
          Help
        </a>{" "}
        page for guidance.
      </p>

      {/* File Summary */}
      <section className="mb-6 p-4 bg-gray-100 shadow-md rounded-lg border border-gray-300">
        <h3 className="text-lg font-medium mb-2 text-gray-800">
          📊 Uploaded Files Summary
        </h3>
        <ul className="text-sm text-gray-700 space-y-1 pl-3 list-disc">
          <li>PDFs: {pdfs.length}</li>
          <li>Images: {images.length}</li>
          <li>Text Notes: {texts.length}</li>
        </ul>
      </section>

      {/* PDFs */}
      <div className="mt-6">
        <h3 className="text-md font-bold mb-2"> PDFs</h3>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs uploaded.</p>
        ) : (
          <div className="p-4 border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {pdfs.slice(0, 4).map((file) => (
                <div
                  key={file.id}
                  className="cursor-pointer p-3 bg-gray-200 rounded-md shadow-sm hover:shadow-lg"
                  onClick={() => window.open(file.file, "_blank")}
                >
                  <div className="flex items-center justify-center h-24 bg-white/50 rounded mb-2">
                    <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg></span>
                  </div>
                  <p className="text-center text-sm font-semibold truncate">{file.name}</p>
                </div>
              ))}
            </div>
            {pdfs.length > 4 && (
              <div className="text-right mt-3">
                <button
                  onClick={() => openModal(pdfs)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View More →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Images */}
      <div className="mt-6">
        <h3 className="text-md font-bold mb-2">Images</h3>
        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded.</p>
        ) : (
          <div className="p-4 border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {images.slice(0, 4).map((file) => (
                <div
                  key={file.id}
                  className="cursor-pointer p-3 bg-gray-200 rounded-md shadow-sm hover:shadow-lg"
                  onClick={() => window.open(file.file, "_blank")}
                >
                  <div className="flex items-center justify-center h-24 bg-white/50 rounded mb-2">
                    <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg></span>
                  </div>
                  <p className="text-center text-sm font-semibold truncate">{file.name}</p>
                </div>
              ))}
            </div>
            {images.length > 4 && (
              <div className="text-right mt-3">
                <button
                  onClick={() => openModal(images)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View More →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Text Notes */}
      <div className="mt-6">
        <h3 className="text-md font-bold mb-2">Text Notes</h3>
        {texts.length === 0 ? (
          <p className="text-gray-500">No text notes uploaded.</p>
        ) : (
          <div className="p-4 border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {texts.slice(0, 4).map((file) => (
                <div
                  key={file.id}
                  className="cursor-pointer p-3 bg-gray-200 rounded-md shadow-sm hover:shadow-lg"
                  onClick={() => window.open(file.file, "_blank")}
                >
                  <div className="flex items-center justify-center h-24 bg-white/50 rounded mb-2">
                    <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg></span>
                  </div>
                  <p className="text-center text-sm font-semibold truncate">{file.name}</p>
                </div>
              ))}
            </div>
            {texts.length > 4 && (
              <div className="text-right mt-3">
                <button
                  onClick={() => openModal(texts)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View More →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* X Close */}
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
      >
        &times;
      </button>

      <h2 className="text-lg font-bold mb-4">All Files</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {modalFiles.map((file) => {
          let icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M140-160q-23 0-41.5-18.5T80-220v-520q0-23 18.5-41.5T140-800h281l60 60h339q23 0 41.5 18.5T880-680H455l-60-60H140v520l102-400h698L833-206q-6 24-22 35t-41 11H140Zm63-60h572l84-340H287l-84 340Zm0 0 84-340-84 340Zm-63-460v-60 60Z"/></svg>;
          if (file.type === "pdfs") icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg>;
          if (file.type === "images") icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg>;
          if (file.type === "texts") icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>;
          return (
            <div
              key={file.id}
              className="cursor-pointer p-3 bg-gray-100 rounded-lg shadow hover:shadow-lg"
              onClick={() => window.open(file.file, "_blank")}
            >
              <div className="flex items-center justify-center h-24 bg-white rounded mb-2">
                <span className="text-2xl">{icon}</span>
              </div>
              <p className="text-center text-sm font-semibold truncate">{file.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MEC;
