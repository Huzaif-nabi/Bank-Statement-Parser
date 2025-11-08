// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wider">
          📈 Statement Insights
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition duration-300 ease-in-out px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/upload"
            className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300 ease-in-out font-medium shadow-md"
          >
            Upload Statement
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;