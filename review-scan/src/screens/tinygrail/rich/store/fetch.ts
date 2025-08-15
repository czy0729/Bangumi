/*
 * @Author: czy0729
 * @Date: 2025-07-08 16:10:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 18:04:57
 */
import { tinygrailStore } from '@stores'
import { getTimestamp, info } from '@utils'
import { Balance } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 番市首富 */
  fetchRich = (key: string) => {
    return tinygrailStore.fetchRich(key)
  }

  /** 获取所有首富的现金总额 */
  fetchAllRichAssets = async () => {
    const key = this.key(this.state.page)
    await this.fetchRich(key)

    const { list } = this.rich(key)
    const balance: Balance = {
      _total: 0,
      _lastTotal: this.state.balance._total || 0
    }
    for (let i = 0; i <= list.length; i += 1) {
      const userId = list?.[i]?.userId
      if (userId) {
        info(`${i + 1} / 100`)
        const data = await tinygrailStore.fetchUserAssets(userId)
        if (data?.balance) {
          balance[userId] = data.balance
          balance._total += data.balance
        }
      }
    }
    balance._loaded = getTimestamp()

    this.setState({
      balance
    })
    this.save()
  }
}
