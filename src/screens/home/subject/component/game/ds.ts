/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 00:45:43
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Game')

export const THUMB_WIDTH = _.r(160)

export const THUMB_HEIGHT = THUMB_WIDTH * 0.56
