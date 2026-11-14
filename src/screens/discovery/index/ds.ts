/*
 * @Author: czy0729
 * @Date: 2021-07-16 14:21:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 */
import { _ } from '@stores'

export const COMPONENT = 'Discovery'

export const INITIAL_RENDER_NUMS_XS = _.device(Math.floor(_.window.contentWidth / 80) + 1, 0)
