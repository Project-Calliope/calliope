import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Library from "@/models/Library";
import { useState } from "react";
import { Copy, LoaderPinwheel } from "lucide-react";

const TranscriptDialog = ({ library }: { library: Library }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    if (library.currentTranscript?.content) {
      navigator.clipboard.writeText(library.currentTranscript.content);
      setIsOpen(false); // Ferme le dialog après la copie
    }
  };

  return (
    <>
      {library.currentTranscript ? (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger
            className="ml-2 mr-2"
            onClick={() => setIsOpen(true)}
          >
            <Button variant="outline" className="w-full">
              Voir le transcript
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Transcript original</AlertDialogTitle>
            <textarea
              disabled
              className="block w-full h-60 border p-2 rounded-md resize-none overflow-y-auto"
              defaultValue={library.currentTranscript.content || ""}
            />
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button onClick={handleCopy} variant="outline">
                <Copy />
                <span>Copier</span>
              </Button>
              <Button>
                <LoaderPinwheel />
                <span>Générer un résumé</span>
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
};

export default TranscriptDialog;
