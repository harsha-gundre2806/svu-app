import React, { useState, useEffect } from "react";

const RecentUploads = ({ uploads }) => {
  const [loading, setLoading] = useState(true);

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
          <p className="mt-2 text-sm opacity-80">Please wait while we sync your files.</p>

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
    .filter(f => f.date || f.timestamp || f.name)
    .sort((a, b) => {
      const timeA = a.timestamp || new Date(a.date || a.name.split("--")[2] || "").getTime();
      const timeB = b.timestamp || new Date(b.date || b.name.split("--")[2] || "").getTime();
      return timeB - timeA;
    });

  const pdfs = sortedUploads.filter(f => f.type.includes("pdf")).slice(0, 5);
  const images = sortedUploads.filter(f => f.type.startsWith("image/")).slice(0, 5);
  const texts = sortedUploads.filter(f => f.type === "text/plain").slice(0, 5);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
  <span className="mr-2">📥</span>
  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
    Recent Uploads
  </span>
</h1>

      <p className="text-sm text-gray-600 text-center mb-8">
        Not sure how to open a file? Visit{" "}
        <a href="/help" className="text-blue-600 font-semibold hover:underline">
          Help
        </a>{" "}
        page for guidance.
      </p>

      {/* PDFs */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">📄 Latest PDFs</h2>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">No recent PDFs available.</p>
        ) : (
          pdfs.map((file) => (
            <div
              key={file.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow rounded-lg p-3 mb-2 hover:shadow-lg transition-all"
            >
              <span>{file.name}</span>
              <div className="flex gap-3 mt-2 sm:mt-0">
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View
                </a>
                <a href={file.url} download className="text-green-600 hover:underline">
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Images */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">🖼️ Latest Images</h2>
        {images.length === 0 ? (
          <p className="text-gray-500">No recent images available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((file) => (
              <div
                key={file.id}
                className="bg-white p-3 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                <img src={file.url} alt={file.name} className="w-full h-auto mb-2 rounded" />
                <p className="text-sm truncate mb-1">{file.name}</p>
                <div className="flex justify-between text-sm">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View
                  </a>
                  <a href={file.url} download className="text-green-600 hover:underline">
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Text Notes */}
      <section>
  <h2 className="text-lg font-semibold mb-3">📝 Latest Text Notes</h2>
  {texts.length === 0 ? (
    <p className="text-gray-500">No recent text notes available.</p>
  ) : (
    texts.map((file) => (
      <div
        key={file.id}
        className="bg-white p-4 rounded-lg mb-3 shadow hover:shadow-lg transition-all"
      >
        <h4 className="font-semibold text-sm mb-2">{file.name}</h4>
        <iframe src={file.url} title={file.name} className="w-full h-40 border rounded" />
        <div className="text-right text-sm mt-2 flex justify-end gap-4">
          {/* 👇 Added Open button */}
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open
          </a>
          <a
            href={file.url}
            download
            className="text-green-600 hover:underline"
          >
            Download
          </a>
        </div>
      </div>
    ))
  )}
</section>

      <p className="text-center text-gray-500 mt-6">
        Sometimes it may take a few seconds to load. Please wait.
      </p>
    </div>
  );
};

export default RecentUploads;
