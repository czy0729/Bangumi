/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:38:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:09:24
 */
import type { WithNavigation } from '@types'

export type Props = WithNavigation<{
  /** 传递 react 强制刷新方法 */
  forceUpdate?: () => void

  /** 长按 Logo 跳转的页面 */
  path?: 'Setting' | 'RakuenSetting'
}>
