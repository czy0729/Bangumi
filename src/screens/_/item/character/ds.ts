/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:08:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 08:51:24
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemCharacter')

export const IMG_WIDTH = 72

export const ITEM_HEIGHT = 104

export const HIGHLIGHT_POSITION = [
  '原作',
  '导演',
  '系列构成',
  '脚本',
  '动画制作',
  '动画制片人',
  // '制片人',
  '人物设定',
  '总作画监督',
  '美术监督',
  // '色彩设计',
  '音乐'
]

export const TEXT_WORKS_VOICE = '最近演出角色'

export const TEXT_WORKS = '最近参与'

export const TEXT_COLLABS = '合作'

export const TEXT_COLLECTIONS = '谁收藏了'

export const TEXT_TOPIC = '去吐槽'

export const CHARACTERS_ACTORS_DATA = [
  TEXT_WORKS_VOICE,
  TEXT_WORKS,
  TEXT_COLLABS,
  TEXT_COLLECTIONS,
  TEXT_TOPIC
] as const

export const PERSONS_ACTORS_DATA = [TEXT_WORKS, TEXT_COLLABS, TEXT_COLLECTIONS, TEXT_TOPIC] as const
