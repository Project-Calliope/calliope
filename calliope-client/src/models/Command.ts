import RessourceService from "@/services/RessourceService";
import LibraryManager from "./LibraryManager";

interface Command {
  execute(): void;
}

export class UpdateNavMainCommand implements Command {
  constructor() {}

  async execute(): Promise<void> {
    try {
      const response = await RessourceService.getArborescence();
      if (response) {
        LibraryManager.getInstance().updateLibrary((lib) => {
          lib.navMain = response;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
