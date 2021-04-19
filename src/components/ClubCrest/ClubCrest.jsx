import React from "react";
import { FootballDataService } from "../../services";
import { useAppContext } from "../../context/AppContext";

const ClubCrest = ({ club }) => {
  const {
    activeClub,
    setActiveClub,
    selectedDate,
    setCrimeData,
  } = useAppContext();
  const { crestUrl, id, name, shortName } = club;

  return (
    <div
      key={id}
      title={name}
      style={{ width: "100px" }}
      className={`flex-grow p-2 flex flex-col items-center hover:bg-gray-400 cursor-pointer ${
        id === activeClub.id
          ? "bg-gradient-to-b from-blue-600 via-blue-600 to-blue-400 text-white"
          : "bg-gradient-to-b from-white via-white to-gray-300"
      }`}
      onClick={async () =>
        await FootballDataService.setSelectedClub(
          club,
          setActiveClub,
          selectedDate,
          setCrimeData
        )
      }
    >
      <img className="h-10" src={crestUrl} alt={`${name} crest`} />
      <span className="font-semibold text-xs text-center leading-4">
        {shortName}
      </span>
    </div>
  );
};

export default ClubCrest;
