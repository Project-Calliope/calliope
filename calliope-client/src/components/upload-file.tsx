import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  UpdateNavMainCommand,
  UploadRessourceCommand,
} from "@/models/AsyncCommand";
import { ToastPromiseCommandDecorator } from "@/models/AsyncCommandDecorator";

const FileUploadDialog = ({
  fatherRessourceId,
  isOpen,
  onClose,
}: {
  fatherRessourceId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      onClose();
      const uploadCommand = new UploadRessourceCommand(
        selectedFile,
        fatherRessourceId,
      );
      const decoratedCommand = new ToastPromiseCommandDecorator(
        uploadCommand,
        "Transcription du fichier audio en cours...",
        "Transcription réalisée avec succès !",
        "Échec de la transcription",
      );

      try {
        await decoratedCommand.execute();
        await new UpdateNavMainCommand().execute();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Envoyer un fichier</AlertDialogTitle>
        <AlertDialogDescription>Sélection</AlertDialogDescription>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="audio/mpeg, audio/wav, audio/mp3, audio/m4a, audio/x-wav"
            onChange={handleFileChange}
            className="block w-full border p-2 rounded-md"
          />
          <AlertDialogFooter className="flex justify-end gap-2 mt-2">
            <Button type="submit" disabled={!selectedFile}>
              Envoyer
            </Button>
            <AlertDialogCancel onClick={onClose}>Annuler</AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FileUploadDialog;
