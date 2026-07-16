/*
 * @Description: 强制在 styles.ts 中对含小数字面量的算术表达式使用 Math.floor()
 *
 * 背景：React Native 的样式值如果为小数（如 10.5），在不同设备上可能产生非预期的
 * 像素对齐问题。此规则确保所有含小数的算术表达式都被 Math.floor() 包裹。
 *
 * 例外：letterSpacing 等 CSS 属性本身支持小数，不在此规则检查范围内。
 *
 * 检查范围：
 *   - _.create({ ... }) 中的对象属性值
 *   - _.memoStyles(() => ({ ... })) 返回对象中的属性值
 *
 * fix: 自动将表达式包裹 Math.floor(...)
 */

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce Math.floor() on arithmetic expressions with decimal literals in styles',
      recommended: false
    },
    fixable: 'code',
    messages: {
      needFloor:
        'Arithmetic expression with decimal literal should be wrapped in Math.floor() to ensure integer pixel value.'
    }
  },

  create(context) {
    const filename = context.getFilename()
    if (!filename.endsWith('styles.ts')) return {}

    // 允许使用小数的 CSS 属性白名单
    const FLOAT_PROPERTIES = new Set(['letterSpacing'])

    // 判断节点是否为小数字面量（支持负数）
    function isDecimalLiteral(node) {
      if (!node) return false
      if (node.type === 'Literal' && typeof node.value === 'number') {
        return !Number.isInteger(node.value)
      }
      if (node.type === 'UnaryExpression' && node.operator === '-') {
        return isDecimalLiteral(node.argument)
      }
      return false
    }

    // 递归检查表达式树中是否包含小数字面量（避免重复访问形成环）
    function hasDecimalOperand(node, visited) {
      if (!node || visited.has(node)) return false
      visited.add(node)

      if (isDecimalLiteral(node)) return true
      if (node.type === 'BinaryExpression') {
        return hasDecimalOperand(node.left, visited) || hasDecimalOperand(node.right, visited)
      }
      if (node.type === 'ConditionalExpression') {
        return (
          hasDecimalOperand(node.consequent, visited) || hasDecimalOperand(node.alternate, visited)
        )
      }
      return false
    }

    // 判断节点是否已被 Math.floor/ceil/round 包裹
    function isMathRoundingCall(node) {
      if (!node || node.type !== 'CallExpression') return false
      if (
        node.callee.type === 'MemberExpression' &&
        node.callee.object.type === 'Identifier' &&
        node.callee.object.name === 'Math' &&
        (node.callee.property.name === 'floor' ||
          node.callee.property.name === 'ceil' ||
          node.callee.property.name === 'round')
      ) {
        return true
      }
      return false
    }

    // 递归检查 ObjectExpression 中的每个属性值
    function checkObjectExpression(objNode) {
      if (!objNode || objNode.type !== 'ObjectExpression') return

      for (const prop of objNode.properties) {
        if (prop.type !== 'Property') continue

        const value = prop.value
        if (!value) continue

        const propName =
          prop.key.type === 'Identifier'
            ? prop.key.name
            : prop.key.type === 'Literal'
            ? prop.key.value
            : null
        if (propName && FLOAT_PROPERTIES.has(propName)) continue

        // 嵌套对象递归检查
        if (value.type === 'ObjectExpression') {
          checkObjectExpression(value)
          continue
        }

        // 检查 BinaryExpression 中是否有小数操作数且未被 Math.floor 包裹
        if (
          value.type === 'BinaryExpression' &&
          hasDecimalOperand(value, new Set()) &&
          !isMathRoundingCall(value)
        ) {
          const sourceCode = context.getSourceCode()
          context.report({
            node: value,
            messageId: 'needFloor',
            fix: fixer => fixer.replaceText(value, `Math.floor(${sourceCode.getText(value)})`)
          })
        }
      }
    }

    return {
      CallExpression(node) {
        const callee = node.callee

        // 处理 _.create({ ... })
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === '_' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'create'
        ) {
          if (node.arguments[0] && node.arguments[0].type === 'ObjectExpression') {
            checkObjectExpression(node.arguments[0])
          }
        }

        // 处理 _.memoStyles(() => ({ ... })) 或 _.memoStyles(function() { return { ... } })
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === '_' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'memoStyles'
        ) {
          const factory = node.arguments[0]
          if (!factory) return

          let body
          if (factory.type === 'ArrowFunctionExpression') {
            body = factory.body
          } else if (factory.type === 'FunctionExpression') {
            body = factory.body
          }
          if (!body) return

          if (body.type === 'ObjectExpression') {
            checkObjectExpression(body)
          } else if (body.type === 'BlockStatement') {
            for (const stmt of body.body) {
              if (
                stmt.type === 'ReturnStatement' &&
                stmt.argument &&
                stmt.argument.type === 'ObjectExpression'
              ) {
                checkObjectExpression(stmt.argument)
              }
            }
          }
        }
      }
    }
  }
}
