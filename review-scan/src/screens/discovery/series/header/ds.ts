/*
 * @Author: czy0729
 * @Date: 2024-04-02 16:56:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 17:13:24
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['series', 'Series'] as const
