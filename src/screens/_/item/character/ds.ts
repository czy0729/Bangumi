/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:08:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:34:47
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
