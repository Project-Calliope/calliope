import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Library from "@/models/Library";
import { Copy } from "lucide-react";

const SummaryDialog = ({
  library,
  open,
  onOpenChange,
}: {
  library: Library;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleCopy = () => {
    if (library.currentSummary?.content) {
      navigator.clipboard.writeText(library.currentSummary.content);
      onOpenChange(false); // Ferme le dialog après la copie
    }
  };

  return (
    <>
      {library.currentSummary ? (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
          <AlertDialogContent>
            <AlertDialogTitle>Résumé</AlertDialogTitle>
            <textarea
              disabled
              className="block w-full h-60 border p-2 rounded-md resize-none overflow-y-auto"
              defaultValue={library.currentSummary.content || ""}
            />
            <div className="w-full">
              <Button onClick={handleCopy} variant="outline" className="w-full">
                <Copy />
                <span>Copier</span>
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
};

export default SummaryDialog;
