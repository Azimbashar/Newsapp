const axios = require("axios");

exports.handler = async (event) => {
  const query = event.queryStringParameters.q || "India";
  const API_KEY = process.env.GNEWS_API_KEY;

  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${API_KEY}`
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.response?.data || error.message,
      }),
    };
  }
};