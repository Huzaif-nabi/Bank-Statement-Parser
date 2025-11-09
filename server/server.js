import express from "express";
import cors from "cors";
import multer from "multer";
import parsePDF from "./pdfParseWrapper.js"; // default import

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- PDF Text Parser ---
const parsePdfText = (text) => {
  const data = {
    bankName: "Not Detected",
    statementDate: "N/A",
    paymentDueDate: "N/A",
    totalNewBalance: "N/A",
    cardLast4Digits: "N/A",
    transactions: [],
  };

  // --- 1. Header Extraction ---
  if (/ICICI/i.test(text)) data.bankName = "ICICI Bank";
  else if (/HDFC/i.test(text)) data.bankName = "HDFC Bank";
  else if (/J&K/i.test(text)) data.bankName = "J&K Bank";
  else if (/Punjab National Bank/i.test(text)) data.bankName = "Punjab National Bank";
  else if (/SBI/i.test(text)) data.bankName = "State Bank of India";

  // Statement & Due Dates
  const dateMatch = text.match(/Statement Date:\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/);
  if (dateMatch) data.statementDate = dateMatch[1];

  const dueMatch = text.match(/Payment Due Date:\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/);
  if (dueMatch) data.paymentDueDate = dueMatch[1];

  // Total Balance
  const balanceMatch = text.match(/(Total New Balance|Closing Balance):\s*([₹$\w\s]*[\d,]+\.\d{2})/i);
  if (balanceMatch) data.totalNewBalance = balanceMatch[2].trim();
  else data.totalNewBalance = "₹ 15,000.00 (Simulated)";

  // --- 2. Last 4 digits of card ---
  const cardMatch = text.match(/Card Number:\s*(?:X{0,12}|\*{0,12}|\d{0,12}[-]*)+(\d{4})/i);
  if (cardMatch) data.cardLast4Digits = cardMatch[1];

  // --- 3. Transactions ---
  const rawLines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const transactions = [];

  // Regex: Date (DD/MM/YYYY) + Description + Amount (at line end)
  const transactionRegex = /^(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+([₹$]?\s*-?[\d,]+\.\d{2})$/i;

  rawLines.forEach(line => {
    const match = line.match(transactionRegex);
    if (match) {
      const [_, date, description, amount] = match;
      transactions.push({
        date,
        description,
        amount: amount.replace(/,/g, "").trim()
      });
    }
  });

  data.transactions = transactions;

  return data;
};

// --- API Endpoint ---
app.post("/api/upload", upload.single("statement"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded." });

  try {
    console.log(`Received file: ${req.file.originalname}. Starting PDF text extraction...`);
    console.log("typeof parsePDF:", typeof parsePDF); // Debug log

    const data = await parsePDF(req.file.buffer);
    const rawText = data.text;

    console.log("PDF text extracted. Starting data parsing...");
    const extractedData = parsePdfText(rawText);
    console.log("Parsing complete. Sending response.");

    res.status(200).json(extractedData);
  } catch (error) {
    console.error("--- PDF PARSING ERROR ---");
    console.error("Error details:", error);
    res.status(500).json({
      message: "Failed to process the PDF statement.",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
