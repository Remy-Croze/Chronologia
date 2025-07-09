import { useMemo } from "react";

export default function Scale({ zoomLevel, offsetX }) {
  const baseSize = 40; // largeur de base d'un jour (40px)
  const gridSize = baseSize //* zoomLevel; // largeur réelle d’un jour à l’écran selon le zoom actuel
  const visibleWidth = window.innerWidth; // largeur visible de l’écran
  const totalDays = Math.ceil(visibleWidth / gridSize); // nombre de jours à afficher pour remplir la largeur visible
  const offsetDays = Math.floor(offsetX / gridSize); // Nombre de jours décalés vers la droite
  const baseDate = new Date(1800, 0, 1); // Point de départ absolu de la frise : 1er janvier 1800

  // Calcul des dates visibles

  const dates = useMemo(() => {
    const result = [];
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + offsetDays + i);
      result.push(date);
    }
    return result;
  }, [offsetX, zoomLevel]);

  const years = [];
  const months = [];
  const days = [];

  let currentYear = null;
  let yearStart = 0;

  let currentMonth = null;
  let monthStart = 0;

  dates.forEach((date, i) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Année
    if (currentYear === null) {
      currentYear = year;
      yearStart = i;
    } else if (year !== currentYear) {
      years.push({ label: currentYear, start: yearStart, length: i - yearStart });
      currentYear = year;
      yearStart = i;
    }

    // Mois
    if (currentMonth === null) {
      currentMonth = month;
      monthStart = i;
    } else if (month !== currentMonth || year !== currentYear) {
      months.push({ label: currentMonth, start: monthStart, length: i - monthStart, year: date.getFullYear() });
      currentMonth = month;
      monthStart = i;
    }

    // Jour
    days.push({ label: day, index: i });
  });

  if (currentYear !== null) {
    years.push({ label: currentYear, start: yearStart, length: dates.length - yearStart });
  }
  if (currentMonth !== null) {
    months.push({ label: currentMonth, start: monthStart, length: dates.length - monthStart, year: currentYear });
  }

  const getMonthName = (monthIndex) => {
    return new Date(2000, monthIndex, 1).toLocaleString("fr-FR", { month: "long" });
  };

  return (
    <div className="relative w-full h-18 border-b border-gray-300 bg-white z-10 overflow-visible">
      {/* Années */}
      <div
        className="absolute top-0 left-0 w-full h-6 flex text-xs font-bold text-black items-center z-10"
        style={{ transform: `translateX(${gridSize / 2}px)` }}
      >
        {years.map((year, i) => (
          <div
            key={i}
            className="flex justify-center items-center"
            style={{
              width: `${year.length * gridSize}px`,
              textAlign: "center",
            }}
          >
            {year.label}
          </div>
        ))}
      </div>

      {/* Mois */}
      <div
        className="absolute top-6 left-0 w-full h-6 flex text-xs text-gray-800 items-center z-10"
        style={{ transform: `translateX(${gridSize / 2}px)` }}
      >
        {months.map((month, i) => (
          <div
            key={i}
            className="flex justify-center items-center"
            style={{
              width: `${month.length * gridSize}px`,
              textAlign: "center",
            }}
          >
            {getMonthName(month.label)}
          </div>
        ))}
      </div>

      {/* Jours */}
      <div
        className="absolute top-11 left-0 w-full h-6 flex text-xs text-gray-600 items-center z-40"
        
      >
        {days.map((day, i) => (
          <div
            key={i}
            className="flex justify-center items-center bg-white"
            style={{
              width: `${gridSize}px`,
              textAlign: "center",
            }}
          >
            {day.label}
          </div>
        ))}
      </div>

      {/* Graduations */}
      <div className="absolute -bottom-1 w-full h-full flex z-30">
        {dates.map((date, i) => {
          const day = date.getDate();
          const month = date.getMonth();
          let height = 12;
          if (day === 1 && month === 0) height = 72;
          else if (day === 1) height = 48;

          return (
            <div
              key={i}
              className="flex justify-center"
              style={{ width: `${gridSize}px` }}
            >
              <div
                style={{
                  width: "1px",
                  height: `${height}px`,
                  backgroundColor: "#000",
                  marginTop: `${72 - height}px`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Ligne de base */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-black" />
    </div>
  );
}
