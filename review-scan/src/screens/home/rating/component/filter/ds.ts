/*
 * @Author: czy0729
 * @Date: 2024-02-28 11:10:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 18:19:21
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const DATA = ['所有', '好友'] as const
