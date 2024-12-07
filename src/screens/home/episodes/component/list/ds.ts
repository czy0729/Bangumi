/*
 * @Author: czy0729
 * @Date: 2024-04-18 14:38:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-05 15:37:45
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const IMAGE_WIDTH = _.r(128)

export const IMAGE_HEIGHT = Math.floor(IMAGE_WIDTH * 0.56)
