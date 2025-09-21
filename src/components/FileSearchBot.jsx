import React, { useState, useEffect } from "react";

const FileSearchBot = ({ uploads }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const toggleBot = () => {
    setIsOpen(!isOpen);
    setQuery("");
    setResults([]);
  };
  const handleSearch = () => {
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) {
      setResults([]);
      return;
    }

    const matches = uploads.filter((file) =>
      file.name.toLowerCase().includes(lowerQuery)
    );
    setResults(matches);
  };

  useEffect(() => {
    if (query.trim() !== "") handleSearch();
    else setResults([]);
  }, [query]);

  return (
    <>
      {/* Floating Search Button */}
      {!isOpen && (
        <button
          onClick={toggleBot}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110 z-50"
          title="Search Files"
        >
          🔎
        </button>
      )}

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
            <h2 className="text-lg font-bold text-blue-600">
              🤖 File Search Bot
            </h2>
            <button
              onClick={toggleBot}
              className="text-red-500 font-bold text-xl hover:text-red-700"
            >
              ×
            </button>
          </div>

          {/* Search Input */}
          <div className="p-3 border-b">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type file name (e.g., cse, sem-2 , m3)..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Results */}
          <div className="flex-1 p-3 overflow-y-auto">
            {results.length > 0 ? (
              <>
                <h3 className="text-md font-semibold mb-2">
                  📁 Matching Files
                </h3>
                {results.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 mb-3 bg-gray-100 rounded-lg shadow-sm"
                  >
                    <p className="font-semibold text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500 mb-1">
                      Branch: {file.branch} | Semester: {file.semester}
                      <br />
                      
                    </p>

                    {/* File Preview */}
                    {file.type === "pdfs" && (
                      <iframe
                        src={file.url}
                        className="w-full h-40 border rounded mb-2"
                        title={file.name}
                      />
                    )}
                    {file.type === "images" && (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full rounded mb-2"
                      />
                    )}
                    {file.type === "texts" && (
                      <iframe
                        src={file.url}
                        className="w-full h-40 border rounded mb-2"
                        title={file.name}
                      />
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 text-sm">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open
                      </a>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              query && (
                <p className="text-gray-500 text-sm">
                  ❌ No files found for "{query}".
                </p>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FileSearchBot;



//https://script.google.com/macros/s/AKfycbyY6BoATQsqlMvKThu8U-HQ4_2l6Um1vr-dHWJOgSP0sdK8VE9keAQazNJbePraAmKg2A/exec