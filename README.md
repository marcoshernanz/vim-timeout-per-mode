For this extension to work you need to have installed vscode-vim extension.

This is only a temporary workaround to configure custom a custom timeout for insert and normal modes.

The extension identifies the mode you're in by looking at your cursor style, so if you change the default cursor style for any mode, the extension might suddenly stop working.

You can change the timeout duration for normal and for insert mode by changing 'vimTimeoutPerMode.normalModeTimeout' and 'vimTimeoutPerMode.insertModeTimeout' in your settings.

Happy coding!
