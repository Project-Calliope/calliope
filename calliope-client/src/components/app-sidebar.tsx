import * as React from "react";


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
import Library from "@/models/Library";

// Exemple

export function AppSidebar({
  library,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  library: Library;
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

      <NavMain navMain={library.navMain} />
      <SidebarRail />
    </Sidebar>
  );
}
