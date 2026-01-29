/*
 * @Author: czy0729
 * @Date: 2022-12-26 05:14:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-26 05:21:30
 */
const MIN_PERCENT = 0.04

/**
 * 比例柱子高度
 * @param {*} total
 * @param {*} current
 */
export function getHeight(total: number, current: string) {
  if (!total || !current) return 0

  let percent = Number(current) / Number(total)
  if (percent > 0 && percent < MIN_PERCENT) percent = MIN_PERCENT
  return `${percent * 100}%` as const
}
