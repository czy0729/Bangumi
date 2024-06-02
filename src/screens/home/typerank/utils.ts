/*
 * @Author: czy0729
 * @Date: 2023-11-01 09:51:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:21:27
 */
import typerankDataAnime from '@assets/json/typerank/anime-ids.json'
import typerankDataBook from '@assets/json/typerank/book-ids.json'
import typerankDataGame from '@assets/json/typerank/game-ids.json'
import typerankDataMusic from '@assets/json/typerank/music-ids.json'
import typerankDataReal from '@assets/json/typerank/real-ids.json'
import { SubjectId, SubjectType } from '@types'

/** 检查这类型的这标签是否存在于数据中 */
export function getIds(type: SubjectType, key: string): SubjectId[] {
  if (!type || !key) return []

  let typerankData: any
  if (type === 'anime') {
    typerankData = typerankDataAnime
  } else if (type === 'book') {
    typerankData = typerankDataBook
  } else if (type === 'game') {
    typerankData = typerankDataGame
  } else if (type === 'music') {
    typerankData = typerankDataMusic
  } else if (type === 'real') {
    typerankData = typerankDataReal
  }

  return typerankData?.[key] || []
}
