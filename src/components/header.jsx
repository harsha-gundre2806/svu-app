// File: src/components/Header.jsx


import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img
            src="logo.jpg"
            alt="SVU Logo"
            className="h-12 w-auto rounded-lg transition-transform transform hover:scale-105"
          />
          <span className="text-xl font-semibold text-gray-800">
            SVU STUDENT WEBSITE
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="/about-svu" className="hover:text-blue-600 transition">About</a>
          <a href="/announcements" className="hover:text-blue-600 transition">Announcements</a>
          <a href="/help" className="hover:text-blue-600 transition">Help</a>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-gray-700">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links (Scrollable background) */}
      <nav
        className={`md:hidden px-4 pb-4 flex flex-col space-y-2 bg-white shadow-md transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <a href="/" className="hover:text-blue-600 transition">Home</a>
        <a href="/about-svu" className="hover:text-blue-600 transition">About</a>
        <a href="/announcements" className="hover:text-blue-600 transition">Announcements</a>
        <a href="/help" className="hover:text-blue-600 transition">Help</a>
      </nav>
    </header>
  );
};

export default Header;










// // File: src/components/Header.jsx
// import React, { useState } from 'react';
// //import { Link } from 'react-router-dom';

// const Header = ({ isAdmin, setIsAdmin }) => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (username === 'svu admin' && password === 'svu2025') {
//       setIsAdmin(true);
//       setShowLogin(false);
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <header className="bg-white shadow sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <img src={'logo.jpg'} alt="SVU Logo" className="h-12 w-auto rounded-lg" />
//           <span className="text-xl font-semibold text-gray-800">
//             SVU STUDENT WEBSITE
//           </span>
//         </div>

//         {!isAdmin && (
//           <button
//             onClick={() => setShowLogin(!showLogin)}
//             className="bg-blue-600 text-white px-3 py-1 rounded"
//           >
//             Admin Login
//           </button>
//         )}

//         {isAdmin && (
//           <span className="text-sm text-green-700 font-medium">Admin Logged In</span>
//         )}
//       </div>

//       {showLogin && !isAdmin && (
//         <div className="px-4 py-3 bg-gray-100 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2">
//           <input
//             type="text"
//             placeholder="Username"
//             className="border px-2 py-1 rounded text-sm w-full sm:w-auto"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border px-2 py-1 rounded text-sm w-full sm:w-auto"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             onClick={handleLogin}
//             className="bg-blue-600 text-white px-3 py-1 rounded w-full sm:w-auto"
//           >
//             Login
//           </button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
