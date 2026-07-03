/*
 * @Author: czy0729
 * @Date: 2025-01-14 06:30:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 20:38:20
 */
import { tinygrailStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import { TABS } from '../ds'
import State from './state'

import type { TabsKey } from '../types'

export default class Computed extends State {
  list = computedFn((key: TabsKey = TABS[0]['key']) => {
    return tinygrailStore.list(key)
  })
}
