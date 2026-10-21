/*
 * @Author: czy0729
 * @Date: 2023-11-01 09:51:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 排行索引读取: 按条目类型加载 OSS 数据并按标签取 id 列表
 */
import { decode, get } from '@utils/thirdParty/protobuf'

import type { SubjectId, SubjectType } from '@types'

/** 加载某类型的排行索引 */
export async function loadTyperankData(type: SubjectType) {
  return decode(`${type}-ids`)
}

/** 检查这类型的这标签是否存在于数据中 */
export function getIds(type: SubjectType, key: string): SubjectId[] {
  if (!type || !key) return []

  return get(`${type}-ids`)?.[key] || []
}
