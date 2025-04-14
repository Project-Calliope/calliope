class NavItem {
  private _title: string;
  private _nature: "dossier" | "note";
  private _url: string;
  private _isActive: boolean;
  private _items: NavItem[];

  constructor(
    title: string,
    nature: "dossier" | "note",
    url: string,
    isActive: boolean = false,
    items: NavItem[] = [],
  ) {
    this._title = title;
    this._nature = nature;
    this._url = url;
    this._isActive = isActive;
    this._items = items;
  }

  addItems(item: NavItem) {
    this._items.push(item);
  }

  get title() {
    return this._title;
  }

  get nature() {
    return this._nature;
  }

  get url() {
    return this._url;
  }

  get isActive() {
    return this._isActive;
  }

  get items() {
    return this._items;
  }
}

export default NavItem;
