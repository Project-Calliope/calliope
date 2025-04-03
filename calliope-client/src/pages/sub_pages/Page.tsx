import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
          <AlertDialog>
            <AlertDialogTrigger className="ml-2 mr-2">
              <Button variant="outline" className="w-full">
                Afficher le Transcript original
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Transcript original</AlertDialogTitle>
              <textarea
                disabled
                className="block w-full border p-2 rounded-md"
                rows={10}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </textarea>
              <Button>Générer un résumé</Button>
            </AlertDialogContent>
          </AlertDialog>
        </header>
        <TextEditor library={libraryManager.library} ref={editorRef} />
      </SidebarInset>
    </SidebarProvider>
  );
}
