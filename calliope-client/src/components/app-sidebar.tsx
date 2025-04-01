import * as React from "react";

import { SquarePen } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { Button } from "./ui/button";
import FileUploadDialog from "./upload-file";
import Library from "@/models/Library";
import { MDXEditorMethods } from "@mdxeditor/editor";

// Exemple

export function AppSidebar({
  library,
  editorRef,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  library: Library;
  editorRef: React.RefObject<MDXEditorMethods | null>;
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <NavUser />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Button variant="outline" className="mt-4 mb-2 ml-2 mr-2">
        <SquarePen /> Nouvelle note
      </Button>
      <FileUploadDialog editorRef={editorRef} />
      <NavMain navMain={library.navMain} />
      <SidebarRail />
    </Sidebar>
  );
}
