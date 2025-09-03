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
            <FaUniversity className="text-blue-400" /> Overview
          </motion.h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/home" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
            <li><Link to="/about-svu" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>About SVU</Link></li>
            <li><Link to="/recent" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Recent Files</Link></li>
            <li><Link to="/announcements" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Announcements</Link></li>
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
            <FaCodeBranch className="text-green-400" /> Departments
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
            <FaUpload className="text-yellow-400" /> Student Upload
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
            <FaQuestionCircle className="text-red-400" /> Help
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
            <FaEnvelope className="text-purple-400" /> Contact Us
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
