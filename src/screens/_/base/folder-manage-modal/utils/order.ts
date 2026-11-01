/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 条目排序值计算与表单小工具
 */
import { HTMLDecode } from '@utils'

export function fixedOrder(order: string) {
  const _order = Number(order)
  return Number.isNaN(_order) ? 10 : _order
}

/** 从删除楼层链接提取 formhash */
export function getFormhash(url?: string) {
  return url?.split('?gh=')[1]
}

/** 解码楼层内容 (去 <br>) */
export function decodeContent(value?: string) {
  return HTMLDecode(value || '').replace(/<br>/g, '')
}

/**
 * 置顶的目标排序值: 最小值再前移 10
 *
 * @param orders 目录内全部条目的排序值
 */
export function getTopOrder(orders: number[]) {
  const min = Math.min(...orders)
  return Number.isFinite(min) ? min - 10 : -10
}

/**
 * 置底的目标排序值: 最大值再后移 10
 *
 * @param orders 目录内全部条目的排序值
 */
export function getBottomOrder(orders: number[]) {
  const max = Math.max(...orders)
  return Number.isFinite(max) ? max + 10 : 10
}

/**
 * 上移的目标排序值: 比当前值小的最大排序值再前移 10, 没有则取最小值前移 10
 *
 * @param orders 目录内全部条目的排序值
 * @param current 当前条目的排序值
 */
export function getPrevOrder(orders: number[], current: number) {
  if (current == 0) return -10

  const sorted = orders.slice().sort((a, b) => b - a)
  let next = (sorted[sorted.length - 1] || 0) - 10
  for (const i of sorted) {
    if (current > i) {
      next = i - 10
      break
    }
  }

  return next
}

/**
 * 下移的目标排序值: 比当前值大的最小排序值再后移 10, 没有则取当前值后移 10
 *
 * @param orders 目录内全部条目的排序值
 * @param current 当前条目的排序值
 */
export function getNextOrder(orders: number[], current: number) {
  const sorted = orders.slice().sort((a, b) => a - b)
  let next = current + 10
  for (const i of sorted) {
    if (current < i) {
      next = i + 10
      break
    }
  }

  return next
}
