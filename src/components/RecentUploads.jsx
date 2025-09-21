import React, { useState, useEffect } from "react";
import { FileText, Image as ImageIcon, FilePenLine, X } from "lucide-react";

const RecentUploads = ({ uploads }) => {
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'pdfs', 'images', 'texts'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Shimmer bar background */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-1 bg-white mb-4 animate-shimmer"
              style={{
                width: `${Math.random() * 60 + 40}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Glass loading box */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 shadow-xl border border-white/20 z-10">
          <h1 className="text-2xl font-bold tracking-wide animate-pulse">
            Fetching Recent Uploads...
          </h1>
          <p className="mt-2 text-sm opacity-80">
            Please wait while we sync your files.
          </p>

          {/* Progress indicator */}
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mt-5">
            <div className="h-full bg-blue-400 animate-progress"></div>
          </div>
        </div>

        <style>
          {`
            @keyframes shimmer {
              0% { transform: translateX(-100%); opacity: 0.4; }
              50% { opacity: 1; }
              100% { transform: translateX(100%); opacity: 0.4; }
            }
            .animate-shimmer {
              animation: shimmer 2s infinite ease-in-out;
            }
            @keyframes progress {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
            .animate-progress {
              animation: progress 1.5s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    );
  }

  const sortedUploads = [...uploads]
    .filter((f) => f.date || f.timestamp || f.name)
    .sort((a, b) => {
      const timeA =
        a.timestamp ||
        new Date(a.date || a.name.split("--")[2] || "").getTime();
      const timeB =
        b.timestamp ||
        new Date(b.date || b.name.split("--")[2] || "").getTime();
      return timeB - timeA;
    });

  const pdfs = sortedUploads.filter((f) => f.type.includes("pdf"));
  const images = sortedUploads.filter((f) => f.type.startsWith("image/"));
  const texts = sortedUploads.filter((f) => f.type === "text/plain");

  // Modal reusable
  const Modal = ({ title, icon, color, files, onClose }) => (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] md:w-[70%] max-h-[80vh] rounded-xl shadow-lg p-6 overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold flex items-center gap-2 text-${color}-600`}
          >
            {icon} {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Files */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="cursor-pointer p-3 bg-gray-50 rounded-xl hover:shadow-sm border border-gray-200 transition"
              onClick={() => window.open(file.url, "_blank")}
            >
              <div
                className={`flex items-center justify-center h-24 bg-${color}-50 rounded-lg mb-2`}
              >
                {icon}
              </div>
              <p className="text-center text-sm font-semibold text-gray-700 truncate">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Recent Uploads
        </h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>

      <p className="text-sm text-gray-600 text-center mb-10">
        Not sure how to open a file? Visit{" "}
        <a href="/help" className="text-blue-600 font-semibold hover:underline">
          Help
        </a>{" "}
        page for guidance.
      </p>

      {/* PDFs */}
      <div className="mt-6 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm relative">
        <h3 className="text-md font-bold mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-460h40v-80h40q17 0 28.5-11.5T480-580v-40q0-17-11.5-28.5T440-660h-80v200Zm40-120v-40h40v40h-40Zm120 120h80q17 0 28.5-11.5T640-500v-120q0-17-11.5-28.5T600-660h-80v200Zm40-40v-120h40v120h-40Zm120 40h40v-80h40v-40h-40v-40h40v-40h-80v200ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg> PDFs
        </h3>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs uploaded.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {pdfs.slice(0, 4).map((file) => (
                <div
                  key={file.id}
                  className="cursor-pointer p-3 bg-white rounded-xl hover:shadow border border-gray-200 transition"
                  onClick={() => window.open(file.url, "_blank")}
                >
                  <div className="flex items-center justify-center h-24 bg-blue-50 rounded-lg mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg>
                  </div>
                  <p className="text-center text-sm font-semibold text-gray-700 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
            {pdfs.length > 4 && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setActiveModal("pdfs")}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  View More →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Images */}
      <div className="mt-8 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm relative">
        <h3 className="text-md font-bold mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Zm140-360q25 0 42.5-17.5T400-620q0-25-17.5-42.5T340-680q-25 0-42.5 17.5T280-620q0 25 17.5 42.5T340-560Z"/></svg> Images
        </h3>
        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {images.slice(0, 4).map((file) => (
                <div
                  key={file.id}
                  className="cursor-pointer p-3 bg-white rounded-xl  hover:shadow border border-gray-200 transition"
                  onClick={() => window.open(file.url, "_blank")}
                >
                  <div className="flex items-center justify-center h-24 bg-purple-50 rounded-lg mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg>
                  </div>
                  <p className="text-center text-sm font-semibold text-gray-700 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
            {images.length > 4 && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setActiveModal("images")}
                  className="text-purple-600 text-sm font-semibold hover:underline"
                >
                  View More →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Text Notes */}
      <div className="mt-8 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm relative">
        <h3 className="text-md font-bold mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg> Text Notes
        </h3>
        {texts.length === 0 ? (
          <p className="text-gray-500">No text notes uploaded.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {texts.slice(0, 4).map((file) => (
                <div
                  key={file.id}
                  className="cursor-pointer p-3 bg-white rounded-xl  hover:shadow border border-gray-200 transition"
                  onClick={() => window.open(file.url, "_blank")}
                >
                  <div className="flex items-center justify-center h-24 bg-green-50 rounded-lg mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>
                  </div>
                  <p className="text-center text-sm font-semibold text-gray-700 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
            {texts.length > 4 && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setActiveModal("texts")}
                  className="text-green-600 text-sm font-semibold hover:underline"
                >
                  View More →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {activeModal === "pdfs" && (
        <Modal
          title="All PDFs"
          icon={<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"/></svg>}
          color="blue"
          files={pdfs}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "images" && (
        <Modal
          title="All Images"
          icon={<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/></svg>}
          color="purple"
          files={images}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "texts" && (
        <Modal
          title="All Text Notes"
          icon={<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M320-460h320v-60H320v60Zm0 120h320v-60H320v60Zm0 120h200v-60H320v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>}
          color="green"
          files={texts}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default RecentUploads;
