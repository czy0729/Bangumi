/*
 * @Author: czy0729
 * @Date: 2024-03-01 00:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:17:45
 */
import { Loaded, Override, UserId } from '@types'

export type MosaicTileType = Override<
  Record<string, number>,
  {
    _name?: UserId
    _loaded?: Loaded
  }
>

export type Props = {
  mosaicTile: MosaicTileType
}
