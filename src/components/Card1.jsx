import React from "react";
import { Link } from "react-router-dom";

const Card1 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          📚 Select Your Branch
        </h1>

        <ul className="space-y-4 text-lg text-blue-600 font-medium">
          <li>
            <Link
              to="/cse"
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              Computer Science
            </Link>
          </li>
          <li>
            <Link
              to="/ece"
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              Electronics
            </Link>
          </li>
          <li>
            <Link
              to="/eee"
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              Electrical
            </Link>
          </li>
          <li>
            <Link
              to="/civ"
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              Civil
            </Link>
          </li>
          <li>
            <Link
              to="/cem"
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              Chemical
            </Link>
          </li>
          <li>
            <Link
              to="/mec"
              className="hover:underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              Mechanical
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card1;
