const axios = require("axios");

const API_KEY = "B69I69O1YWXYNPHI";
const BASE_URL = "https://www.alphavantage.co/query";

// Function to fetch Top Gainers using axios
export const getTopGainersAndLosers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Top Gainers:", error);
    throw error;
  }
};
