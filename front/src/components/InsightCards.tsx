interface InsightProps {
  label: string;
  title: string;
  subtitle: string;
  data: { height1: string; height2: string };
}

function InsightCard({ label, title, subtitle, data }: InsightProps) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
      <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-4">
        {label}
      </h4>
      <div className="flex items-end gap-2 h-12">
        <div
          className="flex-1 bg-primary rounded-t-sm"
          style={{ height: data.height1 }}
        ></div>
        <div
          className="flex-1 bg-secondary opacity-40 rounded-t-sm"
          style={{ height: data.height2 }}
        ></div>
      </div>
      <p className="mt-4 text-sm font-medium text-on-surface">{title}</p>
      <p className="text-xs text-secondary">{subtitle}</p>
    </div>
  );
}

export default function InsightCards() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <InsightCard
        label="Competency Gap"
        title="Quantitative Reasoning"
        subtitle="+25% Variance in G1"
        data={{ height1: "85%", height2: "60%" }}
      />
      <InsightCard
        label="Engagement Index"
        title="Platform Participation"
        subtitle="G2 leads in active hours"
        data={{ height1: "40%", height2: "75%" }}
      />
      <InsightCard
        label="Completion Speed"
        title="Module Finalization"
        subtitle="Near parity across groups"
        data={{ height1: "90%", height2: "88%" }}
      />
    </div>
  );
}
