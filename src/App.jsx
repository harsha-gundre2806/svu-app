import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Help from './components/help';
import AboutSVU from './components/aboutsvu';
import StudentUpload from './components/StudentUpload';
import FileSearchBot from './components/FileSearchBot';
import FeedbackForm from './components/feedback';
import Card1 from './components/Card1';
import Card2 from './components/Card2';
import ImageGalleryUpload from './components/ImageGalleryUpload';
import ImageGallery from './components/ImageGallery';

// Lazy-loaded components
const CSE = lazy(() => import('./departments/CSE'));
const ECE = lazy(() => import('./departments/ECE'));
const EEE = lazy(() => import('./departments/EEE'));
const CIV = lazy(() => import('./departments/CIV'));
const CEM = lazy(() => import('./departments/CEM'));
const MEC = lazy(() => import('./departments/MEC'));
const RecentUploads = lazy(() => import('./components/RecentUploads'));
const Announcements = lazy(() => import('./components/Announcements'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const AnnouncementUpload = lazy(() => import('./components/AnnouncementUpload'));


const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbxh9GsREmsAdUhDkUYTw6klDhg0eXhVPd94H4o8eGwsqMVEZ3yN2FWlhbndKNsrq30eFg/exec";
function ScrollToTopOnMount({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
}
function App() {
  const [uploads, setUploads] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
   
  // ✅ New state for splash screen
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash was already shown in this browser session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    return !hasSeenSplash; // true if first open this session, false otherwise
  });

  const fetchUploads = async () => {
    try {
      const res = await fetch(BACKEND_URL);
      const data = await res.json();
      setUploads(data);
    } catch (error) {
      console.error("Failed to fetch uploads:", error);
    }
  };

  useEffect(() => {
    fetchUploads();

    if (showSplash) {
      // ✅ Hide splash after 1.5 seconds only once per session
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true"); // Save only for this session
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // ✅ Show splash screen first open in this session
  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 animate-gradient"></div>

        {/* Floating Blobs */}
        <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-2/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

        {/* Sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Wavy Particle Lines */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent animate-wave"
              style={{
                top: `${20 * i + 10}%`,
                animationDelay: `${i * 1.5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Rotating Glow Ring */}
        <div className="absolute w-96 h-96 border-4 border-yellow-300 rounded-full animate-spin-slow opacity-40"></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Centered Text */}
        <div className="relative z-10 text-center animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-yellow-300 drop-shadow-lg mt-2">
            SVU Student Website
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-svu" element={<AboutSVU />} />
          <Route path="/help" element={<Help />} />
          <Route
  path="/card1"
  element={
    <ScrollToTopOnMount>
      <Card1 />
    </ScrollToTopOnMount>
  }
/>

<Route
  path="/card2"
  element={
    <ScrollToTopOnMount>
      <Card2 />
    </ScrollToTopOnMount>
  }
/>

          
  <Route
  path="/gallery"
  element={
    <Suspense fallback={<div className="p-6 text-center">Loading gallery...</div>}>
      <div className="max-w-6xl mx-auto p-4">
        {/* Gallery display only */}
        <ImageGallery files={uploads} />
      </div>
    </Suspense>
  }
/>

<Route
  path="/img-upload"
  element={
    <Suspense fallback={<div className="p-6 text-center">Loading upload panel...</div>}>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Image & Video Upload</h2>

        {/* Upload panel */}
        <ImageGalleryUpload refreshGallery={fetchUploads} />

        <hr className="my-6 border-gray-300" />

        {/* Gallery below the upload panel */}
        <h3 className="text-xl font-semibold mb-4 text-center">Uploaded Files</h3>
        <ImageGallery files={uploads} />
      </div>
    </Suspense>
  }
/>




          <Route
            path="/recent"
            element={
              <Suspense fallback={<div className="p-6 text-center">Loading recent uploads...</div>}>
                <RecentUploads uploads={uploads} />
              </Suspense>
            }
          />

          {/* 🔹 Fixed path: no space */}
          <Route path="/student-upload" element={<StudentUpload />} />

          <Route
  path="/announcements"
  element={
    <Suspense
      fallback={<div className="p-6 text-center">Loading announcements...</div>}
    >
      <ScrollToTopOnMount>
        <Announcements isAdmin={isAdmin} />
      </ScrollToTopOnMount>
    </Suspense>
  }
/>


          <Route path="/feedback" element={<FeedbackForm />} />

          {/* Department Routes */}
          <Route
            path="/cse"
            element={
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-2xl font-bold">Opening CSE... Please wait.</div>}>
                <CSE isAdmin={isAdmin} />
              </Suspense>
            }
          />

          <Route
            path="/ece"
            element={
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-2xl font-bold">Opening ECE... Please wait.</div>}>
                <ECE isAdmin={isAdmin} />
              </Suspense>
            }
          />

          <Route
            path="/eee"
            element={
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-2xl font-bold">Opening EEE... Please wait.</div>}>
                <EEE isAdmin={isAdmin} />
              </Suspense>
            }
          />

          <Route
            path="/civ"
            element={
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-2xl font-bold">Opening CIV... Please wait.</div>}>
                <CIV isAdmin={isAdmin} />
              </Suspense>
            }
          />

          <Route
            path="/cem"
            element={
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-2xl font-bold">Opening CEM... Please wait.</div>}>
                <CEM isAdmin={isAdmin} />
              </Suspense>
            }
          />

          <Route
            path="/mec"
            element={
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-2xl font-bold">Opening MEC... Please wait.</div>}>
                <MEC isAdmin={isAdmin} />
              </Suspense>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="p-6 text-center">Loading admin dashboard...</div>}>
                <AdminDashboard uploads={uploads} setUploads={setUploads} refreshFiles={fetchUploads} />
              </Suspense>
            }
          />

          {/* <Route
            path="/admin"
            element={
              isAdmin ? (
                <Suspense fallback={<div className="p-6 text-center">Loading admin dashboard...</div>}>
                  <AdminDashboard uploads={uploads} setUploads={setUploads} refreshFiles={fetchUploads} />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          /> */}

          <Route
            path="/announcements-upload"
            element={
              <Suspense fallback={<div className="p-6 text-center">Loading announcement upload...</div>}>
                <AnnouncementUpload uploads={uploads} refreshFiles={fetchUploads} />
              </Suspense>
            }
          />


          {/* <Route
            path="/announcements-upload"
            element={
              isAdmin ? (
                <Suspense fallback={<div className="p-6 text-center">Loading announcement upload...</div>}>
                  <AnnouncementUpload uploads={uploads} refreshFiles={fetchUploads} />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          /> */}

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <FileSearchBot uploads={uploads} />
      <Footer isAdmin={isAdmin} />
    </Router>
  );
}

export default App;
