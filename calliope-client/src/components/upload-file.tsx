import { useState } from "react";
import AudioService from "../services/AudioService";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MDXEditorMethods } from "@mdxeditor/editor";

const FileUploadDialog = ({
  editorRef,
}: {
  editorRef: React.RefObject<MDXEditorMethods | null>;
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
      console.log("Fichier sélectionné :", selectedFile.name);
      try {
        const response = await AudioService.upload(selectedFile);
        console.log("Réponse de l'API :", response);
        toast.success("Fichier envoyé avec succès !");
        if (editorRef.current) {
          editorRef.current.setMarkdown(response.response.transcript);
        }
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
    <>
      <AlertDialog>
        <AlertDialogTrigger className="ml-2 mr-2">
          <Button variant="outline" className="w-full">
            Envoyer un fichier
          </Button>
        </AlertDialogTrigger>
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
              <AlertDialogAction type="submit" disabled={!selectedFile}>
                Envoyer
              </AlertDialogAction>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FileUploadDialog;
