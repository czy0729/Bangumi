/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:31:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 17:31:26
 */
import { collectionStore } from '@stores'
import { getTimestamp } from '@utils'
import { decode } from '@utils/protobuf'
import { D1 } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 全局管理单独条目的收藏状态 */
  fetchCollectionsQueue = () => {
    if (getTimestamp() - this.state._lastQueue <= D1) return

    setTimeout(async () => {
      try {
        const subjectIds = []
        this.calendar.list.forEach(item => {
          item.items.forEach(i => {
            subjectIds.push(i.id)
          })
        })
        await collectionStore.fetchCollectionStatusQueue(subjectIds)

        this.setState({
          _lastQueue: getTimestamp()
        })
        this.save()
      } catch (error) {}
    }, 2000)
  }

  /** 加载 bangumi-data */
  fetchBangumiData = async () => {
    if (this.state.loadedBangumiData) return

    await decode('bangumi-data')
    this.setState({
      loadedBangumiData: true
    })
  }
}
