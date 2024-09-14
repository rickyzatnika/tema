"use client";

import { useEffect } from "react";

import { animatePageIn } from "@/utils/animation";

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div className="w-screen flex">
      <div
        id="banner-1"
        className="text-3xl font-bold bg-[#87DAF1] z-[9999] flex items-center justify-center mx-auto  fixed top-0 left-0  w-1/4 min-h-screen"
      ></div>
      <div
        id="banner-2"
        className="text-3xl font-bold bg-[#87DAF1] z-[9999]  flex items-center justify-center mx-auto fixed top-0 left-1/4 w-1/4 min-h-screen"
      ></div>
      <div
        id="banner-3"
        className="text-3xl font-bold bg-[#87DAF1] z-[9999] flex items-center justify-center mx-auto  fixed top-0 left-2/4  w-1/4 min-h-screen"
      ></div>
      <div
        id="banner-4"
        className="text-3xl font-bold bg-[#87DAF1] z-[9999] flex items-center justify-center mx-auto  fixed top-0 left-3/4  w-1/4 min-h-screen"
      ></div>

      {children}
    </div>
  );
}
