/*
 * @Author: czy0729
 * @Date: 2024-12-29 11:14:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-29 11:16:07
 */
import { tinygrailStore } from '@stores'
import { queue } from '@utils/fetch'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchCharaAssets = async () => {
    this.setState({
      loadingAssets: true
    })

    const data = await tinygrailStore.fetchCharaAssets(this.hash)
    this.setState({
      loadingAssets: false
    })

    return data
  }

  /** 获取买单卖单数量 */
  fetchCount = (refresh: boolean = false) => {
    const fetchs = []
    if (refresh || !this.list('bid')._loaded) {
      fetchs.push(() => tinygrailStore.fetchBid())
    }

    if (refresh || !this.list('asks')._loaded) {
      fetchs.push(() => tinygrailStore.fetchAsks())
    }

    if (refresh || !this.list('auction')._loaded) {
      fetchs.push(() => tinygrailStore.fetchAuction())
    }

    if (fetchs.length) {
      queue(fetchs)
    }
  }
}
