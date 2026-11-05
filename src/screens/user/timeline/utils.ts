/*
 * @Author: czy0729
 * @Date: 2026-11-05 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 用户时间线: 瓷砖热力图数据合并
 */
import type { MosaicTile } from '@stores/collection/types'

/**
 * 两份瓷砖数据按日期相加
 *
 * @param a 基准数据
 * @param b 追加数据
 */
export function mergeMosaicTile(a: MosaicTile, b: MosaicTile): MosaicTile {
  const map: MosaicTile = { ...a }

  Object.entries(b).forEach(([date, count]) => {
    map[date] = (map[date] || 0) + count
  })

  return map
}
