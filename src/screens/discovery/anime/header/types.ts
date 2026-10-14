/*
 * @Author: czy0729
 * @Date: 2024-07-25 06:25:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 头部组件类型
 */
import type { HeaderV2Props } from '@components'
import type { TitleType } from '../types'

export type Props = {
  /** 头部标题 */
  title?: string

  /** 埋点别名 */
  alias?: TitleType

  /** 埋点参数: [URL 地址, 页面 key] */
  hm?: HeaderV2Props['hm']
}
