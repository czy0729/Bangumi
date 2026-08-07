/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:02:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:18:07
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ScrollView')

/** 滑动距离阈值（像素）
 *  - 超过才判定为滚动并锁定点击, 防止小幅抖动/慢滑被误判为滚动
 *  - 16px 是 RN 默认滑动取消按压的参考阈值, 与系统响应一致
 */
export const SCROLL_THRESHOLD = 16

/** 滚动空闲超时（毫秒）
 *  - onScroll 停止触发后自动释放 isScrolling
 *  - 太长(>=300)会让滚动结束后一段时间点按无响应, 太短(<150)则惯性滚动中可能误触, 取 200 兼顾两者
 */
export const SCROLL_IDLE_MS = 200

/** 滚动手势结束防抖释放时间（毫秒）
 *  - onScrollEndDrag / onMomentumScrollEnd 触发后防抖释放 isScrolling
 *  - 手指抬起但仍有惯性/粘性滚动时会连续触发这两个事件, 需防抖避免提前解锁误触
 *  - 100ms 接近一次触摸判定窗口, 释放及时且能覆盖惯性残留
 */
export const SCROLL_RELEASE_MS = 100
