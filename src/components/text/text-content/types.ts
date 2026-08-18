/*
 * @Author: czy0729
 * @Date: 2026-08-18 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 16:00:00
 */
import type { ReactNode } from 'react'
import type { TextStyle } from '@types'
import type { Props as TextProps } from '../types'

/**
 * 文字渲染子组件 props
 *  - 不含样式计算与可观察状态, 纯转发, 供 memo 浅比较隔离重渲染
 */
export type Props = Omit<TextProps, 'children' | 'style'> & {
  /** 已计算样式 (getTextStyle 结果) */
  style: TextStyle[]

  /** 处理后内容 */
  content: ReactNode
}
