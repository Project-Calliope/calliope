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
import {
  CreateFolderCommand,
  UpdateNavMainCommand,
} from "@/models/AsyncCommand";
import { ToastSuccessErrorCommandDecorator } from "@/models/AsyncCommandDecorator";

const CreateFolderDialog = ({
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
      const createFolderCommand = new CreateFolderCommand(
        fatherRessourceId,
        ressourceName,
      );

      const decoratedCommand = new ToastSuccessErrorCommandDecorator(
        createFolderCommand,
        "Le dossier a été créé avec succès",
        "Échec lors de la création du dossier",
      );
      await decoratedCommand.execute();
      await new UpdateNavMainCommand().execute();
    }

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
            value={ressourceName}
            placeholder="Nom du dossier"
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

export default CreateFolderDialog;
