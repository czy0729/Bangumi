/*
 * @Author: czy0729
 * @Date: 2024-08-23 10:42:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 10:43:26
 */
import { timelineStore } from '@stores'
import { MODEL_TIMELINE_TYPE } from '@constants'
import { TimeLineType } from '@types'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 吐槽 */
  fetchSay = () => {
    return timelineStore.fetchSay({
      id: this.id
    })
  }

  /** 刷新吐槽的时间线 */
  fetchTimeline = () => {
    return timelineStore.fetchTimeline(
      {
        scope: 'friend',
        type: MODEL_TIMELINE_TYPE.getValue<TimeLineType>('吐槽')
      },
      true
    )
  }
}
