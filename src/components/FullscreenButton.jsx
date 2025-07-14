export default function FullscreenButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-4 bg-blue-600 text-white px-3 py-2 rounded text-center"
    >
      Plein écran
    </button>
  );
}
