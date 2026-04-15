import express from "express";
import dotenv from "dotenv";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

const DATA_DIR = path.join(__dirname, "../studentsData");

function loadCSV(filename: string): string[][] {
  const content = fs.readFileSync(path.join(DATA_DIR, filename), "utf-8");
  return parse(content, {
    delimiter: ";",
    relax_column_count: true,
    skip_empty_lines: true,
    bom: true,
  });
}

// Grades file has 5 header rows before actual student data
const GRADES_HEADER_ROWS = 5;

const gradesRaw = loadCSV(
  "bachelors-of-computer-science_fall_2025-All-Semesters-Grades.csv",
);
const group1Raw = loadCSV(
  "20251024-TdB-RepartitionGroupesBSc_F25(Groupe 1).csv",
);
const group2Raw = loadCSV(
  "20251024-TdB-RepartitionGroupesBSc_F25(Groupe 2).csv",
);

const studentGrades = gradesRaw.slice(GRADES_HEADER_ROWS);

console.log(`Loaded ${studentGrades.length} student grade records`);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/students", (_req, res) => {
  res.json({ msg: "students almost ready !!!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/health`);
});
