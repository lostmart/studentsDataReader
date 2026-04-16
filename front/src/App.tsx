import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import DashHome from "./pages/DashHome";
import Grades from "./pages/Grades";
import GroupComparison from "./pages/GroupComparison";
import StudentRecords from "./pages/StudentRecords";
import PerformanceAnalytics from "./pages/PerformanceAnalytics";

const App = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />

        <main className="flex-1 md:ml-64 p-8 bg-surface">
          <Routes>
            <Route path="/" element={<DashHome />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/group-comparison" element={<GroupComparison />} />
            <Route path="/student-records" element={<StudentRecords />} />
            <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
