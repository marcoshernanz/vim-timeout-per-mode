"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function getVimMode() {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor?.options.cursorStyle === vscode.TextEditorCursorStyle.Line) {
        return "Insert";
    }
    return "Normal";
}
function activate(context) {
    let lastVimMode = "Normal";
    const checkVimMode = () => {
        const mode = getVimMode();
        if (lastVimMode === mode) {
            return;
        }
        const config = vscode.workspace.getConfiguration("vimTimeoutPerMode");
        const normalModeTimeout = config.get("normalModeTimeout", 1000);
        const insertModeTimeout = config.get("insertModeTimeout", 100);
        if (mode === "Normal") {
            vscode.workspace
                .getConfiguration("vim")
                .update("timeout", normalModeTimeout, true);
        }
        else if (mode === "Insert") {
            vscode.workspace
                .getConfiguration("vim")
                .update("timeout", insertModeTimeout, true);
        }
        lastVimMode = mode;
    };
    vscode.window.onDidChangeTextEditorOptions(checkVimMode);
    checkVimMode();
}
function deactivate() {
    const config = vscode.workspace.getConfiguration("vimTimeoutPerMode");
    const normalModeTimeout = config.get("normalModeTimeout", 1000);
    vscode.workspace
        .getConfiguration("vim")
        .update("timeout", normalModeTimeout, true);
}
//# sourceMappingURL=extension.js.map