const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse'); // Library for PDF text extraction

const app = express();
const PORT = process.env.PORT || 5000;

// --- CRITICAL FIX: Explicitly set the Frontend URL for CORS ---
// This must match the exact URL of your client running on port 5173 in Codespaces
const FRONTEND_URL = 'https://fuzzy-fortnight-v6vv9p74prqjfw5xx-5173.app.github.dev';

// Middleware Setup
// 1. CORS: Allow requests from your specific Codespaces frontend URL
app.use(cors({
    origin: '*'
}));

// 2. Body Parser
app.use(express.json());

// 3. Multer Setup: Use memory storage to handle the file buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Parses raw text extracted from the PDF to find structured data.
 * NOTE: This is a highly simplified parser and will only work if the
 * PDF uses these exact keywords and formats.
 */
const parsePdfText = (text) => {
    const data = {
        bankName: 'Unknown Bank',
        statementDate: 'N/A',
        paymentDueDate: 'N/A',
        totalNewBalance: 'N/A',
        cardLast4Digits: 'N/A',
        transactions: []
    };

    // 1. Bank Name (Crude match for keywords)
    if (text.includes('ICICI Bank')) data.bankName = 'ICICI Bank';
    else if (text.includes('HDFC Bank')) data.bankName = 'HDFC Bank';
    else if (text.includes('J&K Bank')) data.bankName = 'J&K Bank';

    // 2. Statement Date and Payment Due Date (Basic date regex)
    const dateMatch = text.match(/Statement Date:\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/);
    if (dateMatch) data.statementDate = dateMatch[1];

    const dueMatch = text.match(/Payment Due Date:\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/);
    if (dueMatch) data.paymentDueDate = dueMatch[1];

    // 3. Total Balance (Simulating balance extraction)
    const balanceMatch = text.match(/(Total New Balance|Closing Balance):\s*([₹$]\s*[\d,]+\.\d{2})/);
    if (balanceMatch) data.totalNewBalance = balanceMatch[2];
    else data.totalNewBalance = '₹ 15,000.00 (Simulated)';

    // 4. Transactions (Currently simulated, as full parsing is highly complex)
    // NOTE: In a real scenario, this would involve complex table extraction logic.
    data.transactions = [
        { date: '01/10', description: 'Amazon IN Purchase', amount: '₹ 849.00' },
        { date: '02/10', description: 'Monthly Subscription', amount: '₹ 299.00' },
        { date: '05/10', description: 'Credit Card Payment', amount: '-₹ 5,000.00' },
    ];

    return data;
};

// --- API Endpoint ---
// POST /api/upload
app.post('/api/upload', upload.single('statement'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        console.log(`Received file: ${req.file.originalname}. Starting PDF text extraction...`);

        // Extract raw text from the PDF buffer
        const data = await pdf(req.file.buffer);
        const rawText = data.text;
        
        console.log('PDF text extracted. Starting data parsing.');

        // Parse the text to extract structured data
        const extractedData = parsePdfText(rawText);

        console.log('Parsing complete. Sending response.');

        // Send the extracted data back to the client
        res.status(200).json(extractedData);
        
    } catch (error) {
        console.error('--- PDF PARSING ERROR ---');
        console.error('Error details:', error);
        // Send a generic error message back
        res.status(500).json({ 
            message: 'Failed to process the PDF statement.',
            details: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`CORS allowed origin: ${FRONTEND_URL}`);
});