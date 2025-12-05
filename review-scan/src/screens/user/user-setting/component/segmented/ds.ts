/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:31:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-22 09:31:27
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Segmented')

export const DS = ['预设背景', '随机头像'] as const
