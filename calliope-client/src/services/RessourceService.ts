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
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
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
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
  static async createFolder(public_father_id: string, ressource_name: string) {
    try {
      const response = await axios.post(
        "api/ressource/folder",
        {
          public_father_id: public_father_id,
          ressource_name: ressource_name,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  static async updateNote(ressource_id: string, content: string) {
    try {
      await axios.put(
        "api/ressource/note",
        {
          ressource_id: ressource_id,
          content: content,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
