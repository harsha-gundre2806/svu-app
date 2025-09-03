// src/components/AnnouncementUpload.jsx
import React, { useState } from 'react';
import SemesterUpload from './SemesterUpload';

const AnnouncementUpload = ({ uploads, refreshFiles }) => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (msg) => setPopup(msg);
  const closePopup = () => setPopup(null);

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      {/* ✅ Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold">Uploading Announcement...</p>
          </div>
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

      <h2 className="text-2xl font-bold mb-4">Announcements Upload</h2>

      {/* ✅ Pass down loading + popup control to SemesterUpload */}
      <SemesterUpload
        branch="NOTICE"
        semester="ANNOUNCEMENTS"
        isAdmin={true}
        uploads={uploads}
        refreshFiles={refreshFiles}
        setLoading={setLoading}
        showPopup={showPopup}
      />
    </div>
  );
};

export default AnnouncementUpload;
