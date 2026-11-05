/*
 * @Author: czy0729
 * @Date: 2024-03-01 00:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 13:56:11
 *
 * 瓷砖热力图 Props
 */
import type { MosaicTile } from '@stores/collection/types'
import type { HeatmapType } from '@utils/kv/type'
import type { Loaded, Override, UserId } from '@types'

export type MosaicTileType = Override<
  MosaicTile,
  {
    _name?: UserId
    _loaded?: Loaded
  }
>

export type Props = {
  /** 日期 -> 次数 */
  mosaicTile: MosaicTileType

  /** 当前数据类型 */
  type?: HeatmapType

  /** 是否正在获取数据 */
  loading?: boolean

  /** 切换数据类型, 不传则不显示类型切换入口 */
  onTypeChange?: (type: HeatmapType) => void
}
