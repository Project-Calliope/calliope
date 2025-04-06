import { describe, it, expect, vi } from "vitest";
import LibraryManager from "@/models/LibraryManager";
import Library from "@/models/Library";

describe("LibraryManager", () => {
  it("should be a singleton", () => {
    const instance1 = LibraryManager.getInstance();
    const instance2 = LibraryManager.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("should update the library", () => {
    const instance = LibraryManager.getInstance();
    const newTitle = "New Library Title";
    instance.updateLibrary((lib) => {
      lib.currentTitle = newTitle;
    });
    expect(instance.library.currentTitle).toBe(newTitle);
  });

  it("should subscribe to updates", () => {
    const instance = LibraryManager.getInstance();
    const callback = vi.fn();
    const unsubscribe = instance.subscribe(callback);

    instance.updateLibrary((lib) => {
      lib.currentTitle = "Updated Title";
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unsubscribe();

    instance.updateLibrary((lib) => {
      lib.currentTitle = "Another Update";
    });

    expect(callback).toHaveBeenCalledTimes(1); // Callback should not be called again
  });

  it("should set and get editorRef", () => {
    const instance = LibraryManager.getInstance();
    const mockRef = {
      current: {
        getMarkdown: vi.fn(),
        setMarkdown: vi.fn(),
        insertMarkdown: vi.fn(),
        focus: vi.fn(),
      },
    };
    instance.editorRef = mockRef;
    expect(instance.editorRef).toBe(mockRef);
  });

  it("should update the library with a callback", () => {
    const instance = LibraryManager.getInstance();
    const newLibrary = new Library();
    instance.library = newLibrary;
    expect(instance.library).toBe(newLibrary);
  });
});
