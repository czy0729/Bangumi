/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:37:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 09:33:08
 */
import { SubjectId } from '@types'
import { HOST_CDN_STATIC } from './ds'
import { getFolder } from './utils'

const HOST_GAME = `${HOST_CDN_STATIC}/Bangumi-Game`

/** 找游戏数据 */
export const CDN_STATIC_GAME = () => {
  return `${HOST_GAME}/data/game.min.json`
}

/** 单个条目的游戏截图 */
export const CDN_GAME = (subjectId: SubjectId, index: number) =>
  `${HOST_GAME}/preview/${getFolder(subjectId)}/${subjectId}/${index}.jpg`
