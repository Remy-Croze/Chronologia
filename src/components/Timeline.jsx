import { writers } from "../data/writers";
import WriterItem from "./WriterItem";

/**
 * Calcule l'espacement horizontal des lignes principales en fonction du zoom.
 */
function getDayStepFromZoomIndex(zoomIndex) {
  return zoomIndex >= 48 ? 1 : Math.floor(48 / zoomIndex);
}

/**
 * Renvoie le style de la grille principale (lignes verticales et horizontales).
 */
function getMainGridStyle(effectiveGridSize, gridSize) {
  return {
    backgroundImage: `
      linear-gradient(to right, #eee 1px, transparent 1px),
      linear-gradient(to bottom, #eee 1px, transparent 1px)
    `,
    backgroundSize: `${effectiveGridSize}px ${gridSize}px`,
    backgroundPosition: `${gridSize / 2}px 0px`,
  };
}

/**
 * Renvoie le style de la sous-grille (lignes plus fines pour un zoom élevé).
 */
function getSubgridStyle(subgridSize, gridSize, thick) {
  return {
    backgroundImage: `
      linear-gradient(to right, #ddd ${thick}px, transparent 1px),
      linear-gradient(to bottom, #ddd 1px, transparent 1px)
    `,
    backgroundSize: `${subgridSize}px ${subgridSize}px`,
    backgroundPosition: `${gridSize / 2}px 0px`,
  };
}

/**
 * Composant qui affiche la grille de fond dynamique (principale et secondaire).
 */
function GridOverlay({ gridSize, effectiveGridSize, showMainGrid, showSubgrid, subgridSize, subgridThickness, showSubgrid2, subgrid2Size, subgrid2Thickness, showSubgrid3, subgrid3Size, subgrid3Thickness, showSubgrid4, subgrid4Size, subgrid4Thickness}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Grille principale */}
      {showMainGrid && (
        <div className="absolute inset-0 opacity-50" style={getMainGridStyle(effectiveGridSize, gridSize)} />
      )}
      {/* Sous-grille */}
      {showSubgrid && (
        <div className="absolute inset-0 opacity-25" style={getSubgridStyle(subgridSize, gridSize, subgridThickness)} />
      )}
      {/* Sous-grille2 */}
      {showSubgrid2 && (
        <div className="absolute inset-0 opacity-25" style={getSubgridStyle(subgrid2Size, gridSize, subgrid2Thickness)} />
      )}
      {/* Sous-grille3 */}
      {showSubgrid3 && (
        <div className="absolute inset-0 opacity-25" style={getSubgridStyle(subgrid3Size, gridSize, subgrid3Thickness)} />
      )}
      {/* Sous-grille4 */}
      {showSubgrid4 && (
        <div className="absolute inset-0 opacity-25" style={getSubgridStyle(subgrid4Size, gridSize, subgrid4Thickness)} />
      )}
    </div>
  );
}

/**
 * Composant principal Timeline.
 */
export default function Timeline({ zoomLevel, offsetX, zoomIndex }) {
  const baseSize = 2;
  const gridSize = baseSize * zoomLevel;
  const lineStep = getDayStepFromZoomIndex(zoomIndex);
  const effectiveGridSize = gridSize * lineStep;

  const showMainGrid = zoomIndex >= 45;

  const showSubgrid = (zoomIndex >= 42 && zoomIndex <= 47); 
  const subgridSize = gridSize * 2;
  const subgridThickness = zoomIndex < 45 ? 1 : 2;

  const showSubgrid2 = (zoomIndex >= 38 && zoomIndex <= 44); 
  const subgrid2Size = gridSize * 4;
  const subgrid2Thickness = zoomIndex < 42 ? 1 : 2;

  const showSubgrid3 = (zoomIndex >= 34 && zoomIndex <= 41); 
  const subgrid3Size = gridSize * 8;
  const subgrid3Thickness = zoomIndex < 38 ? 1 : 2;

  const showSubgrid4 = (zoomIndex >= 30 && zoomIndex <= 37); 
  const subgrid4Size = gridSize * 16;
  const subgrid4Thickness = zoomIndex < 34 ? 1 : 2;

  // Définir une très large zone scrollable (ex: 10 000 jours)
  const totalDays = 10000;
  const totalWidth = totalDays * gridSize;

  return (
    <div className="flex-1 bg-white pt-0 px-0 relative h-full overflow-x-auto overflow-y-hidden">
      <div className="relative" style={{ width: `${totalWidth}px`, height: "100%" }}>
        {/* Grille dynamique */}
        <GridOverlay
          gridSize={gridSize}
          effectiveGridSize={effectiveGridSize}
          showMainGrid={showMainGrid}
          showSubgrid={showSubgrid}
          subgridSize={subgridSize}
          subgridThickness={subgridThickness}
          showSubgrid2={showSubgrid2}
          subgrid2Size={subgrid2Size}
          subgrid2Thickness={subgrid2Thickness}
          showSubgrid3={showSubgrid3}
          subgrid3Size={subgrid3Size}
          subgrid3Thickness={subgrid3Thickness}
          showSubgrid4={showSubgrid4}
          subgrid4Size={subgrid4Size}
          subgrid4Thickness={subgrid4Thickness}
        />

        {/* Éléments de la frise (écrivains par exemple) */}
        <div className="relative z-10 pt-15">
          {writers.map((writer) => (
            <WriterItem key={writer.id} writer={writer} />
          ))}
        </div>
      </div>
    </div>
  );
}
