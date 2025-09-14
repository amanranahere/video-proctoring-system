"use client";

import { useEffect, useRef, useState } from "react";
import { VideoOff } from "lucide-react";

export default function VideoCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        setError("Unable to access camera. Please allow permissions.");
        console.error("Camera error: ", err);
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full aspect-video rounded-[25px] flex items-center justify-center text-white shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)]">
      {error ? (
        <div className="h-full w-full flex flex-col justify-center items-center gap-5 text-white">
          <div className="bg-[#3a3a3a] p-3 lg:p-5 rounded-full">
            <VideoOff className="w-6 h-6 lg:w-14 lg:h-14" />
          </div>

          <span className="font-medium text-[#bababa]">{error}</span>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="rounded-[25px]"
        ></video>
      )}
    </div>
  );
}
