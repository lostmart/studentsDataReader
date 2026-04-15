// ─── Sub-grade shapes ───────────────────────────────────────────────────────

/** A simple course: only one input grade → one weighted score */
type SimpleCourseGrade = {
  final: number;
  weightedNote: number;
};

/** A composite course: multiple input grades (e.g. MidTerm + Final) */
type CompositeCourseGrade = {
  subGrades: Record<string, number>; // e.g. { midterm: 11.4, final: 14.6 }
  weightedNote: number;
};

type CourseGrade = SimpleCourseGrade | CompositeCourseGrade;

type CourseKey =
  | "IntroductionToRelationalDatabases"
  | "IntroductionToWebProgramming"
  | "IntroductionToProgrammingWithPython"
  | "AlgorithmicsAndDataStructures"
  | "S1Project"
  | "FundamentalMathematics"
  | "MathematicsAppliedToDigitalEngineering"
  | "Algebra1"
  | "ProbabilitiesAndStatistics"
  | "IntroductionToLinux"
  | "PrinciplesAndArchitectureOfInformationSystems"
  | "FundamentalsOfMicrosoftWindowsOS"
  | "AIModule"
  | "FrenchForBSc"
  | "CorporateSocialResponsibility"
  | "CulturalIntegrationWorkshop";

type Grade = {
  id: string;
  name: string;
  semester: "S1" | "S2" | "S3" | "S4" | "S5"; // extensible
  semesterAverage: number;
  courses: Record<CourseKey, CourseGrade>;
};
