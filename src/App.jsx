import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";
import Scale from "./components/Scale";
import ScaleMonthFixed from "./components/ScaleMonthFixed";
import { useState, useEffect, useRef } from "react";

function App() {
  const [offsetX, setOffsetX] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(32);
  const [startYear, setStartYear] = useState(-2000);
  const [stepYear, setStepYear] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const zoomLevel = 0.00159983 * Math.pow(1.2, zoomIndex - 1);

  const containerRef = useRef(null);

  function handleLeft() {
    setStartYear((prev) => prev - stepYear);
  }

  function handleRight() {
    setStartYear((prev) => prev + stepYear);
  }

  function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  // 🎯 Rendre le conteneur focusable dès le chargement
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // 🎹 Gérer clavier + scroll horizontal
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollDelay = 100;

    const handleInteraction = (e) => {
      if (e.type === "keydown") {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handleLeft();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleRight();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setZoomIndex((prev) => Math.min(prev + 1, 48));
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setZoomIndex((prev) => Math.max(prev - 1, 14));
        }
      }

      if (e.type === "wheel") {
        const now = Date.now();
        if (now - lastScrollTime < scrollDelay) return;

        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          if (e.deltaX > 10) handleRight();
          else if (e.deltaX < -10) handleLeft();
          lastScrollTime = now;
        }
      }
    };

    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("wheel", handleInteraction, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
    };
  }, [stepYear]);

  // 🖱️ Réactiver le focus si l’utilisateur clique n’importe où
  useEffect(() => {
    const handleClick = () => {
      containerRef.current?.focus();
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="flex flex-col h-screen w-screen outline-none"
    >
      <Navbar />
      <div className="relative flex flex-1">
        <Sidebar
          Left={handleLeft}
          Right={handleRight}
          zoomIndex={zoomIndex}
          setZoomIndex={setZoomIndex}
          toggleFullscreen={toggleFullscreen}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-[20px]"
          }`}
        >
          {zoomIndex >= 32 ? (
            <Scale zoomIndex={zoomIndex} offsetX={offsetX} />
          ) : (
            <ScaleMonthFixed
              zoomIndex={zoomIndex}
              startYear={startYear}
              onStepYearChange={setStepYear}
            />
          )}

          <Timeline
            zoomLevel={zoomLevel}
            offsetX={offsetX}
            zoomIndex={zoomIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
