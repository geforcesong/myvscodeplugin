// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "gg-bracket-selection" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerTextEditorCommand('extension.selectTextInBracket', function (textEditor, edit) {
        // The code you place here will be executed every time your command is executed
        var start = new vscode.Position(1,1);
        var end = new vscode.Position(1, 5);

        var range = new vscode.Range(start, end);
        var { document, selection } = textEditor;
       
       var pos = textEditor.selection.active;
       var lineTotal = document.lineAt(pos.line).text.length; 

       var selectStart = new vscode.Position(pos.line, 0);
       var selectEnd = new vscode.Position(pos.line, 3);
       var newSelection = new vscode.Selection(selectStart, selectEnd);
       textEditor.selection = newSelection;
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;