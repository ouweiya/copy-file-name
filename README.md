### Use concise code completion, using ES6 and minus redundant code.

Contains features:

- Copy File Name
- Quickly print `console.log` (keyboard shortcuts: `ctrl+shift+l`)

**copy filename**

```js
vscode.commands.registerCommand('copy-filename', fs => {
  vscode.env.clipboard.writeText(fs.path.split('/').at(-1));
});
```

**print console.log**

```js
vscode.commands.registerCommand('quick-console-log', () => {
  const editor = vscode.window.activeTextEditor;
  const selectedText = editor.document.getText(editor.selection).trim();
  selectedText
    ? vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
        editor.insertSnippet(new vscode.SnippetString(`console.log('${selectedText}', ${selectedText});`));
      })
    : editor.insertSnippet(new vscode.SnippetString(`console.log($0);`));
});
```

Copy filename, file context menu and tab context menu.

![copy-filename.png](img/copy-filename.png)

Quickly print `console.log`

key: `ctrl+shift+l`

![log.gif](img/log.gif)

a