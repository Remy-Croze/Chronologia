import ZoomControls from "./ZoomControls";
import ArrowButtons from "./ArrowButtons";
import FullscreenButton from "./FullscreenButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({
  Left,
  Right,
  zoomIndex,
  setZoomIndex,
  toggleFullscreen,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <div
      className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-gray-100 border-r border-gray-300 shadow-xl transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-64" : "w-[20px]"}`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 p-1 rounded-full shadow z-40"
      >
        {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Contenu visible uniquement si ouvert */}
      {sidebarOpen && (
        <div className="p-4 overflow-y-auto h-full">
          <h2 className="font-semibold mb-4 text-black text-lg">Panneau de contrôle</h2>

          <div className="mb-6">
            <ZoomControls zoomIndex={zoomIndex} setZoomIndex={setZoomIndex} />
          </div>

          <div className="mb-6">
            <ArrowButtons Left={Left} Right={Right} />
          </div>

          <FullscreenButton onClick={toggleFullscreen} />
        </div>
      )}
    </div>
  );
}
