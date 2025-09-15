# Video Proctoring System

A simple video proctoring system built with **Next.js**, for monitoring candidate activity during online tests.  

This project captures video, detects suspicious activity (like multiple faces, mobile phones, or laptops), and logs warnings in real-time.

---

## ⚡ Features

- Live video streaming of the candidate.
- Activity detection: multiple faces, mobile/laptop detection, etc.
- Real-time warnings with timestamps.
- Summary proctoring report generation.

---

## 🛠 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS    
- **Deployment:** Vercel
- **Object Detection Models**: TensorFlow, MediaPipe

---

## Sample Proctoring Report

- Logs candidate warnings with timestamp and violation type.
- Generates PDF or CSV reports.
- Fields include Candidate Name, Exam Title, Duration, Warnings, and Final Points.

---

## Live Deployment

Check out live site: [Video-Proctoring-System-Prototype2](https://video-proctoring-system-prototype2.vercel.app/)


