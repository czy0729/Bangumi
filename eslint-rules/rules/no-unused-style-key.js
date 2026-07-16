/*
 * @Description: 检测 styles.ts 中定义了但未被组件引用的 style key
 *
 * 作用：帮助清理项目中不再使用的样式键，避免维护负担。
 *
 * 实现方式：
 *   1. 解析当前 styles.ts 中 export 的 _.create() / _.memoStyles() 定义的所有 key
 *   2. 读取同目录下所有 .ts/.tsx 文件内容（排除 styles.ts 自身）
 *   3. 通过正则匹配识别哪些 key 被引用（支持 styles.key、styles()?.key、模板字符串动态 key）
 *   4. 报告未使用的 key
 *
 * 注意：此规则通过文件系统读取兄弟文件，属于跨文件分析，因此不能缓存结果。
 */

const fs = require('fs')
const path = require('path')

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

// 收集同目录下所有非 styles.ts 的 .ts/.tsx 文件内容
function getDirContent(dir) {
  const parts = []
  function walk(currentDir) {
    try {
      const entries = fs.readdirSync(currentDir)
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry)
        const stat = fs.statSync(fullPath)
        if (stat.isDirectory()) {
          walk(fullPath)
        } else if ((entry.endsWith('.tsx') || entry.endsWith('.ts')) && entry !== 'styles.ts') {
          const content = readFile(fullPath)
          if (content) parts.push(content)
        }
      }
    } catch {}
  }
  walk(dir)
  return parts.join('\n')
}

// 从兄弟文件中提取 import { ... } from './styles' 的变量名（支持 as 别名）
function extractImportAliases(content) {
  const aliases = new Set()
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]\.\/styles['"]/g
  let m
  while ((m = importRegex.exec(content)) !== null) {
    for (const spec of m[1].split(',')) {
      const parts = spec.trim().split(/\s+as\s+/)
      aliases.add(parts[parts.length - 1])
    }
  }
  return [...aliases]
}

// 提取 ObjectExpression 中的所有属性名
function extractObjectKeys(node) {
  const keys = []
  if (!node || node.type !== 'ObjectExpression') return keys
  for (const prop of node.properties) {
    if (prop.type === 'Property' && prop.key.type === 'Identifier') {
      keys.push({ name: prop.key.name, node: prop })
    }
  }
  return keys
}

// 从函数体中提取 return 的对象（支持箭头函数直接返回对象和 BlockStatement）
function findReturnObject(body) {
  if (!body) return null
  if (body.type === 'ObjectExpression') return body
  if (body.type === 'BlockStatement') {
    for (const stmt of body.body) {
      if (stmt.type === 'ReturnStatement' && stmt.argument) {
        if (stmt.argument.type === 'ObjectExpression') return stmt.argument
      }
    }
  }
  return null
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'detect unused style keys in styles.ts exports',
      recommended: false
    },
    schema: [],
    messages: {
      unusedKey: 'Style key "{{ key }}" is defined but never referenced in the component.'
    }
  },

  create(context) {
    const filename = context.getFilename()
    if (!filename.endsWith('styles.ts')) return {}

    const dir = path.dirname(filename)
    const siblingContent = getDirContent(dir)
    if (!siblingContent) return {}

    const defined = []
    let exportNames = []

    return {
      // 收集 export 的样式变量及其内所有 key
      ExportNamedDeclaration(node) {
        if (!node.declaration || node.declaration.type !== 'VariableDeclaration') return
        for (const decl of node.declaration.declarations) {
          if (decl.type !== 'VariableDeclarator' || decl.id.type !== 'Identifier') continue

          const init = decl.init
          if (
            !init ||
            init.type !== 'CallExpression' ||
            init.callee.type !== 'MemberExpression' ||
            init.callee.object.type !== 'Identifier' ||
            init.callee.object.name !== '_'
          )
            continue

          const method = init.callee.property.name
          if (method !== 'memoStyles' && method !== 'create') continue

          exportNames.push(decl.id.name)

          if (method === 'create') {
            defined.push(...extractObjectKeys(init.arguments[0]))
          } else if (method === 'memoStyles') {
            const factory = init.arguments[0]
            if (factory) {
              const body =
                factory.type === 'ArrowFunctionExpression'
                  ? factory.body
                  : factory.type === 'FunctionExpression'
                  ? factory.body
                  : null
              const obj = findReturnObject(body)
              defined.push(...extractObjectKeys(obj))
            }
          }
        }
      },

      // 在 AST 遍历结束后，将收集的 key 与兄弟文件中的使用进行比对
      'Program:exit'() {
        if (defined.length === 0) return

        const usedKeys = new Set()

        let match

        // 导入别名：import { styles } 或 import { memoStyles as styles }
        const aliases = extractImportAliases(siblingContent)

        const allNames = [...new Set([...aliases, 'styles'])]
        for (const name of allNames) {
          const patterns = [
            new RegExp(`\\b${name}\\.([a-zA-Z_$][a-zA-Z0-9_$]*)`, 'g'),
            new RegExp(`\\bthis\\.${name}\\.([a-zA-Z_$][a-zA-Z0-9_$]*)`, 'g')
          ]
          for (const pattern of patterns) {
            while ((match = pattern.exec(siblingContent)) !== null) {
              usedKeys.add(match[1])
            }
          }
        }

        // 函数调用式：styles()?.key
        for (const name of exportNames) {
          const expPatterns = [
            new RegExp(`\\b${name}\\(\\)\\.([a-zA-Z_$][a-zA-Z0-9_$]*)`, 'g'),
            new RegExp(`\\b${name}\\(\\)\\?\\.([a-zA-Z_$][a-zA-Z0-9_$]*)`, 'g')
          ]
          for (const pattern of expPatterns) {
            while ((match = pattern.exec(siblingContent)) !== null) {
              usedKeys.add(match[1])
            }
          }
        }

        // 字符串字面量匹配（用于动态 key 或条件样式）
        const stringLitPattern = /['"](\w+)['"]/g
        while ((match = stringLitPattern.exec(siblingContent)) !== null) {
          usedKeys.add(match[1])
        }

        // 模板字符串匹配：styles[`key${...}`]
        for (const name of allNames) {
          const patterns = [
            new RegExp(`\\b${name}\\[\\\`(\\w+)\\$\\{`, 'g'),
            new RegExp(`\\bthis\\.${name}\\[\\\`(\\w+)\\$\\{`, 'g')
          ]
          for (const pattern of patterns) {
            while ((match = pattern.exec(siblingContent)) !== null) {
              for (const { name: keyName } of defined) {
                if (keyName.startsWith(match[1])) usedKeys.add(keyName)
              }
            }
          }
        }

        // 报告未使用的 key
        for (const { name, node } of defined) {
          if (!usedKeys.has(name)) {
            context.report({
              node,
              messageId: 'unusedKey',
              data: { key: name }
            })
          }
        }
      }
    }
  }
}
