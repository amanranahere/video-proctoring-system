"use client";

import { useState } from "react";
import { Copy, Check, Info, X } from "lucide-react";

const rules = [
  { rule: "Looking away from the screen", deduction: "-5" },
  { rule: "Face not detected", deduction: "-10" },
  { rule: "Multiple faces detected", deduction: "-10" },
  { rule: "Mobile phone or another device detected", deduction: "-15" },
];

export default function LogBox() {
  const [logs, setLogs] = useState<string[]>(["Interview session started"]);
  const [points, setPoints] = useState(100);
  const [copied, setCopied] = useState(false);
  const [RuleBoxOpen, setRuleBoxOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(logs.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: any) {
      console.error("Failed to copy logs.", err);
    }
  };

  return (
    <>
      <div className="flex-1 w-full rounded-[25px] p-1 md:py-2 md:px-1.5 bg-[#ffffff06] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] overflow-hidden overflow-y-auto">
        <div className="flex justify-between items-center px-2 pb-2.5">
          <h3 className="text-lg lg:text-xl font-bold">Logs</h3>

          <div className="flex gap-x-2">
            <div className="px-2 py-1 hover:bg-[#1a1a1a] border-2 border-[#d6ebfd30] text-sm rounded-lg duration-150">
              Points: <span className="font-semibold">{points}</span>
            </div>

            <button
              onClick={() => setRuleBoxOpen(!RuleBoxOpen)}
              title="Points deduction rules"
              className="p-1.5 hover:bg-[#1a1a1a] border-2 border-[#d6ebfd30] font-bold rounded-lg flex items-center gap-x-2 duration-150 cursor-pointer"
            >
              <Info strokeWidth={3} className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>

            <button
              onClick={handleCopy}
              title="Copy logs"
              className="p-1.5 hover:bg-[#1a1a1a] border-2 border-[#d6ebfd30] font-bold rounded-lg flex items-center gap-x-2 duration-150 cursor-pointer"
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
          </div>
        </div>

        <ul className="space-y-1 text-sm">
          {logs.map((log, index) => (
            <li key={index} className="bg-[#0d0d0d] rounded-md p-2">
              {log}
            </li>
          ))}
        </ul>
      </div>

      {/* rule box */}
      {RuleBoxOpen && (
        <>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] max-w-[600px] h-[70%] rounded-[20px] shadow-lg dark:bg-[#303030] dark:text-white flex flex-col z-20">
            <div
              onClick={() => setRuleBoxOpen(false)}
              className="absolute top-5 lg:top-6 right-5 lg:right-6 p-1 hover:bg-[#4a4a4a] text-[#9a9a9a] hover:text-[#f1f1f1] rounded-full cursor-pointer z-10 duration-100"
            >
              <X className="w-6 h-6" strokeWidth={3} />
            </div>

            <div className="w-full pl-7 pt-6 pb-4 text-lg lg:text-2xl font-semibold">
              Rules for Points Deduction
            </div>

            <hr className="my-1 mx-3 border-[#e5e7eb] dark:border-[#4a4a4a]" />

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
              {rules.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-2 rounded-lg"
                >
                  <span className="text-[#bababa]">{item.rule}</span>

                  <span className="text-[#f1f1f1] font-mono">
                    {item.deduction} <span className="md:hidden">p</span>
                    <span className="hidden md:inline">points</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* black bg overlay */}
          <div
            onClick={() => setRuleBoxOpen(false)}
            className="fixed inset-0 bg-black/70 z-10"
          ></div>
        </>
      )}
    </>
  );
}
