import RessourceService from "@/services/RessourceService";
import LibraryManager from "./LibraryManager";
import AudioService from "@/services/AudioService";
import TranscriptService from "@/services/TranscriptService";
import Transcript from "./Transcript";

export interface AsyncCommand {
  execute(): Promise<void>;
}

export class UpdateNavMainCommand implements AsyncCommand {
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

export class UploadRessourceCommand implements AsyncCommand {
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
      console.log(response);
      if (response.public_ressource_id) {
        await new LoadNoteCommand(response.public_ressource_id).execute();
      }

      if (!response.success) {
        throw new Error(response.data.message);
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

export class LoadNoteCommand implements AsyncCommand {
  private _public_note_id: string;

  constructor(public_note_id: string) {
    this._public_note_id = public_note_id;
  }

  async execute(): Promise<void> {
    try {
      const response = await RessourceService.getNote(this._public_note_id);
      const noteContent = response?.note_content;
      const noteTitle = response?.note_title;

      if (noteContent !== undefined && noteTitle) {
        LibraryManager.getInstance().updateLibrary((lib) => {
          lib.currentNote.content = noteContent;
          lib.currentNote.title = noteTitle;
          lib.currentNote.public_ressource_id = this._public_note_id;
        });
      }

      await new LoadTranscriptCommand(this._public_note_id).execute();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

export class CreateFolderCommand implements AsyncCommand {
  private _public_father_id: string;
  private _ressource_name: string;

  constructor(public_father_id: string, ressource_name: string) {
    this._public_father_id = public_father_id;
    this._ressource_name = ressource_name;
  }

  async execute(): Promise<void> {
    try {
      await RessourceService.createFolder(
        this._public_father_id,
        this._ressource_name,
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

export class LoadTranscriptCommand implements AsyncCommand {
  private _public_ressource_id: string;

  constructor(public_ressource_id: string) {
    this._public_ressource_id = public_ressource_id;
  }

  async execute(): Promise<void> {
    try {
      const result = await TranscriptService.getTranscript(
        this._public_ressource_id,
      );
      console.log(result);
      LibraryManager.getInstance().updateLibrary((lib) => {
        lib.currentTranscript = result.result
          ? new Transcript(
              result.result.transcript_content,
              result.result.transcript_audioname,
              result.result.transcript_audiosize,
              result.result.public_id,
            )
          : null; // Mettre null au lieu de undefined
      });

      console.log(LibraryManager.getInstance().library.currentTranscript);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

export class UpdateNoteCommand implements AsyncCommand {
  constructor() {}

  async execute(): Promise<void> {
    try {
      const library = LibraryManager.getInstance().library;
      const editorInstance = LibraryManager.getInstance().editorRef?.current;
      if (editorInstance) {
        await RessourceService.updateNote(
          library.currentNote.public_ressource_id,
          editorInstance.getMarkdown(),
        );
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

export class CreateNoteCommand implements AsyncCommand {
  private _ressource_father_id: string;
  private _ressource_name: string;

  constructor(ressource_father_id: string, ressource_name: string) {
    this._ressource_father_id = ressource_father_id;
    this._ressource_name = ressource_name;
  }

  async execute(): Promise<void> {
    try {
      const data = await RessourceService.createNote(
        this._ressource_father_id,
        this._ressource_name,
      );
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
