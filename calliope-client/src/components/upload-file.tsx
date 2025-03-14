import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import AudioService from "../services/AudioService";
import toast from "react-hot-toast";

const FileUploadDialog = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Fichier sélectionné :", selectedFile.name);
      try {
        const response = await AudioService.upload(selectedFile);
        console.log("Réponse de l'API :", response);
        setIsDialogOpen(false); // Fermer la boîte de dialogue après l'envoi
        toast.success("Fichier envoyé avec succès !");
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Erreur lors de l'envoi du fichier : " + error.message);
          console.error("Erreur lors de l'envoi du fichier :", error);
        } else {
          toast.error("Erreur lors de l'envoi du fichier");
          console.error("Erreur lors de l'envoi du fichier :", error);
        }
      }
    }
  };

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
    >
      {/* Bouton pour ouvrir la modale */}
      <Dialog.Trigger>
        <Button onClick={() => setIsDialogOpen(true)}>
          Téléverser un fichier audio
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        className="p-4 bg-white rounded-lg shadow-lg"
        style={{ zIndex: 1 }}
      >
        <Dialog.Title className="text-xl font-bold">
          Envoyer un fichier
        </Dialog.Title>
        <Dialog.Description>
          Sélectionnez un fichier à transcrire.
        </Dialog.Description>

        {/* Formulaire d'upload */}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="file"
            accept="audio/mpeg, audio/wav, audio/mp3, audio/m4a, audio/x-wav"
            onChange={handleFileChange}
            className="block w-full border p-2 rounded-md"
          />
          <Button
            type="submit"
            color="blue"
            variant="solid"
            className="mt-4"
            disabled={!selectedFile}
          >
            Envoyer
          </Button>
        </form>

        {/* Bouton pour fermer le dialogue */}
        <Dialog.Close>
          <Button
            color="red"
            variant="solid"
            className="mt-4"
            onClick={() => setIsDialogOpen(false)}
          >
            Fermer
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FileUploadDialog;
