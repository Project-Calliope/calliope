import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Library from "@/models/Library";
import { Copy, LoaderPinwheel } from "lucide-react";

const TranscriptDialog = ({
  library,
  open,
  onOpenChange,
}: {
  library: Library;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleCopy = () => {
    if (library.currentTranscript?.content) {
      navigator.clipboard.writeText(library.currentTranscript.content);
      onOpenChange(false); // Ferme le dialog après la copie
    }
  };

  return (
    <>
      {library.currentTranscript ? (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
          {/* On enlève AlertDialogTrigger ici, car l'ouverture se fait via le menu */}
          <AlertDialogContent>
            <AlertDialogTitle>Transcript original</AlertDialogTitle>
            <textarea
              disabled
              className="block w-full h-60 border p-2 rounded-md resize-none overflow-y-auto"
              defaultValue={library.currentTranscript.content || ""}
            />
            {library.currentSummary ? (
              <div className="w-full">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="w-full"
                >
                  <Copy />
                  <span>Copier</span>
                </Button>
              </div>
            ) : (
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
            )}
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
};

export default TranscriptDialog;
