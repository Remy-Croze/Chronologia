import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";
import FullscreenButton from "./components/FullscreenButton";
import ZoomControls from "./components/ZoomControls";
import Scale from "./components/Scale";
import { useState } from "react";

function App() {
  const [offsetX, setOffsetX] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(50); // position du curseur (1 à 56)
  const zoomLevel = 0.00159983 * Math.pow(1.2, zoomIndex - 1);


  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="relative flex flex-1 ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Scale zoomLevel={zoomLevel} offsetX={offsetX} zoomIndex={zoomIndex} />
          <Timeline zoomLevel={zoomLevel} offsetX={offsetX} zoomIndex={zoomIndex} />

        </div>
        <FullscreenButton />
        <ZoomControls zoomIndex={zoomIndex} setZoomIndex={setZoomIndex} />
      </div>
    </div>
  );
}

export default App;
