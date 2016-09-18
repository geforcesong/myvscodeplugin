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
        const leftBrakets = ['{', '[', '('];
        const rightBrakets = ['}', ']', ')'];
        var { document, selection } = textEditor;
        var curPos = textEditor.selection.active;
        if(!curPos)
            return;
        var lineText = document.lineAt(curPos.line).text;
        var tempBracketIndex = -1;
        var startCharater = -1;
        var endCharater = -1;
        for(var i=curPos.character-1 ;i >=0;i--){
            tempBracketIndex = leftBrakets.indexOf(lineText[i]);
            if(tempBracketIndex >=0){
                startCharater = i;
                break;
            }
        }
        if (tempBracketIndex >= 0) {
            for (var i = curPos.character; i < lineText.length; i++) {
                var rightTempIndex = rightBrakets.indexOf(lineText[i]);
                if (rightTempIndex >= 0 && rightTempIndex == tempBracketIndex) { // bracket match
                    endCharater = i;
                    break;
                }
            }
        }

        if(startCharater >=0 && endCharater >=0){
            var selectStart = new vscode.Position(curPos.line, startCharater + 1);
            var selectEnd = new vscode.Position(curPos.line, endCharater);
            var newSelection = new vscode.Selection(selectStart, selectEnd);
            textEditor.selection = newSelection;
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;