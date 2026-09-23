/*
 * @Author: czy0729
 * @Date: 2026-09-22 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 10:00:00
 *
 * 视差模块级常量
 * */
import { Easing } from 'react-native-reanimated'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'SensorParallaxCard')

/** 每帧归位衰减系数 */
export const RESTORING_FORCE = 0.005

/** 旋转系数 */
export const ROTATE_FACTOR = 0.2

/** 平移最大偏移 (px) */
export const MAX_TRANSLATE = 50

/** 旋转最大角度 (deg) */
export const MAX_ROTATE = 6

/** 归位动画时长 (ms) */
export const RESTORE_DURATION = 300

/** 归位动画缓动 */
export const RESTORE_EASING = Easing.out(Easing.exp)

/** 开启旋转时的透视距离 */
export const PERSPECTIVE_ROTATE = 600

/** 关闭旋转时的透视距离 */
export const PERSPECTIVE_FLAT = 3000
