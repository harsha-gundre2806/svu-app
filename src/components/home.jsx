import React from "react";
import { Link } from "react-router-dom";

const Card = ({ to, title, emoji, description }) => (
  <Link
    to={to}
    className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl hover:scale-105 transform transition block"
    aria-label={title}
  >
    <h2 className="text-xl font-semibold text-blue-700">
      {emoji} {title}
    </h2>
    <p className="mt-2 text-gray-600">{description}</p>
  </Link>
);

const Home = () => {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-white p-6 flex flex-col items-center">
      <header className="text-center my-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">
          Welcome to SVU Student Website
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Your one-stop destination for syllabus, notes, circulars, and the latest university updates.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-3 max-w-6xl w-full px-4">
        <Card
          to="/card1"
          title="Access Notes & PDFs"
          emoji="📚"
          description="Download organized study materials, lab manuals, and notes semester-wise."
        />
        <Card
          to="/card2"
          title="View Syllabus"
          emoji="🗂️"
          description="Quickly access the syllabus for each subject based on your department and semester."
        />
        <Card
          to="/announcements"
          title="Latest Circulars"
          emoji="📢"
          description="Stay updated with important notices, exam timetables, and official university announcements."
        />
      </section>

      <section className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-blue-800">🌟 Smart Features</h3>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto">
          Use the AI-powered File Search Bot, Recent Uploads, and Student Uploads to enhance your learning experience.
        </p>
        <Link
          to="/about-svu"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          Learn More About This Portal
        </Link>
      </section>
    </main>
  );
};

export default Home;
