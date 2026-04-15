import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const students = [
  {
    id: "2948-AS",
    name: "Jonathan Doe",
    initials: "JD",
    group: "Group G1",
    raw: "92/100",
    weighted: "94.2%",
    status: "High",
    trend: "up",
  },
  {
    id: "3102-BF",
    name: "Sarah Al-Fayed",
    initials: "SA",
    group: "Group G2",
    raw: "85/100",
    weighted: "86.5%",
    status: "High",
    trend: "up",
  },
  {
    id: "1192-KC",
    name: "Marcus Knight",
    initials: "MK",
    group: "Group G1",
    raw: "68/100",
    weighted: "71.0%",
    status: "Average",
    trend: "flat",
  },
  {
    id: "8821-XL",
    name: "Elena Lopez",
    initials: "EL",
    group: "Group G1",
    raw: "42/100",
    weighted: "45.8%",
    status: "Low",
    trend: "down",
  },
  {
    id: "5541-TH",
    name: "Tobias Henderson",
    initials: "TH",
    group: "Group G2",
    raw: "79/100",
    weighted: "80.4%",
    status: "Average",
    trend: "up",
  },
];

export default function StudentAuditTable() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/5">
      <div className="p-6 flex items-center justify-between border-b border-outline-variant/10">
        <h3 className="text-lg font-bold text-on-surface">
          Detailed Student Audit
        </h3>
        <div className="flex gap-2">
          <select className="bg-surface-container-low border-none rounded-lg text-xs font-semibold py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-primary outline-none cursor-pointer">
            <option>All Students</option>
            <option>High Performers</option>
            <option>Needs Attention</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant">
                Student Identity
              </th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant">
                Group
              </th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant text-right">
                Raw Score
              </th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant text-right">
                Weighted Avg
              </th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant text-center">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-surface-container-low/30 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      student.group === "Group G1"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {student.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {student.name}
                    </p>
                    <p className="text-xs text-secondary">ID: {student.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-secondary">
                  {student.group}
                </td>
                <td className="px-6 py-4 text-sm text-right tabular-nums">
                  {student.raw}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-right tabular-nums">
                  {student.weighted}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      student.status === "High"
                        ? "bg-green-100 text-green-700"
                        : student.status === "Average"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {student.trend === "up" && (
                    <TrendingUp className="text-green-600" size={18} />
                  )}
                  {student.trend === "down" && (
                    <TrendingDown className="text-red-600" size={18} />
                  )}
                  {student.trend === "flat" && (
                    <Minus className="text-secondary" size={18} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-outline-variant/10 bg-surface-container-low/20 flex items-center justify-between">
        <p className="text-xs text-secondary">
          Showing 5 of 142 total students
        </p>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-surface-container-high rounded transition-colors text-secondary">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 hover:bg-surface-container-high rounded transition-colors text-secondary">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
