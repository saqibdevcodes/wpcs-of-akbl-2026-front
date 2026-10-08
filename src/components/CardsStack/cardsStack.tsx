export default function CardsStack({ data }: any) {
  // Mapping for backend keys that don't match the displayed frontend text labels
  // const departmentLabels: Record<string, string> = {
  //   Accounts: "Accounts",
  //   Admin: "Admin",
  //   Compliance: "Compliance",
  //   Finance: "Finance",
  //   GESA: "GESA",
  //   "Human Resource (HR)": "HR",
  //   "Information Technology (IT)": "IT",
  //   "Internal audit": "Internal audit",
  //   Legal: "Legal",
  //   Operations: "Operations",
  //   Research: "Research",
  //   Udari: "Udari",
  // };

  // const regionLabels = [
  //   "Bahawalpur",
  //   "Faisalabad",
  //   "Gujranwala",
  //   "Head office",
  //   "Hyderabad",
  //   "Islamabad",
  //   "Jhang",
  //   "Karachi",
  //   "KPK/Rawalpindi",
  //   "Lahore",
  //   "Multan",
  //   "Sahiwal",
  //   "Sargodha",
  //   "Sukkur",
  // ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 h-full">
      {/* Total to be / Target Cap (Askari Slate & Platinum Theme) */}
      <div className="group relative overflow-hidden border border-slate-200/90 bg-gradient-to-br from-white via-[#f0f9fd]/40 to-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-2xl p-5 flex-1 flex flex-col justify-between min-h-24 transition-all duration-200 hover:shadow-[0_6px_25px_-4px_rgba(0,155,223,0.10)] hover:-translate-y-0.5 hover:border-[#009bdf]/30">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#808285] to-[#a7a9ac]" />
        <div className="flex items-center justify-between">
          <span className="text-[#808285] font-bold uppercase tracking-wider text-[10px]">
            Target Benchmark
          </span>
          <span className="p-1 px-2.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/70">
            🎯 Target Cap
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-3">
          <span className="text-slate-600 font-semibold text-sm">Total Sample Size</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {Number(data?.total || 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Achieved Sample Size (Askari Cyan-Blue & Orange Signature Theme) */}
      <div className="group relative overflow-hidden border border-[#009bdf]/25 bg-gradient-to-br from-white via-[#f0f9fd]/60 to-[#e0f3fc]/30 shadow-[0_4px_20px_-4px_rgba(0,155,223,0.08)] rounded-2xl p-5 flex-1 flex flex-col justify-between min-h-24 transition-all duration-200 hover:shadow-[0_8px_30px_-4px_rgba(0,155,223,0.20)] hover:-translate-y-0.5 hover:border-[#009bdf]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009bdf] via-[#0082bc] to-[#f36f21]" />
        <div className="flex items-center justify-between">
          <span className="text-[#0077b5] font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f36f21] animate-pulse" />
            Live Data Stream
          </span>
          <span className="p-1 px-2.5 rounded-lg bg-[#009bdf]/10 text-[#0077b5] text-xs font-bold border border-[#009bdf]/25">
            📊 Achieved Realtime
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-3">
          <span className="text-slate-600 font-semibold text-sm">
            Achieved Sample Size
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-black text-[#0077b5] tracking-tight">
              {Math.round(data?.count || 0).toLocaleString()}
            </span>
            {data?.count > 0 && data?.total > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black bg-[#009bdf] text-white shadow-xs">
                {Math.round((data?.count / data?.total) * 100) || 0}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-4 text-xs select-none items-stretch">
  {
    /* Column 1: Core Target Metrics (Indigo Accent) */
  }

  {
    /* Column 2: Demographic Splits (Violet Accent) */
  }
  {
    /* <div className="flex flex-col gap-3 h-full bg-white border border-slate-100 rounded-xl p-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]"> */
  }
  {
    /* <div className="border-b border-slate-50 pb-2 mb-1 flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 rounded-full bg-violet-500" />
          <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Demographics
          </h3>
        </div> */
  }

  {
    /* Gender sub-container */
  }
  {
    /* <div className="space-y-1.5 py-1">
          <div className="flex justify-between items-center bg-slate-50/60 hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors">
            <span className="text-slate-500 font-medium">✨ Male</span>
            <span className="font-bold text-slate-800">
              {data?.stats?.gender?.Male?.count || 0}
            </span>
            <span className="font-bold text-slate-800">
              {Math.round(data?.stats?.gender?.Male?.percentage) || 0}%
            </span>
          </div>
          <div className="flex justify-between items-center bg-slate-50/60 hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors">
            <span className="text-slate-500 font-medium">🌸 Female</span>
            <span className="font-bold text-slate-800">
              {data?.stats?.gender?.Female?.count || 0}
            </span>
            <span className="font-bold text-slate-800">
              {Math.round(data?.stats?.gender?.Female?.percentage) || 0}%
            </span>
          </div>
        </div> */
  }

  {
    /* <div className="h-px bg-slate-100 my-1" /> */
  }

  {
    /* Age Groups list */
  }
  {
    /* <div className="space-y-1 flex-1 flex flex-col justify-between">
          {[
            "26 - 35 years",
            "36 - 45 years",
            "Less than 25 years",
            "More than 45 years",
          ].map((ageKey) => {
            const item = data?.stats?.age?.[ageKey];
            return (
              <div
                key={ageKey}
                className="flex justify-between items-center gap-2 group/row py-0.5 px-1 rounded hover:bg-slate-50/80 transition-colors"
              >
                <span className="text-slate-500 font-medium truncate">
                  {ageKey}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-800">
                    {item?.count ?? 0}
                  </span>
                  <span className="text-violet-500 bg-violet-50 font-bold px-1 rounded text-[9px]">
                    {Math.round(Number(item?.percentage)) || 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div> */
  }
  {
    /* </div> */
  }

  {
    /* Column 3: Regions Breakdown (Amber Accent) */
  }
  {
    /* Column 3: Regions Breakdown (Amber Accent) */
  }
  {
    /* <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full">
        <div className="border-b border-slate-50 pb-2 mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 rounded-full bg-amber-500" />
          <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Regions
          </h3>
        </div>

        <div className="space-y-1 flex-1 flex flex-col justify-between">
          {regionLabels.map((regionKey) => {
            const item = data?.stats?.region?.[regionKey];

            return (
              <div
                key={regionKey}
                className="flex justify-between items-center gap-2 group/row px-1 rounded hover:bg-amber-50/30 transition-colors"
              >
                <span className="text-slate-500 font-medium truncate">
                  {regionKey}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-700">
                    {item?.count ?? 0}
                  </span>

                  <span className="text-amber-600 font-semibold min-w-7.5 text-right text-[10px]">
                    {Math.round(Number(item?.percentage)) || 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div> */
  }

  {
    /* Column 4: Departments Grid (Emerald Accent) */
  }
  {
    /* <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full">
        <div className="border-b border-slate-50 pb-2 mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 rounded-full bg-emerald-500" />
          <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Departments
          </h3>
        </div>
        <div className="space-y-1 flex-1 flex flex-col justify-between">
          {Object.entries(departmentLabels).map(([apiKey, displayLabel]) => {
            const item = data?.stats?.department?.[apiKey];
            return (
              <div
                key={apiKey}
                className="flex justify-between items-center gap-2 group/row px-1 rounded hover:bg-emerald-50/30 transition-colors"
              >
                <span className="text-slate-500 font-medium truncate">
                  {displayLabel}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-700">
                    {item?.count ?? 0}
                  </span>
                  <span className="text-emerald-600 font-semibold min-w-7.5 text-right text-[10px]">
                    {Math.round(Number(item?.percentage)) || 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div> */
  }

  {
    /* Column 5: Tenure Cohorts (Rose Accent) */
  }
  {
    /* <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full">
        <div className="border-b border-slate-50 pb-2 mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 rounded-full bg-rose-500" />
          <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Tenure Cohorts
          </h3>
        </div>
        <div className="space-y-1 flex-1 flex flex-col justify-between">
          {[
            "1 - 3 years",
            "4 - 6 years",
            "7 - 10 years",
            "10 - 15 years",
            "15 - 20 years",
            "Less than 1 year",
            "More than 20 years",
          ].map((tenureKey) => {
            const item = data?.stats?.empTenure?.[tenureKey];
            return (
              <div
                key={tenureKey}
                className="flex justify-between items-center gap-2 group/row px-1 rounded hover:bg-rose-50/30 transition-colors"
              >
                <span className="text-slate-500 font-medium truncate">
                  {tenureKey}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-700">
                    {item?.count ?? 0}
                  </span>
                  <span className="text-rose-600 font-semibold min-w-7.5 text-right text-[10px]">
                    {Math.round(Number(item?.percentage)) || 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div> */
  }
  // </div>
}
