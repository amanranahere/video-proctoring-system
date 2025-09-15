"use client";

import { useEffect, useRef, useState } from "react";
import { VideoOff } from "lucide-react";

import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";

declare global {
  interface Window {
    FaceMesh: any;
  }
}

export default function VideoCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectModelRef = useRef<cocoSsd.ObjectDetection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    let animationId: number;
    let faceMesh: any;

    // ----- LOAD FACE DETECTION MODEL -----

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";
    script.async = true;

    script.onload = () => {
      if (!window.FaceMesh) {
        setError("FaceMesh library failed to load.");
        return;
      }

      faceMesh = new window.FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 2,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results: any) => {
        const canvasCtx = canvasRef.current!.getContext("2d");
        if (!canvasCtx || !videoRef.current) return;

        const { videoWidth, videoHeight } = videoRef.current;

        // adjust canvas size to video size
        canvasRef.current!.width = videoWidth;
        canvasRef.current!.height = videoHeight;

        // draw canvas
        canvasCtx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

        // draw landmarks
        if (results.multiFaceLandmarks) {
          console.log("Faces detected: ", results.multiFaceLandmarks.length);
          canvasCtx.fillStyle = "lime";

          results.multiFaceLandmarks.forEach((landmarks: any) => {
            landmarks.forEach((point: any) => {
              canvasCtx.beginPath();
              canvasCtx.arc(
                point.x * videoWidth,
                point.y * videoHeight,
                1.5,
                0,
                2 * Math.PI
              );
              canvasCtx.fill();
            });
          });
        }
      });
      startVideo();
    };

    document.body.append(script);

    // ----- LOAD OBJECT DETECTION MODEL -----

    const loadObjectModel = async () => {
      try {
        await tf.setBackend("webgl");
      } catch (err) {
        console.warn("WebGL not available, falling back to CPU");
        await tf.setBackend("cpu");
      }

      await tf.ready();
      objectModelRef.current = await cocoSsd.load();
      console.log("COCO-SSD model loaded with backend: ", tf.getBackend());
    };

    loadObjectModel();

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // ensure the video starts playing
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();

            const processFrame = async () => {
              if (videoRef.current && faceMesh) {
                // run face detection
                await faceMesh.send({ image: videoRef.current });

                // run object detection
                if (objectModelRef.current) {
                  const predictions = await objectModelRef.current.detect(
                    videoRef.current
                  );

                  predictions.forEach((p) => {
                    if (p.score > 0.6) {
                      if (
                        ["cell phone", "book", "laptop", "tv"].includes(p.class)
                      ) {
                        console.log(
                          `Detected ${p.class} (${Math.round(p.score * 100)}%)`
                        );

                        if (p.class === "cell phone") {
                          console.warn("Mobile phone detected!");
                        }
                        if (p.class === "book") {
                          console.warn("Book/Notes detected!");
                        }
                        if (p.class === "laptop") {
                          console.warn("Extra device detected!");
                        }
                      }
                    }
                  });
                }
              }
              animationId = requestAnimationFrame(processFrame);
            };
            processFrame();
          };
        }
      } catch (err) {
        setError("Unable to access camera. Please allow permissions.");
        console.error("Camera error: ", err);
      }
    };

    return () => {
      cancelAnimationFrame(animationId);

      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }

      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full aspect-video rounded-[25px] flex items-center justify-center text-white shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] relative">
      {error ? (
        <div className="h-full w-full flex flex-col justify-center items-center gap-5 text-white">
          <div className="bg-[#3a3a3a] p-3 lg:p-5 rounded-full">
            <VideoOff className="w-6 h-6 lg:w-14 lg:h-14" />
          </div>
          <span className="font-medium text-[#bababa]">{error}</span>
        </div>
      ) : (
        <>
          <video ref={videoRef} className="hidden" autoPlay playsInline muted />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full rounded-[25px]"
          />
        </>
      )}
    </div>
  );
}
