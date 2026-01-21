/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 18:23:15
 */
import { usersStore } from '@stores'
import Fetch from './fetch'

export default class ScreenUserTimeline extends Fetch {
  init = () => {
    if (this.userId) {
      this.fetchMosaicTile()

      setTimeout(async () => {
        if (!this.users._loaded) {
          usersStore.fetchUsers({
            userId: this.userId
          })
        }

        await this.fetchTimeline(true)
        this.fetchTimeline()
      }, 1000)
    }
  }

  /** 下拉刷新 */
  onHeaderRefresh = async () => {
    await this.fetchMosaicTile()

    return this.fetchTimeline(true)
  }
}
