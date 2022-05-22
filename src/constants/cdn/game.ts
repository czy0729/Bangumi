/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:37:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-23 05:41:58
 */
import { SubjectId } from '@types'
import { HOST_CDN, VERSION_GAME } from './ds'
import { getVersion, getFolder } from './utils'

const HOST_GAME = `${HOST_CDN}/gh/czy0729/Bangumi-Game`

/** 找游戏数据 */
export const CDN_STATIC_GAME = () => {
  const v = getVersion('VERSION_GAME', VERSION_GAME)
  return `${HOST_GAME}@${v}/data/game.min.json`
}

/** 单个条目的游戏截图 */
export const CDN_GAME = (subjectId: SubjectId, index: number) =>
  `${HOST_CDN}/gh/czy0729/Bangumi-Game@${VERSION_GAME}/preview/${getFolder(
    subjectId
  )}/${subjectId}/${index}.jpg`
