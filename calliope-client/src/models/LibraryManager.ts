import { MDXEditorMethods } from "@mdxeditor/editor";
import Library from "@/models/Library";

class LibraryManager {
  private static instance: LibraryManager | null = null;
  private _editorRef: React.RefObject<MDXEditorMethods> | undefined = undefined;
  private _library: Library = new Library();
  private listeners: (() => void)[] = []; // Liste des callbacks pour les re-renders

  private constructor() {}

  public static getInstance(): LibraryManager {
    if (!LibraryManager.instance) {
      LibraryManager.instance = new LibraryManager();
    }
    return LibraryManager.instance;
  }

  public set editorRef(ref: React.RefObject<MDXEditorMethods>) {
    this._editorRef = ref;
  }

  public get editorRef(): React.RefObject<MDXEditorMethods> | undefined {
    return this._editorRef;
  }

  public get library(): Library {
    return this._library;
  }

  public set library(lib: Library) {
    this._library = lib;
    this.notifyListeners(); // Déclenche un re-render
  }

  public updateLibrary(updateFn: (lib: Library) => void) {
    updateFn(this._library);
    this.notifyListeners(); // Déclenche un re-render
  }

  private notifyListeners() {
    this.listeners.forEach((callback) => callback());
  }

  public subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }
}

export default LibraryManager;
