// File: src/ImageGallery.jsx
import React, { useState, useEffect } from "react";
import { apiCall } from "./apiService";

/**
 * Helper to convert YouTube watch URL to an embed URL.
 * @param {string} url - The video URL.
 * @returns {string} - The embed URL or the original URL if not YouTube.
 */
const getEmbedLink = (url) => {
  const youtubeMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    // Return a standard YouTube embed URL
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  // Assume it's a direct video link or Google Drive link otherwise
  return url;
};


const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch data from Apps Script
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiCall({}, "GET"); 

      setImages(Array.isArray(data.images) ? data.images : []);
      setVideos(Array.isArray(data.videos) ? data.videos : []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (item) => {
    setModalItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalItem(null);
    setShowModal(false);
  };

  // Divide content for the initial display and the 'View More' modal
  const initialImages = images.slice(0, 4);
  const moreImages = images.slice(4);
  const initialVideos = videos.slice(0, 4);
  const moreVideos = videos.slice(4);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen font-['Inter'] bg-gray-50">
        <div className="flex space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-lg animate-spin-slow"></div>
          <div className="w-16 h-16 bg-gray-300 rounded-lg animate-spin-slow delay-150"></div>
          <div className="w-16 h-16 bg-gray-300 rounded-lg animate-spin-slow delay-300"></div>
        </div>
        <p className="text-gray-700 text-lg">Preparing your gallery...</p>
      </div>
    );
  }

  const cardClasses =
    "bg-white rounded-xl shadow-sm overflow-hidden transform transition hover:-translate-y-1 hover:shadow-md cursor-pointer";
    
  // --- Individual Card Component (Helper for reuse) ---
  const GalleryCard = ({ f, isVideo }) => {
    return (
      <div key={f.id || f.name} className={cardClasses}>
        <div
          onClick={() => {
            if (isVideo) {
                openModal(f);
            }
          }}
        >
          <a
            href={!isVideo ? f.link || "#" : undefined}
            target={!isVideo ? "_blank" : undefined}
            rel={!isVideo ? "noopener noreferrer" : undefined}
          >
            <img
              src={f.cover}
              alt={f.name}
              className="w-full h-40 object-cover rounded-t-xl"
            />
          </a>
        </div>
        <div className="p-3">
          <h4 className="truncate font-medium text-gray-800">
            {f.description || f.name}
          </h4>
        </div>
      </div>
    );
  };
  // ----------------------------------------------------


  return (
    <div className="p-6 max-w-7xl mx-auto font-['Inter']">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        University Events Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* === IMAGES SECTION === */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Images</h2>
          {initialImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {initialImages.map((f) => <GalleryCard key={f.id} f={f} isVideo={false} />)}
            </div>
          ) : (
            <p className="text-gray-500 italic">No images available.</p>
          )}
          {moreImages.length > 0 && (
            <button
              onClick={() => openModal({type: 'image', content: moreImages})}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
              View More
            </button>
          )}
        </div>

        {/* === VIDEOS SECTION === */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Videos</h2>
          {initialVideos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {initialVideos.map((f) => <GalleryCard key={f.id} f={f} isVideo={true} />)}
            </div>
          ) : (
            <p className="text-gray-500 italic">No videos available.</p>
          )}
          {moreVideos.length > 0 && (
            <button
              onClick={() => openModal({type: 'video', content: moreVideos})}
              className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition"
            >
              View More
            </button>
          )}
        </div>
      </div>

      {/* === MODAL === */}
      {showModal && modalItem && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-md w-[90%] md:w-[70%] max-h-[80vh] overflow-y-auto p-6 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              {modalItem.type === "image" ? "More Images" : "Video Player"}
            </h3>
            
            {/* Conditional Content: Individual Video vs. More Items Grid */}
            {modalItem.link ? ( // Single video player
                <div className="aspect-video mb-6">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={getEmbedLink(modalItem.link)}
                      title={modalItem.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <p className="mt-3 text-center text-lg font-semibold">{modalItem.description || modalItem.name}</p>
                </div>
            ) : ( // Grid for 'View More'
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {(modalItem.content || []).map((f) => (
                        <div key={f.id} className={cardClasses} onClick={() => openModal(f)}> 
                            <img
                              src={f.cover}
                              alt={f.name}
                              className="w-full h-48 object-cover rounded-t-xl"
                            />
                            <div className="p-3">
                                <h4 className="truncate font-medium text-gray-800">
                                  {f.description || f.name}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <div className="text-center mt-6">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;