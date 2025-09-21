import React, { useState } from 'react';

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";

const SemesterUpload = ({ branch, semester, isAdmin, uploads = [], refreshFiles }) => {
  const [textNote, setTextNote] = useState("");
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalFiles, setModalFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showPopup = (message) => {
    setPopup(message);
    setLoading(false);
  };
  const closePopup = () => setPopup(null);

  const uploadToGoogleDrive = async (file) => {
    setLoading(true);
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
      } catch {
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
    if (!textNote.trim()) return;
    setLoading(true);

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

  const openModal = (files) => {
    setModalFiles(files);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalFiles([]);
  };

  const renderFileGrid = (files, type) => {
    const icon = type === "pdfs" ? "📄" : type === "images" ? "🖼️" : "📝";
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.slice(0, 4).map(file => (
          <div
            key={file.id}
            className="p-3 bg-gray-100 rounded shadow hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center justify-center h-24 bg-white rounded mb-2">
              <span className="text-2xl">{icon}</span>
            </div>
            <p className="text-sm font-semibold truncate">{file.name}</p>
            <div className="flex justify-between mt-2 text-sm">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">View</a>
              
              {isAdmin && (
                <>
                  <button onClick={() => handleDelete(file.id)} className="text-red-600">Del</button>
                  <button onClick={() => handleRename(file.id, file.name)} className="text-yellow-600">Rename</button>
                </>
              )}
            </div>
          </div>
        ))}
        {files.length > 4 && (
          <div className="col-span-full text-right">
            <button onClick={() => openModal(files)} className="text-blue-600 hover:underline text-sm">
              View More →
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative p-4 sm:p-6 bg-white rounded shadow mt-6 max-w-4xl mx-auto">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">{popup}</p>
            <button onClick={closePopup} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">OK</button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4 text-center">{branch} - {semester} {isAdmin ? "Upload Panel" : "Materials"}</h2>

      {isAdmin && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="font-semibold">Upload PDF:</label>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} className="block mt-1" />
          </div>
          <div>
            <label className="font-semibold">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="block mt-1" />
          </div>
          <div>
            <label className="font-semibold">Text Note:</label>
            <textarea
              value={textNote}
              onChange={(e) => setTextNote(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded" onClick={handleTextSubmit}>Submit</button>
          </div>
        </div>
      )}

      {/* Render Grids */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">📄 PDFs</h3>
        {pdfs.length === 0 ? <p className="text-gray-500">No PDFs uploaded.</p> : renderFileGrid(pdfs, "pdfs")}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">🖼️ Images</h3>
        {images.length === 0 ? <p className="text-gray-500">No images uploaded.</p> : renderFileGrid(images, "images")}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">📝 Text Notes</h3>
        {texts.length === 0 ? <p className="text-gray-500">No text notes uploaded.</p> : renderFileGrid(texts, "texts")}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={closeModal}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <span className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer" onClick={closeModal}>✖</span>
            <h2 className="text-lg font-bold mb-4">All Files</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {modalFiles.map(file => {
                let icon = "📂";
                if (file.type.includes("pdf")) icon = "📄";
                else if (file.type.startsWith("image/")) icon = "🖼️";
                else if (file.type === "text/plain") icon = "📝";

                return (
                  <div key={file.id} className="p-3 bg-gray-100 rounded shadow hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-center h-24 bg-white rounded mb-2">
                      <span className="text-2xl">{icon}</span>
                    </div>
                    <p className="text-sm font-semibold truncate">{file.name}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">View</a>
          
                      {isAdmin && (
                        <>
                          <button onClick={() => handleDelete(file.id)} className="text-red-600">Del</button>
                          <button onClick={() => handleRename(file.id, file.name)} className="text-yellow-600">Rename</button>
                        </>
                      )}
                    </div>
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

export default SemesterUpload;
