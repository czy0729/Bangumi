/*
 * @Author: czy0729
 * @Date: 2024-01-04 00:38:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 06:44:30
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Bottom')

export const MARKS = ['+1', 'mark', '(bgm38)'] as const
