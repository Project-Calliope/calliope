import axios from "axios";

export default class AudioService {
  static async upload(file: File, fatherRessourceId: string) {
    const formData = new FormData();
    formData.append("audio", file);
    formData.append("ressource_father_id", fatherRessourceId); // Add fatherRessourceId to the form data
    console.log("formData", formData);
    const response = await axios.post("/api/audio/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  }
}
