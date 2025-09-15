import { create } from "zustand";

type Log = {
  rule: string;
  deduction: number;
  time: string;
};

type LogState = {
  logs: Log[];
  addLog: (log: Log) => void;
  clearLogs: () => void;
  points: number;
};

export const useLogStore = create<LogState>((set) => ({
  logs: [],
  points: 100,
  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, log],
      points: Math.max(0, state.points + log.deduction),
    })),
  clearLogs: () => set({ logs: [], points: 100 }),
}));
