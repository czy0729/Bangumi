/*
 * @Author: czy0729
 * @Date: 2024-09-11 17:27:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 18:22:18
 */
import { collectionStore, timelineStore } from '@stores'
import { DEFAULT_SCOPE, DEFAULT_TYPE } from '../ds'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 瓷砖进度数据 */
  fetchMosaicTile = () => {
    return collectionStore.fetchMosaicTile({
      userId: this.userId
    })
  }

  /** 获取自己视角的时间胶囊 */
  fetchTimeline = (refresh: boolean = false) => {
    return timelineStore.fetchTimeline(
      {
        scope: DEFAULT_SCOPE,
        type: DEFAULT_TYPE,
        userId: this.userId
      },
      refresh
    )
  }
}
