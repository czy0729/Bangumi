/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:46:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 11:52:03
 */
import { _ } from '@stores'

export const WIDTH = Math.floor(Math.min(_.window.contentWidth / 4, _.r(72)))

export const CATALOG_WIDTH = WIDTH * 2

export const AVATAR_WIDTH = _.r(28)
