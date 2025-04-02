import toast from "react-hot-toast";
import { Command } from "./Command";

export class ToastSuccessErrorCommandDecorator implements Command {
  private _command: Command;
  private _successMessage: string;
  private _errorMessage: string;

  constructor(command: Command, successMessage: string, errorMessage: string) {
    this._command = command;
    this._successMessage = successMessage;
    this._errorMessage = errorMessage;
  }

  async execute(): Promise<void> {
    try {
      await this._command.execute();
      toast.success(this._successMessage); // Succès
    } catch (error) {
      console.error(error);
      toast.error(this._errorMessage); // Erreur
    }
  }
}
