/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 是否显示, 默认 true */
  animating?: boolean

  /** 指示器颜色, 默认 gray */
  color?: string

  /** 尺寸, 默认 small */
  size?: 'small' | 'large'

  /** toast 模式 (居中大遮罩) */
  toast?: boolean

  /** 提示文字 */
  text?: string
}>
