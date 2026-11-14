/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:15:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Drawer')

/** 抽屉宽度 */
export const DRAWER_WITDH = Math.floor(_.window.contentWidth * 0.75)

/** 开合动画时长 */
export const DRAWER_DURATION = 160

/** 手势区在提示线之外多出的可拖宽度 */
export const SWIPE_EDGE_EXTRA = 12

/** 关闭按钮与拖拽提示线所在列距抽屉边缘的距离 */
export const SWIPE_HANDLE_RIGHT = _._wind + 10

/** 拖动超过该比例则关闭 */
export const SWIPE_CLOSE_RATIO = 0.3

/** 快速滑动关闭的速度阈值 (px/ms) */
export const SWIPE_CLOSE_VELOCITY = 0.5
