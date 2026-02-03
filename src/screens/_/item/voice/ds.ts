/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:22:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 23:33:14
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemVoice')

export const ITEM_HEIGHT = 132

export const ITEM_HEIGHT_WITH_COLLECTED = 72

export const AVATAR_SIZE = _.r(40)

export const COVER_WIDTH = Math.floor(IMG_WIDTH_SM * 0.88)

export const COVER_HEIGHT = Math.floor(IMG_HEIGHT_SM * 0.88)
