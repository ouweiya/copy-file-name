const vscode = require('vscode');

const activate = context => {
  const qcl = vscode.commands.registerCommand('quick-console-log', () => {
    const editor = vscode.window.activeTextEditor;
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    console.log('txt', selectedText);

    vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
      selectedText
        ? editor.insertSnippet(new vscode.SnippetString(`console.log('${selectedText}', ${selectedText});`))
        : editor.insertSnippet(new vscode.SnippetString(`console.log();`));
    });
  });

  context.subscriptions.push(qcl);
};

module.exports.activate = activate;
