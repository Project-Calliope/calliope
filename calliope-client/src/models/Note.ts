class Note {
  private _content: string;

  constructor(content: string) {
    this._content = content;
  }

  public get content(): string {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }
}

export default Note;
