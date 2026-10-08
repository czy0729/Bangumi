/*
 * @Author: czy0729
 * @Date: 2023-11-01 09:51:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-09 06:08:49
 */
import { decode, get } from '@utils/thirdParty/protobuf'

import type { SubjectId, SubjectType } from '@types'

export async function loadTyperankData(type: SubjectType) {
  return await decode(`${type}-ids`)
}

/** 检查这类型的这标签是否存在于数据中 */
export function getIds(type: SubjectType, key: string): SubjectId[] {
  if (!type || !key) return []

  return get(`${type}-ids`)?.[key] || []
}
