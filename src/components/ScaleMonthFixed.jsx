import React, { useState, useEffect } from "react";

/** Composant affichant les années */
function RenderYears({ gridSize, zoomIndex, startYear, numYears }) {
  let showStep = 1;
  let alignRatio = 0.5;

  if (zoomIndex === 29) {
    showStep = 2;
    alignRatio = 0.25;
  } else if (zoomIndex >= 27 && zoomIndex <= 28) {
    showStep = 5;
    alignRatio = 0.1;
  } else if (zoomIndex >= 23 && zoomIndex <= 26) {
    showStep = 10;
    alignRatio = 0.05;
  } else if (zoomIndex >= 20 && zoomIndex <= 22) {
    showStep = 20;
    alignRatio = 0.025;
  } else if (zoomIndex >= 17 && zoomIndex <= 19) {
    showStep = 50;
    alignRatio = 0.01;
  } else if (zoomIndex >= 15 && zoomIndex <= 16) {
    showStep = 100;
    alignRatio = 0.005;
  } else if (zoomIndex >= 13 && zoomIndex <= 14) {
    showStep = 200;
    alignRatio = 0.0025;
  }

  const blocks = [];
  for (let i = 0; i < numYears; i += showStep) {
    const label = startYear + i;
    const blockWidth = showStep * 12 * gridSize;
    const tickPosition = blockWidth * alignRatio;

    blocks.push(
      <div
        key={i}
        className="relative h-8"
        style={{ width: `${blockWidth}px`, textAlign: "left" }}
      >
        {/* Tick verticale */}
        <div
          className="absolute top-5 bottom-0"
          style={{
            left: `${tickPosition}px`,
            width: "1px",
            backgroundColor: "black",
          }}
        />
        {/* Label centré sur la graduation */}
        <div
          className="absolute text-xs font-bold text-black top-1.5"
          style={{
            left: `${tickPosition}px`,
            transform: "translateX(-50%)",
          }}
        >
          {label}
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute top-0 left-0 h-6 flex items-center z-10"
      style={{ transform: `translateX(${gridSize / 2}px)` }}
    >
      {blocks}
    </div>
  );
}

/** Composant principal ScaleMonthFixed */
export default function ScaleMonthFixed({ zoomIndex }) {
  const zoomIndexToGridSize = {
    31: 3.5,
    30: 2.6,
    29: 2,
    28: 1.5,
    27: 1.1,
    26: 0.8,
    25: 0.6,
    24: 0.45,
    23: 0.35,
    22: 0.25,
    21: 0.2,
    20: 0.15,
    19: 0.11,
    18: 0.08,
    17: 0.06,
    16: 0.045,
    15: 0.035,
    14: 0.025,
    13: 0.02,
    12: 0.015,
    11: 0.011,
  };

  const gridSize = zoomIndexToGridSize[zoomIndex] ?? 6;
  const startYear = -2000;

  const [numYears, setNumYears] = useState(200); // valeur par défaut

  useEffect(() => {
    function calculateVisibleYears() {
      const yearWidth = 12 * gridSize;
      const screenWidth = window.innerWidth;
      const neededYears = Math.ceil(screenWidth / yearWidth) * 2;
      setNumYears(neededYears);
    }

    calculateVisibleYears();

    window.addEventListener("resize", calculateVisibleYears);
    return () => window.removeEventListener("resize", calculateVisibleYears);
  }, [gridSize]);

  const heightRem = 1.5;

  return (
    <div
      className="relative w-full border-b border-gray-300 bg-white z-10 overflow-visible"
      style={{ height: `${heightRem}rem` }}
    >
      <RenderYears
        gridSize={gridSize}
        zoomIndex={zoomIndex}
        startYear={startYear}
        numYears={numYears}
      />
      {/* Ligne de base */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-black" />
    </div>
  );
}
