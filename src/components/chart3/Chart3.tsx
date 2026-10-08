import { useMemo } from "react";
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

  // Askari Bank Logo Palette: Primary Cyan-Blue (#009bdf)
  const getScoreColor = (val: number) => {
    if (val < -30) return "#d71920"; // Detractor zone (Askari Red)
    if (val < 0) return "#f36f21"; // Passive zone (Askari Tangerine)
    return "#009bdf"; // Promoter zone (Askari Cyan-Blue)
  };

  const barColor = getScoreColor(percentage);

  const options = useMemo<ApexOptions>(() => ({
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
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
          size: "72%",
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
          name: { show: false },
          value: {
            offsetY: 10,
            fontSize: "34px",
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
    labels: ["NPS"],
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
      <div className="flex-1 flex flex-col justify-center min-h-[220px]">
        <div className="relative w-full max-w-[260px] mx-auto">
          <ReactApexChart
            key={`chart3-${barColor}-${percentage}`}
            options={options}
            series={[percentage]}
            type="radialBar"
            height={270}
          />

          {/* Symmetrical Axis Boundary Markings */}
          <div className="absolute bottom-6 left-6 text-[10px] font-bold text-[#808285] select-none">
            -100%
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#808285] select-none">
            0
          </div>
          <div className="absolute bottom-6 right-6 text-[10px] font-bold text-[#808285] select-none">
            +100%
          </div>
        </div>

        {/* Askari Branded Breakdown Metrics Segment Tiles */}
        <div className="flex items-center justify-center gap-2 mt-2 px-1">
          <div className="flex-1 rounded-xl border border-[#009bdf]/25 bg-[#f0f9fd] p-2 text-center transition-colors hover:bg-[#e0f3fc]">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#0077b5]">
              Promoters
            </p>
            <p className="mt-0.5 text-base font-black text-[#0077b5]">
              {promoters}%
            </p>
          </div>

          <div className="flex-1 rounded-xl border border-orange-200/80 bg-orange-50/70 p-2 text-center transition-colors hover:bg-orange-100/70">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#f36f21]">
              Passives
            </p>
            <p className="mt-0.5 text-base font-black text-[#d9580d]">
              {passives}%
            </p>
          </div>

          <div className="flex-1 rounded-xl border border-rose-200/80 bg-rose-50/70 p-2 text-center transition-colors hover:bg-rose-100/70">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#d71920]">
              Detractors
            </p>
            <p className="mt-0.5 text-base font-black text-[#b91c1c]">
              {detractor}%
            </p>
          </div>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f9fd] border border-[#009bdf]/20 px-3 py-1 text-[11px] font-medium text-[#0077b5]">
          Sample Size
          <span className="inline-block w-1 h-1 rounded-full bg-[#009bdf]" />
          <span className="font-bold text-[#0077b5]">n = {safeTotal}</span>
        </div>
      </div>
    </div>
  );
}
