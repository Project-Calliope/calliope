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
}
