import { useEffect, useRef, useState } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import TextEditor from "@/components/text-editor";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Note from "@/models/Note";
import { MDXEditorMethods } from "@mdxeditor/editor";
import NavItem from "@/models/NavItem";
import RessourceService from "@/services/RessourceService";
import LibraryManager from "@/models/LibraryManager";
import TranscriptDialog from "@/components/transcript-dialog";

export default function Page() {
  const libraryManager = LibraryManager.getInstance();
  const editorRef = useRef<MDXEditorMethods>(null);

  // Permet de forcer un re-render quand la library change
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = libraryManager.subscribe(() => {
      const library = LibraryManager.getInstance().library;
      forceUpdate((prev) => prev + 1);
      const editorInstance = LibraryManager.getInstance().editorRef?.current;
      if (editorInstance) {
        editorInstance.setMarkdown(String(library.currentNote.content));
      }
    });

    libraryManager.library.currentTitle = "Default Title";
    libraryManager.library.currentNote = new Note(
      "# Markdown Example",
      "Default Title",
      "",
    );
    libraryManager.library.navMain = new NavItem(
      "Root",
      "dossier",
      "#",
      true,
      [],
    );

    if (editorRef.current && libraryManager.library.currentNote) {
      editorRef.current.setMarkdown(libraryManager.library.currentNote.content);
    }

    getArborescence();

    return () => {
      unsubscribe(); // Se désinscrire pour éviter les fuites mémoire
    };
  }, [editorRef]);

  const getArborescence = async () => {
    try {
      const result = await RessourceService.getArborescence();
      if (result) {
        libraryManager.updateLibrary((lib) => {
          lib.navMain = result;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar library={libraryManager.library} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {libraryManager.library.currentNote.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <TranscriptDialog library={libraryManager.library} />
        </header>
        <TextEditor library={libraryManager.library} ref={editorRef} />
      </SidebarInset>
    </SidebarProvider>
  );
}
