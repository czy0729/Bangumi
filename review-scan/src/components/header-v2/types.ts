/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:52:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 15:32:31
 */
import { ReactNode, ViewStyle } from '@types'
import { TrackProps } from '../track'

export type Props = {
  /** 是否透明 */
  transparent?: boolean

  /** 头部背景样式 */
  backgroundStyle?: ViewStyle

  /** 是否锁定, 模式不为空时有效 */
  fixed?: boolean

  /** 标题 */
  title?: string

  /** [WEB] 若有此值, 页面标题以此优先 */
  domTitle?: string

  /** 统计参数: [url 地址, 对应页面 key] */
  hm?: TrackProps['hm']

  /** 统计别名 */
  alias?: string

  /** 左侧 element */
  headerLeft?: ReactNode

  /** 模式为 'transition' 时有效, 代替 title 显示 */
  headerTitle?: ReactNode

  /** 标题容器样式 */
  headerTitleStyle?: ViewStyle

  /** 标题对齐 */
  headerTitleAlign?: 'center' | 'left'

  /** 标题为文字时, 可以追加在标题后方的节点 */
  headerTitleAppend?: ReactNode

  /** 右侧 element */
  headerRight?: () => ReactNode
}
