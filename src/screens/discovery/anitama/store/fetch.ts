/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:26:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-14 21:51:23
 */
import { discoveryStore } from '@stores'
import { TEXT_NEWS_GC, TEXT_NEWS_GS, TEXT_NEWS_YM } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 资讯 */
  fetchList = () => {
    const { page } = this.state

    switch (this.label) {
      case TEXT_NEWS_GC:
        return discoveryStore.fetchGCTimeline(page)

      case TEXT_NEWS_YM:
        return discoveryStore.fetchYMTimeline(page)

      case TEXT_NEWS_GS:
        return discoveryStore.fetchGSTimeline(page)

      default:
        return
    }
  }
}
