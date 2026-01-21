/*
 * @Author: czy0729
 * @Date: 2025-01-14 06:58:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-01-14 06:58:52
 */
import { tinygrailStore } from '@stores'
import { TabsKey } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchList = (key: TabsKey) => {
    return tinygrailStore.fetchList(key)
  }
}
