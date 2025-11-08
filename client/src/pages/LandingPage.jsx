// src/pages/LandingPage.jsx
import React from 'react';
import BankInfoCard from '../components/BankInfoCard';
import { Link } from 'react-router-dom';
import autoDetectIllustration from '../assets/bank-image.jpg';

const LandingPage = () => {
  const allowedBanks = ["ICICI Bank", "J&K Bank", "HDFC Bank", "SBI", "Punjab National Bank"];
  const extractionPoints = [
    { title: "Statement Date", description: "The closing date of your billing cycle.", icon: "🗓️" },
    { title: "Payment Due Date", description: "The last day to make your payment without incurring fees.", icon: "⏳" },
    { title: "Total New Balance", description: "Your overall outstanding amount.", icon: "💰" },
    { title: "Card Last 4 Digits", description: "Securely identify your card.", icon: "💳" },
    { title: "All Transactions", description: "Detailed list of all your purchases and payments.", icon: "🧾" },
  ];

  return (
    <div className="flex-grow p-8 bg-gray-50">
      <div className="container mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Effortless Bank Statement Parsing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock financial insights with our intelligent PDF statement parser.
            Simply upload, and we'll do the rest!
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Smart & Secure Processing
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-around bg-blue-50 p-8 rounded-lg shadow-inner">
            <div className="md:w-1/2 text-center md:text-left p-4">
              <h3 className="text-3xl font-semibold text-blue-700 mb-4">
                Automatic Bank Detection
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                No need to tell us which bank! Our system automatically detects
                the issuer of your statement. We support major Indian banks
                for seamless data extraction.
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 mt-4 font-medium">
                {allowedBanks.map((bank, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-500 mr-2 text-xl">-</span> {bank}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 p-4 flex justify-center">
              {/* Image showing auto-detection process */}
              <img
                src={autoDetectIllustration}
                alt="Automatic bank detection"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
            What We Extract For You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extractionPoints.map((point, index) => (
              <BankInfoCard
                key={index}
                title={point.title}
                description={point.description}
                icon={point.icon}
              />
            ))}
          </div>
        </section>

        <section className="text-center py-12 bg-indigo-50 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Upload your statement now to effortlessly organize and understand your finances.
          </p>
          <Link
            to="/upload"
            className="inline-block bg-indigo-600 text-white text-xl font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Upload Your Statement
          </Link>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;