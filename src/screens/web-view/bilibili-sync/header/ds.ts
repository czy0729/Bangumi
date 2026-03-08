/*
 * @Author: czy0729
 * @Date: 2024-12-12 05:35:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-12 05:35:52
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['bilibili-sync', 'BilibiliSync'] as const
