/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:46:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 21:42:02
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemCatalog')

/** 单行目录条目估算高度 */
export const ITEM_CATALOG_HEIGHT = 176

export const WIDTH = Math.floor(Math.min(_.window.contentWidth / 4, _.r(72)))

export const CATALOG_WIDTH = WIDTH * 2

export const AVATAR_WIDTH = 28
