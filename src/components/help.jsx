import React from 'react';

const Help = () => {
  return (
    <div className="min-h-screen w-full font-inter p-6 bg-blue-100 text-center">
     

      
      
      <p className="text-gray-700 max-w-3xl mx-auto">
        If you're facing any issues navigating the website, finding files, or uploading documents, we're here to assist you.
        This portal is designed to simplify access to academic materials and circulars — but we understand that questions or
        technical issues might still arise.
      </p>

      <div className="mt-6 text-left max-w-3xl mx-auto">
        <ul className="list-disc list-inside text-gray-700 leading-7">
          <li>Having trouble finding your syllabus or notes?</li>
          <li>Can't upload your files or notes?</li>
          <li>Notice board not showing recent updates?</li>
          <li>Want to report a bug or give suggestions?</li>
        </ul>
      </div>

      <p className="mt-6 text-gray-700">
        Please reach out to us at{' '}
        <a
          href="mailto:svustudentwebsite2025@gmail.com"
          className="text-blue-600 font-semibold hover:underline"
        >
          svustudentwebsite2025@gmail.com
        </a>
        {' '}with your queries. We typically respond within 24 hours.
      </p>

      {/* Support Section with Image and Text */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
        <img
          src="https://cdn-icons-png.flaticon.com/512/545/545705.png"
          alt="Support"
          className="w-32 h-32 object-contain mb-4 md:mb-0 md:mr-8"
        />
        <div className="text-left">
          <h2 className="text-xl font-bold text-blue-800 mb-2">We're Here to Help!</h2>
          <p className="text-gray-700">
            Don’t hesitate to contact us — whether it’s a technical issue or a suggestion to improve the site.
            Our team is dedicated to ensuring every SVU student has a smooth and helpful experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
