import * as vscode from "vscode";

function getVimMode() {
  const activeEditor = vscode.window.activeTextEditor;

  if (activeEditor?.options.cursorStyle === vscode.TextEditorCursorStyle.Line) {
    return "Insert";
  }

  return "Normal";
}

export function activate(context: vscode.ExtensionContext) {
  let lastVimMode = "Normal";

  const checkVimMode = () => {
    const mode = getVimMode();
    if (lastVimMode === mode) {
      return;
    }

    const config = vscode.workspace.getConfiguration("vimTimeoutPerMode");
    const normalModeTimeout = config.get<number>("normalModeTimeout", 1000);
    const insertModeTimeout = config.get<number>("insertModeTimeout", 100);

    if (mode === "Normal") {
      vscode.workspace
        .getConfiguration("vim")
        .update("timeout", normalModeTimeout, true);
    } else if (mode === "Insert") {
      vscode.workspace
        .getConfiguration("vim")
        .update("timeout", insertModeTimeout, true);
    }

    lastVimMode = mode;
  };

  vscode.window.onDidChangeTextEditorOptions(checkVimMode);
  checkVimMode();
}

export function deactivate() {
  const config = vscode.workspace.getConfiguration("vimTimeoutPerMode");
  const normalModeTimeout = config.get<number>("normalModeTimeout", 1000);

  vscode.workspace
    .getConfiguration("vim")
    .update("timeout", normalModeTimeout, true);
}
