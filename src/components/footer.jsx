import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUniversity, FaCodeBranch, FaUpload, FaQuestionCircle, FaEnvelope, FaUserShield } from 'react-icons/fa';

const Footer = ({ isAdmin }) => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">

        {/* Overview */}
        <div>
          <motion.h3 
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg> Overview
          </motion.h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/home" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
            <li><Link to="/about-svu" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>About SVU</Link></li>
            <li><Link to="/recent" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Recent Files</Link></li>
            <li><Link to="/announcements" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Announcements</Link></li>
            <li><Link to="/gallery" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Image Gallery</Link></li>
        
          </ul>
        </div>

        {/* Departments */}
        <div>
          <motion.h3 
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z"/></svg> Departments
          </motion.h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/cse" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Computer Science</Link></li>
            <li><Link to="/ece" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Electronics</Link></li>
            <li><Link to="/eee" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Electrical</Link></li>
            <li><Link to="/civ" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Civil</Link></li>
            <li><Link to="/cem" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Chemical</Link></li>
            <li><Link to="/mec" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Mechanical</Link></li>
          </ul>
        </div>

        {/* Student Upload & Help */}
        <div>
          <motion.h3 
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg> Student Upload
          </motion.h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/student-upload" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>StudentUpload</Link></li>
          </ul>

          <motion.h3 
            className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> Help
          </motion.h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/help" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Help</Link></li> 
            <li><Link to="/feedback" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Feedback</Link></li>
          </ul>
        </div>

        {/* Contact & Admin */}
        <div>
          <motion.h3 
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg> Contact Us
          </motion.h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a
                href="mailto:svustudentwebsite2025@gmail.com"
                className="text-blue-300 font-semibold hover:underline"
              >
                svustudentwebsite2025@gmail.com
              </a>
            </li>
          </ul>

          {isAdmin && (
            <motion.h3 
              className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <FaUserShield className="text-orange-400" /> Admin Page
            </motion.h3>
          )}
          {isAdmin && (
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/admin" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Sem upload</Link></li>
              <li><Link to="/announcements-upload" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Announcements Upload</Link></li>

            </ul>
          )}
        </div>
      </div>

      <div className="bg-gray-900 text-center text-gray-400 text-sm py-4">
        SVU Student Website
      </div>
    </footer>
  );
};

export default Footer;
