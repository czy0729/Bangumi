/*
 * @Author: czy0729
 * @Date: 2026-10-29 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * Store 数据类型
 */
import type { RakuenSearch as BaseRakuenSearch } from '@stores/search/types'

/** 帖子搜索结果 (页面侧附加字段) */
export type RakuenSearch = BaseRakuenSearch & {
  /** 服务端还有后续页时为 1, 用于非会员提示 */
  _filter?: number
}
