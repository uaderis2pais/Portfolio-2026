import React, { useState, useEffect } from "react";

export const ScrollProgress = ({ className = "" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollY / docHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-[-1px] left-0 h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-50 ${className}`}
      style={{ width: `${progress}%` }}
    />
  );
};
