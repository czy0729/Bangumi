/*
 * @Author: czy0729
 * @Date: 2024-08-13 11:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 12:13:45
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Thumbs')

export const THUMB_WIDTH = _.r(160)

export const THUMB_HEIGHT = THUMB_WIDTH * 0.56
