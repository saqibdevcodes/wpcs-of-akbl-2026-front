import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Chart1Props {
  title: string;
  value: {
    q2TotalCountPercentage?: number;
  };
  total: number;
}

export default function Chart1({ title, value, total }: Chart1Props) {
  const percentage = Math.round(Number(value?.q2TotalCountPercentage)) || 0;
  const safeTotal = Number.isFinite(total) ? total : 0;

  // Determine dynamic bar color based on score thresholds
  const getBarColor = (val: number) => {
    if (val < 30) return "#ef4444"; // Red
    if (val < 70) return "#f59e0b"; // Warm Amber/Yellow
    return "#10b981"; // Emerald Green
  };

  const [options] = useState<ApexOptions>({
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
        },
        track: {
          background: "#f1f5f9", // Sleek Slate-100 background track
          strokeWidth: "85%",
          margin: 0, // Remove gap to make it look full and substantial
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.05,
          },
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            offsetY: 10,
            fontSize: "32px",
            fontWeight: "800",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            color: "#0f172a",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [getBarColor(percentage)],
    },
    stroke: {
      lineCap: "round", // Gives the progress arc those beautiful modern rounded edges
    },
    labels: ["Score"],
  });

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 border border-slate-100 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_4px_25px_-2px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="border-b border-slate-50 pb-3 mb-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </h3>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex-1 flex items-center justify-center min-h-[200px] relative">
        <ReactApexChart
          options={options}
          series={[percentage]}
          type="radialBar"
          height={270}
          className="w-full max-w-[260px] mx-auto"
        />

        {/* Subdued Custom Tick Tonal Accents for the Gauge Endpoints */}
        <div className="absolute bottom-6 left-8 text-[10px] font-semibold text-slate-300">
          0
        </div>
        <div className="absolute bottom-6 right-8 text-[10px] font-semibold text-slate-300">
          100
        </div>
      </div>

      {/* Footer Badge */}
      <div className="mt-3 pt-3 border-t border-slate-50 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50/80 border border-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
          Sample Size
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
          <span className="font-bold text-slate-700">n = {safeTotal}</span>
        </div>
      </div>
    </div>
  );
}
