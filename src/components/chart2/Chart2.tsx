import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Chart2Props {
  title: string;
  value: {
    q3TotalCountPercentage?: number;
  };
  total: number;
}

export default function Chart2({ title, value, total }: Chart2Props) {
  const percentage = Math.round(Number(value?.q3TotalCountPercentage)) || 0;
  const safeTotal = Number.isFinite(total) ? total : 0;

  // Askari Bank Logo Palette: Primary Cyan-Blue (#009bdf)
  const getBarColor = (val: number) => {
    if (val < 40 && val > 0) return "#d71920"; // Askari Red (critical alert)
    return "#009bdf"; // Askari Brand Cyan-Blue
  };

  const barColor = getBarColor(percentage);

  const options = useMemo<ApexOptions>(() => ({
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: true,
          speed: 400,
        },
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
          background: "#f1f5f9",
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
          name: {
            show: false,
          },
          value: {
            offsetY: 10,
            fontSize: "32px",
            fontWeight: "800",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            color: "#0077b5",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [barColor],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Score"],
  }), [barColor]);

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 border border-slate-200/80 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,155,223,0.06)] transition-all duration-200 hover:shadow-[0_8px_30px_-4px_rgba(0,155,223,0.14)] hover:border-[#009bdf]/30">
      {/* Header */}
      <div className="border-b border-slate-100 pb-3 mb-4 text-center">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#0077b5] line-clamp-1">
          {title}
        </h3>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex-1 flex items-center justify-center min-h-[200px] relative">
        <ReactApexChart
          key={`chart2-${barColor}-${percentage}`}
          options={options}
          series={[percentage]}
          type="radialBar"
          height={270}
          className="w-full max-w-[260px] mx-auto"
        />

        {/* Subtle, clean layout minimum/maximum endpoints */}
        <div className="absolute bottom-6 left-8 text-[10px] font-bold text-[#808285] select-none">
          0
        </div>
        <div className="absolute bottom-6 right-8 text-[10px] font-bold text-[#808285] select-none">
          100
        </div>
      </div>

      {/* Footer Badge */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f9fd] border border-[#009bdf]/20 px-3 py-1 text-[11px] font-medium text-[#0077b5]">
          Sample Size
          <span className="inline-block w-1 h-1 rounded-full bg-[#009bdf]" />
          <span className="font-bold text-[#0077b5]">n = {safeTotal}</span>
        </div>
      </div>
    </div>
  );
}
