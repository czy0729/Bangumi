/*
 * @Author: czy0729
 * @Date: 2024-08-20 17:00:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-20 17:00:39
 */
import { rc } from '@utils/dev'
import { IMG_HEIGHT, IMG_HEIGHT_SM, IMG_WIDTH, IMG_WIDTH_SM } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Rank')

export const COVER_WIDTH = IMG_WIDTH

export const COVER_HEIGHT = IMG_HEIGHT

export const COVER_WIDTH_SM = IMG_WIDTH_SM

export const COVER_HEIGHT_SM = IMG_HEIGHT_SM
