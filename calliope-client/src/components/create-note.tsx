import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SetStateAction, useState } from "react";
import { CreateNoteCommand, UpdateNavMainCommand } from "@/models/AsyncCommand";
import { ToastSuccessErrorCommandDecorator } from "@/models/AsyncCommandDecorator";

const CreateNoteDialog = ({
  fatherRessourceId,
  isOpen,
  onClose,
}: {
  fatherRessourceId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [ressourceName, setRessourceName] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleRessourceNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRessourceName(event.target.value);
    if (event.target.value.length == 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(ressourceName.length == 0)) {
      onClose();
      const createFolderCommand = new CreateNoteCommand(
        fatherRessourceId,
        ressourceName,
      );

      const decoratedCommand = new ToastSuccessErrorCommandDecorator(
        createFolderCommand,
        "La note a été créé avec succès",
        "Échec lors de la création de la note",
      );
      await decoratedCommand.execute();
      await new UpdateNavMainCommand().execute();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Créer une nouvelle note</AlertDialogTitle>
        <AlertDialogDescription>Sélection</AlertDialogDescription>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="block w-full border p-2 rounded-md"
            value={ressourceName}
            placeholder="Nom de la note"
            onChange={handleRessourceNameChange}
          />
          <AlertDialogFooter className="flex justify-end gap-2 mt-2">
            <Button type="submit" disabled={disabled}>
              Créer
            </Button>
            <AlertDialogCancel onClick={onClose}>Annuler</AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateNoteDialog;
