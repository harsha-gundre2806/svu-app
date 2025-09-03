import React, { useState } from "react";

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbwahLF_hjqm-gi3OZoOuGwMhyZLl7HQZSuEK6evUveC70AO0VtGZxGMavTocnIo7qwxZg/exec";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [textNote, setTextNote] = useState("");
  const [popup, setPopup] = useState(""); // "", "loading", "success", "error"

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !textNote.trim()) {
      alert("Please fill all fields.");
      return;
    }

    setPopup("loading"); // show loading immediately

    const formData = new URLSearchParams();
    formData.append("name", name.trim());
    formData.append("email", email.trim());

    const filename = `Feedback-${Date.now()}.txt`;
    const base64text = btoa(unescape(encodeURIComponent(textNote.trim())));
    formData.append("filename", filename);
    formData.append("mimetype", "text/plain");
    formData.append("filedata", base64text);

    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      // simulate loading 1 sec before showing success
      setTimeout(() => {
        setPopup("success");

        // Reset form
        setName("");
        setEmail("");
        setTextNote("");

        // auto close popup after 2 sec
        setTimeout(() => setPopup(""), 2000);
      }, 1000);
    } catch (err) {
      console.error(err);
      setPopup("error");
      setTimeout(() => setPopup(""), 2000);
    }
  };

  return (
    <div className="relative">
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            📣 We Want to Hear From You!
          </h1>
          <p className="text-gray-700 text-md">
            Got a suggestion? Found something helpful? Or just want to say hi?
            Your feedback helps us improve this platform for every student. Fill
            out the short form below — every word counts! 💬
          </p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          📨 Submit Your Feedback
        </h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            value={textNote}
            onChange={(e) => setTextNote(e.target.value)}
            rows={5}
            placeholder="Write your feedback or suggestion here..."
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
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
                  Submitting...
                </p>
              </>
            )}
            {popup === "success" && (
              <>
                <div className="text-4xl mb-2">✅</div>
                <p className="text-lg font-semibold text-green-600">
                  Feedback submitted!
                </p>
              </>
            )}
            {popup === "error" && (
              <>
                <div className="text-4xl mb-2">❌</div>
                <p className="text-lg font-semibold text-red-600">
                  Submission failed!
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
