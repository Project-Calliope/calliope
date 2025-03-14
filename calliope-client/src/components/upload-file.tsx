import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";

const FileUploadDialog = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Fichier sélectionné :", selectedFile.name);
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
            accept="audio/*"
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
