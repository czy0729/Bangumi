/*
 * @Author: czy0729
 * @Date: 2026-09-16 04:16:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-16 04:16:18
 *
 * lint:hooks —— 排查 hook 出现在 "可能提前 return 的分支" 之后
 *
 * React 要求同一次渲染中 hook 的调用顺序完全一致。
 * 一旦某个 hook 写在 `if (...) return` 这类提前 return 之后:
 *
 *   function Item() {
 *     const styles = memoStyles()
 *     if (!id) return <Loading />      // 数据未就绪时从这里出去, 只调用了 1 个 hook
 *     const style = useMemo(...)       // 数据回来后才会走到这里 -> hook 数变多
 *   }
 *
 * 首次渲染会跳过它, 后续渲染再调用就会报
 * "Rendered more hooks than during the previous render"。
 *
 * 这类问题只在 "首屏数据未就绪" 的那一次渲染出现, 页面重挂载后就不复现,
 * 而 eslint-plugin-react-hooks@4 只检查 hook 是否在条件分支/循环/嵌套函数里,
 * 不覆盖提前 return 之后的顶层 hook, 所以单独扫一遍。
 *
 * 用法: npm run lint:hooks
 * 退出码: 发现问题 => 1, 否则 => 0
 */
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const ROOT = path.join(__dirname, '..', 'src')
const SKIP_DIRS = new Set(['node_modules', '.git', '.expo', '.codebuddy'])

function walk(dir, out = []) {
  let names = []
  try {
    names = fs.readdirSync(dir)
  } catch (e) {
    return out
  }

  for (const name of names) {
    const p = path.join(dir, name)
    let st
    try {
      st = fs.statSync(p)
    } catch (e) {
      continue
    }

    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(p, out)
    } else if (/\.(tsx|ts)$/.test(name) && !/\.d\.ts$/.test(name)) {
      out.push(p)
    }
  }

  return out
}

const isHookName = n => typeof n === 'string' && /^use[A-Z0-9]/.test(n)

function hookNameOf(node) {
  const c = node.callee
  if (!c) return null
  if (c.type === 'Identifier' && isHookName(c.name)) return c.name
  if (
    c.type === 'MemberExpression' &&
    c.property &&
    c.property.type === 'Identifier' &&
    isHookName(c.property.name)
  ) {
    return c.property.name
  }
  return null
}

function isFunctionNode(n) {
  if (!n) return false
  return (
    n.type === 'FunctionDeclaration' ||
    n.type === 'FunctionExpression' ||
    n.type === 'ArrowFunctionExpression' ||
    n.type === 'ObjectMethod' ||
    n.type === 'ClassMethod' ||
    n.type === 'ClassPrivateMethod'
  )
}

const SKIP_KEY = k => k === 'loc' || k === 'start' || k === 'end' || k.endsWith('Comments')

/** 收集子树中的 hook 调用 (不进入嵌套函数体, 那属于回调自己的 hook) */
function collectHooks(node, out) {
  if (!node || typeof node.type !== 'string') return
  if (isFunctionNode(node)) return

  if (node.type === 'CallExpression') {
    const name = hookNameOf(node)
    if (name) out.push({ name, line: node.loc.start.line, col: node.loc.start.column + 1 })
  }

  for (const k of Object.keys(node)) {
    if (SKIP_KEY(k)) continue
    const v = node[k]
    if (Array.isArray(v)) {
      for (const x of v) if (x && typeof x.type === 'string') collectHooks(x, out)
    } else if (v && typeof v.type === 'string') {
      collectHooks(v, out)
    }
  }
}

/** 子树中是否存在 return (不把嵌套函数里的 return 算进来) */
function containsReturn(node) {
  if (!node || typeof node.type !== 'string') return false
  if (node.type === 'ReturnStatement') return true
  if (isFunctionNode(node)) return false

  for (const k of Object.keys(node)) {
    if (SKIP_KEY(k)) continue
    const v = node[k]
    if (Array.isArray(v)) {
      for (const x of v) if (x && typeof x.type === 'string' && containsReturn(x)) return true
    } else if (v && typeof v.type === 'string' && containsReturn(v)) return true
  }
  return false
}

