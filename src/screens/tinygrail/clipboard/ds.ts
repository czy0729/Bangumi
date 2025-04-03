/*
 * @Author: czy0729
 * @Date: 2024-11-19 09:33:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:15:13
 */
import { Loaded, MonoId } from '@types'

export const COMPONENT = 'TinygrailClipboard'

export const EXCLUDE_STATE = {
  ids: [] as MonoId[],
  _loaded: false as Loaded
}

export const HM = ['tinygrail/clipboard', 'TinygrailClipboard'] as const
