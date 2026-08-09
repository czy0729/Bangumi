/*
 * @Author: czy0729
 * @Date: 2026-08-10 05:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 06:37:44
 */
import { Easing } from 'react-native-reanimated'

import type { EasingFunction } from 'react-native'
import type { EasingMode } from './types'

const ANIMATED_EASING_PREFIXES = ['easeInOut', 'easeOut', 'easeIn'] as const

/** 解析缓动名称或函数为 Reanimated 缓动函数 */
export function resolveEasing(easing: EasingMode | EasingFunction): EasingFunction {
  if (typeof easing === 'function') return easing

  let fn: EasingFunction | undefined
  for (let i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
    const prefix = ANIMATED_EASING_PREFIXES[i]
    if (easing.startsWith(prefix)) {
      const rest =
        easing.slice(prefix.length, prefix.length + 1).toLowerCase() +
        easing.slice(prefix.length + 1)
      const modifier = prefix.slice(4, 5).toLowerCase() + prefix.slice(5)
      fn = (Easing[modifier as 'in' | 'out' | 'inOut'] as (f: EasingFunction) => EasingFunction)(
        Easing[rest as keyof typeof Easing] as EasingFunction
      )
      break
    }
  }
  if (!fn) fn = Easing[easing as keyof typeof Easing] as EasingFunction
  if (!fn) throw new Error(`Invalid easing type "${easing}"`)
  return fn
}
