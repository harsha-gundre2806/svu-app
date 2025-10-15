import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import HeroSection from "./HeroSection";

const ImageGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const items = [
    {
      id: 1,
      type: "image",
      src: "/img gal 1.jpeg",
      text: "This is an image titled Gal1. It demonstrates how images are displayed within the gallery, showing a brief caption below the content. You can expand this text by clicking on View More, which allows you to see all details about this media content in the gallery component. It's a beautiful image showcasing design precision and smooth interaction.",
    },
    {
      id: 2,
      type: "video",
      src: "/CYNOSURE.mp4",
      text: "This looping and muted video (CYNOSURE) is part of the gallery. It can be previewed in a small view and expanded to occupy 75% of the screen. The video demonstrates smooth animations, transitions, and muted playback for a clean gallery experience.",
    },
  ];

  const handleOpen = (item) => {
    setActiveItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveItem(null);
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gray-200 text-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Gallery Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item) => {
          const isExpanded = expandedItems[item.id];
          const shouldTruncate = item.text.length > 150;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }} // move slightly up on hover
              className="rounded-3xl overflow-hidden cursor-pointer bg-gray-900 border border-gray-800 flex flex-col transition-transform duration-300"
              onClick={() => handleOpen(item)}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.text}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover rounded-t-3xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}

              {/* Text with View More */}
              <div
                className="p-4 text-gray-300"
                onClick={(e) => e.stopPropagation()}
              >
                <p
                  className={`transition-all duration-300 ${
                    isExpanded ? "" : "line-clamp-4"
                  }`}
                >
                  {item.text}
                </p>

                {shouldTruncate && (
                  <button
                    className="text-blue-400 mt-2 text-sm font-medium hover:underline"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {isExpanded ? "View Less" : "View More"}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && activeItem && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative bg-gray-900 rounded-3xl p-6 w-[75%] max-h-[90%] overflow-y-auto border border-gray-800 shadow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <X size={26} />
              </button>

              {activeItem.type === "image" ? (
                <img
                  src={activeItem.src}
                  alt="Full View"
                  className="w-full rounded-3xl mb-4"
                />
              ) : (
                <video
                  src={activeItem.src}
                  className="w-full rounded-3xl mb-4"
                  autoPlay
                  loop
                  muted
                  controls
                />
              )}

              <p className="text-gray-300 text-base leading-relaxed">
                {activeItem.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
