/*
 * @Author: czy0729
 * @Date: 2024-05-27 10:54:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 16:52:25
 */
import { timelineStore } from '@stores'
import { MODEL_TIMELINE_TYPE } from '@constants'
import { TABS } from '../ds'
import Computed from './computed'

import type { TimeLineType } from '@types'

export default class Fetch extends Computed {
  /** 获取时间胶囊 */
  fetchTimeline = async (refresh: boolean = false) => {
    const { scope, page } = this.state
    const type = MODEL_TIMELINE_TYPE.getValue<TimeLineType>(TABS[page].title)
    await timelineStore.fetchTimeline(
      {
        scope,
        type
      },
      refresh
    )
    setTimeout(() => {
      timelineStore.syncActiveFromTimeline(scope, type)
    }, 0)

    return true
  }
}
