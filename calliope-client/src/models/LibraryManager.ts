import { MDXEditorMethods } from "@mdxeditor/editor";
import React from "react";

class LibraryManager {
  private static instance: LibraryManager | null = null;

  private _editorRef: React.RefObject<MDXEditorMethods> | undefined = undefined;

  private constructor() {}

  public static getInstance(): LibraryManager {
    if (!LibraryManager.instance) {
      LibraryManager.instance = new LibraryManager();
    }
    return LibraryManager.instance;
  }

  public set editorRef(ref: React.RefObject<MDXEditorMethods>) {
    if (!ref?.current) {
      console.warn("EditorRef is not yet initialized.");
    }

    this._editorRef = ref;
  }

  public get editorRef(): React.RefObject<MDXEditorMethods> | undefined {
    if (!this._editorRef) {
      console.warn("EditorRef has not been set in LibraryManager.");
    }
    return this._editorRef;
  }
}

export default LibraryManager;
