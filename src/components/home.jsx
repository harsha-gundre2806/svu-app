import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Card = ({ to, title, emoji, description }) => (
  <Link
    to={to}
    className="bg-white shadow-sm rounded-2xl p-6 hover:shadow-xl transform transition duration-300 block"
    aria-label={title}
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <h2 className="text-xl font-semibold text-blue-700">
      {emoji} {title}
    </h2>
    <p className="mt-2 text-gray-600">{description}</p>
  </Link>
);

const Home = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 100 });
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-white p-6">

      {/* Hero Section */}
      <section
  className="relative text-white rounded-2xl shadow-2xl mb-12 h-[450px] flex items-center justify-center overflow-hidden"
  data-aos="fade-up"
  data-aos-duration="1000"
>
  {/* Background Image with Gradient Overlay */}
  <div className="absolute inset-0">
    <img
      src="/admin.jpg"
      alt="Background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
  </div>

  {/* Content with Frosted Glass */}
  <div className="relative z-10 text-center px-6 sm:px-8 py-8 sm:py-10 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl max-w-3xl">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg leading-snug">
      Welcome to <span className="text-blue-400">SVU Student Portal</span>
    </h1>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-200 mb-6 sm:mb-8">
      Simplify your academic life with easy access to{" "}
      <span className="font-semibold text-blue-300">syllabus, notes, circulars</span>, 
      and university updates – all in one place.
    </p>
    <Link
      to="/about-svu"
      className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-transform transform hover:scale-110"
    >
      Learn More About Us
    </Link>
  </div>
</section>




      {/* Informational Header */}
      <header
        className="text-center my-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Your one-stop destination for syllabus, notes, circulars, and the latest university updates.
        </p>
      </header>

      {/* Card Features */}
      <section
        className="grid gap-8 md:grid-cols-3 max-w-6xl w-full px-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <Card
          to="/card1"
          title="Access Notes & PDFs"
          emoji=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/></svg>
          description="Download organized study materials, lab manuals, and notes semester-wise."
        />
        <Card
          to="/card2"
          title="View Syllabus"
          emoji=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280v-160h160v-280H360Zm220 220Z"/></svg>
          description="Quickly access the syllabus for each subject based on your department and semester."
        />
       <Card
  to="/announcements"
  title="Latest Circulars"
  emoji=<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-160v-640 640Zm0 80q-33 0-56.5-23.5T120-160v-640q0-33 23.5-56.5T200-880h360q33 0 56.5 23.5T640-800v107l-80 80v-187H200v640h227l80 80H200Zm160-160v-160h100l140-140v440L460-240H360Zm320 32v-225q35 12 57.5 43t22.5 70q0 39-22.5 69.5T680-208Zm0 165v-80q70-15 115-70t45-127q0-72-45-127t-115-69v-80q104 14 172 92.5T920-320q0 105-68 183.5T680-43ZM380-680q17 0 28.5-11.5T420-720q0-17-11.5-28.5T380-760q-17 0-28.5 11.5T340-720q0 17 11.5 28.5T380-680Z"/></svg>
  description="Stay updated with important notices, exam timetables, and official university announcements."
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
/>



      </section>

      {/* Smart Features Section */}
      <section
        className="mt-12 text-center"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h3 className="text-2xl font-bold text-blue-800">Smart Features</h3>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto">
          Use the AI-powered File Search Bot, Recent Uploads, and Student Uploads to enhance your learning experience.
        </p>
      </section>
    </main>
  );
};

export default Home;
