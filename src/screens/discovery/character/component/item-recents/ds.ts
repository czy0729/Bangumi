/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 17:11:19
 */
import { rc } from '@utils/dev'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemRecents')

export const COVER_WIDTH = IMG_WIDTH_LG

export const COVER_HEIGHT = IMG_HEIGHT_LG
