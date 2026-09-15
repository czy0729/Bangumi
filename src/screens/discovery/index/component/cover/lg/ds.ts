/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:42:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:50
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Lg')

/** 文字遮罩 / 无图兜底渐变高度 (沿用历史值) */
export const SCRIM_HEIGHT = 96
