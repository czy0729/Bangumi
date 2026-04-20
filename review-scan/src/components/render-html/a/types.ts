/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:37:24
 */
import { ReactNode, TextStyle } from '@types'

export type Props = {
  /** a 文字样式 */
  style?: TextStyle

  /** html 上的 a 的 attrs 参数 */
  attrs?: {
    href?: ''
  }

  /** render-html 链接组件传递的参数 */
  passProps?: object

  /** 点击回调 */
  onPress?: (navigation?: null, href?: string) => any

  /** 通常是文字或者嵌套的 a */
  children?: ReactNode | ReactNode[]
}
