import React from 'react';

const AboutSVU = () => {
  return (
    <div className="min-h-screen w-full p-6 text-center bg-gray-100">
     

      <h2 className="mt-8 text-2xl font-semibold text-blue-600">About this website</h2>
      <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
        This website (<a href="https://svu-student-website.netlify.app" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">svu-student-website.netlify.app</a>) is built especially for SVU students to make academic and administrative resources easily accessible.
      </p>

      <div className="mt-6 text-left max-w-3xl mx-auto">
        <ul className="list-disc list-inside text-gray-700 leading-7">
          <li><strong>PDF Notes:</strong> Organized by department and semester, students can download lecture notes, lab manuals, and other materials.</li>
          <li><strong>Syllabus:</strong> Get the complete syllabus for each subject categorized by course and semester.</li>
          <li><strong>Circulars & Announcements:</strong> Stay informed with regular updates on exams, holidays, schedules, and university events.</li>
          <li><strong>Recent Uploads:</strong> A dedicated section to quickly access the most recently added files and notices.</li>
          <li><strong>Search Feature:</strong> Find files by name, type, department, or semester using the smart AI search tool integrated on the site.</li>
          <li><strong>Notice Board:</strong> Admins can post official announcements in this page.</li>
          <li><strong>PDF Notes:</strong> Organized by department and semester, students can download lecture notes, lab manuals, and other materials.</li>
          <li><strong>Student Uploads:</strong> A section where students can upload their own notes, assignments, and resources for peer sharing.</li>
          <li><strong>Bridging the Information Gap:</strong> Many students struggle to find reliable study materials and official updates. This platform bridges that gap by offering verified and organized resources in one place.</li>  
          <li><strong>By Students, For Students:</strong> Created by an SVU student, the site reflects real student needs and feedback, aiming to make college life easier and more organized for everyone. </li>
          <li><strong>Streamlining Academic Workflow:</strong> Whether it’s downloading your syllabus or checking the latest exam circular, the portal helps reduce confusion and save time for both students and faculty.</li>
        </ul>
      </div>

      <p className="mt-8 text-gray-700 max-w-3xl mx-auto">
        The goal is to simplify access to academic resources and keep every student connected and informed. The platform is lightweight, responsive, and continually updated based on student needs.
      </p>
    </div>
  );
};

export default AboutSVU;
