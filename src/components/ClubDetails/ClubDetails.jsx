import React from "react";
import { useAppContext } from "../../context/AppContext";

const ClubDetails = () => {
  const { activeClub } = useAppContext();
  const { address, crestUrl, name, phone, venue } = activeClub;

  return (
    <div className="flex justify-center p-10">
      <div className="flex flex-col items-center">
        <img className="h-16" src={crestUrl} alt={`${name} crest`} />

        <p className="text-4xl text-center">{name}</p>
        <p className="text-base text-center text-gray-600">{venue}</p>
        <p className="text-base text-center text-gray-600">{address}</p>
        <p className="text-base text-gray-600">{phone}</p>
      </div>
    </div>
  );
};

export default ClubDetails;
