import Selects from "@/components/Selects/Selects";
import useDashboardStore from "@/store/useDashboardStore";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import Chart1 from "@/components/chart1/Chart1";
import Chart2 from "@/components/chart2/Chart2";
import Chart3 from "@/components/chart3/Chart3";
import axios from "axios";
import CardsStack from "@/components/CardsStack/cardsStack";

export default function Home() {
  const { isFilterApplies, setIsFilterApplies } = useDashboardStore();
  const [genderValue, setGenderValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [regionValue, setRegionValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [tenureValue, setTenureValue] = useState("");
  const [dashboardData, setDashboardData] = useState([]);

  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);
  const [region, setRegion] = useState([]);
  const [department, setDepartment] = useState([]);
  const [tenure, setTenure] = useState([]);

  const [q2, setQ2] = useState({});
  const [q3, setQ3] = useState({});
  const [q4, setQ4] = useState({});

  const [total, setTotal] = useState(0);

  const resetFilters = () => {
    setGenderValue("");
    setAgeValue("");
    setRegionValue("");
    setDepartmentValue("");
    setTenureValue("");
    setIsFilterApplies(false);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const params = new URLSearchParams();

        if (genderValue) params.append("gender", genderValue);
        if (ageValue) params.append("age", ageValue);
        if (regionValue) params.append("region", regionValue);
        if (departmentValue) params.append("department", departmentValue);
        if (tenureValue) params.append("tenure", tenureValue);

        // const queryString = params.toString();
        // const url = queryString
        //   ? `${import.meta.env.VITE_BACKEND_URL}/dashboard?${queryString}&t=${Date.now()}`
        //   : `${import.meta.env.VITE_BACKEND_URL}/dashboard/t=${Date.now()}`;

        // const res = await axios.get(url, {
        //   headers: {
        //     "Cache-Control": "no-cache",
        //   },
        // });

        // Always append the timestamp as a query parameter
        params.append("t", Date.now().toString());

        const url = `${import.meta.env.VITE_BACKEND_URL}/dashboard?${params.toString()}`;

        const res = await axios.get(url, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        setDashboardData(res.data);
        setGender(res.data.filters.gender);
        setAge(res.data.filters.age);
        setRegion(res.data.filters.region);
        setDepartment(res.data.filters.department);
        setTenure(res.data.filters.empTenure);
        setQ2(res.data.questionStats.q2);
        setQ3(res.data.questionStats.q3);
        setQ4(res.data.questionStats.q4);
        setTotal(res.data.count || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, [
    genderValue,
    ageValue,
    regionValue,
    departmentValue,
    tenureValue,
    setIsFilterApplies,
  ]);

  return (
    <div className="min-h-screen  text-slate-900  space-y-4 font-sans antialiased ">
      {/* 1. Filter Section Panel (Clean glassmorphic card with a subtle top accent border) */}
      <div className="bg-white rounded-2xl border-t-4 border-t-sky-500 border-x border-b border-slate-100 p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Apply Filters
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              Narrow down your data slice by adjusting the parameters below.
            </p>
          </div>
          {isFilterApplies && (
            <Button
              variant="ghost"
              size="sm"
              className="self-start sm:self-auto text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 hover:text-rose-600 rounded-xl transition-all duration-200 px-4 py-2 shadow-sm"
              onClick={() => {
                setIsFilterApplies(false);
                resetFilters();
              }}
            >
              Clear Active Filters
            </Button>
          )}
        </div>

        {/* Dropdown Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold uppercase tracking-wider text-indigo-500/90 px-0.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-indigo-500" /> Gender
            </label>
            <Selects
              items={gender}
              placeholder="Select Gender"
              value={genderValue}
              onChange={(value: string) => {
                setGenderValue(value);
                setIsFilterApplies(true);
              }}
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold uppercase tracking-wider text-purple-500/90 px-0.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-purple-500" /> Age Group
            </label>
            <Selects
              items={age}
              placeholder="Select Age"
              value={ageValue}
              onChange={(value: string) => {
                setAgeValue(value);
                setIsFilterApplies(true);
              }}
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold uppercase tracking-wider text-amber-500/90 px-0.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-amber-500" /> Region
            </label>
            <Selects
              items={region}
              placeholder="Select Region"
              value={regionValue}
              onChange={(value: string) => {
                setRegionValue(value);
                setIsFilterApplies(true);
              }}
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-500/90 px-0.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />{" "}
              Department
            </label>
            <Selects
              items={department}
              placeholder="Select Department"
              value={departmentValue}
              onChange={(value: string) => {
                setDepartmentValue(value);
                setIsFilterApplies(true);
              }}
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold uppercase tracking-wider text-rose-500/90 px-0.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-rose-500" /> Tenure
            </label>
            <Selects
              items={tenure}
              placeholder="Select Tenure"
              value={tenureValue}
              onChange={(value: string) => {
                setTenureValue(value);
                setIsFilterApplies(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Metrics Deck Section */}
      <div className="">
        <CardsStack data={dashboardData} />
      </div>

      {/* 3. Analytics & Performance Charts Container */}
      <div className="space-y-5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent">
            Sentiment & Effort Deep-Dives
          </h2>
          <span className="h-px bg-gradient-to-r from-slate-200/80 to-transparent flex-1 ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.05)] rounded-2xl">
            <Chart1
              title={"Overall Satisfaction (Top 2 Boxes)"}
              value={q2}
              total={total}
            />
          </div>
          <div className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.05)] rounded-2xl">
            <Chart2
              title={"Employee Effort Score (Top 3 Boxes)"}
              value={q3}
              total={total}
            />
          </div>
          <div className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.05)] rounded-2xl">
            <Chart3
              title={"Employees Net Promoter Score"}
              value={q4}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
