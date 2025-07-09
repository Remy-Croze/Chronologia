const ZoomControls = ({ zoomLevel, setZoomLevel }) => {
  const zoomIn = () => {
    if (zoomLevel < 5) setZoomLevel(prev => prev + 0.2);
  };

  const zoomOut = () => {
    if (zoomLevel > 0.2) setZoomLevel(prev => prev - 0.2);
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white p-2 rounded-xl shadow-lg z-50 flex gap-2 items-center">
      <button
        onClick={zoomOut}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
      >
        -
      </button>
      <span className="text-sm font-semibold text-black">{(zoomLevel * 100).toFixed(0)}%</span>
      <button
        onClick={zoomIn}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
      >
        +
      </button>
    </div>
  );
};

export default ZoomControls;
