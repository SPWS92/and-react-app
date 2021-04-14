import axios from "axios";

const PostCodeProvider = axios.create({
  baseURL: process.env.REACT_APP_POSTCODE_DATA_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @returns {Object|Promise} data relating to the teams for competition 2021
 */
async function getClubLngLat(postcode) {
  const { data } = await PostCodeProvider.get(`/postcodes/${postcode}`);
  return data;
}

const PostCodeDataService = {
  getClubLngLat,
};

export default PostCodeDataService;
