/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 00:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** iPad 顶部留白微调：单 Tab */
export const IOS_PAD_SINGLE_TAB = 2

/** iPad 顶部留白微调：多 Tab */
export const IOS_PAD_MULTI_TAB = 14
