/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:46:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 23:09:57
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemCatalog')

export const ITEM_HEIGHT = 176

export const WIDTH = Math.floor(Math.min(_.window.contentWidth / 4, _.r(72)))

export const CATALOG_WIDTH = WIDTH * 2

export const AVATAR_WIDTH = 28
