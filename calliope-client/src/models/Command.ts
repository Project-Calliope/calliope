import RessourceService from "@/services/RessourceService";
import LibraryManager from "./LibraryManager";
import AudioService from "@/services/AudioService";

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

export class UploadRessourceCommand implements Command {
  private _file: File;
  private _father_ressource_id: string;
  constructor(file: File, father_ressource_id: string) {
    this._file = file;
    this._father_ressource_id = father_ressource_id;
  }

  async execute(): Promise<void> {
    try {
      const response = await AudioService.upload(
        this._file,
        this._father_ressource_id,
      );
      const editorInstance = LibraryManager.getInstance().editorRef?.current;
      if (editorInstance) {
        editorInstance.setMarkdown(response.response.transcript);
        LibraryManager.getInstance().updateLibrary((lib) => {
          lib.currentTitle = response.response.title;
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
