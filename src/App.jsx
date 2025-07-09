import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";
import FullscreenButton from "./components/FullscreenButton";
import ZoomControls from "./components/ZoomControls";
import Scale from "./components/Scale";
import { useState } from "react";

function App() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="relative flex flex-1 ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Scale zoomLevel={zoomLevel} offsetX={offsetX} />
          <Timeline zoomLevel={zoomLevel} offsetX={offsetX} />
        </div>
        <FullscreenButton />
        <ZoomControls zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      </div>
    </div>
  );
}

export default App;
