/*
 * @Author: czy0729
 * @Date: 2026-09-19 10:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 12:05:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'PopoverContent')

/** 滑入位移 (px) */
export const TRANSLATE_OFFSET = 5
