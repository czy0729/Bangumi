/*
 * @Author: czy0729
 * @Date: 2025-07-17 14:00:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 23:49:57
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const COVER_WIDTH = 56

export const COVER_HEIGHT = Math.floor(COVER_WIDTH * 1.28)
