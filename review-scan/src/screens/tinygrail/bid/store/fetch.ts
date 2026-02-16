/*
 * @Author: czy0729
 * @Date: 2025-01-14 16:39:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 16:40:10
 */
import { tinygrailStore } from '@stores'
import { queue } from '@utils'
import { TabsKeys } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchList = (key?: TabsKeys) => {
    if (key === 'bid') return tinygrailStore.fetchBid()
    if (key === 'asks') return tinygrailStore.fetchAsks()
    return queue([() => tinygrailStore.fetchAuction(), () => tinygrailStore.fetchTopWeek()])
  }
}
