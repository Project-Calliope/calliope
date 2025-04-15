import RessourceService from "@/services/RessourceService";
import LibraryManager from "./LibraryManager";
import AudioService from "@/services/AudioService";
import TranscriptService from "@/services/TranscriptService";
import Transcript from "./Transcript";
import SummaryService from "@/services/SummaryService";
import Summary from "./Summary";

/**
 * Represents an asynchronous command that can be executed.
 *
 * This interface defines a contract for objects that encapsulate
 * an operation to be performed asynchronously. The `execute` method
 * is expected to return a `Promise` that resolves when the operation
 * is complete.
 */
export interface AsyncCommand {
  execute(): Promise<void>;
}

/**
 * Command to update the navigation tree structure.
 *
 * This command fetches the navigation tree structure from the `RessourceService`
 * and updates the `navMain` property of the library using the `LibraryManager` singleton.
 */
export class UpdateNavMainCommand implements AsyncCommand {
  /**
   * Executes the command to update the navigation main structure.
   *
   * @returns A promise that resolves when the command execution is complete.
   */
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

/**
 * Command to upload a resource asynchronously.
 *
 * This command uploads a file to the server and, if successful, triggers
 * the loading of the associated note using the `LoadNoteCommand`.
 */
export class UploadRessourceCommand implements AsyncCommand {
  private _file: File;
  private _father_ressource_id: string;

  /**
   * Creates an instance of `UploadRessourceCommand`.
   *
   * @param file - The file to be uploaded.
   * @param father_ressource_id - The ID of the parent resource.
   */
  constructor(file: File, father_ressource_id: string) {
    this._file = file;
    this._father_ressource_id = father_ressource_id;
  }

  /**
   * Executes the upload command asynchronously.
   *
   * @throws {Error} If the upload fails or an unknown error occurs.
   */
  async execute(): Promise<void> {
    try {
      const response = await AudioService.upload(
        this._file,
        this._father_ressource_id,
      );
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

/**
 * Command to load a note by its public ID.
 *
 * This command fetches the note content and title from the server and updates
 * the library's current note. It also triggers the loading of the associated transcript.
 */
export class LoadNoteCommand implements AsyncCommand {
  private _public_note_id: string;

  /**
   * Creates an instance of `LoadNoteCommand`.
   *
   * @param public_note_id - The public ID of the note to load.
   */
  constructor(public_note_id: string) {
    this._public_note_id = public_note_id;
  }

  /**
   * Executes the command to load the note.
   *
   * @throws {Error} If the note loading fails or an unknown error occurs.
   */
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
      await new LoadSummaryCommand(this._public_note_id).execute();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

/**
 * Command to create a new folder.
 *
 * This command sends a request to create a folder under a specified parent resource.
 */
export class CreateFolderCommand implements AsyncCommand {
  private _public_father_id: string;
  private _ressource_name: string;

  /**
   * Creates an instance of `CreateFolderCommand`.
   *
   * @param public_father_id - The ID of the parent resource.
   * @param ressource_name - The name of the folder to create.
   */
  constructor(public_father_id: string, ressource_name: string) {
    this._public_father_id = public_father_id;
    this._ressource_name = ressource_name;
  }

  /**
   * Executes the command to create a folder.
   *
   * @throws {Error} If the folder creation fails or an unknown error occurs.
   */
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

/**
 * Command to load a transcript by its public resource ID.
 *
 * This command fetches the transcript content from the server and updates
 * the library's current transcript.
 */
export class LoadTranscriptCommand implements AsyncCommand {
  private _public_ressource_id: string;

  /**
   * Creates an instance of `LoadTranscriptCommand`.
   *
   * @param public_ressource_id - The public ID of the resource to load the transcript for.
   */
  constructor(public_ressource_id: string) {
    this._public_ressource_id = public_ressource_id;
  }

  /**
   * Executes the command to load the transcript.
   *
   * @throws {Error} If the transcript loading fails or an unknown error occurs.
   */
  async execute(): Promise<void> {
    try {
      const result = await TranscriptService.getTranscript(
        this._public_ressource_id,
      );
      LibraryManager.getInstance().updateLibrary((lib) => {
        lib.currentTranscript = result.result
          ? new Transcript(
              result.result.transcript_content,
              result.result.transcript_audioname,
              result.result.transcript_audiosize,
              result.result.public_id,
            )
          : null; // Set to null if no transcript is found
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

/**
 * Command to update the content of a note.
 *
 * This command sends the updated note content to the server.
 */
export class UpdateNoteCommand implements AsyncCommand {
  /**
   * Executes the command to update the note content.
   *
   * @throws {Error} If the note update fails or an unknown error occurs.
   */
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

/**
 * Command to create a new note.
 *
 * This command sends a request to create a note under a specified parent resource.
 */
export class CreateNoteCommand implements AsyncCommand {
  private _ressource_father_id: string;
  private _ressource_name: string;

  /**
   * Creates an instance of `CreateNoteCommand`.
   *
   * @param ressource_father_id - The ID of the parent resource.
   * @param ressource_name - The name of the note to create.
   */
  constructor(ressource_father_id: string, ressource_name: string) {
    this._ressource_father_id = ressource_father_id;
    this._ressource_name = ressource_name;
  }

  /**
   * Executes the command to create a note.
   *
   * @throws {Error} If the note creation fails or an unknown error occurs.
   */
  async execute(): Promise<void> {
    try {
      await RessourceService.createNote(
        this._ressource_father_id,
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

export class CreateNoteSummaryCommand implements AsyncCommand {
  async execute(): Promise<void> {
    try {
      const library = LibraryManager.getInstance().library;
      const editorInstance = LibraryManager.getInstance().editorRef?.current;
      if (editorInstance) {
        await SummaryService.createSummary(
          library.currentNote.public_ressource_id,
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

export class LoadSummaryCommand implements AsyncCommand {
  private _public_ressource_id: string;

  constructor(public_ressource_id: string) {
    this._public_ressource_id = public_ressource_id;
  }

  async execute(): Promise<void> {
    try {
      const result = await SummaryService.getSummary(this._public_ressource_id);
      LibraryManager.getInstance().updateLibrary((lib) => {
        lib.currentSummary = result.summary
          ? new Summary(result.summary.summary)
          : null;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
