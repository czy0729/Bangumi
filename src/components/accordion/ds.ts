/*
 * @Author: czy0729
 * @Date: 2024-01-14 04:26:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Accordion')

export const MIN_HEIGHT = 48

/** 淡入淡出与收起的时长 */
export const DURATION = 320
