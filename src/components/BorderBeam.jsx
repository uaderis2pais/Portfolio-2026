import React from "react";

export const BorderBeam = ({
  className = "",
  duration = 8,
  borderWidth = 2,
  colorFrom = "#a855f7", // purple-500
  colorTo = "#06b6d4"    // cyan-500
}) => {
  return (
    <>
      <style>{`
        @keyframes conic-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
      <div 
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
        style={{
          border: `${borderWidth}px solid transparent`,
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-[300%] aspect-square"
          style={{
            background: `conic-gradient(from 0deg, transparent 70%, ${colorFrom} 85%, ${colorTo} 100%)`,
            animation: `conic-spin ${duration}s linear infinite`
          }}
        />
      </div>
    </>
  );
};
