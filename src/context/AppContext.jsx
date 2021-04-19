import React, { useContext, useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import { FootballDataService } from "../services";

const AppContext = React.createContext({
  activeClub: {},
  setActiveClub: () => {},
  crimeData: [],
  setCrimeData: () => {},
  currentTeams: [],
  setCurrentTeams: () => {},
  selectedDate: {},
  setSelectedDate: () => {},
});

const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [activeClub, setActiveClub] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date("January 1, 2020"));
  const [currentTeams, setCurrentTeams] = useState([]);
  const [crimeData, setCrime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FootballDataService.fetchTeamData(
      selectedDate,
      setCurrentTeams,
      setActiveClub,
      setCrime
    ).then(() => {
      setLoading(false);
    });
  }, [selectedDate, setCurrentTeams, setActiveClub, setCrime]);

  return (
    <AppContext.Provider
      value={{
        activeClub,
        setActiveClub: club => setActiveClub(club),
        crimeData,
        setCrimeData: crime => setCrime(crime),
        currentTeams,
        setCurrentTeams: teams => setCurrentTeams(teams),
        selectedDate,
        setSelectedDate: date => setSelectedDate(date),
      }}
    >
      {loading ? (
        <div className="flex w-screen h-screen justify-center items-center flex-col text-2xl text-blue-700">
          <BounceLoader color={"#0000FF"} loading={loading} size={100} />
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

export { AppContextProvider, useAppContext };
