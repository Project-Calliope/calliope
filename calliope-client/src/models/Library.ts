import NavItem from "./NavItem";
import Note from "./Note";
import Transcript from "./Transcript";

class Library {
  /**
   * Represents a library that contains notes and transcripts.
   */

  /**
   * The current note being edited or viewed.
   */
  private _currentNote: Note = new Note("Default content", "Default title", "");
  /**
   * The main navigation item for the library.
   */
  private _navMain: NavItem = new NavItem("Main", "dossier", "/main");
  /**
   * The current transcript associated with the note.
   */
  private _currentTranscript: Transcript | null = null;
  /**
   * The current title of the note.
   */
  private _currentTitle: string = "Default title";

  constructor() {}

  public get currentNote(): Note {
    return this._currentNote;
  }

  public set currentNote(note: Note) {
    this._currentNote = note;
  }

  public get navMain(): NavItem {
    return this._navMain;
  }

  public set navMain(navMain: NavItem) {
    this._navMain = navMain;
  }

  public get currentTranscript(): Transcript | null {
    return this._currentTranscript;
  }

  public set currentTranscript(transcript: Transcript | null) {
    this._currentTranscript = transcript;
  }

  public get currentTitle(): string {
    return this._currentTitle;
  }

  public set currentTitle(title: string) {
    this._currentTitle = title;
  }
}

export default Library;
