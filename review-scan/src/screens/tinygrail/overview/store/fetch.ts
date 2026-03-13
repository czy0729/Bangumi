/*
 * @Author: czy0729
 * @Date: 2024-12-16 20:17:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 20:18:38
 */
import { tinygrailStore } from '@stores'
import { TabsKey } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchList = (key?: TabsKey) => {
    if (!key) key = this.currentKey

    return key === 'refine/temple'
      ? tinygrailStore.fetchRefineTemple()
      : tinygrailStore.fetchList(key)
  }
}
