import { useMemo } from "react";

/** Calcule l’espacement entre deux dates visibles selon le zoom. */
function getDayStepFromZoomIndex(zoomIndex) {
  return zoomIndex >= 48 ? 1 : Math.floor(48 / zoomIndex);
}

/** Calcule toutes les dates à afficher à l'écran à partir du décalage. */
function computeVisibleDates(baseDate, offsetDays, totalDays, dayStep) {
  const result = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offsetDays + i * dayStep);
    result.push(date);
  }
  return result;
}

/** Regroupe les dates par année, mois et jours avec leurs longueurs. */
function groupDates(dates) {
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

    // Nouvelle année
    if (currentYear === null) {
      currentYear = year;
      yearStart = i;
    } else if (year !== currentYear) {
      years.push({ label: currentYear, start: yearStart, length: i - yearStart });
      currentYear = year;
      yearStart = i;
    }

    // Nouveau mois
    if (currentMonth === null) {
      currentMonth = month;
      monthStart = i;
    } else if (month !== currentMonth || year !== currentYear) {
      months.push({ label: currentMonth, start: monthStart, length: i - monthStart, year });
      currentMonth = month;
      monthStart = i;
    }

    // Ajoute chaque jour
    days.push({ label: day, index: i });
  });

  // Ajoute la dernière année et le dernier mois
  if (currentYear !== null) {
    years.push({ label: currentYear, start: yearStart, length: dates.length - yearStart });
  }
  if (currentMonth !== null) {
    months.push({ label: currentMonth, start: monthStart, length: dates.length - monthStart, year: currentYear });
  }

  return { years, months, days };
}

/** Renvoie le nom du mois en français à partir de son index. */
function getMonthName(monthIndex, zoomIndex) {
  const full = new Date(2000, monthIndex, 1).toLocaleString("fr-FR", { month: "long" });
  if (zoomIndex === 36) return full.slice(0, 4); //Réduire aux 4 premières lettres
  if (zoomIndex === 35) return full.slice(0, 3); 
  if (zoomIndex === 34) return full.slice(0, 2); 
  if (zoomIndex <= 33) return full.slice(0, 1); 
  return full;
}


/** Rendu des libellés d'années, centrés. */
function RenderYears({ years, gridSize, zoomIndex }) {
// Règle d'affichage : fréquence de visibilité selon zoom
  let showStep = 1;
  if (zoomIndex >= 21 && zoomIndex <= 22) {
    showStep = 2;
  } else if (zoomIndex >= 17 && zoomIndex <= 20) {
    showStep = 5;
  } else if (zoomIndex >= 13 && zoomIndex <= 16) {
    showStep = 10;
  } else if (zoomIndex >= 11 && zoomIndex <= 12) {
    showStep = 20;
  } else if (zoomIndex >= 8 && zoomIndex <= 10) {
    showStep = 50;
  } else if (zoomIndex >= 6 && zoomIndex <= 7) {
    showStep = 100;
  }


  return (
    <div className="absolute top-0 left-0 h-6 flex text-xs font-bold text-black items-center z-10"
         style={{ transform: `translateX(${gridSize / 2}px)` }}>
      {years.map((year, i) => (
        <div key={i} className="flex justify-center items-center"
             style={{ width: `${year.length * gridSize}px`, textAlign: "center" }}>
          {/* Affiche seulement certaines années selon la règle */}
          {i % showStep === 0 ? year.label : ""}
        </div>
      ))}
    </div>
  );
}

/** Rendu des noms des mois centrés. */
function RenderMonths({ months, gridSize, zoomIndex }) {
  return (
    <div className="absolute top-6 left-0 h-6 flex text-xs text-gray-800 items-center z-10"
         style={{ transform: `translateX(${gridSize / 2}px)` }}>
      {months.map((month, i) => (
        <div key={i} className="flex justify-center items-center"
            style={{ width: `${month.length * gridSize}px`, textAlign: "center"}}>
          {getMonthName(month.label, zoomIndex)}
        </div>
      ))}

    </div>
  );
}

