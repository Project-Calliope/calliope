import axios from "axios";

export default class AudioService {
  static async upload(file: File) {
    const formData = new FormData();
    formData.append("audio", file);
    console.log("formData", formData);
    const response = await axios.post("/api/audio/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}
