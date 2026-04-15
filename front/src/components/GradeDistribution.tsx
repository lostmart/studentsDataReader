import { motion } from 'motion/react';

interface DistributionProps {
  title: string;
  avgScore: string;
  badge: {
    text: string;
    type: 'active' | 'comparison';
  };
  data: { label: string; height: string; opacity: number }[];
  colorClass: string;
}

export default function GradeDistribution({ title, avgScore, badge, data, colorClass }: DistributionProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{title}</h3>
          <p className="text-2xl font-bold mt-1">
            {avgScore} <span className="text-sm font-normal text-secondary ml-1">Avg Score</span>
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${
          badge.type === 'active' 
            ? 'bg-primary/10 text-primary' 
            : 'bg-surface-container-high text-secondary'
        }`}>
          {badge.text}
        </span>
      </div>

      <div className="h-48 flex items-end justify-between gap-2 px-2">
        {data.map((item, idx) => (
          <div key={idx} className="w-full bg-surface-container-high rounded-t-md relative group" style={{ height: item.height }}>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`absolute inset-x-0 bottom-0 ${colorClass} rounded-t-md`}
              style={{ opacity: item.opacity }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {Math.floor(Math.random() * 50) + 10} Students
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-[10px] text-secondary font-bold uppercase tracking-wider">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}