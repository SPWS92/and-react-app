import axios from "axios";
import { match } from "postcode";
import { PoliceDataService, PostCodeDataService } from "./";

const {
  REACT_APP_FOOTBALL_DATA_TOKEN,
  REACT_APP_FOOTBALL_DATA_URL,
} = process.env;

const FootballDataProvider = axios.create({
  baseURL: REACT_APP_FOOTBALL_DATA_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": REACT_APP_FOOTBALL_DATA_TOKEN,
  },
});

/**
 * @param {Number} season - the year for the season
 * @returns {Object|Promise} data relating to the teams for competition 2021
 */
async function getTeamsBySeason(season) {
  return FootballDataProvider.get("/competitions/2021/teams", {
    params: { season },
  });
}

/**
 * Fetch the team data determined by the selected date, populate the active club and
 * fetch and set crime data.
 *
 * @param {Date} selectedDate
 * @param {Function} setActiveClub
 * @param {Function} setCurrentTeams
 * @param {Function} setCrimeData
 */
async function fetchTeamData(
  selectedDate,
  setCurrentTeams,
  setActiveClub,
  setCrimeData
) {
  try {
    const res = await getTeamsBySeason(selectedDate.getFullYear());
    const teams = populateClubData(res.data.teams);

    setCurrentTeams(teams);

    let defaultClub = teams[0];

    // set active club and fetch/set crime data
    await setSelectedClub(
      defaultClub,
      setActiveClub,
      selectedDate,
      setCrimeData
    );
  } catch ({ response }) {
    console.log(response);
  }
}

/**
 * Sets the active club and fetchs/sets the crime data for the selected club.
 *
 * @param {Object} selectedClub
 * @param {Function} setActiveClub
 * @param {Date} selectedDate
 * @param {Function} setCrimeData
 */
async function setSelectedClub(
  selectedClub,
  setActiveClub,
  selectedDate,
  setCrimeData
) {
  let club = selectedClub;
  const { result: location } = await PostCodeDataService.getClubLngLat(
    club.postcode
  );
  club = { ...club, location };
  setActiveClub(club);

  await PoliceDataService.setCrimeData(selectedDate, setCrimeData, club);
}

/**
 * Used to populate extra data on each club.
 *
 * @param {Array|Obj} args - Array of Club or one singular club
 */
function populateClubData(args) {
  return Array.isArray(args)
    ? args.map(club => populateClubData(club))
    : {
        ...args,
        postcode: match(args.address)[0],
      };
}

const FootballDataService = {
  fetchTeamData,
  getTeamsBySeason,
  populateClubData,
  setSelectedClub,
};

export default FootballDataService;
