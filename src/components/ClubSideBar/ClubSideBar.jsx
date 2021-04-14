import React, { useContext } from "react";
import { ClubCrest } from "../../components";
import { ActiveClub } from "../../hooks";

const ClubSideBar = ({ teams }) => {
  const { activeClub } = useContext(ActiveClub);

  return (
    <div className="w-32 h-screen overflow-y-hidden divide-y divide-gray-700">
      <ClubCrest club={activeClub} key={activeClub.id} />
      <div className="h-screen overflow-y-hidden overflow-y-scroll">
        {teams.reduce(
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

export default ClubSideBar;
