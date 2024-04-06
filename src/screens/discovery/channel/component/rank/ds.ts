/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:35:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 22:05:00
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Rank')

export const COVER_WIDTH = IMG_WIDTH * 1.2

export const COVER_HEIGHT = IMG_HEIGHT * 1.2

export const COVER_WIDTH_SM = _.r(72)

export const COVER_HEIGHT_SM = COVER_WIDTH_SM * 1.28
