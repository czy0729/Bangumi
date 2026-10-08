/*
 * @Author: czy0729
 * @Date: 2023-11-04 15:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-09 06:08:05
 */
import { decode, get } from '@utils/thirdParty/protobuf'
import { TABS } from './ds'

import type { SubjectType } from '@types'

export function getType(page: number = 0) {
  return TABS?.[page]?.key || TABS[0].key
}

export async function loadTyperankIdsData(type: SubjectType) {
  return await decode(`${type}-ids`)
}

/** 获取该类型和标签下类型排行条目的数量 */
export function getTyperankNums(type: SubjectType, tag: string) {
  const typerankData = get(`${type}-ids`)
  if (!typerankData) return 0

  return typerankData[tag]?.length || 0
}
