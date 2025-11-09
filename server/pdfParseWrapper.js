// pdfParseWrapper.js — CommonJS compatibility layer for pdf-parse

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// ✅ Return directly as a function
export default async function parsePDF(buffer) {
  return await pdfParse(buffer);
}
