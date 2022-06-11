const vscode = require('vscode');
const changeCase = require('change-case');

module.exports.activate = context => {
  const quickConsoleLog = vscode.commands.registerCommand('quickConsoleLog', () => {
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor.document.getText(editor.selection).trim();
    const { semicolon } = vscode.workspace.getConfiguration('quickConsoleLog');

    selectedText
      ? vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
          editor.insertSnippet(
            new vscode.SnippetString(`console.log('${selectedText}', ${selectedText})${semicolon ? ';' : ''}`)
          );
        })
      : editor.insertSnippet(new vscode.SnippetString(`console.log($0)${semicolon ? ';' : ''}`));
  });

  const copyFilename = vscode.commands.registerCommand('copyFilename', fs => {
    vscode.env.clipboard.writeText(fs.path.split('/').at(-1));
  });

  const changeCaseCommand = [
    'camelCase',
    'capitalCase',
    'constantCase',
    'dotCase',
    'headerCase',
    'noCase',
    'paramCase',
    'pascalCase',
    'pathCase',
    'sentenceCase',
    'snakeCase',
  ].map(v =>
    vscode.commands.registerCommand(v, () => {
      const editor = vscode.window.activeTextEditor;
      editor.selections.forEach(t => {
        const selectedText = editor.document.getText(t);
        selectedText &&
          editor.insertSnippet(new vscode.SnippetString(`${changeCase[v](selectedText)}`), new vscode.Range(t.start, t.end));
      });
    })
  );

  context.subscriptions.push(quickConsoleLog, copyFilename, ...changeCaseCommand);
};
