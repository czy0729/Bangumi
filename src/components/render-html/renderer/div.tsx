/*
 * @Author: czy0729
 * @Date: 2026-06-30 19:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-30 19:20:00
 */
import React from 'react'
import { Expand } from '../../expand'
import CodeBlock from '../code-block'

/** 收起状态下最多显示的行数 */
const COLLAPSED_MAX_LINES = 10

export function div({ key, attrs, className, children, rawChildren }) {
  // 代码高亮块
  if (className?.includes('codeHighlight')) {
    const text = extractText(rawChildren?.[0])
      .replace(/\n{3,}/g, '\n\n') // 限制最多连续两个换行
      .trim()

    const lines = text.split('\n')
    const needTruncate = lines.length > COLLAPSED_MAX_LINES

    return (
      <Expand
        key={key}
        collapsedChildren={
          needTruncate ? (
            <CodeBlock style={attrs?.style}>
              {lines.slice(0, COLLAPSED_MAX_LINES).join('\n') + '\n...'}
            </CodeBlock>
          ) : undefined
        }
      >
        <CodeBlock style={attrs?.style}>{text}</CodeBlock>
      </Expand>
    )
  }

  // 其他 div 直接返回子元素
  return children
}

/** 递归提取节点中的所有文本，保留换行 */
function extractText(node: any): string {
  if (!node) return ''
  if (node.data) return node.data
  if (node.children) {
    return node.children
      .map((child: any) => {
        const text = extractText(child)
        // 空节点（有 children 但没有 data，且提取的文本为空）表示换行
        if (!child.data && !text) {
          return '\n'
        }
        return text
      })
      .join('')
  }
  return ''
}
