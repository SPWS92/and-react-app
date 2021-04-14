import React from "react";
import { ClubCrest } from "..";
import { useAppContext } from "../../context/AppContext";

const ClubSelector = () => {
  const { activeClub, currentTeams } = useAppContext();

  return (
    <div className="flex overflow-x-hidden divide-y divide-gray-700">
      <ClubCrest club={activeClub} key={activeClub.id} />
      <div className="grid grid-gap-4 grid-cols-max grid-rows-1 grid-flow-col overflow-x-scroll border-b border-gray-500 divide-x divide-gray-300">
        {currentTeams.reduce(
          (clubList, club) =>
            club.id !== activeClub.id
              ? [...clubList, <ClubCrest club={club} key={club.id} />]
              : clubList,
          []
        )}
      </div>
    </div>
  );
};

export default ClubSelector;
