/*
 * @Author: czy0729
 * @Date: 2024-05-07 22:05:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 组件标识、埋点与入场动画条数
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Chat')

export const EVENT = {
  id: '短信.跳转'
} as const

/** 末尾参与入场动画的消息条数 */
export const ENTERING_EXITING_ANIMATIONS_NUM = 8
