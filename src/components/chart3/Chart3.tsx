import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Chart3Props {
  title: string;
  value: {
    nps?: number;
    promoters?: number;
    detractor?: number;
    passives?: number;
  };
  total: number;
}

export default function Chart3({ title, value, total }: Chart3Props) {
  const percentage = Math.round(Number(value?.nps)) || 0;
  const promoters = Math.round(Number(value?.promoters)) || 0;
  const detractor = Math.round(Number(value?.detractor)) || 0;
  const passives = Math.round(Number(value?.passives)) || 0;
  const safeTotal = Number.isFinite(total) ? total : 0;

  // Map dynamic fill color of the indicator line to the resulting score range
  const getScoreColor = (val: number) => {
    if (val < -30) return "#ef4444"; // Detractor zone (Red)
    if (val < 30) return "#f59e0b"; // Passive zone (Amber)
    return "#10b981"; // Promoter zone (Emerald)
  };

  const [options] = useState<ApexOptions>({
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        hollow: {
          margin: 0,
          size: "72%",
          background: "transparent",
        },
        track: {
          background: "#f1f5f9", // Elegant minimalist background track
          strokeWidth: "85%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.04,
          },
        },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            offsetY: 10,
            fontSize: "34px",
            fontWeight: "800",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            color: "#0f172a",
            // Keeps standard raw number visualization for standard NPS scaling
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [getScoreColor(percentage)],
    },
    stroke: {
      lineCap: "round", // Rounds out the bar tips beautifully
    },
    labels: ["NPS"],
  });

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 border border-slate-100 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_4px_25px_-2px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="border-b border-slate-50 pb-3 mb-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 line-clamp-1">
          {title}
        </h3>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex-1 flex flex-col justify-center min-h-[220px]">
        <div className="relative w-full max-w-[260px] mx-auto">
          <ReactApexChart
            options={options}
            series={[percentage]}
            type="radialBar"
            height={270}
          />

          {/* Symmetrical Axis Boundary Markings */}
          <div className="absolute bottom-6 left-6 text-[10px] font-semibold text-slate-300 select-none">
            -100%
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-300 select-none">
            0
          </div>
          <div className="absolute bottom-6 right-6 text-[10px] font-semibold text-slate-300 select-none">
            +100%
          </div>
        </div>

        {/* Re-designed Breakdown Metrics Segment Tiles */}
        <div className="flex items-center justify-center gap-2 mt-2 px-1">
          <div className="flex-1 rounded-xl border border-emerald-50 bg-emerald-50/40 p-2 text-center transition-colors hover:bg-emerald-50/70">
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
              Promoters
            </p>
            <p className="mt-0.5 text-base font-extrabold text-emerald-700">
              {promoters}%
            </p>
          </div>

          <div className="flex-1 rounded-xl border border-amber-50 bg-amber-50/40 p-2 text-center transition-colors hover:bg-amber-50/70">
            <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600">
              Passives
            </p>
            <p className="mt-0.5 text-base font-extrabold text-amber-700">
              {passives}%
            </p>
          </div>

          <div className="flex-1 rounded-xl border border-rose-50 bg-rose-50/40 p-2 text-center transition-colors hover:bg-rose-50/70">
            <p className="text-[9px] font-bold uppercase tracking-wider text-rose-600">
              Detractors
            </p>
            <p className="mt-0.5 text-base font-extrabold text-rose-700">
              {detractor}%
            </p>
          </div>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50/80 border border-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
          Sample Size
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
          <span className="font-bold text-slate-700">n = {safeTotal}</span>
        </div>
      </div>
    </div>
  );
}
