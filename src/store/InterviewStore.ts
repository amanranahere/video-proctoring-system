import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface InterviewData {
  id: string;
  title: string;
  candidateName: string;
  interviewerName: string;
  duration: number;
  notes: string;
}

interface InterviewStore {
  interviewData: InterviewData | null;
  setInterviewData: (data: InterviewData) => void;
  updateInterviewData: (partial: Partial<InterviewData>) => void;
  clearInterviewData: () => void;
}

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set) => ({
      interviewData: null,

      setInterviewData: (data) => set({ interviewData: data }),

      updateInterviewData: (partial) =>
        set((state) => ({
          interviewData: state.interviewData
            ? { ...state.interviewData, ...partial }
            : null,
        })),

      clearInterviewData: () => set({ interviewData: null }),
    }),
    {
      name: "interview-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
