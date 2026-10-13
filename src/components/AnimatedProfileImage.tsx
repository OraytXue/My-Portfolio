"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";

// Ordered from resting pose (Pp.png) → hand fully covering the face (Frame5.jpg).
const FRAMES = [
  "/images/Pp.png",
  "/images/Frame2.jpg",
  "/images/Frame3.jpg",
  "/images/Frame4.jpg",
  "/images/Frame5.jpg",
];

const FRAME_INTERVAL_MS = 90;

export default function AnimatedProfileImage() {
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Warm the browser's own image cache on mount so every frame is already
  // decoded and ready before the user ever hovers — this is what removes
  // the "white flash" caused by frames being fetched on-demand.
  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  function clearAnim() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function playForward() {
    clearAnim();
    intervalRef.current = setInterval(() => {
      setFrameIndex((prev) => {
        if (prev >= FRAMES.length - 1) {
          clearAnim();
          return FRAMES.length - 1;
        }
        return prev + 1;
      });
    }, FRAME_INTERVAL_MS);
  }

  function playBackward() {
    clearAnim();
    intervalRef.current = setInterval(() => {
      setFrameIndex((prev) => {
        if (prev <= 0) {
          clearAnim();
          return 0;
        }
        return prev - 1;
      });
    }, FRAME_INTERVAL_MS);
  }

  useEffect(() => clearAnim, []);

  return (
    <div
      onMouseEnter={playForward}
      onMouseLeave={playBackward}
      className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-card-border shrink-0 bg-very-light-gray cursor-pointer"
    >
      {FRAMES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? profile.name : ""}
          fill
          sizes="112px"
          priority
          aria-hidden={i === 0 ? undefined : true}
          className={`object-cover absolute inset-0 transition-opacity duration-100 ease-linear ${
            i === frameIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </div>
  );
}