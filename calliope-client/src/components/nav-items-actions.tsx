import { AudioLinesIcon, FolderPlus, Plus, SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuAction } from "./ui/sidebar";

interface NavItemsActionsProps {
  onUploadDialogOpen?: () => void;
}

const NavItemsActions = ({ onUploadDialogOpen }: NavItemsActionsProps) => {
  return (
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
        <DropdownMenuItem onClick={onUploadDialogOpen}>
          <AudioLinesIcon />
          <span>Créer une note à partir d'un audio</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavItemsActions;
