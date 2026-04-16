import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  BookOpen,
  GitCompare,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",              to: "/" },
  { icon: Users,           label: "Student Records",        to: "/student-records" },
  { icon: BarChart3,       label: "Performance Analytics",  to: "/performance-analytics" },
  { icon: GitCompare,      label: "Group Comparison",       to: "/group-comparison" },
  { icon: BookOpen,        label: "Grades",                 to: "/grades" },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex flex-col p-4 fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-container-low font-sans text-sm font-medium border-r border-outline-variant/10">
      <div className="mb-8 px-2">
        <h2 className="text-lg font-black text-on-surface">Academics</h2>
        <p className="text-secondary text-xs">Grade Management</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <motion.span key={item.label}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-200 rounded-xl ${
                  active
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-on-surface"
                }`}
              >
                <item.icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            </motion.span>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-outline-variant/10 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 text-secondary hover:text-on-surface transition-colors"
        >
          <HelpCircle size={20} />
          <span>Help Center</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 text-secondary hover:text-on-surface transition-colors"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
}
