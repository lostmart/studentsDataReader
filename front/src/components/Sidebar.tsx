import {
  LayoutDashboard,
  Users,
  BarChart3,
  BookOpen,
  FileText,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Users, label: "Student Records", active: false },
  { icon: BarChart3, label: "Performance Analytics", active: true },
  { icon: BookOpen, label: "Curriculum", active: false },
  { icon: FileText, label: "Faculty Reports", active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col p-4 fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-container-low font-sans text-sm font-medium border-r border-outline-variant/10">
      <div className="mb-8 px-2">
        <h2 className="text-lg font-black text-on-surface">Academics</h2>
        <p className="text-secondary text-xs">Grade Management</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href="#"
            whileHover={{ x: 4 }}
            className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-200 rounded-xl ${
              item.active
                ? "bg-white text-primary shadow-sm"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} />
            <span>{item.label}</span>
          </motion.a>
        ))}
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
