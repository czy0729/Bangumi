/*
 * @Author: czy0729
 * @Date: 2024-01-15 20:53:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 对话列表标识
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Chat')

/** 列表挂载后滚动到底部的延时 */
export const DELAY_INIT_SCROLL = 480

/** 使用进场动画的最前项个数 */
export const ENTERING_EXITING_ANIMATIONS_NUM = 10
