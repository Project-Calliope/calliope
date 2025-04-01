import NavItem from "@/models/NavItem";
import NavItemAdapter from "@/models/NavItemAdapter";
import axios from "axios";

export default class RessourceService {
  static async getArborescence(): Promise<NavItem | null> {
    try {
      const response = await axios.get("api/ressource/arborescence", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return NavItemAdapter.convertToNavItems(response.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getNote(
    ressource_id: string,
  ): Promise<{ note_title: string; note_content: string } | null> {
    console.log(localStorage.getItem("token"));
    try {
      const response = await axios.get(`api/ressource/note`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
        params: {
          ressource_id,
        },
      });
      return {
        note_title: response.data.note.note_title,
        note_content: response.data.note.note_content,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
