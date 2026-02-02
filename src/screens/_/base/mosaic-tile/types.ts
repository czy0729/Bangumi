/*
 * @Author: czy0729
 * @Date: 2024-03-01 00:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 13:56:11
 */
import type { MosaicTile } from '@stores/collection/types'
import type { Loaded, Override, UserId } from '@types'

export type MosaicTileType = Override<
  MosaicTile,
  {
    _name?: UserId
    _loaded?: Loaded
  }
>

export type Props = {
  mosaicTile: MosaicTileType
}
