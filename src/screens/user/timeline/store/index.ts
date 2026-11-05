/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 用户时间线 store 入口: init / 下拉刷新
 */
import { usersStore } from '@stores'
import Fetch from './fetch'

/** 用户时间线 store: 首次进入拉取瓷砖与时间线 */
export default class ScreenUserTimeline extends Fetch {
  init = () => {
    if (this.userId) {
      this.fetchMosaicTile()

      setTimeout(async () => {
        if (!this.users._loaded) {
          usersStore.fetchUsers(this.userId)
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
