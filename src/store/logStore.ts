import { create } from "zustand";

type Log = {
  rule: string;
  deduction: number;
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
};

let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];

export const useLogStore = create<LogState>((set) => ({
  logs: [],
  points: 100,

  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, log],
      points: Math.max(0, state.points + log.deduction),
    })),
  clearLogs: () => set({ logs: [], points: 100 }),

  // recording
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
      const a = document.createElement("a");
      a.href = url;
      a.download = `interview-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
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
        const a = document.createElement("a");
        a.href = url;
        a.download = `screenshot-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  },
}));
