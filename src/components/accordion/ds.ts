/*
 * @Author: czy0729
 * @Date: 2024-01-14 04:26:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 19:15:48
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Accordion')

export const MIN_HEIGHT = 48

export const ANIMATED_CONFIG = {
  damping: 40, // 阻尼，控制回弹力度，增加阻尼会减少弹跳，看起来更稳，不容易觉得晕
  stiffness: 300 // 刚度，控制动画速度，增加刚度会让动画响应更快
  // mass: 0.8 // 减小质量会让动画更轻快
} as const
