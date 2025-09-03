import React, { useState } from 'react';

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const SemesterUpload = ({ branch, semester, isAdmin, uploads = [], refreshFiles }) => {
  const [textNote, setTextNote] = useState("");
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const showPopup = (message) => {
    setPopup(message);
    setLoading(false); // stop loader when done
  };

  const closePopup = () => {
    setPopup(null);
  };

  const uploadToGoogleDrive = async (file) => {
    setLoading(true); // ✅ start loading
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result.split(",")[1];
        const generatedName = `${branch}--${semester}--${file.name}`;

        await fetch(BACKEND_URL, {
          method: "POST",
          body: new URLSearchParams({
            filedata: base64,
            filename: generatedName,
            mimetype: file.type,
            branch,
            semester,
            uploader: "admin",
          }),
        });

        if (typeof refreshFiles === "function") refreshFiles();
        showPopup(`✅ ${file.name} uploaded successfully!`);
      } catch (err) {
        showPopup("❌ Upload failed. Try again.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadToGoogleDrive(file);
  };

  const handleTextSubmit = async () => {
    if (textNote.trim() === "") return;
    setLoading(true); // ✅ start loading

    try {
      const filename = `${branch}--${semester}--Note_${Date.now()}.txt`;
      const base64 = btoa(unescape(encodeURIComponent(textNote)));

      await fetch(BACKEND_URL, {
        method: "POST",
        body: new URLSearchParams({
          filedata: base64,
          filename,
          mimetype: "text/plain",
          branch,
          semester,
          uploader: "admin",
        }),
      });

      setTextNote("");
      if (typeof refreshFiles === "function") refreshFiles();
      showPopup("✅ Text note uploaded successfully!");
    } catch {
      showPopup("❌ Upload failed. Try again.");
    }
  };

  // delete + rename unchanged
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    setLoading(true);

    await fetch(BACKEND_URL, {
      method: "POST",
      body: new URLSearchParams({
        action: "delete",
        fileId: id,
      }),
    });

    if (typeof refreshFiles === "function") refreshFiles();
    showPopup("🗑️ File deleted successfully!");
  };

  const handleRename = async (id, oldName) => {
    const newName = prompt("Enter new file name:", oldName.split("--")[2] || oldName);
    if (!newName || newName.trim() === "") return;
    setLoading(true);

    await fetch(BACKEND_URL, {
      method: "POST",
      body: new URLSearchParams({
        action: "rename",
        fileId: id,
        newName: newName.trim(),
      }),
    });

    if (typeof refreshFiles === "function") refreshFiles();
    showPopup(`✏️ Renamed to "${newName}"`);
  };

  const filtered = uploads.filter(f => f.branch === branch && f.semester === semester);
  const pdfs = filtered.filter(f => f.type.includes("pdf"));
  const images = filtered.filter(f => f.type.startsWith("image/"));
  const texts = filtered.filter(f => f.type === "text/plain");

  return (
    <div className="relative p-3 sm:p-6 bg-white rounded shadow mt-6 max-w-4xl mx-auto">

      {/* ✅ Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* ✅ Popup */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">{popup}</p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <h2 className="text-base sm:text-xl font-bold mb-4 text-center">
        {branch} - {semester} {isAdmin ? "Upload Panel" : "Materials"}
      </h2>

      {isAdmin && (
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Upload PDF:</label>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} className="block mt-1" />
          </div>
          <div>
            <label className="font-semibold">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="block mt-1" />
          </div>
          <div>
            <label className="font-semibold">Enter Text Note:</label>
            <textarea
              value={textNote}
              onChange={(e) => setTextNote(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <button
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
              onClick={handleTextSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* PDFs */}
      <div className="mt-8">
        <h3 className="text-sm sm:text-lg font-bold mb-2">📄 PDFs</h3>
        {pdfs.length === 0 ? (
          <p className="text-gray-500 text-sm">No PDFs uploaded.</p>
        ) : pdfs.map(file => (
          <div key={file.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-gray-100 mb-2 rounded">
            <span className="text-sm">{file.name}</span>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 text-sm">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">View</a>
              <a href={file.url} download className="text-green-600">Download</a>
              {isAdmin && (
                <>
                  <button onClick={() => handleDelete(file.id)} className="text-red-600">Delete</button>
                  <button onClick={() => handleRename(file.id, file.name)} className="text-yellow-600">Rename</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Images */}
      <div className="mt-8">
        <h3 className="text-sm sm:text-lg font-bold mb-2">🖼️ Images</h3>
        {images.length === 0 ? (
          <p className="text-gray-500 text-sm">No images uploaded.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map(img => (
              <div key={img.id} className="p-2 bg-gray-100 rounded shadow">
                <img src={img.url} alt={img.name} className="w-full h-auto mb-2 rounded" />
                <div className="flex justify-between text-sm">
                  <a href={img.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">View</a>
                  <a href={img.url} download className="text-green-600">Download</a>
                  {isAdmin && (
                    <>
                      <button onClick={() => handleDelete(img.id)} className="text-red-600">Delete</button>
                      <button onClick={() => handleRename(img.id, img.name)} className="text-yellow-600">Rename</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Text Notes */}
      <div className="mt-8">
        <h3 className="text-sm sm:text-lg font-bold mb-2">📝 Text Notes</h3>
        {texts.length === 0 ? (
          <p className="text-gray-500 text-sm">No text notes uploaded.</p>
        ) : texts.map(txt => (
          <div key={txt.id} className="p-3 bg-gray-100 mb-4 rounded">
            <h4 className="font-semibold text-sm mb-1">{txt.name}</h4>
            <iframe src={txt.url} title={txt.name} className="w-full h-40 border rounded" />
            {isAdmin && (
              <div className="flex gap-3 mt-2">
                <button onClick={() => handleDelete(txt.id)} className="text-red-600 text-sm">Delete</button>
                <button onClick={() => handleRename(txt.id, txt.name)} className="text-yellow-600 text-sm">Rename</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemesterUpload;
