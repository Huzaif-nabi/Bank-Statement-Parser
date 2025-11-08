// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Statement Insights. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          Designed for optimal financial data extraction.
        </p>
      </div>
    </footer>
  );
};

export default Footer;