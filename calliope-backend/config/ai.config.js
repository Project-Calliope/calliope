const axios = require("axios");

const calliopeAiAPI = axios.create({
  baseURL: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
});

module.exports = calliopeAiAPI;
