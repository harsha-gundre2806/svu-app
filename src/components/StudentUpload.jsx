import React, { useState } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycby5KhA_QI6mmim0HQAI_jfZp78m9_7XSb47HW7tSKrFh0icZE0JqP9qQCizbisKHQ4HGQ/exec";

const StudentUpload = () => {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [files, setFiles] = useState([]); // ✅ store multiple files
  const [textNote, setTextNote] = useState("");
  const [popup, setPopup] = useState(""); // "", "loading", "success", "error"

  const handleUpload = async () => {
    if (!branch || !semester || (files.length === 0 && !textNote.trim())) {
      alert("Please fill all required fields.");
      return;
    }

    setPopup("loading"); // show loading immediately

    if (files.length > 0) {
      // Upload each file one by one
      for (const file of files) {
        const formData = new URLSearchParams();
        formData.append("branch", branch);
        formData.append("semester", semester);

        await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64 = reader.result.split(",")[1];
            formData.append("filename", file.name);
            formData.append("mimetype", file.type);
            formData.append("filedata", base64);

            await sendToServer(formData);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
    } else {
      // Upload text note
      const formData = new URLSearchParams();
      formData.append("branch", branch);
      formData.append("semester", semester);

      const filename = `Note-${Date.now()}.txt`;
      const base64text = btoa(unescape(encodeURIComponent(textNote.trim())));
      formData.append("filename", filename);
      formData.append("mimetype", "text/plain");
      formData.append("filedata", base64text);

      await sendToServer(formData);
    }

    // Reset after upload
    setTimeout(() => {
      setPopup("success");
      setBranch("");
      setSemester("");
      setFiles([]); // ✅ reset multiple files
      setTextNote("");
      setTimeout(() => setPopup(""), 2000);
    }, 1000);
  };

  const sendToServer = async (formData) => {
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error(err);
      setPopup("error");
      setTimeout(() => setPopup(""), 2000);
    }
  };

  return (
    <div className="relative">
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
             Share Your Knowledge with Others
          </h1>
          <p className="text-gray-700 text-m">
            Upload your valuable study materials, class notes, PDFs, or helpful
            images for fellow students! Whether it's a quick note or a full
            document, your contribution makes a big difference. Select your
            branch and semester below and start sharing — together we grow
            stronger!
          </p>
        </div>

        <h2 className="text-xl flex items-center gap-2 font-bold mb-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" 
          height="30px" 
          viewBox="0 -960 960 960" 
          width="30px" 
          fill="#000000">
            <path d="M450-313v-371L330-564l-43-43 193-193 193 193-43 43-120-120v371h-60ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z"/>
          </svg> 
          Student File Upload
        </h2>

        <div className="mb-3">
          <label className="block font-medium mb-1">
            Branch <span className="text-red-600">*</span>
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="CIV">CIV</option>
            <option value="MEC">MEC</option>
            <option value="CEM">CEM</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">
            Semester <span className="text-red-600">*</span>
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={`Sem-${sem}`}>
                Sem-{sem}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">
            Upload PDFs / Images (optional)
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            multiple // ✅ allow multiple files
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="w-full"
          />
          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
              {files.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">
            Or Type a Text Note (optional)
          </label>
          <textarea
            value={textNote}
            onChange={(e) => setTextNote(e.target.value)}
            rows={4}
            placeholder="Type your note here..."
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      {/* Popup Modal */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center w-80">
            {popup === "loading" && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-700">
                  Uploading...
                </p>
              </>
            )}
            {popup === "success" && (
              <>
                <div className="text-4xl mb-2">✅</div>
                <p className="text-lg font-semibold text-green-600">
                  Uploaded successfully!
                </p>
              </>
            )}
            {popup === "error" && (
              <>
                <div className="text-4xl mb-2">❌</div>
                <p className="text-lg font-semibold text-red-600">
                  Upload failed!
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentUpload;
