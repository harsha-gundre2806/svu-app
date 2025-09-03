import React, { useState, useEffect } from "react";

const BRANCHES = [
  { value: "cse", label: "Computer Science (CSE)" },
  { value: "ece", label: "Electronics (ECE)" },
  { value: "eee", label: "Electrical (EEE)" },
  { value: "civ", label: "Civil (CIV)" },
  { value: "mec", label: "Mechanical (MEC)" },
  { value: "cem", label: "Chemical (CEM)" },
];

const SEMESTERS = Array.from({ length: 8 }, (_, i) => `sem-${i + 1}`);

const Card2 = () => {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch uploads from Google Apps Script
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbyY6BoATQsqlMvKThu8U-HQ4_2l6Um1vr-dHWJOgSP0sdK8VE9keAQazNJbePraAmKg2A/exec"
        );
        const data = await res.json();
        setUploads(data);
      } catch (err) {
        console.error("Failed to fetch uploads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (!branch || !semester) return;

    // build search keywords like "cse--sem-1--syllabus"
    const searchKey = `${branch}--${semester}--syllabus`.toLowerCase();

    const matches = uploads.filter((file) =>
      file.name.toLowerCase().includes(searchKey)
    );

    setResults(matches);
    setSearched(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-blue-50 p-6 flex flex-col items-center">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          🗂️ Syllabus Finder
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">⏳ Loading files...</p>
        ) : (
          <>
            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select Branch --</option>
                  {BRANCHES.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select Semester --</option>
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("sem-", "Sem-")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              disabled={!branch || !semester}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Search
            </button>

            {/* Results */}
            <div className="mt-6">
              {searched && results.length === 0 && (
                <p className="text-red-600 font-medium text-center">
                  ❌ No syllabus file exists for {branch.toUpperCase()} –{" "}
                  {semester.replace("sem-", "Sem-")}.
                </p>
              )}

              {results.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-3 text-green-700">
                    ✅ Found Syllabus File(s)
                  </h3>
                  {results.map((file) => (
                    <div
                      key={file.id}
                      className="p-4 mb-3 bg-gray-100 rounded-lg shadow-sm"
                    >
                      <p className="font-semibold text-sm break-words">
                        {file.name}
                      </p>

                      {/* Preview */}
                      {file.type === "pdfs" && (
                        <iframe
                          src={file.url}
                          className="w-full h-40 border rounded mt-2"
                          title={file.name}
                        />
                      )}
                      {file.type === "images" && (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full rounded mt-2"
                        />
                      )}
                      {file.type === "texts" && (
                        <iframe
                          src={file.url}
                          className="w-full h-40 border rounded mt-2"
                          title={file.name}
                        />
                      )}

                      {/* Actions */}
                      <div className="flex gap-4 mt-2 text-sm">
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
                  ))}
                </>
              )}

              {!searched && (
                <p className="text-gray-500 text-center">
                  ℹ️ Select branch and semester, then click <em>Search</em>.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card2;
