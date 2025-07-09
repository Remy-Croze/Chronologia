export default function FullscreenButton() {
  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button onClick={toggleFullscreen} className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded">
      Plein écran
    </button>
  );
}
