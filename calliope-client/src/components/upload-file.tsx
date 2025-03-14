import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import AudioService from "../services/AudioService";

const FileUploadDialog = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier :", error);
      }
      // Ajouter ici la logique d'upload du fichier
    }
  };

  return (
    <Dialog.Root>
      {/* Bouton pour ouvrir la modale */}
      <Dialog.Trigger>
        <Button>Téléverser un fichier audio</Button>
      </Dialog.Trigger>

      <Dialog.Content className="p-4 bg-white rounded-lg shadow-lg">
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
          <Button color="red" variant="solid" className="mt-4">
            Fermer
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FileUploadDialog;
