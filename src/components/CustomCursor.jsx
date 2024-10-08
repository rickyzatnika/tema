"use client";

import { useCursor } from "@/context/CursorContext";

const CustomCursor = () => {
  const { position, isHover } = useCursor();

  return (
    <div
      className={`custom-cursor hidden lg:block fixed pointer-events-none transition-all duration-300 ease-linear  ${
        isHover
          ? "active"
          : "  bg-[#fff]/70 backdrop-blur-[3px]  w-4 h-4 transition-all duration-300 ease-linear"
      }  `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "fixed",
        pointerEvents: "none",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        transition: "background-color 0.3s",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
