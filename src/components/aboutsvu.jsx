import { useState, useRef, useEffect } from "react";

const AboutSVU = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="min-h-screen w-full font-inter p-8 bg-peach-100 text-center">
      <h2 className="mt-10 text-3xl font-bold text-blue-600" >About this Website</h2>
      <p className="mt-6 text-gray-700 max-w-3xl mx-auto text-lg">
        This website is built especially for SVU students to make academic and administrative resources easily accessible.
      </p>

      {/* Dropdown Button */}
      <div className="mt-8 max-w-3xl mx-auto text-left bg-white p-6 rounded-lg shadow-lg" >
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          Features Overview
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* Smooth Dropdown Content */}
        <div
          ref={contentRef}
          style={{ maxHeight }}
          className="overflow-hidden transition-max-height duration-700 ease-in-out"
        >
          <ul className="mt-4 list-disc list-inside text-gray-800 leading-8 bg-red-50 p-5 rounded-md shadow border border-peach-200" >
            <li><strong>PDF Notes:</strong> Organized by department and semester, students can download lecture notes, lab manuals, and other materials.</li>
            <li><strong>Syllabus:</strong> Get the complete syllabus for each subject categorized by course and semester.</li>
            <li><strong>Circulars & Announcements:</strong> Stay informed with regular updates on exams, holidays, schedules, and university events.</li>
            <li><strong>Recent Uploads:</strong> Quickly access the most recently added files and notices.</li>
            <li><strong>Search Feature:</strong> Find files by name, type, department, or semester using the smart AI search tool integrated on the site.</li>
            <li><strong>Notice Board:</strong> Admins can post official announcements on this page.</li>
            <li><strong>Student Uploads:</strong> Students can upload their own notes, assignments, and resources for peer sharing.</li>
            <li><strong>Bridging the Information Gap:</strong> Offers verified and organized resources in one place to help students access reliable study materials and official updates.</li>
            <li><strong>By Students, For Students:</strong> Reflects real student needs and feedback, aiming to make college life easier and more organized.</li>
            <li><strong>Streamlining Academic Workflow:</strong> Helps reduce confusion and save time by providing easy access to syllabus, exam circulars, and more.</li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-gray-700 max-w-3xl mx-auto text-lg" >
        The goal is to simplify access to academic resources and keep every student connected and informed. The platform is lightweight, responsive, and continually updated based on student needs.
      </p>
    </div>
  );
};

export default AboutSVU;
