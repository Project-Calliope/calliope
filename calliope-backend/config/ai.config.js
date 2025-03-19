const axios = require("axios");

const aiAxios = axios.create({
  baseURL: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
});

module.exports = aiAxios;
