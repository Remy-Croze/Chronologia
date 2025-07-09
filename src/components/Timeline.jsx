import { writers } from "../data/writers";
import WriterItem from "./WriterItem";

export default function Timeline({ zoomLevel, offsetX }) {
  const baseSize = 40;
  const gridSize = baseSize// * zoomLevel;
  const showSubgrid = zoomLevel > 2;
  const subgridSize = gridSize / 2;

  return (
    <div className="flex-1 bg-white pt-0 px-6 relative h-full overflow-y-auto">
      {/* Grilles dynamiques */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, #eee 1px, transparent 1px),
              linear-gradient(to bottom, #eee 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: `${gridSize / 2}px 0px`,  // Aligne les lignes verticales sur les graduations
          }}
        />
        {showSubgrid && (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ddd 1px, transparent 1px),
                linear-gradient(to bottom, #ddd 1px, transparent 1px)
              `,
              backgroundSize: `${subgridSize}px ${subgridSize}px`,
              backgroundPosition: `${gridSize / 2}px 0px`,
            }}
          />
        )}
      </div>

      {/* Contenu */}
      <div className="relative z-10 pt-15">
        {writers.map((writer) => (
          <WriterItem key={writer.id} writer={writer} />
        ))}
      </div>
    </div>
  );
}
