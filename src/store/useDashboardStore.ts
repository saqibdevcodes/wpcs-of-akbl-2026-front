import { create } from "zustand";

interface DashboardStore {
  isFilterApplies: boolean;
  dashboardData: unknown[];

  setIsFilterApplies: (value: boolean) => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  isFilterApplies: false,
  dashboardData: [],

  setIsFilterApplies: (isFilterApplies) => set({ isFilterApplies }),
}));

export default useDashboardStore;
