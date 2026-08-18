/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import type { ColorValue } from '@types'

import type { Route } from '../types'

/** Tab 标签子组件参数 */
export type LabelProps = {
  /** 路由数据 */
  route: Route

  /** 是否选中 */
  focused: boolean

  /** 文字颜色 */
  textColor?: ColorValue
}
