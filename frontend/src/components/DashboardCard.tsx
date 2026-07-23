import { DashboardStat } from "@/data/dummyData";

export default function DashboardCard({
  title,
  value,
  icon,
  color,
  change,
  description,
}: DashboardStat) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300">
          {title}
        </span>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color} bg-opacity-20 text-white shadow-inner group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </h3>

        {(change || description) && (
          <div className="mt-2 flex items-center justify-between text-xs">
            {change && (
              <span className="font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                {change}
              </span>
            )}
            {description && (
              <span className="text-slate-500 font-normal">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}