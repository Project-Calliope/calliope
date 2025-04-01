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
import Library from "@/models/Library";
import Note from "@/models/Note";
import { MDXEditorMethods } from "@mdxeditor/editor";
import NavItem from "@/models/NavItem";
import RessourceService from "@/services/RessourceService";
import LibraryManager from "@/models/LibraryManager";

export default function Page() {
  const markdown = `# Markdown Text
  ## Subtitle
  ### Subsubtitle

  - List item 1
  - List item 2

  **Bold text**
  *Italic text*
  [Link text](https://example.com)
  `;

  const navMain = new NavItem("Root", "dossier", "#", true, [
    new NavItem("Folder 1", "dossier", "#", false, [
      new NavItem("Note 1", "note", "#"),
      new NavItem("Note 2", "note", "#"),
    ]),
    new NavItem("Folder 2", "dossier", "#", false, [
      new NavItem("Folder 3", "dossier", "#", false, [
        new NavItem("Folder 4", "dossier", "#", false, [
          new NavItem("Note 3", "note", "#"),
          new NavItem("Note 4", "note", "#"),
        ]),
      ]),
    ]),
  ]);

  const [library, setLibrary] = useState(new Library());

  const editorRef = useRef<MDXEditorMethods>(null);
  useEffect(() => {
    setLibrary(() => {
      const newLibrary = new Library();
      newLibrary.currentTitle = "Test";
      newLibrary.currentNote = new Note(markdown);
      newLibrary.navMain = navMain;
      return newLibrary;
    });

    const currentEditorRef = LibraryManager.getInstance().editorRef;
    if (currentEditorRef && currentEditorRef.current && library.currentNote) {
      currentEditorRef.current.setMarkdown(library.currentNote.content);
    }

    getArborescence();
  }, [editorRef]);

  const getArborescence = async () => {
    try {
      const result = await RessourceService.getArborescence();
      if (result) {
        setLibrary((prev) => {
          const newLibrary = new Library();
          newLibrary.currentTitle = prev.currentTitle;
          newLibrary.currentNote = prev.currentNote;
          newLibrary.navMain = result;
          return newLibrary;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar library={library} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{library.currentTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="ml-2 mr-2">
              <Button variant="outline" className="w-full">
                Afficher le Transcript orginal
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Transcript orginal</AlertDialogTitle>
              <textarea
                disabled
                className="block w-full border p-2 rounded-md"
                rows={10}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </textarea>
              <Button>Générer un résumé</Button>
            </AlertDialogContent>
          </AlertDialog>
        </header>
        <TextEditor library={library} ref={editorRef} />
      </SidebarInset>
    </SidebarProvider>
  );
}
