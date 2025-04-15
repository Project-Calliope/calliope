/**
 * Represents a Note with content, title, and a public resource ID.
 * This class provides getters and setters for managing the note's properties.
 */
class Note {
  private _content: string;
  private _title: string;
  private _public_ressource_id: string;

  constructor(content: string, title: string, public_ressource_id: string) {
    this._content = content;
    this._title = title;
    this._public_ressource_id = public_ressource_id;
  }

  public get content(): string {
    return this._content;
  }

  public get title(): string {
    return this._title;
  }

  public get public_ressource_id(): string {
    return this._public_ressource_id;
  }

  public set content(content: string) {
    this._content = content;
  }

  public set title(v: string) {
    this._title = v;
  }

  public set public_ressource_id(v: string) {
    this._public_ressource_id = v;
  }
}

export default Note;
