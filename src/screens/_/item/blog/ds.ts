/*
 * @Author: czy0729
 * @Date: 2024-01-13 23:02:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-03 06:26:54
 */
import { rc } from '@utils/dev'
import { IMG_WIDTH_SM } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemBlog')

export const IMG_WIDTH = Math.floor(IMG_WIDTH_SM * 0.76)

export const IMG_HEIGHT = Math.floor(IMG_WIDTH * 1.4)

export const ITEM_HEIGHT = 156
