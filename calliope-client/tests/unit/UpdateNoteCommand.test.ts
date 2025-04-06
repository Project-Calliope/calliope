import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { UpdateNoteCommand } from "@/models/AsyncCommand";
import LibraryManager from "@/models/LibraryManager";
import RessourceService from "@/services/RessourceService";
import type { MDXEditorMethods } from "@mdxeditor/editor";

describe("UpdateNoteCommand", () => {
  const mockPublicRessourceId = "note-123";
  const mockMarkdown = "# Updated content";

  let mockEditorRef: React.RefObject<MDXEditorMethods>;

  beforeEach(() => {
    // Crée un faux editorRef avec getMarkdown()
    mockEditorRef = {
      current: {
        getMarkdown: vi.fn().mockReturnValue(mockMarkdown),
      },
    } as unknown as React.RefObject<MDXEditorMethods>;

    // Mock de LibraryManager.getInstance()
    vi.spyOn(LibraryManager, "getInstance").mockReturnValue({
      editorRef: mockEditorRef,
      library: {
        currentNote: {
          public_ressource_id: mockPublicRessourceId,
        },
      },
    } as unknown as LibraryManager);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("devrait appeler RessourceService.updateNote avec le bon contenu", async () => {
    const updateMock = vi
      .spyOn(RessourceService, "updateNote")
      .mockResolvedValue(undefined);

    const command = new UpdateNoteCommand();
    await command.execute();

    expect(updateMock).toHaveBeenCalledWith(
      mockPublicRessourceId,
      mockMarkdown,
    );
  });

  it("ne fait rien si editorRef.current est null", async () => {
    vi.spyOn(LibraryManager, "getInstance").mockReturnValue({
      editorRef: { current: null },
      library: {
        currentNote: {
          public_ressource_id: mockPublicRessourceId,
        },
      },
    } as unknown as LibraryManager);

    const updateMock = vi
      .spyOn(RessourceService, "updateNote")
      .mockResolvedValue(undefined);

    const command = new UpdateNoteCommand();
    await command.execute();

    expect(updateMock).not.toHaveBeenCalled();
  });

  it("lève une erreur personnalisée si RessourceService échoue", async () => {
    vi.spyOn(RessourceService, "updateNote").mockRejectedValue(
      new Error("Erreur réseau"),
    );

    const command = new UpdateNoteCommand();

    await expect(command.execute()).rejects.toThrow("Erreur réseau");
  });

  it("lève une erreur générique si une erreur inconnue est levée", async () => {
    vi.spyOn(RessourceService, "updateNote").mockRejectedValue(
      "erreur inconnue",
    );

    const command = new UpdateNoteCommand();

    await expect(command.execute()).rejects.toThrow(
      "An unknown error occurred",
    );
  });
});
