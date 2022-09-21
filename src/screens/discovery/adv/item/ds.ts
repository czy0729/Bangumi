/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:41:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 15:41:25
 */
import { _ } from '@stores'

export const THUMB_WIDTH = _.device(114, Math.floor(_.window.contentWidth * 0.4))

export const THUMB_HEIGHT = Math.floor(THUMB_WIDTH * 0.56)
