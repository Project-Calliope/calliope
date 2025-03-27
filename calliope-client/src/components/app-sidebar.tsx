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
import NavItem from "@/models/NavItem";

// Exemple
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
      <FileUploadDialog />
      <NavMain navMain={navMain} />
      <SidebarRail />
    </Sidebar>
  );
}
