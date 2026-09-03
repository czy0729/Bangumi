/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:37:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:13:58
 */
import type { EventKeys } from '@constants'
import type { ReactNode } from '@types'
import type { TouchableHandlePress } from '../../touchable/types'

/** ToolBar.Touchable 可点击区域的属性 */
export type Props = {
  /** 埋点事件 key */
  heatmap?: EventKeys

  /** 点击回调 */
  onSelect?: TouchableHandlePress

  /** 子元素 */
  children: ReactNode
}
