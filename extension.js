const vscode = require('vscode');

module.exports.activate = context => {
  const qcl = vscode.commands.registerCommand('quick-console-log', () => {
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor.document.getText(editor.selection).trim();
    selectedText
      ? vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
          editor.insertSnippet(new vscode.SnippetString(`console.log('${selectedText}', ${selectedText});`));
        })
      : editor.insertSnippet(new vscode.SnippetString(`console.log($0);`));
  });

  const cf = vscode.commands.registerCommand('copy-filename', fs => {
    vscode.env.clipboard.writeText(fs.path.split('/').at(-1));
  });

  context.subscriptions.push(qcl, cf);
};
