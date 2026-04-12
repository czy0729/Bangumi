/*
 * @Author: czy0729
 * @Date: 2024-01-02 21:35:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:38:15
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'RecSegement')

export const DS = ['数量', '排名'] as const
