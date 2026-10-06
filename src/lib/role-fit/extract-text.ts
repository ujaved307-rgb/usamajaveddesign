import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export class ExtractionError extends Error {}

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB — a text-based JD file is never legitimately bigger

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.size > MAX_FILE_BYTES) {
    throw new ExtractionError("That file is too large — please keep it under 8MB.");
  }

  const name = file.name.toLowerCase();
  const arrayBuffer = await file.arrayBuffer();

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });
    try {
      const result = await parser.getText();
      return result.text;
    } catch {
      throw new ExtractionError("Couldn't read that PDF — it may be scanned/image-based or corrupted.");
    } finally {
      await parser.destroy();
    }
  }

  if (
    name.endsWith(".docx") ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer: Buffer.from(arrayBuffer) });
      return result.value;
    } catch {
      throw new ExtractionError("Couldn't read that Word document.");
    }
  }

  if (name.endsWith(".doc")) {
    throw new ExtractionError(
      "Legacy .doc files aren't supported — please paste the text, or upload as PDF or .docx instead."
    );
  }

  if (name.endsWith(".txt") || file.type === "text/plain") {
    return Buffer.from(arrayBuffer).toString("utf-8");
  }

  throw new ExtractionError("Unsupported file type — please upload a PDF, .docx, or .txt file.");
}
