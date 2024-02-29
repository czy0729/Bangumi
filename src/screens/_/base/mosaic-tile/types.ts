/*
 * @Author: czy0729
 * @Date: 2024-03-01 00:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-01 00:46:22
 */
import { Loaded, Override, UserId } from '@types'

export type MosaicTileType = Override<
  Record<string, number>,
  {
    _loaded: Loaded
    _name: UserId
  }
>
