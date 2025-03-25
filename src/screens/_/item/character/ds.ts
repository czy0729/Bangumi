/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:08:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-25 19:13:31
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemCharacter')

export const IMG_WIDTH = _.r(56)

export const ITEM_HEIGHT = 90
