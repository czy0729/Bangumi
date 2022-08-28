/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:37:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 15:15:49
 */
import { SubjectId } from '@types'
import { HOST_CDN } from '../constants'
import { HOST_CDN_STATIC, VERSION_GAME } from './ds'
import { getFolder, getOTA } from './utils'

/** 找游戏数据 */
export const CDN_STATIC_GAME = () => {
  // const ota = getOTA()
  // const version =
  //   parseInt(ota.VERSION_GAME) > parseInt(VERSION_GAME)
  //     ? ota.VERSION_GAME
  //     : VERSION_GAME
  return `${HOST_CDN}/gh/czy0729/Bangumi-Game@master/data/game.min.json` as const
}

/** 单个条目的游戏截图 */
export const CDN_GAME = (subjectId: SubjectId, index: number) => {
  return `${HOST_CDN}/gh/czy0729/Bangumi-Game@master/preview/${getFolder(
    subjectId
  )}/${subjectId}/${index}` as const
}

/** @deprecated */
const HOST_GAME = `${HOST_CDN_STATIC}/Bangumi-Game` as const

/** @deprecated 找游戏数据 */
export const _CDN_STATIC_GAME = () => {
  return `${HOST_GAME}/data/game.min.json` as const
}

/** @deprecated 单个条目的游戏截图 */
export const _CDN_GAME = (subjectId: SubjectId, index: number) =>
  `${HOST_GAME}/preview/${getFolder(subjectId)}/${subjectId}/${index}.jpg` as const
