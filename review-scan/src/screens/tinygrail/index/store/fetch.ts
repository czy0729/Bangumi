/*
 * @Author: czy0729
 * @Date: 2024-12-29 11:14:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 17:48:13
 */
import { tinygrailStore } from '@stores'
import { queue } from '@utils/fetch'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 用户资产概览信息 */
  fetchCharaAssets = this.withLoading('loadingAssets', () => {
    return tinygrailStore.fetchCharaAssets(this.hash)
  })

  /** 获取买单卖单数量 */
  fetchCount = () => {
    return queue(
      (
        [
          ['bid', tinygrailStore.fetchBid],
          ['asks', tinygrailStore.fetchAsks],
          ['auction', tinygrailStore.fetchAuction]
        ] as const
      ).map(([, fn]) => fn)
    )
  }
}
