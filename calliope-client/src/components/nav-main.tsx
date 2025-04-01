"use client";

import { ChevronRight, Folder, NotebookText } from "lucide-react";
import NavItem from "@/models/NavItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import FileUploadDialog from "./upload-file";
import RessourceService from "@/services/RessourceService";
import NavItemsActions from "./nav-items-actions";
import LibraryManager from "@/models/LibraryManager";

export function NavMain({ navMain }: { navMain: NavItem }) {
  return (
    <SidebarGroup className="w-full">
      <SidebarMenuItem className="w-full group">
        <SidebarMenuButton className="hover:bg-transparent border-b border-gray-300 rounded-none">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex items-center">
              <span className="font-bold">Répertoire</span>
            </div>
            <NavItemsActions />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
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

  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const setCurrentMarkdown = async (public_ressource_id: string) => {
    try {
      const response = await RessourceService.getNote(public_ressource_id);
      const noteContent = response?.note_content;
      const editorInstance = LibraryManager.getInstance().editorRef?.current;
      if (noteContent && editorInstance) {
        editorInstance.setMarkdown(String(noteContent));
      }
      const noteTitle = response?.note_title;
      if (noteTitle) {
        LibraryManager.getInstance().updateLibrary((lib) => {
          lib.currentTitle = noteTitle; // Mettre à jour le titre
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                <NavItemsActions
                  onUploadDialogOpen={() => setOpenUploadDialog(true)}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="w-full">
              <div className="w-full">
                {item.items?.map((subItem) => (
                  <NavItemComponent
                    key={`${subItem.title}-${Math.random()}`}
                    item={subItem}
                    level={level + 1}
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
      <SidebarMenuItem className="w-full group">
        <SidebarMenuButton
          asChild
          className="w-full flex items-center justify-start ml-1"
          onClick={() => {
            setCurrentMarkdown(item.url);
          }}
        >
          <div className="flex items-center gap-2" style={{ paddingLeft }}>
            <NotebookText className="h-4 l-4" />
            <span>{item.title}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
}
