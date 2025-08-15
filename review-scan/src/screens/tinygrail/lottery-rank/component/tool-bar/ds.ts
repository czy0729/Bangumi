/*
 * @Author: czy0729
 * @Date: 2025-07-17 17:05:56
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-07-17 17:05:56
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

export const VALUES = ['%', '₵'] as const
