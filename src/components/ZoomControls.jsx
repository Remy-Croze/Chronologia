const ZoomControls = ({ zoomIndex, setZoomIndex }) => {
  const min = 6;
  const max = 56;

  // Calcule le zoom à partir de l'index
  const computeZoomLevel = (index) => 0.00159983 * Math.pow(1.2, index - 1);

  const zoomLevel = computeZoomLevel(zoomIndex);

  const handleChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setZoomIndex(newIndex); 
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg z-50 flex flex-col items-center">
      <input
        type="range"
        min={min}
        max={max}
        value={zoomIndex}
        onChange={handleChange}
        className="w-48"
      />
      <span className="text-sm mt-2 text-black font-semibold">
        {zoomLevel.toFixed(2)} px/jour
      </span>
    </div>
  );
};

export default ZoomControls;
