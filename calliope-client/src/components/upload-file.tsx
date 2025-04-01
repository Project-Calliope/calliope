import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { UpdateNavMainCommand, UploadRessourceCommand } from "@/models/Command";

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
      onClose(); // Close the dialog after successful upload
      console.log("Fichier sélectionné :", selectedFile.name);
      await toast.promise(
        (async () => {
          await new UploadRessourceCommand(
            selectedFile,
            fatherRessourceId,
          ).execute();
          await new UpdateNavMainCommand().execute();
        })(),
        {
          loading: "Transcription du fichier audio en cours...",
          success: "Transcription réalisée avec succès !",
          error: (err) => err.message || "Échec de la transcription",
        },
      );
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
