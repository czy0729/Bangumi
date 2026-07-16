/*
 * @Description: 禁止在 _.create() 中使用 computed theme 值，应改用 _.memoStyles()
 *
 * 背景：_.create() 生成的样式对象是静态的，主题切换后不会自动更新。
 * 而 _.memoStyles() 返回的函数会在 computed 值变化时重新计算样式。
 * 如果在 _.create() 中使用了依赖主题的动态值（如 _.colorBg、_.wind），
 * 切换主题/黑暗模式后样式不会刷新，导致 UI 显示异常。
 *
 * 检查的 computed 值见 ../utils.js 中的 COMPUTED_PROPS 和 COMPUTED_FNS。
 *
 * fix: 将 _.create({ ... }) 自动替换为 _.memoStyles(() => ({ ... }))
 */

const { COMPUTED_PROPS, COMPUTED_FNS } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'forbid @computed theme values in _.create() — use _.memoStyles() instead',
      recommended: false
    },
    fixable: 'code',
    schema: [],
    messages: {
      computedFound:
        "Found @computed theme value in _.create(). These styles are static and won't update on theme change. Use _.memoStyles() instead."
    }
  },

  create(context) {
    let insideCreate = false
    let createNode = null
    let computedNodes = []

    return {
      // 进入 _.create() 调用时，开始跟踪
      CallExpression(node) {
        const callee = node.callee

        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === '_' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'create'
        ) {
          insideCreate = true
          createNode = node
          computedNodes = []
          return
        }

        if (!insideCreate) return

        // 检查是否有 computed 函数调用，如 _.select(), _.portrait()
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === '_' &&
          callee.property.type === 'Identifier' &&
          COMPUTED_FNS.has(callee.property.name)
        ) {
          computedNodes.push(node)
        }
      },

      // 退出 _.create() 调用时，报告发现的 computed 值
      'CallExpression:exit'(node) {
        const callee = node.callee
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === '_' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'create'
        ) {
          if (computedNodes.length) {
            const nodeToFix = createNode
            const objText = context.getSourceCode().getText(nodeToFix.arguments[0])
            context.report({
              node: computedNodes[0],
              messageId: 'computedFound',
              fix: fixer => fixer.replaceText(nodeToFix, `_.memoStyles(() => (${objText}))`)
            })
          }
          insideCreate = false
          createNode = null
          computedNodes = []
        }
      },

      // 检查成员表达式中的 computed 属性，如 _.wind, _.colorBg
      MemberExpression(node) {
        if (!insideCreate) return
        if (node.object.type === 'Identifier' && node.object.name === '_') {
          const propName = node.property.type === 'Identifier' ? node.property.name : null
          if (propName && COMPUTED_PROPS.has(propName)) {
            computedNodes.push(node)
          }
        }
      }
    }
  }
}
