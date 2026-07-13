/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:02:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:18:07
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ScrollView')

/** 滑动距离阈值，超过才锁定点击 */
export const SCROLL_THRESHOLD = 16

/** 滚动空闲超时（毫秒），onScroll 停止触发后自动释放 isScrolling */
export const SCROLL_IDLE_MS = 300
