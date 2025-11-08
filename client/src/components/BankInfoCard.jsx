// src/components/BankInfoCard.jsx
import React from 'react';

const BankInfoCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-100">
      <div className="text-5xl text-blue-500 mb-4 text-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default BankInfoCard;