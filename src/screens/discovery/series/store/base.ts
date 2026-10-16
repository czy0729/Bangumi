/*
 * @Author: czy0729
 * @Date: 2026-10-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 00:00:00
 *
 * store 通用能力: 延迟任务清理 / 请求进度节流 / 列表滚动
 */
import { updateVisibleBottom } from '@utils'
import Store from '@utils/store'
import { PROGRESS_INTERVAL } from './ds'

import type { ScrollToOffset } from '@components'
import type { STATE } from './ds'
import type { Progress } from './types'

export default class Base extends Store<typeof STATE> {
  scrollToOffset: ScrollToOffset = null

  /** 列表滚动位置 */
  private offset = 0

  /** 未触发的延迟任务, 卸载时统一清理 */
  private delayTasks: ReturnType<typeof setTimeout>[] = []

  /** 上次进度通知时间 */
  protected progressTs = 0

  /** 进度计数 (节流丢弃的通知也要计数, 否则进度到不了终点) */
  protected progressCurrent = 0

  /** 延迟执行, 页面卸载后不再触发 */
  protected delay = (fn: () => void, ms: number) => {
    const handle = setTimeout(() => {
      this.delayTasks = this.delayTasks.filter(item => item !== handle)
      fn()
    }, ms)

    this.delayTasks.push(handle)
  }

  /** 清理延迟任务 */
  clearDelayTasks = () => {
    this.delayTasks.forEach(clearTimeout)
    this.delayTasks = []
  }

  /** 请求进度通知 (节流, 并发请求期间避免每条都触发渲染) */
  protected progress = ({ message, total }: Progress) => {
    this.progressCurrent += 1

    // 使用毫秒时钟, 与 PROGRESS_INTERVAL 单位一致 (getTimestamp 为秒级)
    const now = Date.now()
    if (now - this.progressTs < PROGRESS_INTERVAL) return

    this.progressTs = now
    this.setState({
      fetching: true,
      message,
      current: this.progressCurrent,
      total
    })
  }

  /** 列表滚动方法 (forwardRef) */
  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 基于当前位置补偿滚动 */
  scrollBy = (delta: number) => {
    if (!delta) return

    this.scrollToOffset?.({
      offset: Math.max(0, this.offset + delta),
      animated: false
    })
  }

  /** 更新可视范围底部 y 与滚动位置 */
  onScroll = (e: Parameters<typeof updateVisibleBottom>[0]) => {
    updateVisibleBottom.call(this, e)
    this.offset = e.nativeEvent.contentOffset.y
  }
}
