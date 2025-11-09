// src/pages/UploadPage.jsx
import React, { useState, useRef } from 'react';
import { uploadStatement } from '../api'; // Your API utility
import { FaUpload, FaSpinner, FaFilePdf, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setResult(null);
    } else {
      setFile(null);
      setError('Please upload a valid PDF file.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setResult(null);
    } else {
      setFile(null);
      setError('Please upload a valid PDF file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await uploadStatement(file);
      setResult(response.data);
      alert('Statement parsed successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to parse statement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderTransactions = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return <p className="text-gray-600">No transactions found.</p>;
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{tx.date}</td>
                <td className="py-3 px-6 text-left">{tx.description}</td>
                <td className="py-3 px-6 text-right">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex-grow p-8 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Upload Your Bank Statement
          </h1>
          <p className="text-lg text-gray-600">
            Securely upload your PDF statement below. We'll automatically detect your bank
            and extract key financial data for you.
          </p>
        </header>

        <div className="flex justify-center items-center min-h-[60vh] mb-12">

          {/* Upload Form Section */}
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Drag & Drop or Select File
            </h2>
            <div
              className="border-2 border-dashed border-blue-400 rounded-lg p-10 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-blue-600 hover:bg-blue-50 relative"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {file ? (
                <div className="flex flex-col items-center">
                  <FaFilePdf className="text-red-500 text-5xl mb-3" />
                  <p className="text-gray-700 font-medium break-all">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Ready for upload.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-blue-500">
                  <FaUpload className="text-6xl mb-4" />
                  <p className="text-xl font-semibold">Drag & Drop your PDF here</p>
                  <p className="text-md text-gray-500 mt-2">or click to browse</p>
                  <p className="text-sm text-gray-400 mt-1">(Only .pdf files are allowed)</p>
                </div>
              )}
            </div>

            {error && (
              <p className="text-red-600 text-center mt-4 flex items-center justify-center">
                <FaExclamationCircle className="mr-2" /> {error}
              </p>
            )}

            <button
              onClick={handleUpload}
              className={`w-full flex items-center justify-center mt-8 px-6 py-3 rounded-lg text-lg font-semibold text-white transition duration-300 ease-in-out ${
                file && !loading
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!file || loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-3" /> Processing...
                </>
              ) : (
                <>
                  <FaUpload className="mr-3" /> Upload & Parse
                </>
              )}
            </button>
          </div>
        </div>

       {/* Demo PDFs Section */}
<div className="mt-12">
  <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
    Download Demo Statements
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
    <a
      href="/demo-pdfs/ICICI.pdf"
      download
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition"
    >
      ICICI Bank
    </a>
    <a
      href="/demo-pdfs/HDFC.pdf"
      download
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition"
    >
      HDFC Bank
    </a>
    <a
      href="/demo-pdfs/J&K.pdf"
      download
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition"
    >
      J&K Bank
    </a>
    <a
      href="/demo-pdfs/SBI.pdf"
      download
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition"
    >
      SBI
    </a>
    <a
      href="/demo-pdfs/PNB.pdf"
      download
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition"
    >
      PNB
    </a>
  </div>
</div>



        {/* Results Display */}
        {result && (
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-green-100 mt-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center flex items-center justify-center">
              <FaCheckCircle className="mr-3" /> Parsing Complete!
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Statement from:{' '}
              <span className="font-semibold text-blue-700">{result.bankName || 'Unknown Bank'}</span>
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-gray-500 text-sm">Statement Date:</p>
                <p className="text-gray-900 font-semibold text-lg">{result.statementDate || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-gray-500 text-sm">Payment Due Date:</p>
                <p className="text-gray-900 font-semibold text-lg">{result.paymentDueDate || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-gray-500 text-sm">Total New Balance:</p>
                <p className="text-red-600 font-bold text-2xl">{result.totalNewBalance || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-gray-500 text-sm">Card Last 4 Digits:</p>
                <p className="text-gray-900 font-semibold text-lg">{result.cardLast4Digits || 'N/A'}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Transactions</h3>
            {renderTransactions(result.transactions)}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
