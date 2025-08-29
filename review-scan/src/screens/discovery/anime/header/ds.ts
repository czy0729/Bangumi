/*
 * @Author: czy0729
 * @Date: 2024-03-16 15:47:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:15:03
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['anime', 'Anime'] as const
