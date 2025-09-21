// File: src/Announcements.jsx
import React, { useState, useEffect } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const Announcements = () => {
  const branch = "NOTICE";
  const semester = "ANNOUNCEMENTS";

  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFiles, setModalFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFiles = () => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => {
        const parsed = data
          .map((file) => ({
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
            semester: file.semester,
          }))
          .filter((f) => f.branch === branch && f.semester === semester && f.type);

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

  const pdfs = allFiles.filter((f) => f.type === "pdfs");
  const images = allFiles.filter((f) => f.type === "images");
  const texts = allFiles.filter((f) => f.type === "texts");

  const openModal = (files) => {
    setModalFiles(files);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalFiles([]);
  };

  const renderFileGrid = (files, type) => {
    const icon = type === "pdfs" ? <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg> : type === "images" ? <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>;

    return (
      <div className="p-4 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm shadow">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {files.slice(0, 4).map((file) => (
            <div
              key={file.id}
              className="cursor-pointer p-3 bg-gray-100 rounded-md  hover:shadow transform  transition-all duration-300"
              onClick={() => window.open(file.file, "_blank")}
            >
              <div className="flex items-center justify-center h-24 bg-white/50 rounded mb-2">
                <span className="text-2xl">{icon}</span>
              </div>
              <p className="text-center text-sm font-semibold truncate">{file.name}</p>
            </div>
          ))}
        </div>
        {files.length > 4 && (
          <div className="text-right mt-3">
            <button
              onClick={() => openModal(files)}
              className="text-blue-600 hover:underline text-sm font-semibold"
            >
              View More →
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
  {/* Pin on top */}
  <div className="text-5xl mb-4 text-yellow-600">📌</div>

  {/* Professional Announcement Card */}
  <div className="bg-white rounded-3xl shadow p-8 w-96 text-center relative">
    <h1 className="text-2xl font-semibold text-yellow-800 mb-4">
      Loading Announcements...
    </h1>

    {/* Elegant loading bar */}
    <div className="relative h-2 w-full bg-yellow-200 rounded-full overflow-hidden">
      <div className="absolute top-0 left-0 h-2 w-1/3 bg-yellow-500 rounded-full animate-slide"></div>
    </div>
  </div>

  {/* Tailwind animation */}
  <style>
    {`
      @keyframes slide {
        0% { left: -33%; }
        50% { left: 33%; }
        100% { left: 100%; }
      }
      .animate-slide {
        animation: slide 1.5s ease-in-out infinite;
      }
    `}
  </style>
</div>
 
  
  );
}


  return (
    <div className="relative font-inter p-6 max-w-5xl mx-auto">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient-background"></div>
      <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-purple-200/40 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-52 h-52 bg-blue-200/30 rounded-full blur-3xl animate-float-slow"></div>

      <div className="bg-white/80 p-6 rounded-lg shadow backdrop-blur-sm mb-8 text-center">
       <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-800 mb-2">
  <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000">
    <path d="M730-450v-60h150v60H730Zm50 290-121-90 36-48 121 90-36 48Zm-82-503-36-48 118-89 36 48-118 89ZM210-200v-160h-70q-24.75 0-42.37-17.63Q80-395.25 80-420v-120q0-24.75 17.63-42.38Q115.25-600 140-600h180l200-120v480L320-360h-50v160h-60Zm250-146v-268l-124 74H140v120h196l124 74Zm100 0v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z"/>
  </svg>
  Official Announcements
</h1>


       <p className="text-gray-700 text-sm sm:text-base">
          Stay up to date with all important notices, circulars, and updates released by the university.
        </p>
      </div>

      <p className="text-sm text-gray-700 mb-4 text-center">
        Not sure how to open a file? Visit{" "}
        <a href="/help" className="text-blue-600 font-semibold hover:underline">
          Help
        </a>{" "}
        page for guidance.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-md font-bold mb-2">PDFs</h3>
          {pdfs.length === 0 ? <p className="text-gray-500">No PDFs uploaded.</p> : renderFileGrid(pdfs, "pdfs")}
        </div>

        <div>
          <h3 className="text-md font-bold mb-2">Images</h3>
          {images.length === 0 ? <p className="text-gray-500">No images uploaded.</p> : renderFileGrid(images, "images")}
        </div>

        <div>
          <h3 className="text-md font-bold mb-2">Text Notes</h3>
          {texts.length === 0 ? <p className="text-gray-500">No text notes uploaded.</p> : renderFileGrid(texts, "texts")}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto relative backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            >
              ✖
            </span>

            <h2 className="text-lg font-bold mb-4">All Files</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {modalFiles.map((file) => {
                let icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M140-160q-23 0-41.5-18.5T80-220v-520q0-23 18.5-41.5T140-800h281l60 60h339q23 0 41.5 18.5T880-680H455l-60-60H140v520l102-400h698L833-206q-6 24-22 35t-41 11H140Zm63-60h572l84-340H287l-84 340Zm0 0 84-340-84 340Zm-63-460v-60 60Z"/></svg>;
                if (file.type === "pdfs") icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg>;
                else if (file.type === "images") icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg>;
                else if (file.type === "texts") icon = <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>;
                return (
                  <div
                    key={file.id}
                    className="cursor-pointer p-3 bg-gray-100 rounded-lg hover:shadow transform hover:-translate-y-1 hover:scale-100 transition-all duration-200"
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

      {/* Additional background animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        @keyframes gradient-background {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-background {
          background-size: 200% 200%;
          animation: gradient-background 15s ease infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Announcements;
