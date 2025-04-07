class Transcript {
  private _content: string;
  private _audioname: string;
  private _audiosize: number;
  private _public_id: string;

  constructor(
    content: string,
    audioname: string,
    audiosize: number,
    public_id: string,
  ) {
    this._content = content;
    this._audioname = audioname;
    this._audiosize = audiosize;
    this._public_id = public_id;
  }

  public get content(): string {
    return this._content;
  }

  public get audioname(): string {
    return this._audioname;
  }

  public get audiosize(): number {
    return this._audiosize;
  }

  public get public_id(): string {
    return this._public_id;
  }

  public set content(v: string) {
    this._content = v;
  }

  public set audioname(v: string) {
    this._audioname = v;
  }

  public set audiosize(v: number) {
    this._audiosize = v;
  }

  public set public_id(v: string) {
    this._public_id = v;
  }
}

export default Transcript;
