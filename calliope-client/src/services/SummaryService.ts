import axios from "axios";

export default class SummaryService {
  static async getSummary(ressourceId: string) {
    const response = await axios.get(`/api/summary/${ressourceId}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  }

  static async createSummary(ressourceId: string) {
    const response = await axios.post(
      `/api/summary/create`,
      { ressource_id: ressourceId },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
    );
    return response.data;
  }
}
