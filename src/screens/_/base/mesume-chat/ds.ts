/*
 * @Author: czy0729
 * @Date: 2025-02-16 06:30:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'MesumeChat')

/** 蒙层淡入淡出时长 */
export const ANIMATED_DURATION = 320

export const MUSUME_CONFIG = {
  bangumi: {
    name: '春菜',
    icon: 'mesume_icon',
    color: '#ee827c'
  },
  burakkuSakura: {
    name: '布莱克·樱',
    icon: 'burakku_sakura_icon',
    color: _._colorDarkModeLevel2
  },
  miku: {
    name: '初音',
    icon: 'miku_icon',
    color: '#2d9e95'
  }
} as const

export const MUSUME_DATA = Object.keys(MUSUME_CONFIG) as (keyof typeof MUSUME_CONFIG)[]
