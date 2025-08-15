/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:41:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 15:02:27
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const THUMB_WIDTH = _.device(114, Math.floor(_.window.contentWidth * 0.4))

export const THUMB_HEIGHT = Math.floor(THUMB_WIDTH * 0.56)
