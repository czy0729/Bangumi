/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:52:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:07:54
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

  /** 右侧 element */
  headerRight?: () => ReactNode

  /** 模式为 'transition' 时有效, 代替 title 显示 */
  headerTitle?: ReactNode

  /** 标题对齐 */
  headerTitleAlign?: 'center' | 'left'
}