/*
 * @Author: czy0729
 * @Date: 2022-09-24 22:02:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai 列表布局条目: 标签高亮工具
 */
import { HENTAI_TAGS } from '@utils/subject/hentai'

import type { ScreenQuery } from '../../types'

/** 该标签是否命中当前人物 / 职业 / 外貌 / 剧情筛选 */
export function getType(query: ScreenQuery, index: number): 'main' | undefined {
  const value = HENTAI_TAGS[index]
  const { chara, job, body, content } = query
  return chara === value || job === value || body === value || content === value
    ? 'main'
    : undefined
}
