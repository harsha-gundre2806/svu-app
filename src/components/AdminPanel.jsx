import React, { useState } from 'react';
import SemesterUpload from './SemesterUpload';

const AdminPanel = ({ uploads, setUploads }) => {
  const [view, setView] = useState('departments');
  const branches = ['CSE', 'ECE', 'EEE', 'CIV', 'CEM', 'MEC'];
  const semesters = ['Sem-1', 'Sem-2', 'Sem-3', 'Sem-4', 'Sem-5', 'Sem-6', 'Sem-7', 'Sem-8'];
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSem, setSelectedSem] = useState('');

  const refreshUploads = () => {
    fetch("https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec")
      .then(res => res.json())
      .then(data => setUploads(data))
      .catch(err => console.error("Fetch error:", err));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Admin Panel</h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full shadow-lg font-semibold transition-transform transform hover:scale-105 ${
            view === 'departments' ? 'bg-blue-700 text-white' : 'bg-blue-300 text-blue-900'
          }`}
          onClick={() => setView('departments')}
        >
          Departments
        </button>
        <button
          className={`px-6 py-2 rounded-full shadow-lg font-semibold transition-transform transform hover:scale-105 ${
            view === 'news' ? 'bg-green-700 text-white' : 'bg-green-300 text-green-900'
          }`}
          onClick={() => {
            setSelectedBranch('');
            setSelectedSem('');
            setView('news');
          }}
        >
          Announcements Update
        </button>
      </div>

      {/* Departments View */}
      {view === 'departments' && (
        <>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Select Branch</h3>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {branches.map(branch => (
              <button
                key={branch}
                className={`px-5 py-2 rounded-full font-medium shadow-md transition-all transform hover:scale-105 duration-200 ${
                  selectedBranch === branch
                    ? 'bg-purple-700 text-white scale-105'
                    : 'bg-purple-200 text-purple-800 hover:bg-purple-300'
                }`}
                onClick={() => {
                  setSelectedBranch(branch);
                  setSelectedSem('');
                }}
              >
                {branch}
              </button>
            ))}
          </div>

          {selectedBranch && (
            <>
              <h4 className="text-lg font-semibold mb-2 text-gray-700 text-center">
                Select Semester for {selectedBranch}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center mb-6">
                {semesters.map((sem) => (
                  <button
                    key={sem}
                    className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all transform hover:scale-105 ${
                      selectedSem === sem
                        ? 'bg-indigo-700 text-white scale-105'
                        : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
                    }`}
                    onClick={() => setSelectedSem(sem)}
                  >
                    {sem}
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedBranch && selectedSem && (
            <SemesterUpload
              branch={selectedBranch}
              semester={selectedSem}
              isAdmin={true}
              uploads={uploads}
              refreshFiles={refreshUploads}
            />
          )}
        </>
      )}

      {/* Announcements View */}
      {view === 'news' && (
        <SemesterUpload
          branch="NOTICE"
          semester="ANNOUNCEMENTS"
          isAdmin={true}
          uploads={uploads}
          refreshFiles={refreshUploads}
        />
      )}
    </div>
  );
};

export default AdminPanel;
