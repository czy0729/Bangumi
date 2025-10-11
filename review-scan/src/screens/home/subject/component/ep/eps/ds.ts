/*
 * @Author: czy0729
 * @Date: 2024-01-02 21:52:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:57:51
 */
import { rc } from '@utils/dev'
import { wind, window } from '@styles'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Eps')

export const LAYOUT_WIDTH = Math.floor(window.width - wind) - 1
