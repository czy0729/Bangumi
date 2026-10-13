/*
 * @Author: czy0729
 * @Date: 2026-10-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 区块尺寸计算 (供 InView 懒渲染定位)
 */
import { _ } from '@stores'
import { GAP } from './ds'

/** 卡片高度 (音乐是正方形封面) */
export function getCoverHeight(isMusic: boolean, grid: ReturnType<typeof _.grid>) {
  return isMusic ? grid.width : grid.height
}

/** 注目榜卡片区总高度 (用于下方区块的懒渲染坐标) */
export function getRankHeight(isMusic: boolean) {
  const height1 = getCoverHeight(isMusic, _.grid(1))
  const height2 = getCoverHeight(isMusic, _.grid(2))
  const height3 = getCoverHeight(isMusic, _.grid(3))

  // 1 张等宽 + 1 行半宽 + 4 行三列
  return height1 + GAP + height2 + GAP + 4 * (height3 + GAP)
}
