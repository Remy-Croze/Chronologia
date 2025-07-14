import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ArrowButtons({ Left, Right }) {
  return (
    <div className="flex justify-center gap-4 w-full">
      <button
        onClick={(e) => { e.preventDefault(); Left(); }}
        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.preventDefault(); Right(); }}
        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
