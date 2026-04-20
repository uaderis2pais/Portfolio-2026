import { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";

const continentMarkers = [
  { location: [40.71,  -74.01], name: "América N.", color: "#22d3ee" },  // NYC
  { location: [-23.55, -46.63], name: "América S.", color: "#a855f7" },  // São Paulo
  { location: [48.85,    2.35], name: "Europa",     color: "#34d399" },  // París
  { location: [-1.29,   36.82], name: "África",     color: "#facc15" },  // Nairobi
  { location: [35.68,  139.65], name: "Asia",       color: "#f87171" },  // Tokio
  { location: [-33.87, 151.21], name: "Oceanía",    color: "#38bdf8" },  // Sydney
];

/**
 * Projects a lat/lon marker to 2D screen coordinates using the exact same
 * coordinate system that cobe uses internally, so labels track correctly.
 *
 * cobe internally converts location to spherical coords as:
 *   cobeMarkerPhi  = PI - (lon_rad - PI/2) = 3PI/2 - lon_rad
 *   cobeMarkerTheta = lat_rad
 * Then renders with the camera looking along the +z axis.
 */
function projectMarker(lat, lon, globePhi, globeTheta) {
  const latR = (lat * Math.PI) / 180;
  const lonR = (lon * Math.PI) / 180;

  // 3D point in cobe's coordinate system
  const x0 = -Math.cos(latR) * Math.cos(lonR);
  const y0 =  Math.sin(latR);
  const z0 = -Math.cos(latR) * Math.sin(lonR);

  // Y-axis rotation by globePhi (globe spinning)
  const x1 =  x0 * Math.cos(globePhi) + z0 * Math.sin(globePhi);
  const z1 = -x0 * Math.sin(globePhi) + z0 * Math.cos(globePhi);
  const y1 = y0;

  // X-axis rotation by globeTheta (tilt)
  const y2 =  y1 * Math.cos(globeTheta) - z1 * Math.sin(globeTheta);
  const z2 =  y1 * Math.sin(globeTheta) + z1 * Math.cos(globeTheta);
  const x2 = x1;

  // Smooth fade: visible on front (z2 < 0), hidden on back (z2 > 0)
  // Transition zone from z2=-0.05 to z2=0.15 for a natural taper at the globe edge
  const opacity = Math.min(1, Math.max(0, (0.15 - z2) / 0.2));
  const visible = opacity > 0;

  // Project to normalised screen [0,1]. Negate x2 to match cobe's screen orientation.
  const sx = (-x2 + 1) / 2;
  const sy = 1 - (y2 + 1) / 2;

  return { sx, sy, visible, opacity };
}

export function GlobeInteractive({ className = "", speed = 0.005 }) {
  const canvasRef          = useRef(null);
  const phiRef             = useRef(0);
  const pointerInteracting = useRef(null);
  const dragOffset         = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef       = useRef(0);
  const thetaOffsetRef     = useRef(0);
  const isPausedRef        = useRef(false);
  const rafRef             = useRef(null);
  const globeTheta         = 0.2; // fixed tilt

  const [labelPositions, setLabelPositions] = useState(
    continentMarkers.map(() => ({ sx: 0.5, sy: 0.5, visible: false, opacity: 0 }))
  );

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current  += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi:   (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", onMove,          { passive: true });
    window.addEventListener("pointerup",   handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup",   handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let globe = null;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: globeTheta,
        dark: 1,
        diffuse: 1.5,
        mapSamples: 8000,
        mapBrightness: 6,
        baseColor:   [0.05, 0.6, 0.7],
        markerColor: [0.4,  0.9, 1.0],
        glowColor:   [0.0,  0.6, 0.8],
        markers: [],   // labels handled as projected HTML overlays
        arcs: [],
        opacity: 0.9,
      });

      function animate() {
        if (!isPausedRef.current) phiRef.current += speed;

        const currentPhi   = phiRef.current + phiOffsetRef.current + dragOffset.current.phi;
        const currentTheta = globeTheta     + thetaOffsetRef.current + dragOffset.current.theta;

        globe.update({ phi: currentPhi, theta: currentTheta });

        // Project all markers using same phi/theta as globe
        const next = continentMarkers.map((m) =>
          projectMarker(m.location[0], m.location[1], currentPhi, currentTheta)
        );
        setLabelPositions(next);

        rafRef.current = requestAnimationFrame(animate);
      }

      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init(); }
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (globe) globe.destroy();
    };
  }, [speed]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%",
          cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%", touchAction: "none",
        }}
      />

      {continentMarkers.map((m, i) => {
        const pos = labelPositions[i];
        return (
          <div
            key={m.name}
            style={{
              position:       "absolute",
              left:           `${pos.sx * 100}%`,
              top:            `${pos.sy * 100}%`,
              transform:      "translate(-50%, -160%)",
              pointerEvents:  "none",
              opacity:        pos.opacity,
              transition:     "opacity 0.15s",
              zIndex:         10,
            }}
          >
            {/* Badge */}
            <div style={{
              background:     "rgba(2,6,23,0.85)",
              border:         `1px solid ${m.color}60`,
              borderRadius:   "4px",
              padding:        "2px 6px",
              display:        "flex",
              alignItems:     "center",
              gap:            "5px",
              backdropFilter: "blur(6px)",
              boxShadow:      `0 0 10px ${m.color}30`,
              whiteSpace:     "nowrap",
            }}>
              <div style={{
                width: "6px", height: "6px",
                borderRadius:    "50%",
                backgroundColor: m.color,
                boxShadow:       `0 0 6px ${m.color}`,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily:    "monospace",
                fontSize:      "8px",
                fontWeight:    700,
                color:         m.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {m.name}
              </span>
            </div>
            {/* Connector line down to the dot */}
            <div style={{
              width:      "1px",
              height:     "10px",
              background: `linear-gradient(${m.color}80, transparent)`,
              margin:     "0 auto",
            }} />
          </div>
        );
      })}
    </div>
  );
}
