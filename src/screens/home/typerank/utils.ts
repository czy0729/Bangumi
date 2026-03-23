/*
 * @Author: czy0729
 * @Date: 2023-11-01 09:51:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:06:23
 */
import { getJSON, loadJSON } from '@assets/json'

import type { SubjectId, SubjectType } from '@types'

export async function loadTyperankData(type: SubjectType) {
  return await loadJSON(`typerank/${type}-ids`)
}

/** 检查这类型的这标签是否存在于数据中 */
export function getIds(type: SubjectType, key: string): SubjectId[] {
  if (!type || !key) return []

  let typerankData: Record<string, SubjectId[]>
  if (type === 'anime') {
    typerankData = getJSON('typerank/anime-ids')
  } else if (type === 'book') {
    typerankData = getJSON('typerank/book-ids')
  } else if (type === 'game') {
    typerankData = getJSON('typerank/game-ids')
  } else if (type === 'music') {
    typerankData = getJSON('typerank/music-ids')
  } else if (type === 'real') {
    typerankData = getJSON('typerank/real-ids')
  }

  return typerankData?.[key] || []
}
