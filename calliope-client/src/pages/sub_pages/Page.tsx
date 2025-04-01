import { AppSidebar } from "@/components/app-sidebar";

import { Button } from "@/components/ui/button";
import TextEditor from "@/components/text-editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const displayAlert = () => {
    console.log("Gabin");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
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
              <Button onClick={displayAlert}>Générer un résumé</Button>
            </AlertDialogContent>
          </AlertDialog>
        </header>
        <TextEditor md_text={markdown} />
      </SidebarInset>
    </SidebarProvider>
  );
}