/** Rendu des jours sous forme de cases. */
function RenderDays({ days, gridSize, zoomIndex }) {
  // Règle d'affichage : fréquence de visibilité selon zoom
  let showStep = 1;
  if (zoomIndex >= 37 && zoomIndex <= 39) {
    showStep = 8;
  } else if (zoomIndex >= 40 && zoomIndex <= 43) {
    showStep = 4;
  } else if (zoomIndex >= 44 && zoomIndex <= 47) {
    showStep = 2;
  } else if (zoomIndex < 41) {
    showStep = Infinity; // Masque tous les jours
  }

  return (
    <div className="absolute top-11 left-0 h-6 flex text-xs text-gray-600 items-center z-40">
      {days.map((day, i) => (
        <div
          key={`day-${day.index}`}
          className="flex justify-center items-center bg-white"
          style={{
            width: `${gridSize}px`,
            textAlign: "center",
          }}
        >
          {/* Affiche seulement certains jours selon la règle */}
          {i % showStep === 0 ? day.label : ""}
        </div>
      ))}
    </div>
  );
}


/** Rendu des graduations verticales selon la date. */
function RenderTicks({ dates, gridSize, zoomIndex }) {
  const showTicks = zoomIndex >= 34;

  function shouldShowTick(i, date) {
    const day = date.getDate();
    const month = date.getMonth();

    // Toujours afficher les 1ers du mois, même si zoomIndex est bas
    const isMonthStart = day === 1;

    // Règle générale par zoomIndex
    if (zoomIndex >= 44 && zoomIndex <= 56) return true;
    if (zoomIndex >= 40 && zoomIndex <= 43) return i % 4 === 0 || isMonthStart;
    if (zoomIndex >= 37 && zoomIndex <= 39) return i % 8 === 0 || isMonthStart;

    // Quand zoomIndex < 34 → afficher uniquement les 1er du mois
    return isMonthStart;
  }

  return (
    <div className="absolute -bottom-1 h-full flex z-30">
      {dates.map((date, i) => {
        const day = date.getDate();
        const month = date.getMonth();

        // Détermine la hauteur de la tick
        let top = 72;
        let height = 12;
        if (day === 1 && month === 0) height = 72; // 1er janvier
        else if (day === 1) height = 48;           // 1er du mois
        if (zoomIndex<=36) {
          height-=24;
          top-=24;
        } else if (zoomIndex<=27) {
          height-=48;
          top-=48;
        }


        const visible = shouldShowTick(i, date);

        return (
          <div key={i} className="flex justify-center" style={{ width: `${gridSize}px` }}>
            {visible && (
              <div
                style={{
                  width: `1px`,
                  height: `${height}px`,
                  backgroundColor: "#000",
                  marginTop: `${top - height}px`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}



/** Composant principal Scale (échelle temporelle). */
export default function Scale({ zoomLevel, offsetX, zoomIndex }) {
  const baseSize = 2;
  const gridSize = baseSize * zoomLevel;
  const visibleWidth = window.innerWidth;
  const totalDays = Math.ceil(visibleWidth / gridSize);
  const offsetDays = Math.floor(offsetX / gridSize);
  const baseDate = new Date(-2000, 0, 1);
  const dayStep = getDayStepFromZoomIndex(zoomIndex);

  const dates = useMemo(
    () => computeVisibleDates(baseDate, offsetDays, totalDays, dayStep),
    [offsetX, zoomLevel, zoomIndex]
  );

  const { years, months, days } = groupDates(dates);
  let heightRem = 0;
  if (zoomIndex >= 37) {
    heightRem = 4.5; // correspond à h-18
  } else if (zoomIndex >= 27 && zoomIndex < 37) {
    heightRem = 3; // correspond à h-12
  } else {
    heightRem = 1.5; // correspond à h-6
  }

  return (
    
    <div className="relative w-full border-b border-gray-300 bg-white z-10 overflow-visible" style={{ height: `${heightRem}rem` }}>

      <RenderYears years={years} gridSize={gridSize} zoomIndex={zoomIndex} />

      {zoomIndex >= 27 && (
        <RenderMonths months={months} gridSize={gridSize} zoomIndex={zoomIndex} />
      )}

      {zoomIndex >= 37 && (
        <RenderDays days={days} gridSize={gridSize} zoomIndex={zoomIndex} />
      )}
      {zoomIndex >= 27 && (
        <RenderTicks dates={dates} gridSize={gridSize} zoomIndex={zoomIndex} />
      )}
      

      {/* Ligne de base */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-black" />
    </div>
  );
}
