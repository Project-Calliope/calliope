import { AudioLinesIcon, FolderPlus, Plus, SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuAction } from "./ui/sidebar";

interface NavItemsActionsProps {
  onDialogOpen: (type: string) => void;
}

const NavItemsActions = ({ onDialogOpen }: NavItemsActionsProps) => {
  const actions = [
    {
      label: "Nouveau dossier",
      icon: <FolderPlus />,
      onClick: () => onDialogOpen("folder"),
    },
    {
      label: "Nouvelle note",
      icon: <SquarePen />,
      onClick: () => onDialogOpen("note"),
    },
    {
      label: "Créer une note à partir d'un audio",
      icon: <AudioLinesIcon />,
      onClick: () => onDialogOpen("audio"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction className="hover:bg-gray-200">
          <Plus />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onClick={action.onClick}>
            {action.icon}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavItemsActions;
