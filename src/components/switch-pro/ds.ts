/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:02:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:39:18
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'SwitchPro')

/** 进度 / 圆圈动画时长 (ms) */
export const ANIMATION_DURATION = 200

/** 按住时圆圈放大的倍率 */
export const HANDLER_SCALE = 6 / 5
