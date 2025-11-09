# Bank Statement Parser

A web application that parses credit card statements (PDFs) from multiple banks and extracts key financial data, including transactions, card last 4 digits, statement date, payment due date, and total balance. Users can also download demo PDFs for testing.

---

## Features

- Upload PDF statements from multiple banks (ICICI, HDFC, J&K, SBI, PNB).
- Extract 5 key data points:
  - Bank Name
  - Statement Date
  - Payment Due Date
  - Total New Balance
  - Card Last 4 Digits
  - Transaction Details (Date, Description, Amount)
- Drag & Drop file upload or browse file manually.
- Display parsed data in a clean, responsive UI.
- Download demo PDFs for all supported banks for testing.

---

## Demo PDFs

You can download sample statements for testing:

- ICICI Bank
- HDFC Bank
- J&K Bank
- SBI
- PNB

All demo PDFs are available in `/public/demo-pdfs/`.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Icons
- **Backend:** Node.js, Express.js
- **PDF Parsing:** Custom PDF parser (using `pdf-parse` or a wrapper)
- **File Upload:** Multer

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Huzaif-nabi/Bank-Statement-Parser.git

