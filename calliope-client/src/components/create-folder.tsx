import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateFolderDialog = ({
  fatherRessourceId,
  isOpen,
  onClose,
}: {
  fatherRessourceId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(fatherRessourceId);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Créer un nouveau dossier</AlertDialogTitle>
        <AlertDialogDescription>Sélection</AlertDialogDescription>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="block w-full border p-2 rounded-md"
            placeholder="Nom du dossier"
          />
          <AlertDialogFooter className="flex justify-end gap-2 mt-2">
            <Button type="submit">Créer</Button>
            <AlertDialogCancel onClick={onClose}>Annuler</AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateFolderDialog;
