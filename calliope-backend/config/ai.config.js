const axios = require("axios");

/**
 * Creates an Axios instance configured to interact with the AI API.
 * The base URL is dynamically constructed using the `API_HOST` and `API_PORT`
 * environment variables.
 *
 * @constant {AxiosInstance} calliopeAiAPI - Pre-configured Axios instance for API requests.
 */

const calliopeAiAPI = axios.create({
  baseURL: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
});

module.exports = calliopeAiAPI;
