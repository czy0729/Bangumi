/*
 * @Author: czy0729
 * @Date: 2022-05-02 12:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 12:34:21
 */
import { TextStyle, ReactNode } from '@types'

export type HeaderProps = {
  /** 模式 */
  mode?: 'float' | 'transition'

  /** 是否锁定, 模式不为空时有效 */
  fixed?: boolean

  /** onScroll 垂直y坐标, 模式不为空时有效 */
  y?: number

  /** 标题 */
  title?: string

  /** 统计参数: [url地址, 对应页面key] */
  hm?: string[]

  /** 统计别名 */
  alias?: string

  /**
   * 右侧element
   * https://reactnavigation.org/docs/5.x/stack-navigator#headerright
   */
  headerRight?: () => ReactNode

  /** 模式为 'transition' 时有效, 代替 title 显示 */
  headerTitle?: ReactNode

  /** 标题对齐 */
  headerTitleAlign?: 'center' | 'left'

  /** 标题样式 */
  headerTitleStyle?: TextStyle

  /** 是否变动状态栏主题 */
  statusBarEvents?: boolean

  /** 预设的状态栏主题 */
  statusBarEventsType?: 'Subject' | 'Topic' | 'Tinygrail'
}
