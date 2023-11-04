/*
 * @Author: czy0729
 * @Date: 2023-11-04 15:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 15:59:13
 */
import typerankDataAnime from '@assets/json/typerank/anime-ids.json'
import typerankDataBook from '@assets/json/typerank/book-ids.json'
import typerankDataGame from '@assets/json/typerank/game-ids.json'
import typerankDataMusic from '@assets/json/typerank/music-ids.json'
import typerankDataReal from '@assets/json/typerank/real-ids.json'
import { SubjectType } from '@types'

/** 获取该类型和标签下类型排行条目的数量 */
export function getTyperankNums(type: SubjectType, tag: string) {
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

  if (!typerankData) return 0

  return typerankData[tag]?.length || 0
}
