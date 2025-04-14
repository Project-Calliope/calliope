import { MDXEditorMethods } from "@mdxeditor/editor";
import Library from "@/models/Library";
import { Observer, Subject } from "@/models/Observer";

class LibraryManager implements Subject {
  private static instance: LibraryManager | null = null;
  private _editorRef: React.RefObject<MDXEditorMethods> | undefined = undefined;
  private _library: Library = new Library();
  private observers: Observer[] = [];

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
    this.notifyObservers(); // Déclenche un re-render
  }

  public updateLibrary(updateFn: (lib: Library) => void) {
    updateFn(this._library);
    this.notifyObservers(); // Déclenche un re-render
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => observer.update());
  }

  // Subject methods
  public subscribe(observer: Observer): () => void {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer);
    };
  }
}

export default LibraryManager;