/** 该顶层语句是否可能提前 return, 返回 return 所在行 */
function earlyReturnLine(stmt) {
  if (stmt.type === 'IfStatement') {
    if (containsReturn(stmt.consequent)) return stmt.consequent.loc.start.line
    if (stmt.alternate && containsReturn(stmt.alternate)) return stmt.alternate.loc.start.line
    return null
  }

  if (stmt.type === 'SwitchStatement') {
    for (const c of stmt.cases) {
      for (const s of c.consequent) if (containsReturn(s)) return stmt.loc.start.line
    }
    return null
  }

  if (stmt.type === 'TryStatement') {
    if (stmt.block && containsReturn(stmt.block)) return stmt.loc.start.line
    if (stmt.handler && stmt.handler.body && containsReturn(stmt.handler.body)) {
      return stmt.loc.start.line
    }
    return null
  }

  return null
}

function functionName(p) {
  const n = p.node
  if (n.id && n.id.name) return n.id.name

  const parent = p.parent
  if (parent) {
    if (parent.type === 'VariableDeclarator' && parent.id) return parent.id.name || '(anonymous)'
    if (parent.type === 'ObjectProperty' && parent.key) return parent.key.name || '(anonymous)'
    if (parent.type === 'ClassMethod' && parent.key) return parent.key.name || '(anonymous)'
  }

  return '(anonymous)'
}

const files = walk(ROOT)
const report = []
const parseErrors = []
let scanned = 0

for (const file of files) {
  let code
  try {
    code = fs.readFileSync(file, 'utf8')
  } catch (e) {
    continue
  }
  if (!/use[A-Z0-9]/.test(code)) continue

  let ast
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      errorRecovery: true,
      plugins: ['typescript', 'jsx', 'decorators-legacy']
    })
  } catch (e) {
    parseErrors.push(`${path.relative(process.cwd(), file)} :: ${e.message}`)
    continue
  }
  scanned++

  traverse(ast, {
    Function(p) {
      const body = p.node.body
      if (!body || body.type !== 'BlockStatement') return
      const stmts = body.body

      let early = null
      const hookStmts = []

      stmts.forEach((s, i) => {
        const line = earlyReturnLine(s)
        if (line && !early) early = { line, i }

        const hs = []
        collectHooks(s, hs)
        if (hs.length) hookStmts.push({ i, hooks: hs })
      })

      if (!early) return

      const bad = hookStmts.filter(hs => hs.i > early.i)
      if (!bad.length) return

      report.push({
        file: path.relative(process.cwd(), file),
        fn: functionName(p),
        fnLine: p.node.loc.start.line,
        earlyLine: early.line,
        hooks: bad.reduce((acc, b) => acc.concat(b.hooks), [])
      })
    }
  })
}

report.sort((a, b) => (a.file === b.file ? a.fnLine - b.fnLine : a.file.localeCompare(b.file)))

console.log(`[lint:hooks] 扫描 ${files.length} 个文件, 其中 ${scanned} 个含 hook`)

if (parseErrors.length) {
  console.log(`[lint:hooks] ${parseErrors.length} 个文件解析失败(已跳过):`)
  parseErrors.slice(0, 5).forEach(e => console.log('  ' + e))
}

if (!report.length) {
  console.log('[lint:hooks] 未发现 "hook 在提前 return 之后" 的问题 ✓')
  process.exit(0)
}

console.log(`\n[lint:hooks] 发现 ${report.length} 处问题:\n`)
for (const r of report) {
  console.log(`  ${r.file}`)
  console.log(
    `    ${r.fnLine} 行 函数 ${r.fn} —— 提前 return 在第 ${r.earlyLine} 行, 之后却调用了:`
  )
  for (const h of r.hooks) {
    console.log(`      ${h.line}:${h.col}  ${h.name}`)
  }
}
console.log(
  '\n[lint:hooks] 请把这些 hook 移到提前 return 之前,' +
    '否则首屏数据未就绪时渲染会报 Rendered more hooks than during the previous render\n'
)
process.exit(1)
