import axios from "axios";

const PostCodeProvider = axios.create({
  baseURL: process.env.REACT_APP_POSTCODE_DATA_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches the location data for the club.
 *
 * @returns {Object|Promise} data relating to the teams for competition 2021
 */
async function getClubLocationData(postcode) {
  const { data } = await PostCodeProvider.get(`/postcodes/${postcode}`);
  return data;
}

const PostCodeDataService = {
  getClubLocationData,
};

export default PostCodeDataService;
