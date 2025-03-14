import { Button, Dialog } from "@radix-ui/themes";

const FileUploadDialog = () => {
  return (
    <Dialog.Root>
      {/* Bouton pour ouvrir la modale */}
      <Dialog.Trigger>
        <Button>Téléverser un fichier audio</Button>
      </Dialog.Trigger>

      <Dialog.Content className="p-4 bg-white rounded-lg shadow-lg ">
        <Dialog.Title className="text-xl font-bold">
          Envoyer un fichier
        </Dialog.Title>
        <Dialog.Description>
          Sélectionnez un fichier à transcrire.
        </Dialog.Description>

        {/* Bouton pour fermer le dialogue */}
        <Dialog.Close className="">
          <Button color="red" variant="solid" className="mt-4">
            Fermer
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FileUploadDialog;
