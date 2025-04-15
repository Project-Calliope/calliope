import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import TranscriptDialog from "@/components/transcript-dialog";
import SummaryDialog from "@/components/summary-dialog"; // j'imagine que c'est ça le nom
import LibraryManager from "@/models/LibraryManager";
import Library from "@/models/Library";

const DialogDropdownMenu = ({ library }: { library: Library }) => {
  const libraryManager = LibraryManager.getInstance();

  const [openTranscript, setOpenTranscript] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);

  return (
    <>
      {library.currentTranscript ? (
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="font-bold">
                {library.currentTranscript && library.currentSummary ? (
                  <span>Options</span>
                ) : (
                  <span>Option</span>
                )}
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpenTranscript(true)}>
                Voir la transcription
              </DropdownMenuItem>
              {library.currentSummary ? (
                <DropdownMenuItem onClick={() => setOpenSummary(true)}>
                  Voir le résumé
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Les deux dialogues ouverts selon l'état */}
          <TranscriptDialog
            library={libraryManager.library}
            open={openTranscript}
            onOpenChange={setOpenTranscript}
          />
          <SummaryDialog
            library={libraryManager.library}
            open={openSummary}
            onOpenChange={setOpenSummary}
          />
        </div>
      ) : null}
    </>
  );
};

export default DialogDropdownMenu;
