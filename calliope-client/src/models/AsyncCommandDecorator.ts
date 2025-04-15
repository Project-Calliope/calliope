import toast from "react-hot-toast";
import { AsyncCommand } from "./AsyncCommand";

/**
 * A decorator class that wraps an `AsyncCommand` to provide toast notifications
 * for success and error scenarios when the command is executed.
 */
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

  /**
   * Executes the decorated command and displays a toast notification
   * based on the outcome.
   *
   * - If the command executes successfully, a success toast is displayed
   *   with the provided success message.
   * - If the command throws an error, an error toast is displayed with
   *   the provided error message, and the error is logged to the console.
   *
   * @returns A promise that resolves when the command execution is complete.
   */
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

  /**
   * Executes the asynchronous command wrapped in a toast notification.
   *
   * The method displays a toast notification with different states (loading, success, error)
   * while the underlying command is being executed. The messages for each state are provided
   * by the `_loadingMessage`, `_successMessage`, and `_errorMessage` properties.
   *
   * @returns A promise that resolves when the command execution is complete.
   */
  async execute(): Promise<void> {
    return toast.promise((async () => await this._command.execute())(), {
      loading: this._loadingMessage,
      success: this._successMessage,
      error: this._errorMessage,
    });
  }
}
