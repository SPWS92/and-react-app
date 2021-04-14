import axios from "axios";

const PoliceDataProvider = axios.create({
  baseURL: process.env.REACT_APP_POLICE_DATA_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @returns {Object|Promise} data relating to the teams for competition 2021
 */
async function getPoliceDataByLngLat(selectedDate, lng, lat) {
  // Get month
  let month = selectedDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return PoliceDataProvider.get("/crimes-at-location", {
    params: {
      date: `${selectedDate.getFullYear()}-${month}`,
      lng,
      lat,
    },
  });
}

/**
 * Fetches and sets the crime data according to the longitude and latitude.
 *
 * @param {Date} selectedDate
 * @param {Fucntion} setData
 * @param {Object} club
 */
async function setCrimeData(selectedDate, setData, club) {
  const { data: crimeData } = await getPoliceDataByLngLat(
    selectedDate,
    club.location.longitude,
    club.location.latitude
  );
  setData(crimeData);
}

const PoliceDataService = {
  getPoliceDataByLngLat,
  setCrimeData,
};

export default PoliceDataService;
