import Grades from "./pages/Grades";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import GradeDistribution from "./components/GradeDistribution";
import StudentAuditTable from "./components/StudentAuditTable";
import InsightCards from "./components/InsightCards";
import { motion } from "motion/react";
import { SidebarIcon } from "lucide-react";

const g1Data = [
  { label: "Fail", height: "20%", opacity: 0.2 },
  { label: "Pass", height: "35%", opacity: 0.4 },
  { label: "Credit", height: "65%", opacity: 0.6 },
  { label: "Distinction", height: "90%", opacity: 1 },
  { label: "Elite", height: "45%", opacity: 0.5 },
];

const g2Data = [
  { label: "Fail", height: "10%", opacity: 0.2 },
  { label: "Pass", height: "25%", opacity: 0.4 },
  { label: "Credit", height: "50%", opacity: 0.6 },
  { label: "Distinction", height: "80%", opacity: 0.8 },
  { label: "Elite", height: "95%", opacity: 1 },
];

const App = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />

        <main className="flex-1 md:ml-64 p-8 bg-surface">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
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
              <button className="px-4 py-2 bg-surface-container-high text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container-highest transition-colors">
                Download Report
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl text-sm font-medium shadow-md hover:opacity-90 transition-opacity">
                Adjust Weighting
              </button>
            </div>
          </motion.div>

          {/* Distribution Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GradeDistribution
                title="Grade Distribution — Group G1"
                avgScore="78.4%"
                badge={{ text: "Active Group", type: "active" }}
                data={g1Data}
                colorClass="bg-primary"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GradeDistribution
                title="Grade Distribution — Group G2"
                avgScore="82.1%"
                badge={{ text: "Comparison", type: "comparison" }}
                data={g2Data}
                colorClass="bg-secondary"
              />
            </motion.div>
          </div>

          {/* Student Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StudentAuditTable />
          </motion.div>

          {/* Contextual Data Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <InsightCards />
          </motion.div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant/10 h-16 flex items-center justify-around px-4 z-50">
        <button className="flex flex-col items-center gap-1 text-secondary">
          <SidebarIcon name="dashboard" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Dash
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <SidebarIcon name="analytics" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Analytic
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-secondary">
          <SidebarIcon name="group" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Student
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-secondary">
          <SidebarIcon name="menu_book" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Books
          </span>
        </button>
      </nav>
    </div>
  );
};

export default App;
