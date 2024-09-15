"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

// CursorProvider component
export const CursorProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, elementId: "" });
  const [isHover, setIsHover] = useState(false);
  const [buttonPositions, setButtonPositions] = useState({});

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []); // No dependency needed for position updates

  useEffect(() => {
    // Ensure the elementId is updated based on hover state
    if (!isHover) {
      setPosition((prev) => ({ ...prev, elementId: "" }));
    }
  }, [isHover]); // Update elementId based on isHover

  const handleCursorHover = (isHover, elementId) => {
    setIsHover(isHover);
    setPosition((prev) => ({ ...prev, elementId }));
  };

  const handleElementMove = (position) => {
    setPosition(position);
  };

  const setInitialButtonPositions = (position) => {
    setButtonPositions((prev) => ({
      ...prev,
      [position.elementId]: { x: position.x, y: position.y },
    }));
  };

  return (
    <CursorContext.Provider
      value={{
        position,
        isHover,
        handleCursorHover,
        handleElementMove,
        setInitialButtonPositions,
        buttonPositions,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};
