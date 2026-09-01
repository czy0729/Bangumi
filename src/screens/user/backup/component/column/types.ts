/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 21:00:18
 */
import type { TextProps } from '@components'
import type { ReactNode, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 是否显示 */
  show?: boolean

  /** 文本颜色类型 */
  type?: TextProps['type']

  /** 文本内容 */
  text?: string | number

  /** 右侧附加元素 */
  right?: ReactNode

  /** 点击文本回调 */
  onPress?: () => void
}>
