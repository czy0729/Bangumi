/*
 * @Author: czy0729
 * @Date: 2025-07-17 15:46:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 15:47:58
 */
import dayjs from 'dayjs'
import { Detail } from './types'

export function getDay(prev: number = 0) {
  return dayjs().subtract(prev, 'day').format('YYMMDD')
}

export function getPercent(detail: Detail) {
  if (!detail) return -100000

  return (detail.total - detail.price) / (detail.price || 100000)
}

export function getTotal(detail: Detail) {
  if (!detail) return -100000

  return detail.total - detail.price
}
