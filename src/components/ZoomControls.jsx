const zoomIndexToGridSize = {
  48: 40,
  47: 28,
  46: 20,
  45: 14,
  44: 10,
  43: 7,
  42: 5,
  41: 3,
  40: 2,
  39: 1.5,
  38: 1,
  37: 0.8,
  36: 0.5,
  35: 0.4,
  34: 0.3,
  33: 0.2,
  32: 0.13,
  31: 0.1,
  30: 0.07,
  29: 0.05,
  28: 0.03,
  27: 0.02,
  26: 0.015,
  25: 0.01,
  24: 0.008,
  23: 0.005,
  22: 0.0035,
  21: 0.0025,
  20: 0.0018,
  19: 0.0013,
  18: 0.0009,
  17: 0.0006,
  16: 0.0004,
  15: 0.0003,
  14: 0.0002,
};

const ZoomControls = ({ zoomIndex, setZoomIndex }) => {
  const min = 14;
  const max = 48;

  const zoomLevel = zoomIndexToGridSize[zoomIndex] ?? 2;

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
        {zoomLevel} px/jour
      </span>
    </div>
  );
};

export default ZoomControls;
