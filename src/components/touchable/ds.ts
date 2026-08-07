/*
 * @Author: czy0729
 * @Date: 2023-07-25 17:58:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:44:06
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Touchable')

/** 点击后的防双击锁时长（毫秒）
 *  - 太短(<200)会导致快速连点触发两次 onPress, 触发双击导航等副作用
 *  - 太长(>300)会让快速连续点击同一目标感觉"没反应", 接近原生手感取 250
 *  - 锁只针对同一实例生效, 不影响列表跨行点击
 */
export const CLICK_LOCK_MS = 250

export const EXTRA_BUTTON_PROPS = {
  borderless: false,
  rippleColor: 'rgba(255, 255, 255, 0)',
  exclusive: true,
  disabled: true
} as const

export const EXTRA_BUTTON_PROPS_DARK = {
  borderless: false,
  rippleColor: 'rgba(0, 0, 0, 0)',
  exclusive: true,
  disabled: true
} as const
