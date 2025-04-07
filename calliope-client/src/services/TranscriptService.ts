import axios from "axios";

export default class TranscriptService {
  static async getTranscript(ressource_id: string) {
    console.log(localStorage.getItem("token"));
    try {
      const response = await axios.get(`api/transcript/id`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
        params: {
          ressource_id,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
