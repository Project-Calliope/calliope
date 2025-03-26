"use client";

import { ChevronRight, Folder, File } from "lucide-react";
import NavItem from "@/models/NavItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

export function NavMain({ navMain }: { navMain: NavItem }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Répertoire</SidebarGroupLabel>
      <SidebarMenu className="w-full">
        {navMain.items.map((item) => (
          <NavItemComponent key={item.title} item={item} level={0} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Composant récursif pour afficher les dossiers et les notes
function NavItemComponent({ item, level }: { item: NavItem; level: number }) {
  const [isOpen, setIsOpen] = useState(item.isActive); // Gérer l'ouverture de chaque dossier
  const paddingLeft = `${level * 16}px`; // Indentation pour les éléments imbriqués

  const handleToggle = () => setIsOpen(!isOpen);

  if (item.nature === "dossier") {
    return (
      <Collapsible
        asChild
        open={isOpen}
        onOpenChange={handleToggle}
        className="w-full"
      >
        <SidebarMenuItem className="w-full group">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              className="w-full flex items-center justify-between"
              style={{ paddingLeft }}
            >
              <div className="flex items-center gap-2">
                <Folder className="h-4 l-4" />
                <span>{item.title}</span>
              </div>
              <ChevronRight
                className={`ml-auto transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`} // Applique l'animation de rotation
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="w-full">
            <div className="w-full">
              {item.items?.map((subItem) => (
                <NavItemComponent
                  key={subItem.title}
                  item={subItem}
                  level={level + 1}
                />
              ))}
            </div>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  } else {
    return (
      <SidebarMenuSubItem className="w-full">
        <SidebarMenuSubButton asChild className="w-full">
          <a
            href={item.url}
            className="block flex items-center gap-2 w-full"
            style={{ paddingLeft }}
          >
            <File />
            <span>{item.title}</span>
          </a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }
}
