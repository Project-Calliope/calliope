class Summary {
  private _content: string;

  constructor(content: string) {
    this._content = content;
  }

  public get content(): string {
    return this._content;
  }

  public set content(v: string) {
    this._content = v;
  }
}

export default Summary;
