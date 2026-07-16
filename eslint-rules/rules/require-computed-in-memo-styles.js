/*
 * @Description: 要求 _.memoStyles() 的工厂函数中至少引用一个 computed theme 值
 *
 * 背景：_.memoStyles() 通过 MobX 的 computed 依赖追踪来决定何时重新计算样式。
 * 如果工厂函数中没有任何 computed 值依赖，样式永远不会更新（等同于静态的 _.create()），
 * 此时使用 _.memoStyles() 反而带来了不必要的性能开销。
 *
 * 此规则与 forbid-computed-in-create 互补：
 *   - forbid-computed-in-create: 有 computed 值时应使用 memoStyles
 *   - require-computed-in-memo-styles: 无 computed 值时应使用 create
 *
 * 检查的 computed 值见 ../utils.js 中的 COMPUTED_PROPS 和 COMPUTED_FNS。
 *
 * fix: 将 _.memoStyles(() => ({ ... })) 自动替换为 _.create({ ... })
 */

const { COMPUTED_PROPS, COMPUTED_FNS } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'require at least one @computed value in _.memoStyles() style factory',
      recommended: false
    },
    fixable: 'code',
    schema: [],
    messages: {
      noComputedFound:
        'No @computed theme values found in memoStyles. Add at least one computed value (e.g. _.colorBg, _.wind, _.isDark) to ensure styles update on theme change.'
    }
  },

  create(context) {
    // 使用栈结构处理嵌套 memoStyles 调用
    const stack = []

    return {
      // 进入 memoStyles 调用时，创建新帧跟踪 computed 发现状态
      CallExpression(node) {
        const callee = node.callee

        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === '_' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'memoStyles'
        ) {
          const fn = node.arguments[0]
          if (fn && (fn.type === 'ArrowFunctionExpression' || fn.type === 'FunctionExpression')) {
            stack.push({
              foundComputed: false,
              paramName:
                fn.params.length > 0 && fn.params[0].type === 'Identifier'
                  ? fn.params[0].name
                  : null,
              factoryNode: fn,
              callNode: node
            })
          }
          return
        }

        // 在当前帧中检查 computed 函数调用
        const frame = stack[stack.length - 1]
        if (!frame) return
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          (callee.object.name === '_' || callee.object.name === frame.paramName) &&
          callee.property.type === 'Identifier' &&
          (callee.property.name === 'select' || COMPUTED_FNS.has(callee.property.name))
        ) {
          frame.foundComputed = true
        }
      },

      // 退出 memoStyles 调用时，如果未发现 computed 值则报告
      'CallExpression:exit'(node) {
        const callee = node.callee
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === '_' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'memoStyles'
        ) {
          const frame = stack.pop()
          if (frame && !frame.foundComputed) {
            context.report({
              node: frame.factoryNode,
              messageId: 'noComputedFound',
              fix(fixer) {
                const sourceCode = context.getSourceCode()
                const fn = frame.callNode.arguments[0]
                let objNode = null
                if (fn.body.type === 'ObjectExpression') {
                  objNode = fn.body
                } else if (fn.body.type === 'BlockStatement') {
                  for (const stmt of fn.body.body) {
                    if (
                      stmt.type === 'ReturnStatement' &&
                      stmt.argument?.type === 'ObjectExpression'
                    ) {
                      objNode = stmt.argument
                      break
                    }
                  }
                }
                if (!objNode) return null
                return fixer.replaceText(frame.callNode, `_.create(${sourceCode.getText(objNode)})`)
              }
            })
          }
        }
      },

      // 在当前帧中检查 computed 属性访问
      MemberExpression(node) {
        const frame = stack[stack.length - 1]
        if (!frame) return
        const objName = node.object.type === 'Identifier' ? node.object.name : null
        if (objName === '_' || (frame.paramName && objName === frame.paramName)) {
          const propName = node.property.type === 'Identifier' ? node.property.name : null
          if (propName && COMPUTED_PROPS.has(propName)) {
            frame.foundComputed = true
          }
        }
      }
    }
  }
}
