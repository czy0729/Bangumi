/*
 * @Author: czy0729
 * @Date: 2023-11-04 15:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:33:57
 */
import { getJSON, loadJSON } from '@assets/json'
import { SubjectId, SubjectType } from '@types'
import { TABS } from './ds'

export function getType(page: number = 0) {
  return TABS?.[page]?.key || TABS[0].key
}

export async function loadTyperankIdsData(type: SubjectType) {
  return await loadJSON(`typerank/${type}-ids`)
}

/** 获取该类型和标签下类型排行条目的数量 */
export function getTyperankNums(type: SubjectType, tag: string) {
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
  if (!typerankData) return 0

  return typerankData[tag]?.length || 0
}
