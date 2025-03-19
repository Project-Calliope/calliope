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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Mon répertoire",
      url: "#",
      items: [
        {
          title: "Dossier 1",
          url: "#",
          isActive: false,
        },
        {
          title: "Dossier 2",
          url: "#",
        },
      ],
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <NavUser user={data.user} />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Button variant="outline" className="mt-4 mb-2 ml-2 mr-2">
        <SquarePen /> Nouvelle note
      </Button>
      <FileUploadDialog />
      <NavMain items={data.navMain} />
      <SidebarRail />
    </Sidebar>
  );
}
