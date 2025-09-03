import React, { useState, useEffect } from 'react';
import SemesterUpload from './SemesterUpload';
import { Folder, Layers, UploadCloud } from 'lucide-react';

const AdminDashboard = ({ uploads, refreshFiles }) => {
  const [selectedBranch, setSelectedBranch] = useState("CSE");
  const [selectedSem, setSelectedSem] = useState("Sem-1");
  const [uploadCounts, setUploadCounts] = useState({ pdf: 0, image: 0, text: 0 });

  const branches = ["CSE", "ECE", "EEE", "CIV", "CEM", "MEC"];
  const semesters = ["Sem-1", "Sem-2", "Sem-3", "Sem-4", "Sem-5", "Sem-6", "Sem-7", "Sem-8"];

  useEffect(() => {
    const branchUploads = uploads.filter(
      file => file.branch === selectedBranch && file.semester === selectedSem
    );

    const counts = {
      pdf: branchUploads.filter(f => f.name?.endsWith('.pdf')).length,
      image: branchUploads.filter(f => f.type?.startsWith('image/')).length,
      text: branchUploads.filter(f => f.type === 'text/plain').length,
    };

    setUploadCounts(counts);
  }, [uploads, selectedBranch, selectedSem]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-900 flex items-center gap-2">
        <UploadCloud className="w-8 h-8" /> Admin Upload Panel
      </h1>

      {/* Branch Selection */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <Folder className="w-5 h-5" /> Select Branch
        </h2>
        <div className="flex flex-wrap gap-4">
          {branches.map(branch => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`transition-all duration-300 px-5 py-2 rounded-full shadow-lg text-md font-semibold border 
                ${selectedBranch === branch
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-800 scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400 hover:scale-105"
                }`}
            >
              {branch}
            </button>
          ))}
        </div>
      </section>

      {/* Semester Selection */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Select Semester
        </h2>
        <div className="flex flex-wrap gap-4">
          {semesters.map(sem => (
            <button
              key={sem}
              onClick={() => setSelectedSem(sem)}
              className={`transition-all duration-300 px-5 py-2 rounded-full shadow-lg text-md font-semibold border 
                ${selectedSem === sem
                  ? "bg-gradient-to-r from-green-600 to-teal-500 text-white border-green-800 scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-100 hover:border-green-400 hover:scale-105"
                }`}
            >
              {sem}
            </button>
          ))}
        </div>
      </section>

      {/* Upload Summary */}
      <section className="mb-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-2 text-gray-800">📊 Uploaded Files Summary</h3>
        <ul className="text-sm text-gray-600 space-y-1 pl-3 list-disc">
          <li>📄 PDFs: {uploadCounts.pdf}</li>
          <li>🖼️ Images: {uploadCounts.image}</li>
          <li>📝 Text Notes: {uploadCounts.text}</li>
        </ul>
      </section>

      {/* Upload Component */}
      <SemesterUpload
        branch={selectedBranch}
        semester={selectedSem}
        isAdmin={true}
        uploads={uploads}
        refreshFiles={refreshFiles}
      />
    </div>
  );
};

export default AdminDashboard;
