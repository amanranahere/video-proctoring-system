"use client";

import { useEffect, useRef, useState } from "react";
import { VideoOff } from "lucide-react";
import { useLogStore } from "@/store/logStore";

import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";

declare global {
  interface Window {
    FaceMesh: any;
  }
}

function getTimeStamp(): string {
  const now = new Date();
  return now.toLocaleTimeString();
}

export default function VideoCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const objectModelRef = useRef<cocoSsd.ObjectDetection | null>(null);

  const lastFaceSeenRef = useRef<number>(Date.now());
  const faceWarningIssuedRef = useRef(false);
  const multiFaceWarningIssuedRef = useRef(false);

  const initialNoseXRef = useRef<number | null>(null);
  const lookingAwayStartRef = useRef<number | null>(null);
  const lookingAwayWarningIssuedRef = useRef(false);
  const lastObjectWarningRef = useRef<{ [key: string]: number }>({});

  const [error, setError] = useState<string | null>(null);

  const addLog = useLogStore((state) => state.addLog);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    let animationId: number;
    let faceMesh: any;

    // ----------------------
    // Load Face Detection Model (via CDN)
    // ----------------------
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

        // face detection rules
        const faces = results.multiFaceLandmarks || [];

        if (faces.length > 0) {
          lastFaceSeenRef.current = Date.now();
          faceWarningIssuedRef.current = false;

          // multiple faces rule
          if (faces.length > 1 && !multiFaceWarningIssuedRef.current) {
            // console.warn(`[${getTimeStamp()}] Multiple faces detected!`);
            addLog({
              rule: "Multiple faces detected!",
              deduction: -7,
              time: getTimeStamp(),
            });
            multiFaceWarningIssuedRef.current = true;
          } else if (faces.length === 1) {
            multiFaceWarningIssuedRef.current = false;
          }

          // looking away rule
          const noseTip = faces[0]?.[1];
          if (noseTip) {
            const noseX = noseTip.x;

            if (initialNoseXRef.current === null) {
              initialNoseXRef.current = noseX;
            }

            if (initialNoseXRef.current !== null) {
              const deviation = Math.abs(noseX - initialNoseXRef.current);
              const threshold = 0.1;

              if (deviation > threshold) {
                if (!lookingAwayStartRef.current) {
                  lookingAwayStartRef.current = Date.now();
                }
                const elapsed =
                  (Date.now() - lookingAwayStartRef.current) / 1000;
                if (elapsed >= 5 && !lookingAwayWarningIssuedRef.current) {
                  // console.warn(
                  //   `[${getTimeStamp()}] Candidate not looking at the screen!`
                  // );
                  addLog({
                    rule: "Looking away from the screen!",
                    deduction: -3,
                    time: getTimeStamp(),
                  });
                  lookingAwayWarningIssuedRef.current = true;
                }
              }
            } else {
              lookingAwayStartRef.current = null;
              lookingAwayWarningIssuedRef.current = false;
            }
          }
        } else {
          // no face detected rule
          const elapsed = (Date.now() - lastFaceSeenRef.current) / 1000;
          if (elapsed >= 10 && !faceWarningIssuedRef.current) {
            // console.warn(
            //   `[${getTimeStamp()}] No face detected!`
            // );
            addLog({
              rule: "Face not detected!",
              deduction: -5,
              time: getTimeStamp(),
            });
            faceWarningIssuedRef.current = true;
          }

          multiFaceWarningIssuedRef.current = false;
        }

        // draw landmarks
        // if (faces.length > 0) {
        //   // console.log("Faces detected: ", faces.length);
        //   canvasCtx.fillStyle = "lime";

        //   results.multiFaceLandmarks.forEach((landmarks: any) => {
        //     landmarks.forEach((point: any) => {
        //       canvasCtx.beginPath();
        //       canvasCtx.arc(
        //         point.x * videoWidth,
        //         point.y * videoHeight,
        //         1.5,
        //         0,
        //         2 * Math.PI
        //       );
        //       canvasCtx.fill();
        //     });
        //   });
        // }
      });
      startVideo();
    };

    document.body.append(script);

    // ----------------------
    // Load Object Detection Model
    // ----------------------
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

    // ----------------------
    // Start Video Stream
    // ----------------------
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
                      if (["cell phone", "book", "laptop"].includes(p.class)) {
                        const now = Date.now();
                        const lastWarn =
                          lastObjectWarningRef.current[p.class] || 0;

                        if (now - lastWarn > 10000) {
                          if (p.class === "cell phone") {
                            // console.warn(
                            //   `[${getTimeStamp()}] Mobile phone detected!`
                            // );
                            addLog({
                              rule: "Mobile phone detected!",
                              deduction: -10,
                              time: getTimeStamp(),
                            });
                          }
                          if (p.class === "book") {
                            // console.warn(
                            //   `[${getTimeStamp()}] Book/Notes detected!`
                            // );
                            addLog({
                              rule: "Book/Notes detected!",
                              deduction: -5,
                              time: getTimeStamp(),
                            });
                          }
                          if (p.class === "laptop") {
                            // console.warn(
                            //   `[${getTimeStamp()}] Extra device detected!`
                            // );
                            addLog({
                              rule: "Extra device detected!",
                              deduction: -8,
                              time: getTimeStamp(),
                            });
                          }

                          lastObjectWarningRef.current[p.class] = now;
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
    <div className="relative w-full aspect-video rounded-3xl flex items-center justify-center text-white overflow-hidden">
      {error ? (
        <div className="h-full w-full flex flex-col justify-center items-center gap-5 bg-[#1d1d1f] text-white">
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
