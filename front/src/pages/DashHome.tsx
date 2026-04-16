import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import coursesNames from "../assets/localData/coursesNames.json";

type StudentGrade = {
  firstName: string;
  lastName: string;
  grades: Record<string, string> | null;
};

type SubjectData = {
  subject: string;
  G1: StudentGrade[];
  G2: StudentGrade[];
};

const Home = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null,
  );
  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const ids = coursesNames.map((c) => c.id);
      const currentIndex =
        selectedSubjectId === null ? -1 : ids.indexOf(selectedSubjectId);
      if (e.key === "ArrowRight") {
        setSelectedSubjectId(ids[(currentIndex + 1) % ids.length]);
      } else {
        setSelectedSubjectId(ids[(currentIndex - 1 + ids.length) % ids.length]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedSubjectId]);

  useEffect(() => {
    if (selectedSubjectId === null) return;

    fetch(`http://localhost:3000/grades/bySubjectsId/${selectedSubjectId}`)
      .then((res) => res.json())
      .then((data: SubjectData) => {
        console.log(data);
        setSubjectData(data);
      });
  }, [selectedSubjectId]);

  const computeStats = (students: StudentGrade[]) => {
    const graded = students.filter((s) => s.grades !== null);
    const values = graded.map((s) =>
      parseFloat(s.grades!["Final Grade"] ?? "0"),
    );
    const average = values.length
      ? values.reduce((a, b) => a + b, 0) / values.length
      : 0;
    return {
      average: average.toFixed(2),
      below10: values.filter((v) => v < 10).length,
      above18: values.filter((v) => v >= 18).length,
      total: graded.length,
    };
  };

  const sortByGrade = (students: StudentGrade[]) =>
    [...students].sort(
      (a, b) =>
        parseFloat(b.grades?.["Final Grade"] ?? "0") -
        parseFloat(a.grades?.["Final Grade"] ?? "0"),
    );

  const renderGroup = (students: StudentGrade[], label: string) => (
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-3 px-1">
        {label}
      </h3>
      <div className="space-y-2">
        {sortByGrade(students).map((s, i) => {
          const grade = parseFloat(s.grades?.["Final Grade"] ?? "0");
          const isHigh = grade >= 14;
          const isLow = grade < 10 && s.grades !== null;
          return (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white shadow-sm"
            >
              <span className="text-sm font-medium text-on-surface truncate">
                {s.firstName} {s.lastName}
              </span>
              <span
                className={`text-sm font-bold tabular-nums ml-4 shrink-0 ${
                  isHigh
                    ? "text-green-600"
                    : isLow
                      ? "text-red-500"
                      : "text-on-surface"
                }`}
              >
                {s.grades ? s.grades["Final Grade"] : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="max-w-5xl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">
            Group Comparison View
          </h1>
          <p className="text-secondary mt-1">
            Detailed performance audit:{" "}
            <span className="font-semibold">Group G1</span> vs{" "}
            <span className="font-semibold">Group G2</span>
          </p>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center p-2" htmlFor="subject-select">
            Choose a Subject:
          </label>
          <select
            id="subject-select"
            className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200 rounded-xl bg-white text-primary shadow-sm"
            value={selectedSubjectId ?? ""}
            onChange={(e) =>
              setSelectedSubjectId(
                e.target.value ? Number(e.target.value) : null,
              )
            }
          >
            <option value="">-</option>
            {coursesNames.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Summary + Grade Columns */}
      {subjectData &&
        (() => {
          const g1Stats = computeStats(subjectData.G1);
          const g2Stats = computeStats(subjectData.G2);

          const StatBox = ({
            label,
            g1,
            g2,
            highlight,
          }: {
            label: string;
            g1: string | number;
            g2: string | number;
            highlight?: "low" | "high";
          }) => {
            const differs = g1 !== g2;
            return (
              <div
                className={`flex-1 rounded-xl px-4 py-3 bg-white shadow-sm ${differs ? "ring-2 ring-amber-400/60" : ""}`}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">
                  {label}
                </p>
                <div className="flex justify-between text-sm font-bold">
                  <span
                    className={
                      highlight === "low" && Number(g1) > 0
                        ? "text-red-500"
                        : highlight === "high" && Number(g1) > 0
                          ? "text-green-600"
                          : "text-on-surface"
                    }
                  >
                    G1: {g1}
                  </span>
                  <span
                    className={
                      highlight === "low" && Number(g2) > 0
                        ? "text-red-500"
                        : highlight === "high" && Number(g2) > 0
                          ? "text-green-600"
                          : "text-on-surface"
                    }
                  >
                    G2: {g2}
                  </span>
                </div>
              </div>
            );
          };

          return (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex gap-4">
                <StatBox
                  label="Average Grade"
                  g1={g1Stats.average}
                  g2={g2Stats.average}
                />
                <StatBox
                  label="Below 10"
                  g1={g1Stats.below10}
                  g2={g2Stats.below10}
                  highlight="low"
                />
                <StatBox
                  label="Above 18"
                  g1={g1Stats.above18}
                  g2={g2Stats.above18}
                  highlight="high"
                />
              </div>
              <div className="flex gap-6">
                {renderGroup(subjectData.G1, "Group G1")}
                <div className="w-px bg-outline-variant/20 self-stretch" />
                {renderGroup(subjectData.G2, "Group G2")}
              </div>
            </motion.div>
          );
        })()}
    </section>
  );
};

export default Home;
