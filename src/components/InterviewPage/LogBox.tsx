"use client";

import { useRef, useState, useEffect } from "react";
import {
  Copy,
  Check,
  Info,
  EyeOff,
  UserX,
  Users,
  Smartphone,
  BookX,
  Laptop,
} from "lucide-react";
import { useLogStore } from "@/store/logStore";

export default function LogBox() {
  const [copied, setCopied] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const logs = useLogStore((state) => state.logs);
  const points = useLogStore((state) => state.points);
  // const clearLogs = useLogStore((state) => state.clearLogs);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const getLogStyle = (rule: string, deduction: number) => {
    let icon = <Info className="w-4 h-4" />;
    if (rule.includes("Looking")) icon = <EyeOff className="w-4 h-4" />;
    else if (rule.includes("Face not")) icon = <UserX className="w-4 h-4" />;
    else if (rule.includes("Multiple")) icon = <Users className="w-4 h-4" />;
    else if (rule.includes("Mobile")) icon = <Smartphone className="w-4 h-4" />;
    else if (rule.includes("Book/Notes")) icon = <BookX className="w-4 h-4" />;
    else if (rule.includes("Extra")) icon = <Laptop className="w-4 h-4" />;

    let color = "text-gray-300";
    if (deduction <= -3 && deduction >= -5) color = "text-blue-400";
    if (deduction <= -6 && deduction >= -8) color = "text-yellow-400";
    if (deduction <= -9) color = "text-red-400";

    return { color, icon };
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        logs.map((l) => `[${l.time}] ${l.rule} (${l.deduction} pts)`).join("\n")
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: any) {
      console.error("Failed to copy logs.", err);
    }
  };

  return (
    <div className="min-h-[80vh] lg:min-h-[89vh] mb-5 w-full rounded-4xl bg-[#2a2a2db8] overflow-hidden overflow-y-auto no-scrollbar">
      {/* header */}
      <div className="sticky top-0 flex justify-between items-center px-2 md:px-2.5 py-4  backdrop-blur-sm">
        <h3 className="pl-3 text-lg lg:text-2xl font-bold">Logs</h3>

        <div className="flex gap-x-1.5">
          <div className="h-8 px-4 bg-[#424245b3] text-sm rounded-full duration-150 flex justify-center items-center">
            <span className="text-[#bababa] font-semibold">Points:</span>&nbsp;
            {points}
          </div>

          <button
            onClick={handleCopy}
            title="Copy logs"
            className="w-8 h-8 bg-[#424245b3] hover:brightness-110 font-bold rounded-full flex justify-center items-center gap-x-2 duration-150 cursor-pointer"
          >
            {copied ? (
              <>
                <Check
                  strokeWidth={3}
                  className="w-3 h-3 lg:w-4 lg:h-4 text-green-400"
                />
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 lg:w-4 lg:h-4" />
              </>
            )}
          </button>

          {/* <button
            onClick={clearLogs}
            title="Clear logs"
            className="w-8 h-8 bg-[#424245b3] hover:brightness-110 font-bold rounded-full flex justify-center items-center gap-x-2 duration-150 cursor-pointer"
          >
            <Trash className="w-3 h-3 lg:w-4 lg:h-4" />
          </button> */}
        </div>
      </div>

      {/* Log list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 text-sm font-mono">
        {logs.length === 0 ? (
          <div className="pt-20 text-gray-500 text-center">
            No warnings yet.
          </div>
        ) : (
          logs.map((log, index) => {
            const { color, icon } = getLogStyle(log.rule, log.deduction ?? 0);

            return (
              <div
                key={index}
                className="flex items-center gap-2 bg-neutral-900 rounded-full px-3 py-1.5"
              >
                <span className="text-xs text-gray-500">{log.time}</span>

                <span className={color}>{icon}</span>

                <span className="text-xs md:text-sm flex-1">{log.rule}</span>

                {typeof log.deduction === "number" && (
                  <span className={`${color} font-semibold`}>
                    {log.deduction} pts
                  </span>
                )}
              </div>
            );
          })
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
