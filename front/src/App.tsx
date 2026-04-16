import Grades from "./pages/Grades";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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
          <h2>la vida misma</h2>
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
