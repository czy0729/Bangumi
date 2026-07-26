/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:37:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:38:58
 */
import type { Fn } from '@types'

export type Props = {
  /** 解析后的文本内容 */
  text?: string

  /** 条目链接地址 */
  href?: string

  /** 封面图地址 */
  image?: string

  /** 日文名称 */
  name?: string

  /** 中文名称 */
  name_cn?: string

  /** 评分信息 */
  rating?: {
    /** 评分 */
    score?: number
    /** 评分人数 */
    total?: number
  }

  /** 排名 */
  rank?: number | ''

  /** 放送日期 */
  air_date?: string

  /** 链接点击回调 */
  onLinkPress?: Fn
}
