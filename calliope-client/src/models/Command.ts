import RessourceService from "@/services/RessourceService";
import LibraryManager from "./LibraryManager";
import AudioService from "@/services/AudioService";

export interface Command {
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

export class LoadNoteCommand implements Command {
  private _public_note_id: string;

  constructor(public_note_id: string) {
    this._public_note_id = public_note_id;
  }

  async execute(): Promise<void> {
    try {
      const response = await RessourceService.getNote(this._public_note_id);
      const noteContent = response?.note_content;
      const noteTitle = response?.note_title;

      const editorInstance = LibraryManager.getInstance().editorRef?.current;

      if (noteContent && editorInstance) {
        editorInstance.setMarkdown(String(noteContent));
      }

      if (noteTitle) {
        LibraryManager.getInstance().updateLibrary((lib) => {
          lib.currentTitle = noteTitle; // Mettre à jour le titre
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
