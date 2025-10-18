import { create } from "zustand";
import getTimeStamp from "@/utils/getTimeStamp";

type Log = {
  rule: string;
  deduction?: number;
  time: string;
};

type LogState = {
  logs: Log[];
  points: number;
  addLog: (log: Log) => void;
  clearLogs: () => void;

  // recording
  isRecording: boolean;
  isPaused: boolean;
  startRecording: (stream: MediaStream) => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  takeScreenshot: (video: HTMLVideoElement) => void;

  // store media
  recordings: string[];
  snapshots: string[];
  addRecording: (url: string) => void;
  addSnapshot: (url: string) => void;
  clearMedia: () => void;

  // interview controls
  isInterviewActive: boolean;
  showEndModal: boolean;
  startInterview: () => void;
  endInterview: () => void;
  closeModal: () => void;
};

let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];

export const useLogStore = create<LogState>((set, get) => ({
  logs: [],
  points: 100,

  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, log],
      points: Math.max(0, state.points + (log.deduction ?? 0)),
    })),

  clearLogs: () => set({ logs: [], points: 100 }),

  // media arrays
  recordings: [],
  snapshots: [],

  addRecording: (url) =>
    set((state) => ({
      recordings: [...state.recordings, url],
    })),

  addSnapshot: (url) =>
    set((state) => ({
      snapshots: [...state.snapshots, url],
    })),

  clearMedia: () => set({ recordings: [], snapshots: [] }),

  // recording controls
  isRecording: false,
  isPaused: false,

  startRecording: (stream) => {
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      useLogStore.getState().addRecording(url);
    };

    mediaRecorder.start();
    set({ isRecording: true, isPaused: false });
  },

  stopRecording: () => {
    mediaRecorder?.stop();
    set({ isRecording: false, isPaused: false });
  },

  pauseRecording: () => {
    mediaRecorder?.pause();
    set({ isPaused: true });
  },

  resumeRecording: () => {
    mediaRecorder?.resume();
    set({ isPaused: false });
  },

  takeScreenshot: (video) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        useLogStore.getState().addSnapshot(url);
      });
    }
  },

  // interview controls
  isInterviewActive: false,
  showEndModal: false,

  startInterview: () => {
    set({ isInterviewActive: true });
    get().addLog({ rule: "Interview started", time: getTimeStamp() });
  },

  endInterview: () => {
    if (get().isRecording) get().stopRecording();

    set({
      isInterviewActive: false,
      showEndModal: true,
    });

    get().addLog({ rule: "Interview ended", time: getTimeStamp() });
  },

  closeModal: () => set({ showEndModal: false }),
}));
