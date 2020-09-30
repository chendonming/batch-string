import * as vscode from "vscode"
import * as ut from "./utils"

export function activate(context: vscode.ExtensionContext) {
  // 自增长
  let disposable = vscode.commands.registerCommand("string.SelfGrowth", async (_cn = false) => {
    const currentEditor = vscode.window.activeTextEditor
    const expression = await vscode.window.showInputBox({ placeHolder: "输入表达式" })
    /**
     * 表达式设置
     * 自增: n+m 其中n为基础量 m为增量
     */
    currentEditor?.edit((editor) => {
      const t = expression?.split("+")
      if (!t || t.length === 1) return
      // 从几开始
      let selfIncrement = parseInt(t[0] ? t[0] : "0")
      // 增量是多少
      let increment = parseInt(t[1])
      currentEditor.selections.forEach((v) => {
        const text = currentEditor.document.getText(v)
        let tt
        if (_cn) {
          tt = ut.NoToChinese(increment + selfIncrement)
        } else {
          tt = increment + selfIncrement
        }
        editor.replace(v, text + tt + "")
        selfIncrement = selfIncrement + increment
      })
    })
    currentEditor?.selections
  })
  context.subscriptions.push(disposable)

  let disposable2 = vscode.commands.registerCommand("string.SelfGrowthZh", () => {
    vscode.commands.executeCommand("string.SelfGrowth", true)
  })
  context.subscriptions.push(disposable2)
}
export function deactivate() {}
