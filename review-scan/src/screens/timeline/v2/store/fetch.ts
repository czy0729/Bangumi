/*
 * @Author: czy0729
 * @Date: 2024-05-27 10:54:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 10:56:08
 */
import { timelineStore } from '@stores'
import { MODEL_TIMELINE_TYPE } from '@constants'
import { TimeLineType } from '@types'
import { TABS } from '../ds'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchTimeline = (refresh: boolean = false) => {
    const { scope, page } = this.state
    const type = MODEL_TIMELINE_TYPE.getValue<TimeLineType>(TABS[page].title)
    return timelineStore.fetchTimeline(
      {
        scope,
        type
      },
      refresh
    )
  }
}
