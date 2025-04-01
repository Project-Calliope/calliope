"use client";

import {
  AudioLinesIcon,
  ChevronRight,
  Folder,
  FolderPlus,
  NotebookText,
  Plus,
  SquarePen,
} from "lucide-react";
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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import FileUploadDialog from "./upload-file";
import { MDXEditorMethods } from "@mdxeditor/editor";

export function NavMain({
  navMain,
  editorRef,
}: {
  navMain: NavItem;
  editorRef: React.RefObject<MDXEditorMethods | null>;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Répertoire</SidebarGroupLabel>
      <SidebarMenu className="w-full">
        {navMain.items.map((item) => (
          <NavItemComponent
            key={item.title}
            item={item}
            level={0}
            editorRef={editorRef}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Composant récursif pour afficher les dossiers et les notes
function NavItemComponent({
  item,
  level,
  editorRef,
}: {
  item: NavItem;
  level: number;
  editorRef: React.RefObject<MDXEditorMethods | null>;
}) {
  const [isOpen, setIsOpen] = useState(item.isActive); // Gérer l'ouverture de chaque dossier
  const paddingLeft = `${level * 16}px`; // Indentation pour les éléments imbriqués

  const handleToggle = () => setIsOpen(!isOpen);

  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const closeUploadDialog = async () => {
    setOpenUploadDialog(false);
  };

  if (item.nature === "dossier") {
    return (
      <Collapsible
        asChild
        open={isOpen}
        onOpenChange={handleToggle}
        className="w-full"
      >
        <div>
          {openUploadDialog && (
            <FileUploadDialog
              editorRef={editorRef}
              fatherRessourceId={item.url}
              isOpen={openUploadDialog}
              onClose={closeUploadDialog}
            />
          )}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction className="hover:bg-gray-200">
                      <Plus />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem>
                      <FolderPlus />
                      <span>Nouveau dossier</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SquarePen />
                      <span>Nouvelle note</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenUploadDialog(true)}>
                      <AudioLinesIcon />
                      <span>Créer une note à partir d'un audio</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="w-full">
              <div className="w-full">
                {item.items?.map((subItem) => (
                  <NavItemComponent
                    key={subItem.title}
                    item={subItem}
                    level={level + 1}
                    editorRef={editorRef}
                  />
                ))}
              </div>
            </CollapsibleContent>
          </SidebarMenuItem>
        </div>
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
            <NotebookText />
            <span>{item.title}</span>
          </a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }
}
