import express from "express";
import dotenv from "dotenv";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import cors from "cors";

import G1 from "../studentsData/G1.json";
import G2 from "../studentsData/G2.json";
import coursesNames from "../studentsData/coursesNames.json";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

const studentGrades = gradesRaw.slice(GRADES_HEADER_ROWS);

console.log(`Loaded ${studentGrades.length} student grade records`);

// ── Build column map from CSV header rows ─────────────────────────────────────
// Row 2: subject names (merged across columns → forward-fill)
// Row 4: sub-grade labels (e.g. "Final Grade", "weighted score", "MidTerm"…)
const subjectRow = gradesRaw[2] ?? [];
const subTypeRow = gradesRaw[4] ?? [];

const subjects: string[] = [];
let currentSubject = "";
for (const cell of subjectRow) {
  if (cell.trim()) currentSubject = cell.trim();
  subjects.push(currentSubject);
}

// ── Name → grade row lookup (case-insensitive) ────────────────────────────────
const gradesByName = new Map<string, string[]>();
for (const row of studentGrades) {
  const name = row[0]?.trim() ?? "";
  if (name) gradesByName.set(name.toLowerCase(), row);
}

// ── Grade builder ─────────────────────────────────────────────────────────────
type SubjectGrades = Record<string, string>;
type StudentGrades = Record<string, SubjectGrades | string>;

function buildStudentGrades(row: string[]): StudentGrades {
  const grades: StudentGrades = {};

  for (let i = 1; i < row.length; i++) {
    const subject = subjects[i]?.trim() ?? "";
    const subType = subTypeRow[i]?.trim() ?? "";
    const value = row[i]?.trim() ?? "";

    if (!subject || subject === "Name") continue;

    if (subject === "Semester Average") {
      grades["semesterAverage"] = value;
      continue;
    }

    if (!subType) continue; // group-header column, skip

    if (!grades[subject]) grades[subject] = {};
    (grades[subject] as SubjectGrades)[subType] = value;
  }

  return grades;
}

function withGrades(
  students: typeof G1 | typeof G2,
): Array<(typeof G1)[number] & { grades: StudentGrades | null }> {
  return students.map((student) => {
    const fullName = `${student.firstName} ${student.lastName}`;
    const row = gradesByName.get(fullName.toLowerCase());
    return { ...student, grades: row ? buildStudentGrades(row) : null };
  });
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/students/G1", (_req, res) => {
  res.json({ msg: "Group 1 students", count: G1.length, students: G1 });
});

app.get("/students/G2", (_req, res) => {
  res.json({ msg: "Group 2 students", count: G2.length, students: G2 });
});

app.get("/allStudents", (_req, res) => {
  res.json({
    msg: "All students",
    count: G1.length + G2.length,
    students: G1.concat(G2),
  });
});

app.get("/grades", (_req, res) => {
  res.json({
    msg: "Grades",
    count: studentGrades.length,
    students: studentGrades,
  });
});

app.get("/grades/G1", (_req, res) => {
  const students = withGrades(G1);
  res.json({ msg: "Grades G1", count: students.length, students });
});

app.get("/grades/G2", (_req, res) => {
  const students = withGrades(G2);
  res.json({ msg: "Grades G2", count: students.length, students });
});

app.get("/grades/all", (_req, res) => {
  const students = withGrades(G1.concat(G2));
  res.json({ msg: "Grades all", count: students.length, students });
});

app.get("/grades/bySubjectsId/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = coursesNames.find((c) => c.id === id);

  if (!course) {
    res.status(404).json({ error: `No course found with id ${id}` });
    return;
  }

  const subjectName = course.name;

  const extractGrade = (student: ReturnType<typeof withGrades>[number]) =>
    (student.grades?.[subjectName] as SubjectGrades | undefined) ?? null;

  const g1Grades = withGrades(G1).map((s) => ({
    firstName: s.firstName,
    lastName: s.lastName,
    grades: extractGrade(s),
  }));

  const g2Grades = withGrades(G2).map((s) => ({
    firstName: s.firstName,
    lastName: s.lastName,
    grades: extractGrade(s),
  }));

  res.json({ subject: subjectName, G1: g1Grades, G2: g2Grades });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/health`);
});
