"use client";

import { useState, useEffect } from "react";
import { useInterviewStore } from "@/store/InterviewStore";

export default function InterviewTimer() {
  const duration = useInterviewStore(
    (state) => state.interviewData?.duration || 60
  );
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (!duration) return;

    setTimeLeft(duration * 60);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // end interview
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  return <span className="text-4xl pl-4">{formatTime(timeLeft)}</span>;
}
