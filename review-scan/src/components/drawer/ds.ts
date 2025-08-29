/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:15:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 17:22:50
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Drawer')

export const DRAWER_WITDH = Math.floor(_.window.contentWidth * 0.75)
