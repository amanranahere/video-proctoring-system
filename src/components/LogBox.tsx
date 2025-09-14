"use client";

import { useState } from "react";

export default function LogBox() {
  const [logs, setLogs] = useState<string[]>(["Interview session started."]);

  return (
    <div className="flex-1 w-full rounded-[25px] p-3 bg-[#ffffff06] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden overflow-y-auto">
      <h3 className="">Logs</h3>
      <ul className="space-y-1 text-sm lg:text-base">
        {logs.map((log, index) => (
          <li key={index}>• {log}</li>
        ))}
      </ul>
    </div>
  );
}
