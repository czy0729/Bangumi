/*
 * @Author: czy0729
 * @Date: 2024-01-30 16:11:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 02:36:54
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'
import { getYuqueThumbs } from '../utils'

export const COMPONENT = rc(PARENT, 'Slider')

export const THUMBS_SWITCH_SLIDER = getYuqueThumbs([
  '0/2023/png/386799/1684388975121-fbe54014-9b5b-4b08-94e4-f7ad9a463e71.png',
  '0/2023/png/386799/1684388990177-37b68af2-7d66-4e0b-827d-3c390410a943.png'
] as const)

export const THUMBS_SCROLL_DIRECTION = getYuqueThumbs([
  '0/2022/png/386799/1661159480188-a1279dab-0af3-4985-ba54-cda3581a5cbf.png'
] as const)
