import toast from "react-hot-toast";
import { AsyncCommand } from "./AsyncCommand";

export class ToastSuccessErrorCommandDecorator implements AsyncCommand {
  private _command: AsyncCommand;
  private _successMessage: string;
  private _errorMessage: string;

  constructor(
    command: AsyncCommand,
    successMessage: string,
    errorMessage: string,
  ) {
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

export class ToastPromiseCommandDecorator implements AsyncCommand {
  private _command: AsyncCommand;
  private _loadingMessage: string;
  private _successMessage: string;
  private _errorMessage: string;

  constructor(
    command: AsyncCommand,
    loadingMessage: string,
    successMessage: string,
    errorMessage: string,
  ) {
    this._command = command;
    this._loadingMessage = loadingMessage;
    this._successMessage = successMessage;
    this._errorMessage = errorMessage;
  }

  async execute(): Promise<void> {
    return toast.promise((async () => await this._command.execute())(), {
      loading: this._loadingMessage,
      success: this._successMessage,
      error: this._errorMessage,
    });
  }
}
