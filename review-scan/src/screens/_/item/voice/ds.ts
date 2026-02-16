/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:22:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 23:33:14
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemVoice')

export const ITEM_HEIGHT = 132

export const AVATAR_SIZE = _.r(40)
